
describe('EmbedVideo', function() {
    describe('plugin functionality', function() {
        beforeEach(function() {
            loadFixtures('fragment.html');
            return this.$element = $('#fixtures');
        });
        describe('plugin options', function() {
            it('should have dimensions set', function() {
                this.$element.embedvideo({ height: 100 });
                var plugin = this.$element.data('plugin_embedvideo');
                return expect(plugin.options.dimensions.height).toBe(100);
            });
            it('should have height set according to aspectRatio', function() {
                this.$element.embedvideo({ width: 100, aspectRatio: 1.5 });
                var plugin = this.$element.data('plugin_embedvideo');
                return expect(plugin.options.dimensions.height).toBe(1 / 1.5 * 100);
            });
            it('should have fluid dimensions set', function() {
                this.$element.embedvideo({ isFluid: true });
                var plugin = this.$element.data('plugin_embedvideo');
                return expect(plugin.options.dimensions.width).toBe('100%');
            });
        });
        describe('iframe behaviour', function() {
            beforeEach(function() {
                this.$element.embedvideo({ iframeUrl: true, iframeClass: 'test-class'});
                return this.plugin = this.$element.data('plugin_embedvideo');
            });

            it('should have iframe $embeddedVideo', function() {
                return expect(this.plugin.$embeddedVideo).toBe('iframe');
            });
            it('should have test-class', function() {
                return expect(this.plugin.$embeddedVideo).toHaveClass('test-class');
            });
        });
        describe('html5 video behaviour', function() {
            it('should have video $embeddedVideo', function() {
                this.$element.embedvideo();
                var plugin = this.$element.data('plugin_embedvideo');
                return expect(this.$element).toContain('video');
            });
            describe('videoMp4Url', function() {
                beforeEach(function() {
                    this.$element.embedvideo({ videoMp4Url: 'youtube' });
                    this.plugin = this.$element.data('plugin_embedvideo');
                    return this.$source = this.$element.find('video source');
                });
                it('should have video/mp4 type set', function() {
                    return expect(this.$source).toHaveAttr('type', 'video/mp4');
                });
                it('should have src set', function() {
                    return expect(this.$source).toHaveAttr('src', 'youtube');
                });
            });
            describe('videoMp4Url', function() {
                beforeEach(function() {
                    this.$element.embedvideo({ videoOggUrl: 'facebook' });
                    this.plugin = this.$element.data('plugin_embedvideo');
                    return this.$source = this.$element.find('video source');
                });
                it('should have video/ogg type set', function() {
                    return expect(this.$source).toHaveAttr('type', 'video/ogg');
                });
                it('should have src set', function() {
                    return expect(this.$source).toHaveAttr('src', 'facebook');
                });
            });
        });
        describe('flash embedded behaviour', function() {
            beforeEach(function() {
                this.$element.embedvideo({ videoFlashUrl: 'someFlashObject', width: 576, aspectRatio: 1.5 });
                return this.plugin = this.$element.data('plugin_embedvideo');
            });
            it('should contain an object element', function() {
                return expect(this.$element).toContain('object');
            });
            it('should contain an embed element inside the object element', function() {
                var $object = this.$element.find('object');
                return expect($object).toContain('embed');
            });
            it('should set a param "movie" inside the object element', function() {
                var $object = this.$element.find('object');
                return expect($object).toContain('param[name="movie"]');
            });
            it('should set a param "movie" with the value of "someFlashObject"', function() {
                var $param = this.$element.find('object param[name="movie"]');
                return expect($param).toHaveAttr('value', 'someFlashObject');
            });
            it('should have set the src attr of the embed with the value of "someFlashObject"', function() {
                var $embed = this.$element.find('object embed');
                return expect($embed).toHaveAttr('src', 'someFlashObject');
            });
            it('should set dimension in object according to aspectRatio', function() {
                var $object = this.$element.find('video object'),
                    expectHeight = 1 / 1.5 * 576;
                return expect($object).toHaveAttr({ width: '576', height: expectHeight });
            });
            it('should set dimension in embed according to aspectRatio', function() {
                var $embed = this.$element.find('video object embed'),
                    expectHeight = 1 / 1.5 * 576;
                return expect($embed).toHaveAttr({ width: '576', height: expectHeight });
            });
        });
        describe('plugin scale behaviour', function() {
            it('should scale element', function() {
                this.$element.width(576);
                this.$element.embedvideo({ aspectRatio: 1.5, isFluid: true });
                var $video = this.$element.find('video'),
                    plugin = this.$element.data('plugin_embedvideo');
                this.$element.width(480);
                plugin.fluidScale();
                return expect($video).toHaveAttr('height', 384 * 480 / 576);
            });
        });
    });
});
