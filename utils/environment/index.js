function getBrowserVersion() {
	var agent = navigator.userAgent.toLowerCase(),
		opera = window.opera,
		browser = {
			//检测当前浏览器是否为IE
			ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent),
			//检测当前浏览器是否为Opera
			opera: (!!opera && opera.version),
			ischrome: agent.indexOf("chrome") > 1,
			//检测当前浏览器是否是webkit内核的浏览器
			webkit: (agent.indexOf(' applewebkit/') > -1),
			//检测当前浏览器是否是运行在mac平台下
			mac: (agent.indexOf('macintosh') > -1),
			//检测当前浏览器是否是Edge
			edge: (agent.indexOf('edge') > -1),
			//检测当前浏览器是否处于“怪异模式”下
			quirks: (document.compatMode == 'BackCompat'),
			mobile: agent.indexOf('iphone') > -1 || agent.indexOf('android') > -1, //是否为移动终端
			ios: !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: agent.indexOf('android') > -1 || agent.indexOf('linux') > -1, //android终端或uc浏览器
			iPhone: agent.indexOf('iphone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: agent.indexOf('ipad') > -1, //是否iPad
			webApp: agent.indexOf('safari') == -1,//是否web应该程序，没有头部与底部
			wechat: agent.match(/MicroMessenger/i) == "micromessenger",//微信
			weibo: agent.match(/WeiBo/i) == "weibo",//微博
			qq: agent.match(/QQ/i) == "qq",//qq
			modesogo: agent.indexOf('metasr') > -1 && agent.indexOf('rv') == -1,//SOGOU
			ismode360: _mimeAgent("type", "application/vnd.chromium.remoting-viewer") && agent.indexOf("chrome") > 1,//360极速
			slow360: _mimeAgent("type", "application/vnd.chromium.remoting-viewer") && !agent.indexOf("chrome") > 1//360兼容
		};
	//检测当前浏览器内核是否是gecko内核
	browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);
	var version = 0;
	// Internet Explorer 6.0+
	if (browser.ie) {
		var v1 = agent.match(/(?:msie\s([\w.]+))/);
		var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
		if (v1 && v2 && v1[1] && v2[1]) {
			version = Math.max(v1[1] * 1, v2[1] * 1);
		} else if (v1 && v1[1]) {
			version = v1[1] * 1;
		} else if (v2 && v2[1]) {
			version = v2[1] * 1;
		} else {
			version = 0;
		}
		//检测浏览器模式是否为 IE11 兼容模式
		browser.ie11Compat = document.documentMode == 11;
		//检测浏览器模式是否为 IE9 兼容模式
		browser.ie9Compat = document.documentMode == 9;
		//检测浏览器模式是否为 IE10 兼容模式
		browser.ie10Compat = document.documentMode == 10;
		//检测浏览器是否是IE8浏览器
		browser.ie8 = !!document.documentMode;
		//检测浏览器模式是否为 IE8 兼容模式
		browser.ie8Compat = document.documentMode == 8;
		//检测浏览器模式是否为 IE7 兼容模式
		browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7);
		//检测浏览器模式是否为 IE6 模式 或者怪异模式
		browser.ie6Compat = (version < 7 || browser.quirks);
		browser.ie9above = version > 8;
		browser.ie9below = version < 9;
	}
	// Gecko.
	if (browser.gecko) {
		var geckoRelease = agent.match(/rv:([\d\.]+)/)
		if (geckoRelease) {
			geckoRelease = geckoRelease[1].split('.')
			version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1
		}
	}
	//检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号
	if (/chrome\/(\d+\.\d)/i.test(agent)) {
		browser.chrome = +RegExp['\x241']
	}
	//检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号
	if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {
		browser.safari = +(RegExp['\x241'] || RegExp['\x242'])
	}
	// Opera 9.50+
	if (browser.opera)
		version = parseFloat(opera.version());
	// WebKit 522+ (Safari 3+)
	if (browser.webkit) {
		version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1])
	}
	//检测当前浏览器版本号
	browser.version = version;
	return browser;
}
function isTestMode() {
	const devMode = location.href.indexOf('127.0.0.1') > -1
		|| location.href.indexOf('localhost') > -1
		|| location.href.indexOf('debug.') > -1
		|| location.href.indexOf('192.') > -1
		|| location.href.indexOf('172.') > -1
		|| location.href.indexOf('dev.') > -1
		|| location.href.indexOf('test-xdz.') > -1
		|| location.href.indexOf('debug-xdz.') > -1

	if (location.href.indexOf('erptest.jchl') > -1) return false
	return devMode
}

function isDevMode() {
	let href = location.href.toLowerCase()

	const devMode = href.indexOf('127.0.0.1') > -1
		|| href.indexOf('localhost') > -1
		|| href.indexOf('debug.') > -1
		|| href.indexOf('192.') > -1
		|| href.indexOf('172.') > -1
		|| href.indexOf('dev.') > -1
		|| href.indexOf('test.') > -1
		|| href.indexOf('dev-jr.') > -1
		|| href.indexOf('test-jr.') > -1
		|| href.indexOf('dev-dz.') > -1
		|| href.indexOf('test-dz.') > -1
		|| href.indexOf('dz-dev.') > -1
		|| href.indexOf('dz-test.') > -1
		|| href.indexOf('dev-xdz.') > -1
		|| href.indexOf('debug-xdz.') > -1

	if (href.indexOf('erptest.jchl') > -1) return false
	return devMode
}

function connectServerUrl() {
	return appBasicInfo.apiDomain
}

function isClientMode() {
	let clientStr = window.navigator.userAgent ? window.navigator.userAgent.toLowerCase() : ''
	if (clientStr.indexOf('omnicontainer') > -1) {
		return true
	}
	return false
}
function _mimeAgent(option, value) {
	var mimeTypes = navigator.mimeTypes;
	for (var mt in mimeTypes) {
		if (mimeTypes[mt][option] == value) {
			return true
		}
	}
	return false
}
export default {
	getBrowserVersion,
	isDevMode,
	isTestMode,
	isClientMode,
	connectServerUrl
}
