# vue2 v-model 双向绑定 手写代码

---

### 流程如下

 - node2fragment() 思路还是拦截再处理
   - 每次移动一个child, document.createDocumentFragment() 虚拟的

 - class Vue()
   - constructor
     - observe(data)
     - initData()
     - initWatcher()
     - new Compile()

 - class Compile()
   - constructor ()
     - fragment = node2fragment()
     - compile(fragment)
     - this.el.addChild(fragment)
   - compile() 
       - nodeType === 1
           - 节点类型为标签非文本节点
           - 处理节点attribute, 有没有 v-指令
       - nodeType === 3
           - 节点类型为文本节点
           - 处理节点, 有没有 {{}}
       - node.childNodes.length > 0
         - compile(); // 递归处理
   - compileElement()
     - 获取 v-指令
       - model
         - 1 更新初始值
         - 2 监听表达式
         - 3 input事件监听
   - compileText()
     - 获取初始值
     - 监听初始值, 触发更新

---

end finished.










