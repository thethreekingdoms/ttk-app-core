function getBrowserVersion() {
	var agent = navigator.userAgent.toLowerCase(),
		opera = window.opera,
		browser = {
			//检测当前浏览器是否为IE  
			ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent),
			edge: (agent.indexOf('edge') > -1),
			//检测当前浏览器是否为Opera  
			opera: (!!opera && opera.version),
			ischrome: (agent.indexOf("chrome") > -1),
			//检测当前浏览器是否是webkit内核的浏览器  
			webkit: (agent.indexOf(' applewebkit/') > -1),
			//检测当前浏览器是否是运行在mac平台下  
			mac: (agent.indexOf('macintosh') > -1),
			//检测当前浏览器是否处于“怪异模式”下  
			quirks: (document.compatMode == 'BackCompat'),
			//检查当前浏览器是否为360
			'360': _mimeAgent("type", "application/vnd.chromium.remoting-viewer") == true,
			'360fast': _mimeAgent("type", "application/vnd.chromium.remoting-viewer") == true && (agent.indexOf("chrome") > -1 == true),
			'360slow': _mimeAgent("type", "application/vnd.chromium.remoting-viewer") == true && (agent.indexOf("chrome") > -1 == false)
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
		var geckoRelease = agent.match(/rv:([\d\.]+)/);
		if (geckoRelease) {
			geckoRelease = geckoRelease[1].split('.');
			version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;
		}
	}
	if (_mimeAgent("type", "application/vnd.chromium.remoting-viewer")) {
		browser['360fast'] = _mimeAgent("type", "application/vnd.chromium.remoting-viewer") && browser.ischrome;//360极速
		browser['360slow'] = _mimeAgent("type", "application/vnd.chromium.remoting-viewer") && !browser.ischrome;//360兼容
	}

	//检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号  
	if (/chrome\/(\d+\.\d)/i.test(agent)) {
		browser.chrome = +RegExp['\x241'];
	}
	//检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号  
	if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {
		browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
	}
	// Opera 9.50+  
	if (browser.opera)
		version = parseFloat(opera.version());
	// WebKit 522+ (Safari 3+)  
	if (browser.webkit)
		version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);
	//检测当前浏览器版本号  
	browser.version = version;
	return browser;
}

function loadSplitCss() {
	var theme
	if (localStorage && localStorage.getItem) {
		var skin = localStorage.getItem('skin') || '#0066B3';
		skin = skin.toUpperCase();
		if (skin == '#0066B3') {
			theme = 'blueTheme';
        }
        else if (skin == '#0994DC') {
			theme = 'tax72Theme';
		}
		else if (skin == '#B4A074') {
			theme = 'orangeTheme';
		}
		else if (skin == '#FF913A') {
			theme = 'yellowTheme';
		}
		else if (skin == '#1EB5AD') {
			theme = 'businessBlueTheme';
		}
		else {
			theme = 'yellowTheme';
		}
	} else {
		theme = 'blueTheme';
	}

	for (var i = 1; i < 4; i++) {
		var styleSheet = document.createElement('link');
		styleSheet.id = 'refSkin' + i.toString();

		styleSheet.href = './splitcss/' + theme + '-' + i + '.css';
		styleSheet.rel = "stylesheet";
		document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
	}
}

