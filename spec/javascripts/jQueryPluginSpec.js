/* jshint -W093 */
describe('Plugin', function() {
    var options;
    options = {
        aspectRatio: 2
    };
    beforeEach(function() {
        loadFixtures('fragment.html');
        return this.$element = $('#fixtures');
    });
    describe('plugin behavior', function() {
        it('should be available on the jQuery object', function() {
            return expect($.fn.embedvideo).toBeDefined();
        });
        it('should be chainable', function() {
            return expect(this.$element.embedvideo()).toBe(this.$element);
        });
        it('should offers default values', function() {
            var plugin;
            this.$element.embedvideo();
            plugin = this.$element.data('plugin_embedvideo');
            return expect(plugin._defaults).toBeDefined();
        });
        it('should overwrites the settings', function() {
            var plugin;
            this.$element.embedvideo(options);
            plugin = this.$element.data('plugin_embedvideo') ;
            return expect(plugin.options.message).toBe(options.message);
        });
    });
});
