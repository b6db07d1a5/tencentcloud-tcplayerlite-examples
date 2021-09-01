This document will introduce the Web Super Player (TCPlayerLite) suitable for live broadcast.

## Features
Tencent Cloud Web Super Player TCPlayerLite is to solve the problem of playing audio and video streams on mobile browsers and PC browsers. It enables your video content to be available on social platforms such as Moments of Friends and Weibo without relying on users to install apps. To spread. This document is suitable for developers who have a certain Javascript language foundation to read.
The following video will explain to you the features and docking strategy of the web player of Tencent Cloud View Cube SDK:

<div class="doc-video-mod"><iframe src=" https://cloud.tencent.com/edu/learning/quick-play/2496-42186?source=gw.doc.media&withPoster=1&notip=1 "></iframe></div>

## Protocol support
The video playback capability of the Web Super Player itself is not realized by the web code, but is supported by the browser, so its compatibility is not as good as we think. Therefore, **not all mobile browsers can meet expectations Performance**. Generally, the video source address used for web live streaming is the address ending in M3U8. We call it HLS (HTTP Live Streaming). This is a standard introduced by Apple. At present, various mobile browser products have the most compatibility with this format. Good, but it has a problem: the delay is relatively large, usually about 20s-30s.

For the PC browser, because it has not abandoned the Flash control yet, and the Flash control supports more video source formats, and the Flash control on the browser is developed by Adobe itself, the compatibility is very good.

<table>
<tr><th style="text-align:center">Video protocol</th><th>Purpose</th><th>URL address format</th><th>PC browser</th>< th>Mobile browser</th>
</tr><tr>
<td style="text-align:center">WebRTC</td>
<td>Live broadcast</td>
<td><code>webrtc://xxx.liveplay.myqcloud.com/live/xxx</code></td>
<td>Support</td>
<td>Support</td>
</tr><tr>
<td rowspan=2 style="text-align:center">HLS<br>(M3U8)</td>
<td>Live broadcast</td>
<td><code>http://xxx.liveplay.myqcloud.com/xxx.m3u8</code></td>
<td>Support</td>
<td>Support</td>
</tr><tr>
<td>On demand</td>
<td><code>http://xxx.vod.myqcloud.com/xxx.m3u8</code></td>
<td>Support</td>
<td>Support</td>
</tr><tr>
<td rowspan=2 style="text-align:center">FLV</td>
<td>Live broadcast</td>
<td><code>http://xxx.liveplay.myqcloud.com/xxx.flv</code></td>
<td>Support</td>
<td>Not supported</td>
</tr><tr>
<td>On demand</td>
<td><code>http://xxx.vod.myqcloud.com/xxx.flv</code></td>
<td>Support</td>
<td>Not supported</td>
</tr><tr>
<td style="text-align:center">RTMP</td>
<td>Live broadcast</td>
<td><code>rtmp://xxx.liveplay.myqcloud.com/live/xxx</code></td>
<td>Support</td>
<td>Not supported</td>
</tr></table>

>!
>-To play RTMP format video, Flash must be enabled. Currently, Flash is disabled by default in the browser and needs to be manually enabled by the user.
>-In a browser environment that does not support WebRTC, the WebRTC address passed in to the player will automatically undergo protocol conversion to better support media playback. By default, it will be converted to HLS on the mobile side and FLV on the PC side.

**Feature Support**

|Function\Browser|Chrome|Firefox|Edge|QQ Browser|Mac Safari|iOS Safari|iOS WeChat QQ|Android Chrome|Android WeChat, QQ|Mobile QQ Browser|IE 8,9,10,11|
|---|---|---|---|---|---|---|---|---|---|---|---|
|Set Cover|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|& #10003;|&#10003;|
|Multi-definition support|&#10003;|&#10003;|&#10003;|&#10003;|×|×|×|×|×|×|&#10003;|
|Customized error message|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|×|×|×|×|×|&#10003;|
|Quick Live|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|&#10003;|& #10003;|×|

## Docking strategy

### Step1. Page preparation
Introduce the initialization script in the page (PC or H5) where the video needs to be played.
```
<script src="https://web.sdk.qcloud.com/player/tcplayerlite/release/v2.4.1/TcPlayer-2.4.1.js" charset="utf-8"></script>;
```

