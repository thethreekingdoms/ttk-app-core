import less from 'less/lib/less'

function addStyleSheet(str, domId) {
    less().render(str, (e, output) => {
        if (e) {
            utils.exception.error(e)
            return
        }

        var s = document.querySelector('#' + domId)
        if (s)
            s.remove()

        var head = document.head || document.getElementsByTagName('head')[0]
        var style = document.createElement('style')
        style.id = domId
        style.type = 'text/css'
        style.innerHTML = output.css
        head.appendChild(style)
    })
}

export default {
    addStyleSheet
}