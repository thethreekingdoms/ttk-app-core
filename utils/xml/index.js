export default function xmlRequest(url, params, success, failed) {
    let xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.open('post', url, false)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('token', sessionStorage.getItem('_accessToken'))
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
    if(!!params){
        xhr.send(JSON.stringify(params))
    }else {
        xhr.send()
    }
}