It is recommended to deploy resources by yourself when using Tencent Cloud View Cube Player UGSV SDK, click [Download Player Resources](https://web.sdk.qcloud.com/player/tcplayerlite/release/v2.4.1/TcPlayer- 2.4.1.zip).

If your deployed address is `aaa.xxx.ccc`, import the player script file in the appropriate place:
```
<script src="aaa.xxx.ccc/TcPlayer-2.4.1.js"></script>
```

>! Direct use of the local web page cannot be debugged, and the web player cannot handle the cross-domain problem in this case.

### Step2. Place the container in the HTML

Add the player container to the page where the player needs to be displayed, that is, put a div and name it, such as `id_test_video`, and the video will be rendered in the container. For the size control of the container, you can use the div attribute to control, the sample code is as follows:

```
<div id="id_test_video" style="width:100%; height:auto;"></div>
```

### Step3. Docking video playback
Write Javascript code, the function is to go to the specified URL address to pull the audio and video stream, and present the video picture into the added container.

#### 3.1 Simple Play
The following is a [URL address of the live broadcast format](https://cloud.tencent.com/document/product/267/32733), using the HLS (M3U8) protocol, if the host is in the live broadcast, use a player such as VLC You can directly open the URL to watch:

```
http://2157.liveplay.myqcloud.com/2157_358535a.m3u8 // m3u8 playback address
```
![](https://main.qcloudimg.com/raw/f5444cbd256ace4033e37bb1206bc90d.png)

If you want to play the video of this URL on the mobile browser, the Javascript code is as follows:
<dx-codeblock>
::: javascript javascript
var player = new TcPlayer('id_test_video', {
"m3u8": "http://2157.liveplay.myqcloud.com/2157_358535a.m3u8", //Please replace with the actual available playback address
"autoplay": true, //The safari browser under iOS and most mobile browsers do not open the ability to automatically play videos
"poster": "http://www.test.com/myimage.jpg",
"width": '480',//The display width of the video, please try to use the video resolution width
"height": '320'//The display height of the video, please try to use the video resolution height
});
:::
</dx-codeblock>

This code can support playing HLS (M3U8) protocol live video on PC and mobile browsers. Although the HLS (M3U8) protocol has good video compatibility, some Android phones still do not support it. The delay is high, about 20 seconds. The above delay.

#### 3.2 Achieve lower latency
The PC browser supports Flash, and the Javascript code is as follows:
<dx-codeblock>
::: javascript javascript
var player = new TcPlayer('id_test_video', {
"m3u8": "http://2157.liveplay.myqcloud.com/2157_358535a.m3u8",
"flv": "http://2157.liveplay.myqcloud.com/live/2157_358535a.flv", //Add a flv playback address for PC platform playback, please replace it with the actual available playback address
"autoplay": true, //The safari browser under iOS and most mobile browsers do not allow the ability to automatically play videos
"poster": "http://www.test.com/myimage.jpg",
"width": '480',//The display width of the video, please try to use the video resolution width
"height": '320'//The display height of the video, please try to use the video resolution height
});
:::
</dx-codeblock>

The FLV playback address is added to this code. If the Web player finds that the current browser is a PC browser, it will actively select the FLV link to achieve lower latency. If you have higher requirements for latency, you can use WebRTC to pull the streaming address. A WebRTC-based playback system can achieve ultra-low latency (500ms). The prerequisite is that all the streaming addresses can be streamed. If you use Tencent Cloud's video There is no need to consider live broadcast services, because Tencent Cloud’s live broadcast channels support WebRTC, FLV, RTMP and HLS (M3U8) broadcast protocols by default.

#### 3.3 Solve the problem of not being able to play
If you find that the video cannot be played, there may be the following reasons:
-**Reason 1: There is a problem with the video source**
If it is a live streaming URL, you need to check whether the host has stopped streaming, and you can use a floating window to remind the audience: "The host has left". Please refer to [Live Streaming](https://cloud.tencent.com/document/product/267/32732).
If it is an on-demand URL, you need to check whether the file to be played still exists on the server (for example, whether the playing address has been removed from the on-demand system).
-**Reason 2: Local webpage debugging**
Currently TCPlayerLite does not support local webpage debugging (that is, webpages that open video playback through the `file://` protocol). Because the browser has cross-domain security restrictions, it cannot be played when a test.html file is placed on the Windows system for testing. Yes, it needs to be uploaded to the server for testing. The front-end engineer can use the reverse proxy method to locally proxy online pages to achieve local debugging. This is the mainstream local debugging method.

-**Reason Three: Mobile Phone Compatibility Issue**
Ordinary mobile browsers only support the playback of the HLS (M3U8) protocol, and do not support the FLV and RTMP protocols. The latest version of the QQ browser supports the playback of the FLV protocol.

-**Reason 4: Cross-domain security issues**
PC browser video playback is implemented based on Flash control, but **Flash control will do cross-domain access check**. If the server where the video is played is not deployed with a cross-domain policy, problems will occur.
Solution: Add a cross-domain configuration file `crossdomain.xml` under the root domain name of the video storage server, and configure the domain name where Flash swf is located to allow Flash and JavaScript to play videos across domains.
The player's Flash swf file is stored in the `imgcache.qq.com` domain name by default. If you need to deploy to your own server, you can download and deploy it yourself: [swf file address](https://imgcache.qq.com/ open/qcloud/video/player/release/QCPlayer.swf).
If it is in a domain restricted area, the required player's Flash swf file is stored in the `cloudcache.tencent-cloud.com` domain name by default, and the flashUrl is passed when the player is initialized.
```xml
<cross-domain-policy>
  <allow-access-from domain="*.*.com" secure="false"/>
</cross-domain-policy>
```

### Step4. Set cover for the player
Setting the cover involves the poster attribute. The usage of the poster attribute will be described in detail below.
>! The cover function may not work in some mobile playback environments, usually caused by the mobile webview hijacking the video playback, and the webview needs to support the video overlay element or let go of the hijacking video playback. For detailed instructions, please refer to [FAQ](https://cloud.tencent.com/document/product/1449/58949#que1).

#### 4.1 Simple setting of cover
poster supports the incoming picture address as the cover of the player, centered in the player area, and displayed at the actual resolution of the picture.

```
"poster": "http://www.test.com/myimage.jpg"
```
#### 4.2 Set cover style
Poster supports passing in an object, in which you can set the display style (style) and image address (src) of the cover.

The styles supported by style are as follows:
-default: centered and displayed at the actual resolution of the picture.
-stretch: stretch to cover the player area, the picture may be deformed.
-cover: Prioritize horizontal and proportional stretching to fill the player area. Some parts of the picture may not be displayed in the area.

```
"poster": {"style":"stretch", "src":"http://www.test.com/myimage.jpg"}
```
#### 4.3 Realizing Use Cases

Use cover to display the cover. The online example is as follows, right-click [View Page Source] in the PC browser to view the code implementation of the page:
[Video Cover](https://web.sdk.qcloud.com/player/tcplayerlite/tcplayer-poster.html)
>!
>- Setting the cover page on some mobile terminals will be invalid. For details, please refer to [FAQ](https://cloud.tencent.com/document/product/1449/58949#que1).
>- The above example link is only for document demonstration, please do not use it in a production environment.

### Step5. Multi-definition support
#### 5.1 Principle Introduction
Like Tencent Video, the web player supports multi-definition, as shown in the figure below:
![](https://main.qcloudimg.com/raw/281af6b6d9b75969eed7004722b27c9b.png)
**The player itself does not have the ability to change the definition of the video**. The video source has only one definition, which is called the original picture. The original picture video has a variety of encoding and packaging formats, and the Web terminal cannot support playing all the videos. Formats, such as on-demand support for video encoding with H.264 and MP4 and FLV as encapsulation formats.

**The realization of multi-definition depends on the video cloud**:
-For live broadcast, the original video from the host will be transcoded in Tencent Cloud in real time, and multiple channels of transcoded videos will be separated. Each channel of video has its corresponding address, such as "HD-HD" and "SD-SD" , The address format is as follows:
```
http://2157.liveplay.myqcloud.com/2157_358535a.m3u8 // Original painting
http://2157.liveplay.myqcloud.com/2157_358535a_900.m3u8 // HD
http://2157.liveplay.myqcloud.com/2157_358535a_550.m3u8 // SD
```

-For on-demand, after uploading a video file to Tencent Cloud, you can transcode the video file to generate videos with several other definitions, such as "HD-HD" and "SD-SD". The address format is as follows:
```
http://200002949.vod.myqcloud.com/200002949_b6ffc.f240.m3u8 // Original painting, replace with super clear after transcoding
http://200002949.vod.myqcloud.com/200002949_b6ffc.f230.av.m3u8 // HD
http://200002949.vod.myqcloud.com/200002949_b6ffc.f220.av.m3u8 // SD
```
>! The uploaded original video is not transcoded by Tencent Cloud and cannot be used directly for playback.

#### 5.2 Code Implementation
The code implementation of multi-definition support is as follows:
<dx-codeblock>
::: javascript javascript
var player = new TcPlayer('id_test_video', {
"m3u8": "http://200002949.vod.myqcloud.com/200002949_b6ffc.f240.m3u8",//Please replace with the actual available playback address
"m3u8_hd": "http://200002949.vod.myqcloud.com/200002949_b6ffc.f230.av.m3u8",
"m3u8_sd": "http://200002949.vod.myqcloud.com/200002949_b6ffc.f220.av.m3u8",
"autoplay": true, //The safari browser under iOS and most mobile browsers do not allow the ability to automatically play videos
"poster": "http://www.test.com/myimage.jpg",
});
:::
</dx-codeblock>

#### 5.3 Realizing the use case
Use multiple resolution settings and switching functions. The online example is as follows. Right-click [View Page Source] in the PC browser to view the code implementation of the page, please refer to [Resolution Switching](https://web.sdk.qcloud.com/player/tcplayerlite/ tcplayer-clarity.html).
Under normal circumstances, you will see the following effects:
![](https://main.qcloudimg.com/raw/99c05e75f0d417df33942d18dad2f509.jpg)
>!
>-The PC terminal now supports multiple definition playback and switching functions, but the mobile terminal does not yet support it.
>- The above example link is only for document demonstration, please do not use it in a production environment.

### Step6. Customize the error message
The web player supports prompt customization.

#### 6.1 Code Implementation
The following is the core code for the player to support custom prompts, and the prompts are mainly set on the wording property.
<dx-codeblock>
::: javascript javascript
var player = new TcPlayer('id_test_video', {
"m3u8": "http://200002949.vod.myqcloud.com/200002949_b6ffc.f0.m3u8",//Please replace with the actual available playback address
"autoplay": true, // safari browser does not open this capability under iOS
"poster": "http://www.test.com/myimage.jpg",
"wording": {
2032: "Failed to request video, please check the network",
2048: "Failed to request the m3u8 file, it may be a network error or a cross-domain problem"
}
});
:::
</dx-codeblock>

#### 6.2 Realization of use cases
The video playback failed, and the function of custom prompt copy was used at the same time. The online example is as follows, right-click [View Page Source] in the PC browser to view the code implementation of the page:

```
https://web.sdk.qcloud.com/player/tcplayerlite/tcplayer-error.html
```
>! The above example link is only for document demonstration, please do not use it in a production environment.

#### 6.3 Error code table
| Code | Prompt | Description |
|-------|-----------|----------------------------- ----------|
| 1 | Network error, please check the network configuration or playback link is correct. | H5 indicates the error. |
| 2 | Network error, please check the network configuration or playback link is correct. | Video format Web player cannot decode. <br>H5 prompt error. |
| 3 | Video decoding error. | H5 indicates the error. |
| 4 | The current system environment does not support playing this video format. | H5 indicates the error. |
| 5 | The current system environment does not support playing this video format. | The player judges that the current browser environment does not support playing the incoming video. It may be that the current browser does not support MSE or the Flash plug-in is not enabled. |
| 10 | Do not use the player under the file protocol, it may cause the video to fail to play. |-|
| 11 | There are errors in using parameters, please check the player calling code. |-|
| 12 | Please fill in the video playback address. |-|
| 13 | The live broadcast has ended, please come back later. | Event triggered during normal RTMP playback (NetConnection.Connect.Closed). <br>Error prompted by Flash. |
| 1001 | Network error, please check whether the network configuration or playback link is correct. | The network is disconnected (NetConnection.Connect.Closed). <br>Error prompted by Flash. |
| 1002 | Failed to get the video, please check if the playback link is valid. | Failed to pull the play file (NetStream.Play.StreamNotFound), it may be a server error or the video file does not exist. <br>Error prompted by Flash. |
| 2001 | Failed to call WebRTC interface | Failed to set sdp when playing WebRTC |
| 2002 | Failed to call the streaming interface | Error prompting when calling the streaming interface failed when playing WebRTC |
| 2003 | Failed to connect to the server, and the number of connection retries has exceeded the set value | The error prompted when playing WebRTC, which can be used to determine whether it is in the stop streaming state |
| 2032 | Failed to get the video, please check if the playback link is valid. | Error prompted by Flash. |
| 2048 | Unable to load the video file, cross-domain access is denied. | Failed to request the M3U8 file, it may be a network error or a cross-domain problem. <br>Error prompted by Flash. |

>?
>- Code 1-4 correspond to H5 native events.
>- Due to the black box feature of Flash and the uncertainty of the H5 video playback standard, the error message will be updated from time to time.

## Source code reference
The following is an online sample code. Right-click [View Page Source] in the PC browser to view the code implementation of the page, please refer to [Play Example](https://web.sdk.qcloud.com/player/ tcplayerlite/tcplayer.html).
>! The above example link is only for document demonstration, please do not use it in a production environment.

## parameter list
All the parameters supported by the player are as follows:

| Parameter | Type | Default Value | Parameter Description
|-----------------|--------- |--------  |-------------------------------------------- |
| webrtc | String | None | Original painting WebRTC playback URL. <br> Example: `webrtc://5664.liveplay.myqcloud.com/live/5664_harchar1` |
| webrtc_hd | String | None | HD WebRTC playback URL. <br> Example: `webrtc://5664.liveplay.myqcloud.com/live/5664_harchar1_hd` |
| webrtc_sd | String | None | SD WebRTC playback URL. <br> Example: `webrtc://5664.liveplay.myqcloud.com/live/5664_harchar1_sd` |
| m3u8 | String | None | Original M3U8 playback URL. <br> Example: `http://2157.liveplay.myqcloud.com/2157_358535a.m3u8` |
| m3u8_hd | String | None | HD M3U8 playback URL. <br> Example: `http://2157.liveplay.myqcloud.com/2157_358535ahd.m3u8` |
| m3u8_sd | String | None | SD M3U8 playback URL. <br> Example: `http://2157.liveplay.myqcloud.com/2157_358535asd.m3u8` |
| flv | String | None | Original FLV playback URL. <br> Example: `http://2157.liveplay.myqcloud.com/2157_358535a.flv` |
| flv_hd | String | None | HD FLV playback URL. <br> Example: `http://2157.liveplay.myqcloud.com/2157_358535ahd.flv` |
| flv_sd | String | None | SD FLV playback URL. <br> Example: `http://2157.liveplay.myqcloud.com/2157_358535asd.flv` |
| mp4 | String | None | Original picture MP4 playback URL. <br> Example: `http://200002949.vod.myqcloud.com/200002949_b6ffc.f0.mp4` |
| mp4_hd | String | None | HD MP4 playback URL. <br> Example: `http://200002949.vod.myqcloud.com/200002949_b6ffc.f40.mp4`|
| mp4_sd | String | None | SD MP4 playback URL. <br> Example: `http://200002949.vod.myqcloud.com/200002949_b6ffc.f20.mp4`|
| rtmp | String | None | Original RTMP playback URL. <br> Example: `rtmp://2157.liveplay.myqcloud.com/live/2157_280d88`|
| rtmp_hd | String | None | HD RTMP playback URL. <br> Example: `rtmp://2157.liveplay.myqcloud.com/live/2157_280d88hd`|
| rtmp_sd | String | None | SD RTMP playback URL. <br> Example: `rtmp://2157.liveplay.myqcloud.com/live/2157_280d88sd`|
| width | Number | None | **Required**, set the width of the player in pixels. <br> Example: 640 |
| height | Number | None | **Required**, set the height of the player in pixels. <br> Example: 480 |
| volume | Number | 0.5 | Set the initial volume, range: 0 to 1 [v2.2.0+]. <br> Example: 0.6 |
| live | Boolean | false | **Required**, set whether the video is a live broadcast type, determine whether to render the timeline and other controls, and distinguish the processing logic of the live broadcast. <br> Example: true |
| autoplay | Boolean | false | Whether to play automatically. <br>(**Note: This option is only effective for most PC platforms**) <br> Example: true |
| poster | String / Object| None | Preview cover, you can pass in a picture address or an object containing the picture address src and display style style. <br>style optional attributes: <br><li/>default centered 1:1 display. <br><li/>stretch stretches to fill the player area, the picture may be distorted. <br><li/>cover Prioritize horizontal and proportional stretching to fill the player area. Some parts of the picture may not be displayed in the area. <br> Example: "`http://www.test.com/myimage.jpg`" or <br>{"style": "cover", "src": `http://www.test.com/ myimage.jpg`} [v2.3.0+]|
| controls | String |"default" | default Displays the default controls, none does not display the controls, and the system mobile terminal displays the system controls. <br> (Note: If you need to use the system full screen on the mobile terminal, you need to set it to system. The default full screen solution is to use Fullscreen API + pseudo full screen, [online example](https://web.sdk.qcloud.com /player/tcplayerlite/tcplayer-consoles.html)) <br> Example: "system"|
| systemFullscreen| Boolean |false | After opening, in a browser environment that does not support the Fullscreen API, try to use the webkitEnterFullScreen method provided by the browser to perform full screen. If it supports, it will enter the system full screen, and the control is system control. <br> Example: true |
| flash | Boolean | true | Whether to give priority to using Flash to play video. <br>(**Note: This option is only valid for PC platform**[v2.2.0+]) <br> Example: true |
| flashUrl | String | None | Flash swf url can be set. <br>(**Note: This option is only valid for PC platform** [v2.2.1+]) |
| h5_flv | Boolean | false | Whether to enable flv.js to play flv. When enabled, the player will use flv.js to play flv in a browser that supports MSE. However, not all browsers that support MSE can use flv.js, so the player will not enable this attribute by default, [v2.2.0 +]. <br> Example: true |
| x5_player | Boolean | false | Whether to enable TBS playback flv or hls. When enabled, the player will be in TBS mode (such as Android WeChat, QQ browser), and the flv or hls playback address will be directly assigned to `<video>` to play. [TBS Video Capability](https://x5.tencent.com/tbs/product/video.html) [v2.2.0+]. <br> Example: true |
| x5_type | String | None | Use the video attribute "x5-video-player-type" to declare that the same layer of H5 player is enabled. Supported value: h5-page (this attribute is an experimental attribute of the TBS kernel, not supported by non-TBS kernels) , [TBS H5 Same Layer Player Access Specification](https://x5.tencent.com/docs/video.html). <br> Example: "h5-page" |
| x5_fullscreen | String | No support) . <br> Example: "true" |
| x5_orientation | Number | None | Declare the direction supported by the TBS player through the video attribute "x5-video-orientation", optional values: 0 (landscape horizontal screen), 1: (portraint vertical screen), 2: (landscape &verbar; portrait automatically rotates with the phone). (This attribute is an experimental attribute of the TBS kernel, not supported by non-TBS kernels) [v2.2.0+]. <br> Example: 0 |
| wording | Object | None | Custom copywriting. <br> Example: {2032:'Failed to request video, please check the network'} |
| clarity | String |'od' | Default playback clarity [v2.2.1+]. <br> Example: clarity:'od' |
| clarityLabel | Object | {od:'super clear', hd:'high definition', sd:'standard definition'} | Custom definition copywriting [v2.2.1+]. <br> Example: clarityLabel: {od:'Blu-ray', hd:'High Definition', sd:'Standard Definition'}. |
| listener | Function | None | Event listener callback function, the callback function will pass in an object in JSON format. <br> Example: function(msg){<br>//Event processing <br>} |
| pausePosterEnabled| Boolean | true | Show cover page during pause [v2.3.0+]. |
| preload | String |'auto' | Configure the preload attribute of the video tag, which only works in some browsers [v2.3.0+]. |
| hlsConfig | Object | None | hls.js initialization configuration item [v2.3.0+]. |
| flvConfig | Object | None | flv.js initialization configuration item [v2.3.1+]. |
| webrtcConfig | Object | None | webrtc initialization configuration item [v2.4.1+]. <br>Support to specify the pull stream type through streamType, the default is to pull audio and video, you can choose to pull video or audio separately, streamType optional attribute: <li/>auto: pull video stream and audio stream<li/ > video: pull only the video stream<li/> audio: pull only the audio stream<br> Example: `webrtcConfig: {streamType:'video' }`|

>!
>- WebRTC fast live broadcast address supports two formats, in addition to `webrtc://domain/AppName/StreamName?txSecret=XXX&txTime=XXX`, it also supports `http://domain/AppName/StreamName.sdp?txSecret=XXX&txTime =XXX` format playback address, but need to configure the playback domain name CNAME to `overseas-webrtc.liveplay.myqcloud.com`.
>- Since the web browser currently does not support the standard WebRTC protocol to carry B-frame playback, if there are B-frames in the original stream, the background will automatically transcode and remove the B-frames, which will introduce additional transcoding delays and incur transcoding costs. It is recommended not to push streams containing B frames as much as possible. The mobile live SDK does not support the introduction of B frames. If the B frame setting is not enabled on Android, the default is not to bring B frames. If you use OBS to push streaming, you can turn off B-frames through settings.

## Instance method list
The methods supported by the player instance are as follows:

| Method | Parameters&nbsp; | Return Value&nbsp; &nbsp; | Description | Example
|-----------------|------------------------|----------------------------- |----------------------------------------|---------------------|
|play() | None | None | Start playing the video. | player.play() |
|pause() | None | None | Pause the video. | player.pause() |
|togglePlay() | None | None | Toggle video playback status. | player.togglePlay() |
|mute(muted) | {Boolean} [Optional] | true,false {Boolean} | Switch the mute state, if no parameter is passed, it will return whether it is currently muted. | player.mute(true) |
|volume(val) | {int} Range: 0 to 1 [Optional] | Range: 0 to 1 | Set the volume, if no parameter is passed, it will return to the current volume. | player.volume(0.3) |
|playing() | None | true,false {Boolean} | Returns whether it is playing. | player.playing() |
|duration() | None | {int} | Get video duration. <br>(**Note: Only applicable to on-demand, you need to trigger the loadedmetadata event to get the video duration**) | player.duration() |
|currentTime(time)| {int} [optional] | {int} | Set the video playback time point. If no parameter is passed, it will return to the current playback time point. <br>(**Note: Only applicable to on-demand broadcasting**) | player.currentTime() |
|fullscreen(enter)| {Boolean} [optional] | true,false {Boolean} | Call the full screen API (Fullscreen API). If the full screen interface is not supported, the pseudo full screen mode is used. If no parameter is passed, the return value is whether the current is full screen. <br>(**Note: The mobile terminal system does not provide API for full screen, nor can it get the system full screen status**) | player.fullscreen(true) |
|buffered() | None | 0 to 1 | Get the percentage of video buffered data. <br>(**Note: Only applicable to on-demand broadcast**) | player.buffered() |
|destroy() | None | None | Destroy the player instance [v2.2.1+]. | player.destroy() |
|switchClarity() | {String}[Required] | None | Switch the resolution, pass the value "od", "hd", "sd" [v2.2.1+]. | player.switchClarity('od') |
|load(url) | {String}[Required] | None | Load the video through the video URL. <br>(**Note: This method can only load the video formats supported in the corresponding playback mode. Flash mode supports switching between RTMP, FLV, HLS and MP4, and H5 mode supports MP4, HLS and FLV (HLS, FLV depends on the browser) Does it support) ** [v2.2.2+]) | player.load(`http://xxx.mp4`) |

>! The above methods must be instantiated objects of `TcPlayer`, and can be called only after the initialization is completed (that is, after the load event is triggered).

## Advanced strategy
The following introduces the advanced usage of Tencent Cloud View Cube SDK in the live broadcast scene.

### ES Module
TCPlayerLite provides ES Module version, module name is `TcPlayer`, download link:
```
https://web.sdk.qcloud.com/player/tcplayerlite/release/v2.4.1/TcPlayer-module-2.4.1.js
```
### Turn on priority H5 playback mode
TCPlayerLite uses a combination of H5 `<video>` and Flash for video playback. According to different playback environments, the player will choose the most suitable playback program by default.

Although browser manufacturers have begun to gradually give up support for Flash plug-ins, there are still a large number of domestic browsers that do not support MSE, and cannot switch to H5 `<video>` mode while playing RTMP while playing FLV and HLS (M3U8) Must use Flash.
Therefore, TCPlayerLite has priority to enable Flash playback mode by default. If it detects that the Flash plug-in is not available, it will use H5`<video>` to play.
>? The reason for the default Flash mode is that Flash supports the widest range of video formats, while H5 `<video>` only supports MP4 (H.264) by default, and only supports HLS (M3U8) and FLV under certain conditions.

**Starting from version 2.2.0, a property that can set the priority of the playback mode is provided**. If you want to use the H5`<video>` playback mode first, you need to set the Flash property to False; if H5`<video> `Unavailable, use Flash to play; if no Flash plug-in is detected, it will prompt "The current system environment does not support playing this video format".

### Monitoring events
TCPlayerLite uses a combination of H5`<video>` and Flash for video playback. Since the events triggered when the two methods are played are not the same, we use H5`<video>` to play Flash. The event has been converted to a certain extent to achieve the unified naming of playback events. `TcPlayer` captures and transparently transmits the native events triggered by these two playback methods.

-[H5 Event Reference List](https://www.w3.org/wiki/HTML/Elements/video#Media_Events)
-[Flash event reference list](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/NetStatusEvent.html)
-[List of unification events](https://www.w3school.com.cn/)
```
error
timeupdate
load
loadedmetadata
loadeddata
progress
fullscreen
play
playing
pause
ended
seeking
seeked
resize
volumechange
webrtcstatupdate
webrtcwaitstart
webrtcwaitend
webrtcstop
```
>!
>- If you perform full screen through the system control bar, you will not be able to monitor the fullscreen event.
>- Web player events are triggered by the built-in decoder and Flash plug-in in the browser. The Web player only transmits events transparently.
>- The web player cannot listen to the event that the live broadcast stops the streaming, and needs to confirm the streaming status through an additional interface, please refer to [query streaming status](https://cloud.tencent.com/document/product/267/ 20470).
-Unique event in Flash mode: netStatus.
> Due to the black box feature of Flash and the inconsistency of the implementation of the H5 video playback standard on various platform terminals, the triggering methods and results of events will be different.

Under the condition of non-autoplay, the event triggered by the mobile terminal and PC Flash is different when the video is loaded to the waiting state.

**Mobile terminal:**

![](https://main.qcloudimg.com/raw/f0bf0532e253c6f14f8c65dc5fd3a5c2.png)

**PC Flash:**

![](https://main.qcloudimg.com/raw/0ff02cdc2ef70b2f8917decddec3cab8.png)

> The above is the difference between the two platforms, but there are also differences between various devices and apps on the mobile terminal.

Introduction to the msg object returned by the event listener function:

| Name | Description |
| ----------- | ----------- |
| type | Event type. |
| src | Event source object, that is, player instance, HTML5 or Flash. |
| ts | The UTC timestamp when the event was triggered. |
| timeStamp | [Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/timeStamp) The time stamp of the instance. |


Application case: through event monitoring, you can reconnect after playback failure, [click to visit](https://web.sdk.qcloud.com/player/tcplayerlite/tcplayer-reconnect.html) online case.

## Case show
Tencent Cloud web live interactive component that combines TCPlayerLite and instant messaging IM. For details, please refer to [Experience Address](https://web.sdk.qcloud.com/component/tweblive/demo/latest/index.html#/).

## Update log
TCPlayerLite is constantly being updated and improved. The following is an introduction to the main version released by TCPlayerLite.

<table>
<tr><th>Date</th><th>Version</th><th>Update content</th>
</tr><tr>
<td>2021.06.25</td>
<td>2.4.1</td>
<td><li>Add the stream address of WebRTC that supports v1 signaling. </li><li>Add webrtcConfig parameters. </li><li>Add WebRTC stalling, stalling end, and streaming end events. </li></td>
</tr><tr>
<td>2021.06.03</td>
<td>2.4.0</td>
<td><li>Add support for the fast live broadcast function. </li><li>Fix other known issues. </li></td>
</tr><tr>
<td>2020.07.01</td>
<td>2.3.3</td>
<td><li>Fixed the issue of abnormal event dispatch when switching full screen in X5 environment. </li><li>When circumventing hls to switch the source, the trigger timing of related events is very slow, which leads to the problem of abnormal cover display. </li></td>
</tr><tr>
<td>2019.08.20</td>
<td>2.3.2</td>
<td><li>Modify the default hls version to 0.12.4. </li><li>Fix other known issues. </li></td>
</tr><tr>
<td>2019.04.26</td>
<td>2.3.1</td>
<td><li>Add fivConfig parameter. </li><li>Flv.1.5.js is loaded by default. </li><li>Fix other known issues. </li></td>
</tr><tr>
<td>2019.04.19</td>
<td>2.3.0</td>
<td><li>Add some function parameter options. </li><li>The parameter coverpic is changed to poster. </li><li>destroy destroys the flv.js instance. </li><li>Fix other known issues. </li></td>
</tr><tr>
<td>2018.12.17</td>
<td>2.2.3</td>
<td><li>Optimize the playback logic. </li><li>Solve the problem of loading animation when iOS WeChat is not triggered by the playback event. </li><li>Fix other known issues. </li></td>
</tr><tr>
<td>2018.05.03</td>
<td>2.2.2</td>
<td><li>Optimize the loading component. </li><li>Optimize the Flash destroy method. </li><li>By default, H5 is used for playback. </li><li>Fix known issues. </li></td>
</tr><tr>
<td>2017.12.20</td>
<td>2.2.1</td>
<td><li>Add configurable clarity copywriting function. </li><li>Set the default sharpness. </li><li>Support to switch the definition method. </li></td>
</tr><tr>
<td>2017.12.07</td>
<td>2.2.1</td>
<td><li>Add the systemFullscreen parameter. </li><li>Add flashUrl parameter. </li><li>Fix the UI issue of mute switching after volume Max. </li><li>Fixed the issue that requires two clicks to play under iOS 11 WeChat. </li><li>Fix the problem that the style of safari 11 system is blocked. </li><li>Adaptation in the x5 kernel will trigger seeking, but will not trigger seeked. </li><li>Fixed the problem that dragging the progress bar to the starting position and setting currentTime failed. </li><li>Switch the clarity to keep the volume unchanged. </li><li>Fixed the problem that the page width is 0 and the player width judgment fails. </li><li>The destroy method adds complete destruction of the player node. </li></td>
</tr><tr>
<td>2017.06.30</td>
<td>2.2.0</td>
<td><li>Add parameters that control the judgment of the playback environment: Flash, h5_flv, x5_player. </li><li>Adjust the player initialization logic and optimize the error prompt effect. </li><li>Add flv.js support, flv.js can be used to play FLV if the conditions are met. </li><li>Support x5-video-orientation attribute. </li><li>Add the playback environment judgment logic, and adjust the priority of H5 and Flash through parameters, and whether to enable TBS playback. </li><li>Enable the version number release method to avoid affecting users of the old version. </li><li>Optimize the timestamp triggered by the event and unify it as the standard time. </li><li>Bug fixes. </li></td>
</tr><tr>
<td>2017.03.04</td>
<td>2.1.0</td>
<td> Until 2017.06.30, after several iterations of development, it has gradually stabilized. The function description of the current document, if there is no special description, is based on this version. </td>
</tr><tr>
<td>2016.12.28</td>
<td>2.0.0</td>
<td>The first version. </td>
</tr></table>
