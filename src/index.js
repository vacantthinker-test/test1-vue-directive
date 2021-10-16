import {Vue} from "vue";

document.getElementById('app').innerHTML = `
<div>
<!--  <div>-->
<!--    <span>{{a}}</span>-->
<!--  </div>-->
  <h3>h3 title {{b.m}}</h3>
  <input type="text" v-model="b.m">
  <br>
  
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>

  </ul>
</div>
`

const vm = new Vue({
    el: '#app',
    data:{
        a: 10,
        b: {
            m: 100
        }
    },
    watch: {
        a(){
            console.log('<<<<<<<<<<<<<<')
            console.log('a 更新了')
        },
        b(){
            console.log('<<<<<<<<<<<<<<')
            console.log('b 更新了')
        },
    }
})
window.vm = vm;
















