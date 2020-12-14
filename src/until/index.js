/**
 * 防抖处理
 */
export function debounce(func, delay) {
    let timer = null;
    return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this);
        }, delay);
    };
}

/**
 * 时间格式转换
 */
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

export function songTimeFormat(time) {
    //分钟
    var minute = time / 60;
    var minutes = parseInt(minute);

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    //秒
    var second = time % 60;
    var seconds = Math.round(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
}