//import $ from 'jquery'
import initWidth from './initWidth'
module.exports = function changeColSize(id, callBack) {
    var i,
        self,
        table = document.getElementById(id),
        header = table.rows[0],
        tableX = header.clientWidth,
        length = header.cells.length;

    for (i = 0; i < length; i++) {
        if (i == length - 1) continue
        header.cells[i].onmousedown = function () {
            self = this;
            if (event.offsetX > self.offsetWidth - 10) {
                self.mouseDown = true;
                self.oldX = event.x;
                self.oldWidth = self.offsetWidth;
            }
        };
        header.cells[i].onmousemove = function () {
            if (event.offsetX > this.offsetWidth - 10) {
                this.style.cursor = 'col-resize';
            } else {
                this.style.cursor = 'default';
            }
            if (self == undefined) {
                self = this;
            }
            if (self.mouseDown != null && self.mouseDown == true) {
                self.style.cursor = 'default';
                if (self.oldWidth + (event.x - self.oldX) > 0) {
                    self.width = self.oldWidth + (event.x - self.oldX);
                }
                self.style.width = self.width;
                table.style.width = tableX + (event.x - self.oldX) + 'px';
                if ($) {
                    let container = $(table).parents('.ant-table-scroll').find('.ant-table-body table')
                    if (container.find('thead').length == 0 && container.find('tbody').length == 1) {
                        console.log(1111111111)
                        container.find('tbody tr').eq(0).find('td').eq($(self).index()).css('width', self.width)
                        let type = $(self).attr('type')
                        let keyRandom = Math.floor(Math.random() * 1000000)
                        self.keyRandom = keyRandom
                        setTimeout(() => {
                            if (self.keyRandom == keyRandom) {
                                // callBack && callBack(type, self.width)
                            }
                        }, 500)
                    }
                    initWidth(id, tableX + (event.x - self.oldX) + 'px')
                    self.style.cursor = 'col-resize';
                }

            }
        };
        table.onmouseup = function () {
            if (self == undefined) {
                self = this;
            }
            self.mouseDown = false;
            self.style.cursor = 'default';
            tableX = header.clientWidth;
        };
        window.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                if (self == undefined) {
                    return
                }
                self.mouseDown = false;
                self.style.cursor = 'default';
                tableX = header.clientWidth;
            }
        }, false)
    }
};
