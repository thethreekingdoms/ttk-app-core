
function build(nodes = [], root = { id: 0 }) {
    if (typeof root != "object") {
        root = { id: root }
    }

    root.children = nodes
        .filter(n => n.parentId == root.id)
        .map(c => build(nodes, c))

    return root
}

function find(nodes, childPropName, matchFn) {
    for (let n of nodes) {
        if (matchFn(n) === true) {
            return n
        }

        if (n[childPropName]) {
            let f = find(n[childPropName], childPropName, matchFn)
            if (f)
                return f
        }
    }
    return
}

function map(nodes, childPropName, newChildPropName, mapFun) {
    var ret = []
    for (let n of nodes) {
        if (n[childPropName]) {
            n[newChildPropName || childPropName] = map(n[childPropName], childPropName, newChildPropName, mapFun)
            if (newChildPropName && newChildPropName != childPropName)
                delete n[childPropName]
        }
        ret.push(mapFun(n))
    }

    return ret
}

export default {
    build,
    find,
    map
}