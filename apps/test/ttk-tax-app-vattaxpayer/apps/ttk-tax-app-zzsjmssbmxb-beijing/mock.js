/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData

/*
fetch.mock('/v1/person/query', (option) => {
    return {result:true, value:{}}
})
*/
//减税
/***二维表行序号*/
//     private String ewbhxh;
//     /**行名称*/
//     private String hmc;
//     /**期初余额*/
//     private String qcye;
//     /**本期发生额*/
//     private String bqfse;
//     /**本期应抵减税额*/
//     private String bqydjse;
//     /**本期实际抵减税额*/
//     private String bqsjdjse;
//     /**期末余额*/
//     private String qmye;
// //免税
// 	/**二维表行序号*/
//     private String ewbhxh;
//     /**行名称*/
//     private String hmc;
//     /**免征增值税项目销售额*/
//     private String mzzzsxmxse;
//     /**免税销售额扣除项目本期实际扣除金额*/
//     private String bqsjkcje;
//     /**扣除后免税销售额*/
//     private String kchmsxse;
//     /**免税销售额对应的进项税额*/
//     private String msxsedyjxse;
//     /**免税额*/
//     private String mse;