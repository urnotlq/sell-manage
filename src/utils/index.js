/* 工具函数 */

// 校验用户名
export const checkAccount = (rule, value, callback) => {
    if (!value) {
        // 非空校验失败
        callback(new Error('请输入用户名！'));
    } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]{3,12}$/.test(value)) { // 正则校验
        callback(new Error('用户名3至12位 (中文,字母,数字,下划线)')); // 未通过
    } else {
        callback(); // 通过
    }
};

// 校验密码
// 密码正则 /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/ 密码8至16位，由字母、数字组成
export const checkPassword = (rule, value, callback) => {
    if (!value) {
        // 非空校验失败
        callback(new Error('请输入密码！'));
    } else if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
        // 正则校验失败
        callback(new Error('密码6至16位'));
    } else {
        // 校验成功
        callback();
    }
};

// 日期格式化 年/月/日
// export const formatDateYMD = (data) => {
//     let time = new Date(data); // 获取时间
//     let Y = time.getFullYear(); // 年
//     let M = time.getMonth() + 1; // 月
//     let D = time.getDate(); //日
//     // 处理显示格式
//     return [Y, M, D].map(v => String(v).padStart(2, '0')).join('/');
// }