function loadCss() {
	var skin = localStorage.getItem('skin') || '#0066B3';
	skin = skin.toUpperCase();
	if (skin == '#0066B3') {
		var styleSheet = document.createElement('link');
		styleSheet.id = 'refSkin';
		styleSheet.href = './blueTheme.css';
		styleSheet.rel = "stylesheet";
		document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
    }
    else if (skin == '#0994DC') {
		var styleSheet = document.createElement('link');
		styleSheet.id = 'refSkin';
		styleSheet.href = './tax72Theme.css';
		styleSheet.rel = "stylesheet";
		document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
	}
	else if (skin == '#B4A074') {
		var styleSheet = document.createElement('link');
		styleSheet.id = 'refSkin';
		styleSheet.href = './orangeTheme.css';
		styleSheet.rel = "stylesheet";
		document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
	}
	else if (skin == '#FF913A') {
		var styleSheet = document.createElement('link');
		styleSheet.id = 'refSkin';
		styleSheet.href = './yellowTheme.css';
		styleSheet.rel = "stylesheet";
		document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
	}
	else if (skin == '#1EB5AD') {
		var styleSheet = document.createElement('link');
		styleSheet.id = 'refSkin';
		styleSheet.href = './businessBlueTheme.css';
		styleSheet.rel = "stylesheet";
		document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
	}
	else {
		var styleSheet = document.createElement('link');
		styleSheet.id = 'refSkin';
		styleSheet.href = './blueTheme.css';
		styleSheet.rel = "stylesheet";
		document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
	}
}
function checkBrowserSystem() {
	try {
		var str = window.navigator.userAgent ? window.navigator.userAgent.toLowerCase() : ''
		var win = str.match(/windows\s+nt\s+\d+\.\d+\;/)
		if (win && win[0] && typeof win[0] == 'string') {
			var version = win[0].replace(/[a-z\s\;]/g, '')
			return parseFloat(version)
		}
		return 0
	} catch (err) {
		return 0
	}
}

function checkLowBrowser() {
	var browser = getBrowserVersion();
	var isCheckLocalEnv = true;
	if (location.href.indexOf('simplelogin?') > -1 || location.href.indexOf('sso.html') > -1 || location.href.indexOf('ttk-edf-app-simple-portal') > -1) {
		isCheckLocalEnv = false;
	}
	//client open
	var str = window.navigator.userAgent ? window.navigator.userAgent.toLowerCase() : ''
	if (str.indexOf('omnicontainer') > -1) {
		isCheckLocalEnv = false;
	}

	if (browser.ie && browser.version <= 8 && isCheckLocalEnv) {
		if (browser['360'] && browser['360slow'] && false) {
			//ie8,360兼容模式无法读出
			window.location.href = 'vendor/checkBrowser/index.html?360';
		}
		else {
			window.location.href = 'vendor/checkBrowser/index.html';
		}
	}


	if (browser.ie && browser.version == 8 && isCheckLocalEnv == false) {
		window.location.href = 'version/ie8/index.html' + window.location.hash;
	}
	if (browser.ie) {
		if (browser.version < 10 || (browser.version <= 10 && checkBrowserSystem() < 6.4)) {
			loadSplitCss();
			if (browser.version <= 10) {
				var styleSheet = document.createElement('link');
				styleSheet.href = './vendor/ie.css?ts=20190514';
				styleSheet.rel = "stylesheet";
				document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
			}
			// 添加补充库
			var shim = document.createElement('script');
			shim.src = './vendor/shim.dll.js';
			shim.charset = 'utf-8';
			document.getElementsByTagName('HEAD').item(0).appendChild(shim);
		} else {
			loadCss();

		}
		// var polyfillObject = document.createElement('script');
		// polyfillObject.src = './vendor/polyfill.min.js';
		// polyfillObject.charset = 'utf-8';
		// polyfillObject.rel = 'prefetch'
		// document.getElementsByTagName('HEAD').item(0).appendChild(polyfillObject);
	} else {
		if (browser.chrome && browser.chrome <= 40) {
			var styleSheet = document.createElement('link');
			styleSheet.href = './vendor/ie.css?ts=20190514';
			styleSheet.rel = "stylesheet";
			document.getElementsByTagName('HEAD').item(0).appendChild(styleSheet);
		}
		loadCss();
	}

}

function _mimeAgent(option, value) {
	var _mimeTypes = navigator.mimeTypes;
	if (_mimeTypes && _mimeTypes.length > 0) {
		for (var mt in _mimeTypes) {
			if (_mimeTypes[mt][option] == value) {
				return true;
			}
		}
	}
	return false;
}
checkLowBrowser();