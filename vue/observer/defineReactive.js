import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(obj, key, val) {
    const dep = new Dep();
    if (arguments.length === 2) {
        val = obj[key];
    }
    let childOb = observe(val); // val可能是一个对象, observe处理一下
    
    Object.defineProperty(obj, key, {
        get() {
            
            // console.log('响应式 getter ')
            // console.log(key)
            // console.log(val)
            // console.log('--------end ---------------')
            
            dep.depend();
            if (childOb) {
                childOb.dep.depend();
            }
            
            
            return val;
        },
        set(newValue) {
            // console.log('响应式 setter ')
            // console.log(key)
            // console.log(val)
            // console.log('--------end ---------------')
            
            // if (newValue === val) {
            //     return; // 新值 和 旧值 一样, 什么都不做.
            // }
            
            val = newValue;
            childOb = observe(val); // val可能是一个对象, observe处理一下
            
            dep.notify();
        }
    })
}

export function set(obj, key, val = 0) {
    if (arguments.length < 2) {
        return; // 如果参数个数为1 或者 为0 , 那么直接返回 不做任何处理.
    }
    // console.log(`setset --- val ${val}`)
    
    // 假设obj已经有__ob__属性.
    const ob = obj.__ob__;
    defineReactive(obj, key, val); // 响应式 处理每一个key - value
    ob.dep.notify(); // 通知依赖, 视图[页面]更新
    // 更新成功.
}


















