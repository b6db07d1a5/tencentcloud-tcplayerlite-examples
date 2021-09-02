# v-tcplayer

https://github.com/vonweb/v-tcplayer

A Vue.js 2 component for [TCPlayer Lite](https://cloud.tencent.com/document/product/881/20207)

## Install
### npm / yarn
`npm install --save v-tcplayer` or `yarn add v-tcplayer`

## Introduce
### Global introduction
```js
import VTcPlayer from'v-tcplayer'
Vue.use(VTcPlayer, { name:'V-TcPlayer' })
```

### Partial introduction
```js
import { VTcPlayer } from'v-tcplayer'
```

## use
```html
<div>
  <VTcPlayer ref="tcPlayer" :options="options" @load="onLoad" @play="onPlay" />
  <V-TcPlayer :options="options" elmId="globalTcPlayer" />
</div>
```
```js
export default {
  data () {
    options: {
      hlsUrl:'https://lib.baomitu.com/hls.js/0.8.9/hls.min.js', // 0.0.5 increase
      width: 800,
      height: 450,
      m3u8:'http://1251203672.vod2.myqcloud.com/43464984vodtransgzp1251203672/957853b25285890790261970276/v.f230.m3u8',
    },
  },
  components: {
    VTcPlayer,
  },
  computed: {
    player () {
      // tcPlayer instance
      return this.$refs.tcPlayer.vTcPlayer
    },
  },
  method: {
    play () {
      this.player.play()
    },
    getCurrentTime () {
      this.player.currentTime()
    },
    loadNewVideo (url) {
      this.player.load(url)
    },
  },
}
```
##### Parameter Description
`options` can pass in all the parameters of `TcPlayer`, the event monitoring parameter `listener` is recommended not to pass, and it is bound by way of `@event`.
If there are multiple videos in the page, you need to pass the parameter `elmId`

###### illustrate
Tencent CDN does not know under what circumstances there is a problem with the imported hls file. It will first introduce a shorter js file and then the real hls file, which causes the video to fail to load. 0.0.5 modified the TcPlayer source code and added the hlsUrl option