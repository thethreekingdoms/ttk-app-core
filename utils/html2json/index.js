import * as html2json from './utils/index'


function removeEmptyNodes(nodes) {
    return nodes.filter(node => {
        if (node.name.indexOf('ele') > -1) {
            node.children = removeEmptyNodes(node.children);
            return true
        }
        return node.content.length
    })
}

function stripWhitespace(nodes) {
    return nodes.map(node => {
        if (node.name.indexOf('ele') > -1) {
            node.children = stripWhitespace(node.children)
        } else if (node.name.indexOf('child') > -1) {
            node.content = node.children.trim()
        }
        return node
    })
}

function removeWhitespace(nodes) {
    return removeEmptyNodes(stripWhitespace(nodes))
}

function parseHtml(htmlCode) {
    let jsonCode = html2json.parse(htmlCode)
    jsonCode = removeWhitespace(jsonCode)
    return JSON.stringify(jsonCode, null, 2)
}

export default parseHtml