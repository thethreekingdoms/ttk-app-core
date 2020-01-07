var domain = location.hostname;
var protocol = location.protocol;
var xhr = null;
var appBasicInfo = {}
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

xhr.open('post', '/v1/app/queryConfigByAppDomain', true);
xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            setBasicInfo(JSON.parse(xhr.responseText));
        } else {
            console.log("Get basic information error!");
        }
    }
}
if (domain == 'localhost' || /^127.|^192./.test(domain)) {
    domain = 'dev.aierp.cn';
}

xhr.send(JSON.stringify({ appDomain: domain }));

function setBasicInfo(res) {
    if (res.result) {

        appBasicInfo.appId = res.value.appId;
        var info = JSON.parse(res.value.appAttributes);
        appBasicInfo.title = info.title;
        appBasicInfo.name = info.name;
        appBasicInfo.companyName = info.companyName;
        appBasicInfo.companyNameShort = info.companyNameShort;
        appBasicInfo.copyright1 = info.copyright1 || '';
        appBasicInfo.copyright2 = info.copyright2 || '';
        appBasicInfo.copyright3 = info.copyright3 || '';
        if (info[domain]) {
            appBasicInfo.apiDomain = protocol + '//' + info[domain].apiDomain;
        }

        appBasicInfo.runningMode = res.value.runningMode;
        appBasicInfo.directory = info.directory;
        appBasicInfo.directory2 = getOssDirectory(info.directory) || 'jcdz';
        appBasicInfo.assetUrl = getOssUrl(info.directory);
        appBasicInfo.beianDomain = info.beianDomain;
        appBasicInfo.isxdz = info.isxdz;
        //设置标题
        document.querySelector('title').innerText = appBasicInfo.title || '企业开发平台';
        //设置favicon
        document.querySelector('#favicon').href = appBasicInfo.assetUrl + '/favicon.ico';
    } else {
        console.log(res.error.message);
    }
    // var eledomain = document.getElementById('txtdomain');
    // if(!eledomain){
    //     var txtdomain = document.createElement("input");
    //     txtdomain.setAttribute("type", "hidden");
    //     txtdomain.setAttribute("id", "txtdomain");
    //     txtdomain.setAttribute("value", document.referrer || '');
    
    //     document.body && document.body.appendChild(txtdomain);
    // }
}
function getOssDirectory(directory) {
    if (directory.indexOf('https') > -1) {
        return directory;
    }
    return directory;
}
function getOssUrl(directory) {
    if (directory.indexOf('https') > -1) {
        return directory;
    }

    if (directory == '' || directory == null) directory = 'transparent';
    return './vendor/img/' + directory;
}