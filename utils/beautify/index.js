import beautifyjs from './javascript/index'
import beautifycss from './css/index'

function beautifyJS(str) {
    return beautifyjs(str, { indent_size: 4 })
}

function beautifyCSS(str) {
    return beautifycss(str, { indent_size: 4 })
}

export default {
    beautifyJS,
    beautifyCSS
}