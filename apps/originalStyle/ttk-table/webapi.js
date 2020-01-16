/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'edf-utils'
const mockproxy = '/v1/original-style/ttk-table'
export default {
    queryDate: (option) => fetch.post(`${mockproxy}/queryDate`, option),
    thead: (option) => fetch.post(`${mockproxy}/thead`, option),
    tableBody: (option) => fetch.post(`${mockproxy}/tableBody`, option),
    addRow: (option)=>fetch.post(`${mockproxy}/addRow`, option)
}