var shareJS = {
    getSearch: function () {
        var search = window.location.search.slice(1),
            arr = search.split('&'),
            searchJson = {}
        for (var i = 0; i < arr.length; i++) {
            arr[i].split('=')
            searchJson[arr[i].split('=')[0]] = arr[i].split('=')[1]
        }
        return searchJson
    },
    init: function () {
        var searchJson = shareJS.getSearch(),
            host = window.location.host,
            shareUrl = location.protocol + '//' + host,
            pngStr = searchJson.pngs,
            urlStr = location.protocol + '//' + host + '/v1/img/',
            pngArr = pngStr.split(','),
            pngArrLen = pngArr.length
        for (var i = 0; i < pngArrLen; i++) {
            var imgUrl = urlStr + pngArr[i],
                img = document.createElement('img')
            img.src = imgUrl
            document.body.appendChild(img)
        }

        this.getAppImgUrl()
    },
    getAppImgUrl: function () {
        var _this = this
        this.ajax({
            url: 'v1/app/getById',
            type: "POST",
            data: { id: _this.getSearch().appId },
            dataType: "json",
            isGetAppInfo: true,
            success: function (response, xml) {
                var appData

                if (!JSON.parse(response).value) {
                    appData = {
                        "id": 100,
                        "parentId": 10,
                        "name": "",
                        "status": 1,
                        "homeUrl": "",
                        "appEmail": "",
                        "qrCodeWx": "https://www.aierp.cn:8089/img/100/wxCode.png",
                        "companyName": "",
                        "companyNameShort": "",
                        "iconUrl": "https://www.aierp.cn:8089/img/100/favicon.png",
                        "logoUrlLogin": "https://www.aierp.cn:8089/img/100/logo.png",
                        "logoUrlPortal": "https://www.aierp.cn:8089/img/100/portalLogo.png",
                        "logoUrlShare": "https://www.aierp.cn:8089/img/100/share.png",
                        "appDomain": ",dev.aierp.cn,test.aierp.cn,demo.aierp.cn,debug.aierp.cn,127.0.0.1,",
                        "appCopyrightYear": "2018-2019",
                        "logoUrlEmail": "https://www.aierp.cn:8089/img/100/portalLogo.png",
                        "appServiceTel": ""
                    }
                } else {
                    appData = JSON.parse(response).value
                }
                _this.setTitleAndLogo(appData)
            },
            fail: function (status) {
                // fail
            }
        });
    },

    ajax: function (options) {
        var host = window.location.host
        options.url = window.location.protocol + '//' + host + '/' + options.url
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = JSON.stringify(options.data);
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(params);
        }
    },
    setTitleAndLogo: function (appData) {
        var _this = this

        var iconUrl = appData.iconUrl,
            title = appData.name || '',
            linkArr = document.querySelectorAll('link[rel="shortcut icon"]')

        for (var i = 0; i < linkArr.length; i++) {
            if (linkArr[i].remove) {
                linkArr[i].remove()
            } else {
                linkArr[i].removeNode()
            }
        }
        var head = document.getElementsByTagName('head')[0],
            link = document.createElement('link')

        link.setAttribute('rel', 'shortcut icon')
        link.setAttribute('href', iconUrl)
        document.title = title

        head.appendChild(link)

        _this.initWeiXinShare(appData)
    },

    initWeiXinShare: function (appData) {
        var _this = this;

        this.ajax({
            url: 'v1/mobile/getJsSignInfo',
            type: "POST",
            data: { url: window.location.href.split('#')[0] },
            dataType: "json",
            success: function (response, xml) {
                // todo
                _this.initWeixinJsSdk(JSON.parse(response).value.signInfo, appData)
            },
            fail: function (status) {
                // fail
            }
        });
    },
    initWeixinJsSdk: function (signInfo, appData) {
        var searchList = this.getSearch(),
            appId = searchList.appId,
            year = searchList.year,
            mon = searchList.mon,
            host = window.location.host

        if (/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)) {
            host = 'dev.aierp.cn:8089'
        }
        var shareUrl = window.location.protocol + '//' + host + window.location.pathname + window.location.search + window.location.hash
        var defaultUrl = ''
        var urlEnCodeUrl = encodeURIComponent(signInfo.url),
            imgUrl = appData.logoUrlShare

        var temp = {
            link: window.location.href,
            title: '', // 分享标题
            desc: '', // 分享描述
            imgUrl: imgUrl
        }

        startweixin();
        function startweixin() {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
                appId: signInfo.appId, // 必填，公众号的唯一标识
                timestamp: signInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: signInfo.nonceStr, // 必填，生成签名的随机串
                signature: signInfo.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'/*, 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation'*/] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            var paramsTimeline = {
                title: temp.title, // 分享标题
                desc: temp.desc, // 分享描述
                link: temp.link, // 分享链接
                imgUrl: temp.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //console.log(paramsTimeline)
                },
                cancel: function () {
                    //
                }
            };
            var paramsAppMessage = {
                title: temp.title,
                desc: temp.desc,
                link: temp.link,
                imgUrl: temp.imgUrl,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //success
                    //console.log(paramsAppMessage)
                },
                cancel: function () {
                    //
                }
            };
            wx.ready(function () {

                wx.onMenuShareTimeline(paramsTimeline);
                wx.onMenuShareAppMessage(paramsAppMessage);

            });
        }
    }
}
shareJS.init()
