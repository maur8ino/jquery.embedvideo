# jQuery Embed Video

A jQuery plugin to embed video from Youtube and Facebook (and more to come in future) in a html container. Support fuild resize of the container for working with media queries.

## Version

v1.0.1 Develop

## Usage

It generates an iframe for YouTube videos ([https://developers.google.com/youtube/player\_parameters#Manual\_IFrame\_Embeds](https://developers.google.com/youtube/player\_parameters#Manual\_IFrame\_Embeds)) or a ```<video/>``` tag with MP4 video and flash player fallback ([http://camendesign.com/code/video\_for\_everybody](http://camendesign.com/code/video\_for\_everybody)).

**Parameters**
<table>
  <tr>
    <th>name</th><th>explanation</th><th>default value</th>
  </tr>
  <tr>
    <td>width</td><td>starting width in pixels</td><td>```480```</td>
  </tr>
  <tr>
    <td>height</td><td>starting height</td><td>```false```</td>
  </tr>
  <tr>
    <td>aspectRatio</td><td>aspect ratio of the video, for keeping ratio when resizing</td><td>```1.77777778```</td>
  </tr>
  <tr>
    <td>isFluid</td><td>if video should resize</td><td>```false```</td>
  </tr>
  <tr>
    <td>iframeUrl</td><td>the YouTube iframe url</td><td>```false```</td>
  </tr>
  <tr>
    <td>iframeClass</td><td>class of the YouTube iframe</td><td>```youtube-player```</td>
  </tr>
  <tr>
    <td>videoPoster</td><td>the poster image url showed before playing</td><td>```false```</td>
  </tr>
  <tr>
    <td>videoMp4Url</td><td>the MP4 video url</td><td>```false```</td>
  </tr>
  <tr>
    <td>videoOggUrl</td><td>the OGG/OGV video url</td><td>```false```</td>
  </tr>
  <tr>
    <td>videoFlashUrl</td><td>the flash player url</td><td>```false``</td>
  </tr>
</table>

**YouTube iframe fluid**

```javascript
$('#video-container').embedvideo({
    iframeUrl: 'http://www.youtube.com/embed/uzihn2msbKg',
    isFluid: true
});```

**Facebook fluid**

```javascript
$('#video-container').embedvideo({
	videoMp4Url: 'https://fbcdn-video-a.akamaihd.net/cfs-ak-ash4/v/732562/257/10151325469014941_21905.mp4?oh=a77a2bdbcd6c5e6033542615a69161a0&oe=50FB79BE&__gda__=1358719905_59685d7ee5c7c497d5a8a8edfad0a3e8',
	videoFlashUrl: 'http://www.facebook.com/v/10151325469014941',
	isFluid: true
});```

**Resizing fluid plugin**

```javascript
var plugin = $('#video-container').data('plugin_embedvideo');
$(window).on('resize', function() {
    plugin.fluidScale();
});```
## Bug tracker

If you find a bug, please raise it the [issue here](https://github.com/maur8ino/miniBoilerplate/issues) on Github! 

## Developer
+ [@maur8ino](http://twitter.com/maur8ino)
+ [Github Profile](http://github.com/maur8ino)
