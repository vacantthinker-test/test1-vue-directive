import Watcher from "../observer/Watcher";

export class Compile {
    constructor(el, vue) {
        this.$vue = vue; // 挂载vue实例
        this.$el = document.querySelector(el); // 通过DOM查询拿到元素
        if (this.$el) {
            // 思路还是拦截处理,
            // 从el中移动出来, 处理好了, 再移动回去
            let $fragment = this.node2fragment(this.$el);
            this.compile($fragment); // 编译处理fragment
            this.$el.appendChild($fragment); // 添加处理好的fragment至DOM树
        }
    }
    
    node2fragment(el) {
        // let self = this;
        let fragment = document.createDocumentFragment(); // 创建一个空的 虚拟的 DOM节点
        let child;
        while ((child = el.firstChild)) {
            fragment.appendChild(child); // 每次从el中移动一个child
        }
        
        return fragment;
    }
    
    compile(el) {
        let self = this;
        // debug 查看一下el有什么
        let childNodes = el.childNodes; // 数组可直接操作的数组
        // console.log(el)
        let regexEmpty = /^\s+$/;
        childNodes.forEach(node => {
            // childNodes 把连续空字符串也看做一个节点, 碰到就return 不做处理
            if (regexEmpty.test(node.textContent)) {
                // console.log(true)
                return
            }
            if (node.nodeType === 1) {
                self.compileElement(node);
            }
            if (node.nodeType === 3) {
                self.compileText(node)
            }
            if (node.childNodes.length > 0) {
                self.compile(node);
            }
            
            
        })
    }
    
    compileElement(node) {
        let self = this;
        let vTagDir = 'v-';
        let attributes = node.attributes;
        // console.log(attributes, node.tagName.toLowerCase())
        [].slice.call(attributes).forEach(attr => {
            let attrName = attr.name;
            let expression = attr.value; // v-指令的 --> 值
            
            let indexOfV = attrName.indexOf(vTagDir);
            if (indexOfV !== -1) {
                // console.log(`attrName ${attrName}`)
                // console.log(`expression ${expression}`)
                let dir = attrName.replace(vTagDir, '');
                // console.log(`dir ${dir}`) // 获取指令
                
                switch (dir) {
                    case 'model':
                        self.compileDirectiveModel(node, expression);
                        break
                    case 'for':
                        
                        break
                    case 'if':
                        
                        break
                }
            }
            
        })
    }
    
    compileDirectiveModel(node, expression) {
        let self = this;
        
        console.log('model 指令 存在');
        // 1 更新input输入框的值 初始值
        node.value = self.getVueValue(self.$vue, expression);
        // 2 监听表达式
        new Watcher(self.$vue, expression, value => {
            // console.log(`watch value: ${value}`)
            node.value = value;
        })
        // 3 input 事件监听
        node.addEventListener('input', e => {
            let newValue = e.target.value;
            // console.log(`newValue: ${newValue}`)
            // 更新vue实例属性值
            self.setVueValue(self.$vue, expression, newValue);
            
        })
    }
    
    /**
     * 处理{{a.b.c}} 变为obj对象中的属性值
     * @param node
     */
    compileText(node) { // 处理 {{}}
        let self = this;
        let regexMustache = /(.*)\{\{(.*)\}\}/
        let textContent = node.textContent;
        if (regexMustache.test(textContent)) {
            // console.log('{{}}存在', textContent)
            let match = textContent.match(regexMustache);
            // console.log(match)
            let textBeforeExp = match[1]; // 表达式之前的文本
            let expression = match[2]; // 表达式 b.m
            // 根据表达式获取对象中的值
            let originalValue = self.getVueValue(self.$vue, expression);
            // console.log(`${originalValue}`)
            // 拿到值, 然后更新节点textContent
            node.textContent = textBeforeExp + originalValue;
            // 双向绑定 1 {{a}} 2 v-model="a"
            new Watcher(self.$vue, expression, value => {
                node.textContent = textBeforeExp + value;
            })
            
        }
        
    }
    
    /**
     * 从vue实例中获取值, 根据expression表达式
     * @param vue
     * @param expression
     * @returns {*}
     */
    getVueValue(vue, expression) {
        let obj = vue;
        let keys = expression.split('.');
        keys.forEach(key => {
            obj = obj[key]
        })
        
        return obj;
    }
    
    /**
     * 更新vue实例中的属性值, 根据expression表达式
     * @param vue
     * @param expression 当前 b.m
     * @param newValue
     */
    setVueValue(vue, expression, newValue) {
        let obj = vue;
        let keys = expression.split('.'); // keys [b, m]
        let length = keys.length;
        // i = 0, key=a, obj = obj[key];
        //      obj = obj.b; obj -> { m : m的值 }
        
        // i = 1, key=m, obj[key] = newValue;
        //      obj.m = newValue -> { m: newValue }
        // finished.
        
        keys.forEach((key, i) => {
            
            if (i < length - 1) {
                obj = obj[key]
            } else {
                obj[key] = newValue;
            }
        })
    }
    
}









