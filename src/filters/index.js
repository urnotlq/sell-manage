/* 全局过滤器 */

// 日期格式化 年/月/日
export const formatDateYMD = (data) => {
    let time = new Date(data); // 获取时间
    let Y = time.getFullYear(); // 年
    let M = time.getMonth() + 1; // 月
    let D = time.getDate(); //日
    // 处理显示格式
    return [Y, M, D].map(v => String(v).padStart(2, '0')).join('/');
}

// 日期时间格式化 年/月/日 时:分:秒
export const formatDateYMDhms = (data) => {
    let time = new Date(data); // 获取时间
    let Y = time.getFullYear(); // 年
    let M = time.getMonth() + 1; // 月
    let D = time.getDate(); //日
    let h = time.getHours(); //时
    let min = time.getMinutes(); //分
    let s = time.getSeconds(); //秒
    // 处理显示格式
    return [Y, M, D].map(v => String(v).padStart(2, '0')).join('/') + ' ' + [h, min, s].map(v => String(v).padStart(2, '0')).join(':');
}

// 时间格式化 时:分:秒
export const formatDateHMS = (data) => {
    let time = new Date(data); // 获取时间
    let H = time.getHours(); //时
    let M = time.getMinutes(); //分
    let S = time.getSeconds(); //秒
    // 处理显示格式
    return [H, M, S].map(v => String(v).padStart(2, '0')).join(':');
}

// 数值格式化 100,000,000
export const formatNumber = (num) => {
    return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}