import Vue from 'vue'
import Demo from './demo.vue'
import VTcPlayer from 'v-tcplayer'

Vue.use(VTcPlayer, { name: 'V-TcPlayer' })

new Vue({
  render: h => h(Demo),
}).$mount('#app')
