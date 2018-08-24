import 'whatwg-fetch'
import { isAcrobatInstalledInIE } from './pdfplugin'
import { getBrowserVersion } from '../environment'

const mockApi = {}
const mockData = {}
const _options = {}

export function config(options) {
	Object.assign(_options, options)
	if (options.token) {
		setAccessToken(options.token)
	}
}

export function mock(url, handler) {
	if (url && typeof url == "object") {
		Object.keys(url).forEach(u => {
			mock(u, url[u])
		})
	} else if (url.indexOf("*") != -1) {
		let paths = url.split('*')
		let pre = paths.shift()
		Object.keys(handler).forEach(key => {
			let theUrl = pre + key + paths.join('*')
			mock(theUrl, handler[key])
		})
	} else {
		mockApi[url] = handler;
	}
}


export function get(url, headers, option) {
	if (!option || option.ignoreAOP !== true) {
		before()
	}

	if (_options.mock) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					if (getAccessToken()) {
						headers = headers ? { ...headers, token: getAccessToken() } : { token: getAccessToken() }
					}
					var resp = mockApi[url](headers)
					if (resp.then && resp.catch) {
						resp.then(r => {
							resp = after(resp, url, undefined, headers)
							return resolve(resp)
						}).catch(reject)
						return resp
					}
					else if (!option || option.ignoreAOP !== true) {
						resp = after(resp, url, undefined, headers)
					}
					resolve(resp)
				}
				catch (e) {
					reject(e)
				}
			}, 0)
		})
	}

	headers = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...headers,
			token: getAccessToken()
		},

	}

	return new Promise((resolve, reject) => {
		fetch(url, headers)
			.then(response => response.json())
			.then(responseJson => {
				responseJson = after(responseJson, url, undefined, headers)
				resolve(responseJson)
			})
			.catch(error => reject(error))
	})
}


export function post(url, data, headers, option) {
	if (!option || option.ignoreAOP !== true) {
		before(url, data, headers)
	}
	if (_options.mock) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					if (getAccessToken()) {
						headers = headers ? { ...headers, token: getAccessToken() } : { token: getAccessToken() }
					}
					var resp = mockApi[url](data, headers)
					if (resp.then && resp.catch) {
						resp.then(r => {
							r = after(r, url, data, headers)
							return resolve(r)
						}).catch(reject)
						return resp
					}
					else if (!option || option.ignoreAOP !== true) {
						resp = after(resp, url, data, headers)
					}
					resolve(resp)
				}
				catch (e) {
					reject(e)
				}
			}, 0)
		})
	}

	headers = {
		method: 'POST',
		//mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...headers,
			token: getAccessToken()
		},
		body: JSON.stringify(data)
	}

	return new Promise((resolve, reject) => {
		fetch(url, headers)
			.then(response => response.json())
			.then(responseJson => {
				responseJson = after(responseJson, url, data, headers)
				resolve(responseJson)
			})
			.catch(error => reject(error))
	})

}

function fetchIE9(url, options = {}) {
	if (window.XDomainRequest) {
		return new Promise((resolve, reject) => {
			const method = options.method || 'GET';
			const timeout = options.timeout || 30000;
			let data = options.body || options.params || {};
			if (data instanceof Object) {
				data = JSON.stringify(data);
			}

			const XDR = new XDomainRequest();
			XDR.open(method, url);
			XDR.timeout = timeout;
			XDR.onload = () => {
				try {
					const json = JSON.parse(XDR.responseText);
					return resolve(json.data);
				} catch (e) {
					reject(e);
				}
				return reject({});
			};

			XDR.onprogress = () => { };
			XDR.ontimeout = () => reject('XDomainRequest timeout');
			XDR.onerror = () => reject('XDomainRequest error');
			setTimeout(() => {
				XDR.send(data);
			}, 0);
		});
	} else {

	}
}

