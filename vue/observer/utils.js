/**
 * 定义一个key 是否可以被枚举, 根据传入的 enumerable
 * @param obj
 * @param key
 * @param val
 * @param enumerable 默认值 true
 */
export function def(obj, key, val, enumerable = true) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: enumerable,
        configurable: true,
        writable: true,
    })
}