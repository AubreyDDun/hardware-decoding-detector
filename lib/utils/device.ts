const USER_AGENT = navigator.userAgent;

const IS_X5 = (/qqbrowser/i).test(USER_AGENT.toLowerCase());
const IS_EDGE = (/Edge/i).test(USER_AGENT);
const IS_CHROME = (/Chrome/i).test(USER_AGENT) && !IS_EDGE && !IS_X5;
const IS_SAFARI = (/Safari/i).test(USER_AGENT) && !IS_CHROME;

const _safari = USER_AGENT.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
const safariVersion = _safari && _safari[1];

export default {
  IS_SAFARI,
  safariVersion,
}