import { Result } from '../types';
const USER_AGENT = navigator.userAgent;

const IS_X5 = (/qqbrowser/i).test(USER_AGENT.toLowerCase());
const IS_EDGE = (/Edge/i).test(USER_AGENT);
const IS_CHROME = (/Chrome/i).test(USER_AGENT) && !IS_EDGE && !IS_X5;
const IS_SAFARI = (/Safari/i).test(USER_AGENT) && !IS_CHROME;

const _safari = USER_AGENT.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
const safariVersion = _safari && _safari[1];

const createVideo = (source: string): HTMLVideoElement => {
  const video = document.createElement('video');
  video.setAttribute('width', '100');
  video.setAttribute('height', '100');
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

const getResult = (source: string): Promise<boolean> => {
  const startTime = performance.now();
  const maxDetectingTime = 2000;

  return new Promise((resolve) => {
    let video: HTMLVideoElement | null = createVideo(source);
    const timer = setInterval(() => {
      const endTime = performance.now();
      if ((endTime - startTime > maxDetectingTime) || (video as HTMLVideoElement).videoWidth !== 0) {
        clearInterval(timer);
        const isSupported = (video as HTMLVideoElement).videoWidth !== 0;
        video = null;
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
 * @param {booealn} includeSystemHijack 包含系统劫持浏览器以发挥硬件解码的场景（比如安卓系统自带浏览器中的劫持现象） 
 * @returns {Promise<Result>} 
 */
const detector = (includeSystemHijack = true): Promise<Result> => new Promise(async (resolve) => {
  const startTime = performance.now();

  let hvc1Source: string = 'https://ice-pub-media.myalicdn.com/vod-demo/hevc/01s_20x20_hvc1.mp4';
  let hev1Source: string = 'https://ice-pub-media.myalicdn.com/vod-demo/hevc/01s_20x20_hev1.mp4';

  let isHvc1Supported = false;
  let isHev1Supported = false;

  // 如果是 Safari，只探测 Safari11 对 hvc1 编码的硬解支持 
  if (IS_SAFARI && SafariMainVersion && SafariMainVersion >= 11) {
    if (!includeSystemHijack) {
      hvc1Source = await convertUrl2blob(hvc1Source);
    }
    isHvc1Supported = await getResult(hvc1Source);
  } else {
    if (!includeSystemHijack) {
      hvc1Source = await convertUrl2blob(hvc1Source);
      hev1Source = await convertUrl2blob(hev1Source);
    }
    // 其他浏览器，对两种 tag 都进行探测
    isHvc1Supported = await getResult(hvc1Source);
    isHev1Supported = await getResult(hev1Source);
  }
  const endTime = performance.now();
  resolve({
    isHvc1Supported,
    isHev1Supported,
    time: Math.ceil(endTime - startTime),
  });
});

window.hevcDetector = detector;

export default detector;
