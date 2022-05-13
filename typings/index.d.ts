declare interface Result {
  isHvc1Supported: boolean;
  isHev1Supported: boolean;
  time: number;
}

declare type CodecTag = 'hev1' | 'hvc1';

declare interface DetectParams {
  includeSystemHijack?: boolean;
  showVideo?: boolean;
  codecTags?: CodecTag[];
}
