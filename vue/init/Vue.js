import observe from "../observer/observe";
import {Compile} from "./Compile";
import Watcher from "../observer/Watcher";

export class Vue {
    constructor(options) {
        console.log('vue constructor')
        this.$options = options
        this.$el = this.$options.el;
        this._data = this.$options.data;
        
        observe(this._data)
        this._initData();
        this._initWatcher();
        
        new Compile(this.$el, this);
        
    }
    
    // data下有属性, vm是直接访问不到的, 需要Object.defineProperty()处理一下
    _initData() { // data下有属性
        let self = this;
        Object.keys(self._data).forEach(key => {
            Object.defineProperty(self, key,{
                get() {
                    return self._data[key]; // 根据key从data中获取 value
                },
                set(newValue){
                    self._data[key] = newValue // 更新data中的值, 根据key
                }
            })
        })
    }
    
    _initWatcher() {
        let self = this;
        let watchObj = self.$options.watch;
        Object.keys(watchObj).forEach(key => {
            new Watcher(self, key, watchObj[key])
        })
    }
}














