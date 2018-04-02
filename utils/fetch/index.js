import 'whatwg-fetch'
import { isAcrobatInstalledInIE } from './pdfplugin'
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

export function formPost(url, data, isFree) {
	data = data || {}
	var accessToken = getAccessToken()
	if (!!accessToken && !isFree) {
		data.token = accessToken
	}
	var postForm = document.createElement("form")
	postForm.method = "post"
	postForm.action = formatUrl(url)
	postForm.target = "_blank"

	var keys = Object.keys(data)

	for (var k of keys) {
		let val = data[k] == null ? false : true
		if (val) {
			var hiddenInput = document.createElement("input")
			hiddenInput.setAttribute("name", k)
			hiddenInput.setAttribute("value", data[k])
			postForm.appendChild(hiddenInput)
		}

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

	var postForm = document.createElement("form")
	postForm.method = "post"
	postForm.action = formatUrl(url)
	postForm.target = "_blank"

	var keys = Object.keys(data)

	for (var k of keys) {
		let val = data[k] == null ? false : true
		if (val) {
			var hiddenInput = document.createElement("input")
			hiddenInput.setAttribute("name", k)
			hiddenInput.setAttribute("value", data[k])
			postForm.appendChild(hiddenInput)
		}
	}

	document.body.appendChild(postForm)
	postForm.submit()
	document.body.removeChild(postForm)
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
	test,
	mockData,
	mock,
	mockApi,
	getAccessToken,
	setAccessToken,
	clearAccessToken
}