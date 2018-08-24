import { fetch } from 'edf-utils'

export default {
    query: {
        queryVoucher: () => fetch.post('/v1/edf/voucherPreset/queryAll'),
        queryTableHeadData: (option) => fetch.post('/v1/edf/voucherCardPreset/query', option),
        queryTablesData: (option) => fetch.post('/v1/edf/voucherTablePreset/query', option),
        queryTableBodyData: (option) => fetch.post('/v1/edf/voucherDetailPreset/query', option),
        queryTableFields: (code) => fetch.post('/v1/edf/voucherPreset/queryTitles')
    },
    menu: {
        queryPageList: (option) => fetch.post('/v1/edf/menu/queryPageList', option),
        deleteBatch: (option)  => fetch.post('/v1/edf/menu/deleteBatch', option)
    }
}