const USER_AGENT = navigator.userAgent;

const IS_X5 = (/qqbrowser/i).test(USER_AGENT.toLowerCase());
const IS_EDGE = (/Edge/i).test(USER_AGENT);
const IS_CHROME = (/Chrome/i).test(USER_AGENT) && !IS_EDGE && !IS_X5;
const IS_SAFARI = (/Safari/i).test(USER_AGENT) && !IS_CHROME;

const _safari = USER_AGENT.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
const safariVersion = _safari && _safari[1];

const createVideo = (source: string, size = 100): HTMLVideoElement => {
  const video = document.createElement('video');
  video.setAttribute('width', `${size}`);
  video.setAttribute('height', `${size}`);
  video.setAttribute('muted', 'muted');
  video.setAttribute('crossorigin', 'anonymous');
  video.setAttribute('preload', 'preload');
  video.setAttribute('autoplay', 'autoplay');
  video.setAttribute('webkit-playsinline', 'webkit-playsinline');
  video.setAttribute('playsinline', 'playsinline');
  video.setAttribute('x-webkit-airplay', 'x-webkit-airplay');
  video.setAttribute('playsinline', 'playsinline');
  video.src = source;
  return video;
}

const doShowVideo = (video: HTMLVideoElement, codecTag = '') => {
  const block = document.createElement('dv');
  const tag = document.createElement('h3');
  tag.innerText = codecTag;
  block.appendChild(video);
  block.appendChild(tag);
  document.body.appendChild(block);
}

const getResult = (source: string, showVideo = false, codecTag = ''): Promise<boolean> => {
  const startTime = performance.now();
  const maxDetectingTime = showVideo ? 2000 : 2000;

  return new Promise((resolve) => {
    let video: HTMLVideoElement | null = createVideo(source, showVideo ? 100 : 0);
    const timer = setInterval(() => {
      const endTime = performance.now();
      if ((endTime - startTime > maxDetectingTime) || (video as HTMLVideoElement).videoWidth !== 0) {
        clearInterval(timer);
        const isSupported = (video as HTMLVideoElement).videoWidth !== 0;
        if (showVideo) {
          (video as HTMLVideoElement).setAttribute('controls', 'controls');
          doShowVideo(video as HTMLVideoElement, codecTag);
        } else {
          (video as HTMLVideoElement).pause();
          video = null;
        }
        resolve(isSupported);
      }
    });
  });
}

const SafariMainVersion = safariVersion && Number(safariVersion.split('.')[0]);

const convertUrl2blob = async (source: string) => {
  const res = await fetch(source);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

/**
 * 
 * @param {booealn} includeSystemHijack ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 
 * @returns {Promise<Result>} 
 */
const defaultParams = {
  includeSystemHijack: true,
  showVideo: false,
};

const detector = (params: DetectParams = defaultParams): Promise<Result> => new Promise(async (resolve) => {
  const {
    includeSystemHijack = true,
    showVideo = false,
    codecTags = ['hev1', 'hvc1']
  } = params;
  const startTime = performance.now();

  const detectHvc1 = codecTags.indexOf('hvc1') > -1;
  const detectHev1 = codecTags.indexOf('hev1') > -1;

  let hvc1Source: string = 'https://ice-pub-media.myalicdn.com/vod-demo/hevc/01s_20x20_hvc1.mp4';
  let hev1Source: string = 'https://ice-pub-media.myalicdn.com/vod-demo/hevc/01s_20x20_hev1.mp4';

  let isHvc1Supported = false;
  let isHev1Supported = false;

  // ????????? Safari???????????? Safari11 ??? hvc1 ????????????????????? 
  if (IS_SAFARI && SafariMainVersion && SafariMainVersion >= 11) {
    if (!includeSystemHijack) {
      hvc1Source = await convertUrl2blob(hvc1Source);
    }
    isHvc1Supported = await getResult(hvc1Source, showVideo, 'hvc1');
  } else {
    if (detectHvc1) {
      if (!includeSystemHijack) {
        hvc1Source = await convertUrl2blob(hvc1Source);
      }
      isHvc1Supported = await getResult(hvc1Source, showVideo, 'hvc1');
    }
    if (detectHev1) {
      if (!includeSystemHijack) {
        hev1Source = await convertUrl2blob(hev1Source);
      }
      isHev1Supported = await getResult(hev1Source, showVideo, 'hev1');
    }
  }
  const endTime = performance.now();
  resolve({
    isHvc1Supported,
    isHev1Supported,
    time: Math.ceil(endTime - startTime),
  });
});

export default detector;