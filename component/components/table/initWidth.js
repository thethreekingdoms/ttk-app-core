//import $ from 'jquery'

export default function initWidth (id, tableWidth) {
    let table = document.getElementById(id)
    if($){
        let container = $(table).parents('.ant-table-scroll').find('.ant-table-body table')
        container.css('width', tableWidth)
        if ( container.find('thead').length == 0 && container.find('tbody').length == 1 ) {
            let td = $(table).parents('.ant-table-scroll').find('.ant-table-body table tbody tr').eq(0).find('td')
            $(table).find('thead th').each((index, item) => {
                td.eq(index).css('width', $(item).css('width'))
            })
        }
    }

}