export function formPost(url, data, isFree) {
	data = data || {}
	var accessToken = getAccessToken()
	if (!!accessToken && !isFree) {
		data.token = accessToken
	}
	var postForm = document.createElement("form"), formatedUrl = formatUrl(url), index = 0
	postForm.method = "post"
	postForm.target = "_blank"

	var keys = Object.keys(data)
	var tempWindow

	for (var k of keys) {
		if (k == 'tempWindow') {
			tempWindow = data[k]
			continue
		}
		let val = data[k] == null ? false : true
		if (val) {
			var hiddenInput = document.createElement("input")
			hiddenInput.setAttribute("name", k)
			if (typeof data[k] == "object") {
				hiddenInput.setAttribute("value", JSON.stringify(data[k]))
				if (index == 0) {
					formatedUrl = formatedUrl + '?' + k + '=' + JSON.stringify(data[k])
				} else {
					formatedUrl = formatedUrl + '&' + k + '=' + JSON.stringify(data[k])
				}
			} else {
				hiddenInput.setAttribute("value", data[k])
				if (index == 0) {
					formatedUrl = formatedUrl + '?' + k + '=' + data[k]
				} else {
					formatedUrl = formatedUrl + '&' + k + '=' + data[k]
				}
			}
			index++
			postForm.appendChild(hiddenInput)
		}

	}

	let browserType = getBrowserVersion()

	if (tempWindow != undefined) {
		tempWindow.location.href = formatedUrl
		// 因Edge、IE浏览器会弹出提示是否进行保存，所以Edge、IE浏览器新打开的页签让用户自己去关闭
		if (browserType && !browserType.edge && !browserType.ie && !browserType.safari) {
			setTimeout(() => {
				tempWindow.close()
			}, 1000)
		}
		return
		// Edge、微信浏览器通过URL传递token等参数
	} else if (browserType && (browserType.edge || browserType.wechat)) {
		postForm.action = formatedUrl
	} else {
		postForm.action = formatUrl(url)
	}

	document.body.appendChild(postForm)
	postForm.submit()
	document.body.removeChild(postForm)
}

export function printPost(url, data, isFree) {
	if (!isAcrobatInstalledInIE()) return
	data = data || {}
	var accessToken = getAccessToken()
	if (!!accessToken && !isFree) {
		data.token = accessToken
	}

	var postForm = document.createElement("form"), formatedUrl = formatUrl(url), index = 0
	postForm.method = "post"
	postForm.target = "_blank"

	var keys = Object.keys(data)
	var tempWindow

	for (var k of keys) {
		if (k == 'tempWindow') {
			tempWindow = data[k]
			continue
		}

		let val = data[k] == null ? false : true
		if (val) {
			var hiddenInput = document.createElement("input")
			hiddenInput.setAttribute("name", k)
			if (typeof data[k] == "object") {
				hiddenInput.setAttribute("value", JSON.stringify(data[k]))
				if (index == 0) {
					formatedUrl = formatedUrl + '?' + k + '=' + JSON.stringify(data[k])
				} else {
					formatedUrl = formatedUrl + '&' + k + '=' + JSON.stringify(data[k])
				}
			} else {
				hiddenInput.setAttribute("value", data[k])
				if (index == 0) {
					formatedUrl = formatedUrl + '?' + k + '=' + data[k]
				} else {
					formatedUrl = formatedUrl + '&' + k + '=' + data[k]
				}
			}
			index++
			postForm.appendChild(hiddenInput)
		}
	}
	let browserType = getBrowserVersion()

	if (tempWindow != undefined) {
		tempWindow.location.href = formatedUrl
		return
	}
	// Edge、微信浏览器通过URL传递token等参数
	else if (browserType && (browserType.edge || browserType.wechat)) {
		//解决edge MicrosoftEdge 20.10240.16384.0 版本中弹不出打印页面得问题
		window.open(formatedUrl, "_blank")
		return;
	} else {
		postForm.action = formatUrl(url)
	}

	document.body.appendChild(postForm)
	postForm.submit()
	document.body.removeChild(postForm)
}

