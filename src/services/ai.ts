import axios from 'axios';
import { AI_CONFIG } from '../utils/constants';

export interface CoverLetterRequest {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  skills: string[];
  experience: string;
  name: string;
  contactEmail: string;
}

export interface CoverLetterResponse {
  coverLetter: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

const SYSTEM_PROMPT = `You are a professional cover letter writer. 
Generate a personalized, compelling cover letter based on the provided information.

The letter should:
- Be professional and engaging
- Highlight relevant skills and experience matching the job description
- Show genuine enthusiasm for the role and company
- Be appropriately concise (300-400 words)
- Use standard business letter format
- Start with a formal greeting
- End with a professional closing

Do not include placeholders like [Company Name] or [Your Name] - use the actual information provided.`;

export async function generateCoverLetter(
  request: CoverLetterRequest,
  apiEndpoint?: string,
  apiKey?: string
): Promise<CoverLetterResponse> {
  const userPrompt = `Write a cover letter for the following position:

Job Details:
- Position: ${request.jobTitle}
- Company: ${request.companyName}

Job Description:
${request.jobDescription}

My Qualifications:
- Skills: ${request.skills.join(', ')}
- Experience: ${request.experience}

Contact Information:
- Name: ${request.name}
- Email: ${request.contactEmail}`;

  const endpoint = apiEndpoint || AI_CONFIG.apiEndpoint;
  
  const payload = {
    model: AI_CONFIG.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: AI_CONFIG.temperature,
    max_tokens: AI_CONFIG.maxTokens,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://yourapp.com',
    'X-Title': 'Cover Letter Generator',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  try {
    const response = await axios.post(endpoint, payload, { headers });

    if (response.data.choices && response.data.choices.length > 0) {
      return {
        coverLetter: response.data.choices[0].message.content,
        usage: {
          promptTokens: response.data.usage?.prompt_tokens || 0,
          completionTokens: response.data.usage?.completion_tokens || 0,
          totalTokens: response.data.usage?.total_tokens || 0,
        },
      };
    }

    return {
      coverLetter: '',
      error: 'No response generated',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        coverLetter: '',
        error: error.response?.data?.error?.message || error.message || 'API request failed',
      };
    }
    
    return {
      coverLetter: '',
      error: 'An unexpected error occurred',
    };
  }
}

export async function generateCoverLetterViaProxy(
  request: CoverLetterRequest,
  proxyEndpoint: string
): Promise<CoverLetterResponse> {
  return generateCoverLetter(request, proxyEndpoint);
}
