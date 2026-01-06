import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { generateCoverLetter } from '@/services/ai';
import { AI_CONFIG } from '@/utils/constants';
import { isValidEmail } from '@/utils/helpers';
import { coverLetterRateLimiter } from '@/utils/rateLimit';

interface CoverLetterFormData {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  skills: string;
  experience: string;
  name: string;
  contactEmail: string;
  tone: 'professional' | 'creative' | 'bold';
}

interface CoverLetterFormProps {
  onGenerate: (coverLetter: string, jobTitle?: string, companyName?: string) => void;
  onError: (error: string) => void;
}

export function CoverLetterForm({ onGenerate, onError }: CoverLetterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CoverLetterFormData>({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    skills: '',
    experience: '',
    name: '',
    contactEmail: '',
    tone: 'professional',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CoverLetterFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof CoverLetterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CoverLetterFormData, string>> = {};
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    }
    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required';
    }
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check rate limit
    const rateLimitCheck = coverLetterRateLimiter.checkLimit();
    if (!rateLimitCheck.allowed) {
      onError(
        `Rate limit exceeded. You can generate ${rateLimitCheck.resetIn} more cover letter${rateLimitCheck.resetIn === 1 ? '' : 's'} in ${rateLimitCheck.resetIn} minute${rateLimitCheck.resetIn === 1 ? '' : 's'}. Please try again later.`
      );
      return;
    }
    
    setIsLoading(true);
    
    try {
      const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter(Boolean);
      
      const result = await generateCoverLetter(
        {
          ...formData,
          skills: skillsArray,
        },
        undefined,
        AI_CONFIG.apiKey || undefined
      );
      
      if (result.error) {
        onError(result.error);
      } else if (result.coverLetter) {
        // Record successful request
        coverLetterRateLimiter.recordRequest();
        onGenerate(result.coverLetter, formData.jobTitle, formData.companyName);
      }
    } catch (err) {
      onError('An unexpected error occurred. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your cover letter</h2>
        <p className="text-lg text-slate-600">
          Fill in the details below and we'll generate a personalized cover letter in seconds
        </p>
        <div className="mt-3 text-sm text-slate-500">
          Remaining generations: {coverLetterRateLimiter.getRemainingRequests()} / 5 per hour
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.name}
            />
            
            <Input
              label="Contact Email"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              error={errors.contactEmail}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Software Engineer"
              error={errors.jobTitle}
            />
            
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Google"
              error={errors.companyName}
            />
          </div>
          
          <Input
            label="Your Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, TypeScript, Node.js (comma-separated)"
            helperText="Separate multiple skills with commas"
            error={errors.skills}
          />

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Writing Tone
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'professional', label: 'Professional', desc: 'Formal and traditional' },
                { value: 'creative', label: 'Creative', desc: 'Engaging and unique' },
                { value: 'bold', label: 'Bold', desc: 'Confident and assertive' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, tone: option.value as any }))}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.tone === option.value
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">{option.label}</div>
                  <div className="text-xs text-slate-600 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
          
          <Textarea
            label="Your Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Describe your relevant work experience, achievements, and qualifications..."
            rows={3}
            error={errors.experience}
          />
          
          <Textarea
            label="Job Description"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Paste the job description here to help tailor your cover letter..."
            rows={5}
            error={errors.jobDescription}
          />
          
          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Generate Cover Letter
              </>
            )}
          </Button>
        </form>
    </div>
  );
}
