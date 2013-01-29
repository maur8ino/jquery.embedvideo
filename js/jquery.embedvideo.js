/*
 *  Project: embedvideo
 *  Description: A jQuery plugin to embed video from Youtube and Facebook (and more to come in future) in a html container
 *  Author: Mauro Verrocchio <mauroverrocchio@gmail.com>
 *  License: MIT
 */

 ;(function ($, window, document, undefined) {
  var pluginName = "embedvideo",
    defaults = {
      aspectRatio: 1.77777778,
      width: 480,
      height: false,
      isFluid: false,
      iframeUrl: false,
      iframeClass: 'youtube-player',
      videoPoster: false,
      videoMp4Url: false,
      videoOggUrl: false,
      videoWebMUrl: false,
      videoFlashUrl: false,
      alternativeFlashPlayer: 'flowplayer'
    };

  function Plugin(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var html = [];
      // Setting the initial height based on initial width
      this.options.height = this.options.height || (1 / this.options.aspectRatio * parseInt(this.options.width, 10));
      // Setting the dimensions object 
      this.options.dimensions = this.options.isFluid ?
      { width: '100%' } :
      { width: this.options.width, height: this.options.height };

      // Building the embed video jquery object            
      if (this.options.iframeUrl) {
        // Using the iframe method for youtube video
        // https://developers.google.com/youtube/player_parameters#Manual_IFrame_Embeds
        html.push('<iframe class="' + this.options.iframeClass + '" type="text/html"');
        html.push(' src="' + this.options.iframeUrl + '" frameborder="0"/>');

        // Appending the embed video object to $element
        this.$element.append(html.join(''));
        this.$embeddedVideo = this.$element.find('iframe');
      } else {
        // Using the video for everybody method
        // http://camendesign.com/code/video_for_everybody
        html.push('<video controls="controls" width="' + this.options.dimensions.width);
        if (!!this.options.dimensions.height) {
          html.push('" height="' + this.options.dimensions.height + '"');
        }
        if (this.options.videoPoster) {
          html.push('" poster="' + this.options.videoPoster + '"');
        }
        html.push('>');
        if (this.options.videoMp4Url) {
          // If the mp4 video source was set, appends a <source/> object
          html.push('<source src="' + this.options.videoMp4Url + '" type="video/mp4"/>');
        }
        if (this.options.videoOggUrl) {
          // If the ogg video source was set, appends a <source/> object
          html.push('<source src="' + this.options.videoOggUrl + '" type="video/ogg"/>');
        }
        if (this.options.videoWebMUrl) {
          // If the WebM video source was set, appends a <source/> object
          html.push('<source src="' + this.options.videoWebMUrl + '" type="video/webm"/>');
        }
        if (this.options.videoFlashUrl) {
          // If the flash video source was set, appends a <object/> and <embed/> object
          html.push('<object width="' + this.options.dimensions.width);
          if (!!this.options.dimensions.height) {
            html.push('" height="' + this.options.dimensions.height + '"');
          }
          html.push('>');
          html.push('<param name="movie" value="' + this.options.videoFlashUrl + '"/>');
          html.push('<param name="allowFullScreen" value="true"/>');
          html.push('<param name="wmode" value="transparent" />');
          html.push('<embed src="' + this.options.videoFlashUrl + '" type="application/x-shockwave-flash" allowscriptaccess="always" ');
          html.push('allowfullscreen="true" width="' + this.options.dimensions.width +'"');
          if (!!this.options.dimensions.height) {
            html.push('" height="' + this.options.dimensions.height + '"');
          }
          html.push('></embed>');
          if (this.options.videoPoster) {
            html.push('<img src="' + this.options.videoPoster + '" width="' + this.options.dimensions.width);
            if (!!this.options.dimensions.height) {
              html.push('" height="' + this.options.dimensions.height + '"');
            }
            html.push('>');
          }
          html.push('</object>');
        } else if (this.options.alternativeFlashPlayer) {
          // If no flash player is provided, we use the vfe players
          // http://sandbox.thewikies.com/vfe-generator/
          var videoFileUrl = this.options.videoMp4Url ? this.options.videoMp4Url : (this.options.videoOggUrl ? this.options.videoOggUrl : this.options.videoWebMUrl);
          switch(this.options.alternativeFlashPlayer) {
            case 'flowplayer':
              // Appending flowplayer
              html.push('<object type="application/x-shockwave-flash" data="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf" width="' + this.options.dimensions.width +'"');
              if (!!this.options.dimensions.height) {
                html.push('" height="' + this.options.dimensions.height + '"');
              }
              html.push('>');
              html.push('<param name="movie" value="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf"/>');
              html.push('<param name="allowFullScreen" value="true"/>');
              html.push('<param name="wmode" value="transparent" />');
              html.push('<param name="flashVars" value="config={\'playlist\':[');
              if (this.options.videoPoster) {
                html.push('\'' + encodeURIComponent(this.options.videoPoster) + '\',');
              }
              html.push('{\'url\':\'' + encodeURIComponent(videoFileUrl) +'\',\'autoPlay\':false}]}" />');

              break;

            case 'flashfox':
              // Appending flowplayer
              html.push('<object type="application/x-shockwave-flash" data="http://flashfox.googlecode.com/svn/trunk/flashfox.swf" width="' + this.options.dimensions.width +'"');
              if (!!this.options.dimensions.height) {
                html.push('" height="' + this.options.dimensions.height + '"');
              }
              html.push('>');
              html.push('<param name="movie" value="http://flashfox.googlecode.com/svn/trunk/flashfox.swf"/>');
              html.push('<param name="allowFullScreen" value="true"/>');
              html.push('<param name="wmode" value="transparent" />');
              html.push('<param name="flashVars" value="controls=true&amp;');
              if (this.options.videoPoster) {
                html.push('poster=' + encodeURIComponent(this.options.videoPoster) + '&amp;');
              }
              html.push('src=' + encodeURIComponent(videoFileUrl) +'" />');

              break;

            case 'jwplayer':
              // Appending flowplayer
              html.push('<object type="application/x-shockwave-flash" data="http://player.longtailvideo.com/player.swf" width="' + this.options.dimensions.width +'"');
              if (!!this.options.dimensions.height) {
                html.push('" height="' + this.options.dimensions.height + '"');
              }
              html.push('>');
              html.push('<param name="movie" value="http://player.longtailvideo.com/player.swf"/>');
              html.push('<param name="allowFullScreen" value="true"/>');
              html.push('<param name="wmode" value="transparent" />');
              html.push('<param name="flashVars" value="controlbar=over&amp;');
              if (this.options.videoPoster) {
                html.push('image=' + encodeURIComponent(this.options.videoPoster) + '&amp;');
              }
              html.push('file=' + encodeURIComponent(videoFileUrl) +'" />');

              break;
          }
          if (this.options.videoPoster) {
            html.push('<img src="' + this.options.videoPoster + '" width="' + this.options.dimensions.width);
            if (!!this.options.dimensions.height) {
              html.push('" height="' + this.options.dimensions.height + '"');
            }
            html.push(' title="No video playback capabilities, please download the video below"/>');
          }
        }
        html.push('</video>');
        // Appending the embed video object to $element
        this.$element.append(html.join(''));
        this.$embeddedVideo = this.$element.find('video');
      }
    },

    fluidScale: function() {
      if (this.options.isFluid) {
        this.options.width = this.$element.width();
        this.options.height = (1 / this.options.aspectRatio * this.options.width);
        this.$embeddedVideo.attr({ width: this.options.width, height: this.options.height });
        this.$embeddedVideo.find('object').attr({ width: this.options.width, height: this.options.height });
        this.$embeddedVideo.find('object embed').attr({ width: this.options.width, height: this.options.height });
      }
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);