export interface ResumeViewRequest {
  content: string;
}
export interface ResumeViewResponse {
  finish_reason?: string;
  index?: number;
  logprobs?: null;
  text?: string;
}
