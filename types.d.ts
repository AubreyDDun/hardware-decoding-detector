export interface Result {
  isHvc1Supported: boolean;
  isHev1Supported: boolean;
  time: number;
}

export interface DetectParams {
  includeSystemHijack: boolean;
  showVideo: boolean;
}

declare global {
  interface Window {
    hevcDetector: (DetectParams) => Promise<Result>;
  }
}
