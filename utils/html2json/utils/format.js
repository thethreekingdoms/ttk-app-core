export function splitHead(str, sep) {
  const idx = str.indexOf(sep)
  if (idx === -1) return [str]
  return [str.slice(0, idx), str.slice(idx + sep.length)]
}

export function unquote(str) {
  const car = str.charAt(0)
  const end = str.length - 1
  const isQuoteStart = car === '"' || car === "'"
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end)
  }
  return str
}

function getRandomNumber() {
  var num = Math.random() * 1000 + 1
  return num = parseInt(num, 10)
}

export function format(nodes, options) {
  return nodes.map(node => {
    const name = node.name
    const outputNode = name === 'ele'
      ? {
        name: name + getRandomNumber(),
        component: "::" + node.tagName.toLowerCase(),
        attributes: formatAttributes(node.attributes),
        children: format(node.children, options)
      }
      : { name: 'child' + getRandomNumber(), component: '::' + node.type, children: node.content }
    if (options.includePositions) {
      outputNode.position = node.position
    }
    return outputNode
  })
}

export function formatAttributes(attributes) {
  return attributes.map(attribute => {
    const parts = splitHead(attribute.trim(), '=')
    const key = parts[0]
    const value = typeof parts[1] === 'string'
      ? unquote(parts[1])
      : null
    return { key, value }
  })
}
