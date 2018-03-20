import moment from 'moment'

/**
 * 
 * @param {gmt或utc格式} v 
 */
function dateToString(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
}

function stringToMoment(v) {
    if (!v)
        return v
    //兼容IE
    let date = v.replace(/\-\d{1}$/, function(m) {
        return '-0' + m.charAt(1)
    })
    return moment(new Date(date))
}

function momentToString(v, format) {
    if (!v)
        return v
    return moment(v).format(format)
}

function getThisWeekRange(format = 'YYYY-MM-DD') {
    return [
        moment().startOf('week').format(format),
        moment().endOf('week').format(format)
    ]
}

function getLastWeekRange(format = 'YYYY-MM-DD') {
    return [
        moment().subtract(1, 'week').startOf('week').format(format),
        moment().subtract(1, 'week').endOf('week').format(format)
    ]
}

function getThisMonthRange(format = 'YYYY-MM-DD') {
    return [
        moment().startOf('month').format(format),
        moment().endOf('month').format(format),
    ]
}

function getLastMonthRange(format = 'YYYY-MM-DD') {
    return [
        moment().subtract(1, 'month').startOf('month').format(format),
        moment().subtract(1, 'month').endOf('month').format(format),
    ]
}

function getThisYearRange(format = 'YYYY-MM-DD') {
    return [
        moment().startOf('year').format(format),
        moment().endOf('year').format(format),
    ]
}

function getLastYearRange(format = 'YYYY-MM-DD') {
    return [
        moment().subtract(1, 'year').startOf('year').format(format),
        moment().subtract(1, 'year').endOf('year').format(format),
    ]
}

export default {
    dateToString,
    stringToMoment,
    momentToString,
    getThisWeekRange,
    getLastWeekRange,
    getThisMonthRange,
    getLastMonthRange,
    getThisYearRange,
    getLastYearRange
}