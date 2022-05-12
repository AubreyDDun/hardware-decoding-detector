export interface Result {
  isHvc1Supported: boolean;
  isHev1Supported: boolean;
  time: number;
}

declare global {
  interface Window {
    hevcDetector: any;
  }
}
