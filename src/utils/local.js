/* 封装localStorage */
export default {
    // 增
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    // 查
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    // 删
    remove(key) {
        localStorage.removeItem(key);
    },
    // 清空
    clear() {
        localStorage.clear();
    },
}