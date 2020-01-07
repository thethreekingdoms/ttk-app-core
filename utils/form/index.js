import {message} from 'antd'
import fetch from '../fetch'


// 校验英文名

function validateName (name) {
    const regName = /^[\u4e00-\u9fa5 a-zA-Z0-9.,]+$/
    return regName.test(name)
}

// 校验中文名
function validateChineseName (name) {
    const regName = /^[\u4e00-\u9fa5]+$/
    return regName.test(name)
}

// 校验中文名字数
function countChineseName (name) {
    const regName = /^[\u4e00-\u9fa5]{2,}$/
    return regName.test(name)
}

// 联系电话
function validateLxdh (lxdh) {
    const regName = /^1[3-9]\d{9}$/
    return regName.test(lxdh)
}

// 校验其它证件号码
function validateIdNumber (id) {
    const format = /^[\u4e00-\u9fa5 a-zA-Z0-9.,`()]+$/
    return format.test(id)
}

//校验电子邮箱
function validateEmail (id) {
    const format = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
    return format.test(id)
}

// 校验身份证号码
function validateIdCardNumber (id) {
    // 1 "验证通过!", 0 //校验不通过
    const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
    //号码规则校验
    if (!format.test(id)) {
        return false
    }
    //校验码判断
    const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]   //系数
    const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']  //校验码对照表
    const id_array = id.split('')
    let sum = 0
    for (let k = 0; k < 17; k++) {
        sum += parseInt(id_array[k]) * parseInt(c[k])
    }
    return id_array[17].toUpperCase() == b[sum % 11].toUpperCase()
}

function checkName (option) {
    if (!option.value) {
        return '请录入姓名'
    }
    if (!validateName(option.value)) {
        return '请勿录入特殊字符'
    }
}

function checkLxdh (option) {
    if (!option.value) {
        return '请录入联系电话'
    }
    if (!validateLxdh(option.value)) {
        return '请录入11位手机号码'
    }
}

function checkSyjkx (option) {
    if (option.value > 200) {
        message.warning('商业健康险金额不能超过[200.00]元')
        return '';
       
    }
}


function checkGjj (option) {
    if (option.value > option.gjjsx) {
        return '公积金超过本地可扣除上限' + option.gjjsx + '元'
    }
}

function checkSfzzhm (option) {
    if (!option.value) {
        return '请录入证照号码'
    }
    if (!validateIdNumber(option.value)) {
        return '请勿录入特殊字符'
    }
    //证件号码为身份证“201”的需要进行合法校验
    if (option.zjlx === '201') {
        if (!validateIdCardNumber(option.value)) {
            return '录入的身份证有误'
        }
    }
}

function checkDyxylbx (option) {
        if (option.value > 1000) {
            message.warning('税延养老保险每月最多允许扣除[1000.00]元')
            return '';
            //return '税延养老保险每月最多允许扣除[1000.00]元'
        }
}

// 其他扣除不为空时备注为必录项
function checkBz (option) {
    if (option.sqkcxmqt > 0) {
        if (!option.value) {
            return '其他扣除不为空时备注为必录项'
        }
    }
}

function checkZykcjze (option) {
    let sjjze = option.sjjze

    let ynssde = option.sre - (option.sqkcxmhj || 0.00) - option.fdkce - option.mssd
    ynssde = ynssde > 0 ? ynssde : 0.00

    let zykcjze = sjjze

    if (option.yxlzdjzbl == '0.3') {
        zykcjze = ynssde * 0.3
    }

    if (zykcjze > sjjze) {
        zykcjze = sjjze
    }

    zykcjze = parseFloat((zykcjze + 0.001).toFixed(3)).toFixed(2)
    console.log("===================zykcjze ->" + zykcjze)
    return zykcjze
}


function checkGjAndSfzzlx(gjdm, sfzzlxdm) {
    if (gjdm == '156') {
        let arr1 = ['227', '219', '221', '201', '202', '203', '204'];
        if (arr1.indexOf(sfzzlxdm) == -1) {
            message.warning("中国籍人员只能填写【居民身份证】、【军官证】、【士兵证】、【中国护照】、【武警警官证】、【香港永久性居民身份证】、【澳门特别行政区永久性居民身份证】。");
            return false;
        }
    } else if (gjdm == '158') {
        //中国台湾
        let arr1 = ['213','219', '220', '221'];
        if (arr1.indexOf(sfzzlxdm) == -1) {
            message.warning("中国台湾地区人员只能填写【台湾居民来往大陆通行证】、【台湾身份证】、【香港永久性居民身份证】、【澳门特别行政区永久居民身份证】。");
            return false;
        }
    } else if (gjdm == '344') {
        //中国香港
        let arr1 = ['210', '219', '221'];
        if (arr1.indexOf(sfzzlxdm) == -1) {
            message.warning("中国香港特别行政区人民只能填【港澳居民来往内地通行证】、【香港永久性居民身份证】、【澳门特别行政区永久性居民身份证】。");
            return false;
        }
    } else if (gjdm == '446') {
        //中国澳门
        let arr1 = ['210', '219', '221'];
        if (arr1.indexOf(sfzzlxdm) == -1) {
            message.warning("中国澳门特别行政地区人员只能填【港澳居民来往内地通行证】、【香港永久性居民身份证】、【澳门特别行政区永久性居民身份证】。");
            return false;
        }
    } else {
        let arr1 = ['208', '233', '219', '221'];
        if (arr1.indexOf(sfzzlxdm) == -1) {
            message.warning("非中国、港、澳、台地区的人员只能填【外国护照】、【外国人永久居留身份证（外国人永久居留证）】、【香港永久性居民身份证】、【澳门特别行政区永久性居民身份证】。");
            return false;
        }
    }
    return true
}

function queryAllSlAndSskcs (option) {
    return fetch.post('/v1/gsdkdj/slAndsskcs/queryAll', option)
}

function querySfxx(option){
    return  fetch.post('/v1/gsdkdj/sfxx/query', option)
}
function queryRyxxList(option){
    return  fetch.post('/v1/gsdkdj/zxfjkc/getRyxxList',option)
}

const validateSfxx = async (form) => {    
    let zjhm = form.sfzzhm ? form.sfzzhm.trim() : ''
    let sfzjlxdm = form.sfzzlxdm
    let nsrsbh = form.nsrsbh
    let zspmdm = form.zspmdm
    let response = await querySfxx({nsrsbh,zjhm, sfzjlxdm,zspmdm})
    return response;
    //this.injections.reduce('sfxx', response)
}

export default {
    queryAllSlAndSskcs,
    queryRyxxList,
    validateChineseName,
    countChineseName,
    validateIdNumber,
    validateIdCardNumber,
    validateName,
    validateLxdh,
    checkName,
    checkLxdh,
    checkSyjkx,
    checkGjj,
    checkBz,
    checkDyxylbx,
    checkSfzzhm,
    checkZykcjze,
    checkGjAndSfzzlx,
    validateSfxx,
    validateEmail,
}
