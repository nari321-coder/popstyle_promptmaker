export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  promptResult: string | null;
  error?: string;
}

export interface ImageFile {
  file: File;
  previewUrl: string;
  base64: string;
}
