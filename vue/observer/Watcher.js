import Dep from "./Dep";

let uid = 0

export default class Watcher {
    constructor(target, expression, callback) {
        // console.log('Watcher constructor 构造器 执行了..')
        this.id = uid++;
        this.target = target; // 目标对象
        this.getter = parsePath(expression); //
        this.callback = callback; // 回调方法
        this.originalValue = this.get(); // 获取初始值
    }
    
    update() {
        // console.log('update() 触发更新 方法() .... ')
        const newValue = this.get();
        const oldValue = this.originalValue;
        if(newValue !== oldValue) {
            this.originalValue = newValue;
            this.callback.call(this.target, newValue, oldValue)
        }
        
    }
    
    get() {
        Dep.target = this;
        let val;
        try {
            val = this.getter(this.target)
        } catch (e) {
            console.log(e)
        } finally {
            Dep.target = null;
        }
        
        return val;
    }
}

/**
 * 高阶函数
 * @param expression 表达式 例如 a.b.c
 * @returns {function(*): *}
 */
function parsePath(expression) {
    const segments = expression.split('.'); // 分割为以.为分隔符的字符串数组
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) {
                return;
            }
            obj = obj[segments[i]]
        }
        return obj; // 剥洋葱一样, 从obj 中 找到 a.b.c 这个 c
    };
}






