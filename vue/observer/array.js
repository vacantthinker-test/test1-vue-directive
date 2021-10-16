import {def} from "./utils";

const arrayPrototype = Array.prototype;
const arrayMethods = Object.create(arrayPrototype);
const methodsNeedChange = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse']
methodsNeedChange.forEach(method => {
    const originalMethod = arrayPrototype[method]
    def(arrayMethods, method, function (...args) {
        const result = originalMethod.call(this, ...args)
        const ob = this.__ob__;
        // console.log('响应式 数组 执行了')
        let inserted = []
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2)
                break
        }
        
        if (inserted.length > 0) {
            ob.observeArray(inserted)
        }
        ob.dep.notify();
        
        return result;
    }, false)
})

export default function defineArray(arr) {
    Object.setPrototypeOf(arr, arrayMethods)
}