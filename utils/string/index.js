function trimLeft(str) {
    return str.replace(/(^\s*)/g, "")
}

function trimRight(str) {
    return str.replace(/(\s*$)/g, "")
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

function toJson(str) {
    return (new Function("return " + str))()
}

export default {
    trimLeft,
    trimRight,
    trim,
    toJson
}