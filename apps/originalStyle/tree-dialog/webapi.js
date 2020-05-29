/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'edf-utils'
const mockproxy = '/v1/fxmxrule/tree-dialog'
export default {
    queryDate: (option) => fetch.post(`${mockproxy}/queryDate`, option),
    thead: (option) => fetch.post(`${mockproxy}/thead`, option, null, { mock: true }),
    tableBody: (option) => fetch.post(`${mockproxy}/tableBody`, option, null, { mock: true }),
    addRow: (option) => fetch.post(`${mockproxy}/addRow`, option),

    ioTable: (option) => fetch.post(`${mockproxy}/iotable`, option, null, { mock: true, delay: 1000 }),
    filterCriteriatable: (option) => fetch.post(`${mockproxy}/filtercriteriatable`, option, null, { mock: true, delay: 1000 }),
    conditionsTable: (option) => fetch.post(`${mockproxy}/conditionstable`, option, null, { mock: true, delay: 1000 }),
    // person: {
    /*query: (option) => fetch.post('/gateway/org/back/userService/query', option),*/
    // delDic: (option) => fetch.post('/gateway/org/back/functionService/deleteFunctionDTOByFunId', option),
    getTreeData: (option) => fetch.post(`${mockproxy}/treeData`, option),
    getSubTreeData: (option) => fetch.post(`${mockproxy}/subTreeData`, option),
    // getBusTypeArr: (option) => fetch.post('/gateway/system/back/sysDicItemService/sysDicItemByCodes', option),
    // findById: (option) => fetch.post('/gateway/org/back/functionService/querySecFunctionDTOByFunctionId', option),

    // create: (option) => fetch.post('/gateway/org/back/functionService/addFunctionInfo', option),
    // update: (option) => fetch.post('/gateway/org/back/functionService/insertFunctionInfo', option),
    // validateFunctionCode: (option) => fetch.post('/gateway/org/back/functionService/validateFunctionCode', option),
    // }
}