function move(rowCount, colCount, currentPosition, action) {
    if (action == 'right')
        currentPosition.x += 1
    else if (action == 'left')
        currentPosition.x -= 1
    else if (action == 'up')
        currentPosition.y -= 1
    else if (action == 'down')
        currentPosition.y += 1

    if (currentPosition.x > colCount - 1) {
        if (currentPosition.y == rowCount - 1) {
            return { x: colCount - 1, y: rowCount - 1 }
        }
        else {
            return { x: 0, y: currentPosition.y + 1 }
        }
    }
    else if (currentPosition.x < 0) {
        if (currentPosition.y == 0) {
            return { x: 0, y: 0 }
        }
        else {
            return { x: colCount - 1, y: currentPosition.y - 1 }
        }
    }
    else {
        if (currentPosition.y < 0) {
            return { x: currentPosition.x, y: 0 }
        }
        else if (currentPosition.y > rowCount - 1) {
            return { x: currentPosition.x, y: rowCount - 1 }
        }
        else {
            return currentPosition
        }
    }
}

export default {
    move
}