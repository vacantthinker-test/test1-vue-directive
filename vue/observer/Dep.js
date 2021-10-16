let uid = 0
export default class Dep {
    static target;
    
    constructor() {
        // console.log('Dep constructor 构造器 调用了.')
        this.id = uid++;
        this.subs = [] // 存放Watcher实例
    }
    
    addSub(sub) {
        this.subs.push(sub)
    }
    
    depend() {
        if (Dep.target && !this.subs.includes(Dep.target)) {
            this.addSub(Dep.target)
        }
    }
    
    notify() {
        const copy = this.subs.slice();
        for (let i = 0; i < copy.length; i++) {
            copy[i].update()
        }
    }
}