export function pdfPost(url, data, isFree, parentNode, cb) {
	if (!isAcrobatInstalledInIE()) return
	data = data || {}
	var accessToken = getAccessToken()
	if (!!accessToken && !isFree) {
		data.token = accessToken
	}

	var postForm = document.createElement("form"), formatedUrl = formatUrl(url), index = 0
	postForm.method = "post"
	postForm.target = parentNode

	var keys = Object.keys(data)
	var tempWindow

	for (var k of keys) {
		if (k == 'tempWindow') {
			tempWindow = data[k]
			continue
		}

		let val = data[k] == null ? false : true
		if (val) {
			var hiddenInput = document.createElement("input")
			hiddenInput.setAttribute("name", k)
			if (typeof data[k] == "object") {
				hiddenInput.setAttribute("value", JSON.stringify(data[k]))
				if (index == 0) {
					formatedUrl = formatedUrl + '?' + k + '=' + JSON.stringify(data[k])
				} else {
					formatedUrl = formatedUrl + '&' + k + '=' + JSON.stringify(data[k])
				}
			} else {
				hiddenInput.setAttribute("value", data[k])
				if (index == 0) {
					formatedUrl = formatedUrl + '?' + k + '=' + data[k]
				} else {
					formatedUrl = formatedUrl + '&' + k + '=' + data[k]
				}
			}
			index++
			postForm.appendChild(hiddenInput)
		}
	}
	let browserType = getBrowserVersion()

	if (tempWindow != undefined) {
		tempWindow.location.href = formatedUrl
		if( cb ) {
			hideLoading( cb , browserType )
		}
		return
	}
	// Edge、微信浏览器通过URL传递token等参数
	else if (browserType && (browserType.edge || browserType.wechat)) {
		//解决edge MicrosoftEdge 20.10240.16384.0 版本中弹不出打印页面得问题
		window.open(formatedUrl, parentNode)
		if( cb ) {
			hideLoading( cb , browserType )
		}
		return;
	} else {
		postForm.action = formatUrl(url)
	}

	document.body.appendChild(postForm)
	postForm.submit()
	document.body.removeChild(postForm)
	if( cb ) {
		hideLoading( cb , browserType )
	}
}

//hide loading
export function hideLoading( cb, browserType ) {
	let timer = setInterval( function() {
		let sub_con
		if (browserType && ( browserType.ie ) ){//IE
			if( document.frames["pdfIframe"] ) {
				sub_con = document.frames["pdfIframe"]
			} 
		}else{//Firefox
			if( document.getElementById('pdfIframe') || document.getElementById('pdfIframe').contentDocument ) {
				sub_con =  document.getElementById('pdfIframe').contentDocument.body.innerHTML
			}
		}
		if(sub_con && cb ) {
			cb()
			clearInterval( timer )
		}
	} , 1000 )
}

export function test(url, data, result) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(result)
		}, 0)
	})
}

export function setApiRootPath(path) {
	if (path && path[path.length - 1] == ".") path = "https://" + path + "aitaxer.com";
	else if (path && path.indexOf('/') != 0 && path.indexOf("http") != 0) path = "/" + path;
	sessionStorage['_apiRootPath'] = path;
}

function formatUrl(url) {
	return window.location.protocol + '//' + window.location.host + url
	/*
	var rootPath =  config.RootPath;
	if (url.indexOf('/') == 0) {
		url = rootPath + url
	}
	else if (url.indexOf("http") != 0) {
		url = rootPath + '/' + url
	}
	return 'http://127.0.0.1:8081/v1/gl/docManage/export'
	*/
}

function before(url, data, headers) {
	if (_options.before) {
		_options.before(url, data, headers)
	}
}

function after(response, url, data, headers) {
	if (_options.after) {
		return _options.after(response, url, data, headers)
	}

	return response
}

function getAccessToken() {
	return sessionStorage['_accessToken'] || ''
}

function setAccessToken(token) {
	sessionStorage['_accessToken'] = token
}

function clearAccessToken() {
	sessionStorage['_accessToken'] = ''
}

export default {
	config,
	fetch,
	get,
	post,
	formPost,
	printPost,
	pdfPost,
	test,
	mockData,
	mock,
	mockApi,
	getAccessToken,
	setAccessToken,
	clearAccessToken
}
