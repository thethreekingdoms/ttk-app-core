function getPrecision(value) {
    const valueString = value.toString()
    //取e-后字符转换成int,e-10=>10
    if (valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 1), 10)
    }

    let precision = 0;
    //取小数点后字符长度0.0001=>4
    if (valueString.indexOf('.') >= 0) {
        precision = valueString.length - valueString.indexOf('.') - 1
    }
    //否则0
    return precision
}

function format(number, decimals, thousandsSep, decPoint) {
    number = (number + '').replace(/,/g, '')
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')

    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousandsSep !== 'string' ? ',' : thousandsSep,
        dec = typeof decPoint !== 'string' ? '.' : decPoint,
        s = ''

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    var re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2")
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

function toFixedFix(number, prec) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    var k = Math.pow(10, prec)
    return '' + Math.round(number * k) / k
}

function toFixedLocal(value, precision){
  let ret = value
  if (value && value.toString().indexOf('.') > -1) {
    if(value.toString().split('.')[1].length > precision){
        if (!isNaN(value)) {
            ret = parseFloat(Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision))
        } else {
            ret = 0
        }
    }
  }

  return ret
}

function transferData(amount) {
    let ret
    if (amount == null || amount == '' || amount == undefined || isNaN(parseFloat(amount))) {
        ret = 0
    } else {
        ret = parseFloat(clearThousPos(amount))
    }

    return ret
}

function round(number, prec) {
    number = number == undefined ? 0 : number
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+prec) ? 0 : Math.abs(prec)

    var k = Math.pow(10, prec)
    return Math.round(number * k) / k
}

// 处理当为负数时 例如 -5.465 应为-5.47
function round2(number, prec) {
    number = number == undefined ? 0 : number
    number = (number + '').replace(/,/g, '')
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+prec) ? 0 : Math.abs(prec)

    var k = Math.pow(10, prec)
    if(number < 0) {
        return Math.round(number* (-1) * k) / k * (-1)
    } 
    return Math.round(number * k) / k
}

function moneySmalltoBig(money) {
    //贷方金额为负时未处理
    let cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"), //汉字的数字
        cnIntRadice = new Array("", "拾", "佰", "仟"), //基本单位
        cnIntUnits = new Array("", "万", "亿", "兆"), //对应整数部分扩展单位
        cnDecUnits = new Array("角", "分", "毫", "厘"), //对应小数部分单位
        cnInteger = "整", //整数金额时后面跟的字符
        cnIntLast = "元", //整型完以后的单位
        maxNum = 999999999999999.9999, //最大处理的数字
        IntegerNum, //金额整数部分
        DecimalNum, //金额小数部分
        ChineseStr = "", //输出的中文金额字符串
        parts, //分离金额后用的数组，预定义
        zeroCount, IntLen

    if (money === "") {
        return "";
    }

    money = parseFloat(money);
    //alert(money);
    if (money >= maxNum) {
        $.alert('超出最大处理数字');
        return "";
    }
    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
    }

    money = money.toString(); //转换为字符串

    if (money.indexOf(".") == -1) {
        if (money > 0) {
            IntegerNum = money;
        } else {
            var tempInteger = money.split('')
            tempInteger.splice(0, 1)
            IntegerNum = tempInteger.join('');
        }
        DecimalNum = '';
    } else {
        if (money.split(".")[1].length > 2) {
            money = parseFloat(money).toFixed(2)
        }
        parts = money.split(".");
        if (money > 0) {
            IntegerNum = parts[0];
        } else {
            var tempInteger = parts[0].split('')
            tempInteger.splice(0, 1)
            IntegerNum = tempInteger.join('');
        }
        DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
        zeroCount = 0;
        IntLen = IntegerNum.length;
        for (let i = 0; i < IntLen; i++) {
            let n = IntegerNum.substr(i, 1);
            let p = IntLen - i - 1;
            let q = p / 4;
            let m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
    }
    if (DecimalNum != '') {//小数部分
        let decLen = DecimalNum.length;
        for (let i = 0; i < decLen; i++) {
            let n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    }
    else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }

    if (money < 0) {
        ChineseStr = `负${ChineseStr}`
    }

    return ChineseStr;
}

/**
 * 为数值增加千分位
 * input 具体数值
 * isFixed  false: 格式化为整数，非false：保留两位小数位
 * isRetailZero true：保留0  false：将0转换为''
 */
function addThousPos(input, isFixed, isRetailZero, precision) {
    if (isRetailZero) {
        if (input == null || input == undefined || isNaN(parseFloat(input))) return ''
    } else {
        if (input == null || input == '' || input == undefined || isNaN(parseFloat(input)) || parseFloat(input) == 0) return ''
    }

    if (input.toString().indexOf(',') > -1) {
        return input
    }

    let num,
        regex = /(\d{1,3})(?=(\d{3})+(?:\.))/g

    if (isFixed == false) {
        num = parseFloat(input).toFixed(0).toString()
        regex = /(\d)(?=(?:\d{3})+$)/g
    } else {
        num = precision ? parseFloat(input).toFixed(precision).toString() : parseFloat(input).toFixed(2).toString()
    }

    return num.replace(regex, "$1,")
}

/**
 * 去除数值的千分位
 * num 具体数值
 * isRetOriginalVal  true: 保留原始值，false：返回0
 */
function clearThousPos(num, isRetOriginalVal) {
    let ret

    if (num && num.toString().indexOf(',') > -1) {
        ret = parseFloat(num.toString().replace(/,/g, ""))
    } else {
        if (num == undefined || isNaN(num) || num == null || num.toString().replace(/\s+/g, '') == '') {
            if (!!isRetOriginalVal) {
              ret = num
            } else {
              ret = 0
            }
        } else {
            ret = parseFloat(num)
        }
    }

    return ret
}

export default {
    getPrecision,
    format,
    round,
    toFixedFix,
    moneySmalltoBig,
    transferData,
    toFixedLocal,
    clearThousPos,
    addThousPos,
    round2
}
