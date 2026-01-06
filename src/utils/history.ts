// Save and manage cover letter history

const HISTORY_KEY = 'cover_letter_history';
const MAX_HISTORY = 5;

export interface HistoryItem {
  id: string;
  coverLetter: string;
  jobTitle: string;
  companyName: string;
  createdAt: number;
}

export function saveToHistory(item: Omit<HistoryItem, 'id' | 'createdAt'>): void {
  const history = getHistory();
  
  const newItem: HistoryItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };
  
  // Add to beginning of array
  history.unshift(newItem);
  
  // Keep only the last MAX_HISTORY items
  const trimmedHistory = history.slice(0, MAX_HISTORY);
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
}

export function getHistory(): HistoryItem[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getHistoryItem(id: string): HistoryItem | null {
  const history = getHistory();
  return history.find(item => item.id === id) || null;
}

export function deleteHistoryItem(id: string): void {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
