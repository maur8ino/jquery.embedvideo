/*
 *  Project: embedvideo
 *  Description: A jQuery plugin to embed video from Youtube and Facebook (and more to come in future) in a html container
 *  Author: Mauro Verrocchio <mauroverrocchio@gmail.com>
 *  License: MIT
 */

;(function ($, window, document, undefined) {
    var pluginName = "embedvideo";
    var defaults = {
        aspectRatio: 1.77777778,
        width: 480,
        isFluid: false,
        autoScale: true,
        iframeUrl: false,
        iframeClass: 'youtube-player',
        videoMp4Url: false,
        videoOggUrl: false
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
            // Setting the initial height based on initial width
            this.options.height = this.options.height || (1 / this.options.aspectRatio * parseInt(this.options.width, 10));
            // Setting the dimensions object 
            this.options.dimensions = this.options.isFluid ?
                { width: '100%', 'data-videoFluidResize': '' } :
                { width: this.options.width, height: this.options.height };
        
            // Building the embed video jquery object            
            if (this.options.iframeUrl) {
                // Using the iframe method for youtube video
                // https://developers.google.com/youtube/player_parameters#Manual_IFrame_Embeds
                this.$embeddedVideo = $('<iframe/>', {
                    'class': this.options.iframeClass,
                    'type': 'text/html',
                    'src': this.options.iframeUrl,
                    'frameborder': '0'
                });
            } else {
                // Using the video for everybody method
                // http://camendesign.com/code/video_for_everybody
                this.$embeddedVideo = $('<video/>').attr($.extend({}, { 'controls': '' }, this.options.dimensions));
                if (this.options.videoMp4Url) {
                    // If the mp4 video source was set, appends a <source/> object
                    this.$embeddedVideo.append($('<source/>', {
                        'src': this.options.videoMp4Url,
                        'type': 'video/mp4'
                     }));
                }
                if (this.options.videoOggUrl) {
                    // If the ogg video source was set, appends a <source/> object
                    this.$embeddedVideo.append($('<source/>', {
                        'src': this.options.videoOggUrl,
                        'type': 'video/ogg'
                     }));
                }

                if (this.options.videoFlashUrl) {
                    // If the flash video source was set, appends a <object/> and <embed/> object
                    this.$embeddedVideo
                        .append($('<object/>').attr(this.options.dimensions)
                            .append($('<param/>', { 'name': 'movie', 'value': this.options.videoFlashUrl }))
                            .append($('<param/>', { 'name': 'allowFullScreen', 'value': 'true' }))
                            .append($('<embed/>').attr($.extend({}, {
                                'src': this.options.videoFlashUrl,
                                'type': 'application/x-shockwave-flash', 
                                'allowfullscreen': 'true' }, this.options.dimensions))
                            )
                        );
                }
            }
            
            // Appending the embed video object to $element
            this.$element.append(this.$embeddedVideo);

            // Enabling auto scaling at window resize
            if (this.options.isFluid && this.options.autoScale) {
                $(window).on('resize', this.fuildScale);
            }
        },

        fluidScale: function() {
            if (this.options.isFluid) {
                this.options.width = this.$element.width();
                this.options.height = (1 / this.options.aspectRatio * this.options.width);
                this.$embeddedVideo.attr({ width: this.options.width, height: this.options.height});
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