var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var USER_AGENT = navigator.userAgent;
var IS_X5 = (/qqbrowser/i).test(USER_AGENT.toLowerCase());
var IS_EDGE = (/Edge/i).test(USER_AGENT);
var IS_CHROME = (/Chrome/i).test(USER_AGENT) && !IS_EDGE && !IS_X5;
var IS_SAFARI = (/Safari/i).test(USER_AGENT) && !IS_CHROME;
var _safari = USER_AGENT.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
var safariVersion = _safari && _safari[1];
var createVideo = function (source) {
    var video = document.createElement('video');
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
};
var getResult = function (source) {
    var startTime = performance.now();
    var maxDetectingTime = 2000;
    return new Promise(function (resolve) {
        var video = createVideo(source);
        var timer = setInterval(function () {
            var endTime = performance.now();
            if ((endTime - startTime > maxDetectingTime) || video.videoWidth !== 0) {
                clearInterval(timer);
                var isSupported = video.videoWidth !== 0;
                video = null;
                resolve(isSupported);
            }
        });
    });
};
var SafariMainVersion = safariVersion && Number(safariVersion.split('.')[0]);
var convertUrl2blob = function (source) { return __awaiter(void 0, void 0, void 0, function () {
    var res, blob;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetch(source)];
            case 1:
                res = _a.sent();
                return [4, res.blob()];
            case 2:
                blob = _a.sent();
                return [2, URL.createObjectURL(blob)];
        }
    });
}); };
var detector = function (includeSystemHijack) {
    if (includeSystemHijack === void 0) { includeSystemHijack = true; }
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var startTime, hvc1Source, hev1Source, isHvc1Supported, isHev1Supported, endTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTime = performance.now();
                    hvc1Source = 'https://ice-pub-media.myalicdn.com/vod-demo/hevc/01s_20x20_hvc1.mp4';
                    hev1Source = 'https://ice-pub-media.myalicdn.com/vod-demo/hevc/01s_20x20_hev1.mp4';
                    isHvc1Supported = false;
                    isHev1Supported = false;
                    if (!(IS_SAFARI && SafariMainVersion && SafariMainVersion >= 11)) return [3, 4];
                    if (!!includeSystemHijack) return [3, 2];
                    return [4, convertUrl2blob(hvc1Source)];
                case 1:
                    hvc1Source = _a.sent();
                    _a.label = 2;
                case 2: return [4, getResult(hvc1Source)];
                case 3:
                    isHvc1Supported = _a.sent();
                    return [3, 10];
                case 4:
                    if (!!includeSystemHijack) return [3, 7];
                    return [4, convertUrl2blob(hvc1Source)];
                case 5:
                    hvc1Source = _a.sent();
                    return [4, convertUrl2blob(hev1Source)];
                case 6:
                    hev1Source = _a.sent();
                    _a.label = 7;
                case 7: return [4, getResult(hvc1Source)];
                case 8:
                    isHvc1Supported = _a.sent();
                    return [4, getResult(hev1Source)];
                case 9:
                    isHev1Supported = _a.sent();
                    _a.label = 10;
                case 10:
                    endTime = performance.now();
                    resolve({
                        isHvc1Supported: isHvc1Supported,
                        isHev1Supported: isHev1Supported,
                        time: Math.ceil(endTime - startTime),
                    });
                    return [2];
            }
        });
    }); });
};
window.hevcDetector = detector;
export default detector;
