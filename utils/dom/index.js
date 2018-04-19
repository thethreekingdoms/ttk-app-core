import ReactDOM from 'react-dom'

function getCursorPosition(target) {
    let oTxt1 = target
    let cursorPosition = -1

    if (oTxt1.selectionStart != undefined) {//非IE浏览器
        cursorPosition = oTxt1.selectionStart
    } else {//IE
        if (document.selection) {
            let range = document.selection.createRange()
            range.moveStart("character", -oTxt1.value.length)
            cursorPosition = range.text.length
        }
    }
    return cursorPosition
}

function gridCellAutoFocusOut(container, editCtrlClassName, position, path) {
    let containerObj = ReactDOM.findDOMNode(container)
    if (!containerObj) return
    const editorDOM = containerObj.querySelector(editCtrlClassName)
    if (!editorDOM) return

    if (editorDOM.className.indexOf('input') != -1) {
        editorDOM.blur()
    }
}

function gridCellAutoFocus(container, editCtrlClassName, position, path) {
    let containerObj = ReactDOM.findDOMNode(container)
    if (!containerObj) return
    const editorDOM = containerObj.querySelector(editCtrlClassName)
    if (!editorDOM) return

    if (editorDOM.className.indexOf('input') != -1) {
        if (editorDOM.getAttribute('path')) {
            if (editorDOM.getAttribute('path').indexOf('creditAmount') > -1 || editorDOM.getAttribute('path').indexOf('debitAmount') > -1) {
                window.setTimeout(function () {
                    editorDOM.blur()
                    editorDOM.select()
                    return
                }, 10)

            }
        }

        editorDOM.select()
        return
    }

    if (editorDOM.className.indexOf('select') != -1) {
        editorDOM.click()
        const input = editorDOM.querySelector('input')
        input && input.select()
        return
    }

    if (editorDOM.className.indexOf('datepicker') != -1) {
        const input = editorDOM.querySelector('input')
        input.click()
        return
    }

    if (editorDOM.className.indexOf('checkbox') != -1) {
        const input = editorDOM.querySelector('input')
        input.focus()
        return
    }
}

function cursorAtEnd(e) {
    let selectedText = window.getSelection().toString(),
        cursorPosition = getCursorPosition(e.target)

    return !e.target.value
        || (selectedText && selectedText.length == e.target.value.length)
        || cursorPosition == e.target.value.length
        || cursorPosition == -1
        || (e.target.className && e.target.className.indexOf('picker') != -1)
}

function cursorAtBegin(e) {
    let selectedText = window.getSelection().toString(),
        cursorPosition = getCursorPosition(e.target)

    return !e.target.value
        || (selectedText && selectedText.length == e.target.value.length)
        || cursorPosition == 0
        || cursorPosition == -1
        || (e.target.className && e.target.className.indexOf('picker') != -1)
}



export default {
    getCursorPosition,
    gridCellAutoFocus,
    gridCellAutoFocusOut,
    cursorAtEnd,
    cursorAtBegin
}
