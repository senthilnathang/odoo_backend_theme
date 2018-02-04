
odoo.define('theme_extensia.settings', function(require) {
    var Model = require('web.Model');
    var WebClient = require('web.WebClient');
    var core = require('web.core');

    var _t = core._t;

    WebClient.include({
        init: function(parent, action, options) {
            this._super.apply(this, arguments);
            var self = this;
            this.set('title_part', {"zopenerp": ''});
            odoo.debranding_new_name = '';
            odoo.debranding_new_website = '';
            odoo.debranding_new_title = '';
            var model = new Model("ir.config_parameter");
            model.call('get_debranding_parameters').then(
                function(result){
                odoo.debranding_new_name = result['web.new_name'];
                odoo.debranding_new_website = result['web.new_website'];
                odoo.debranding_new_title = result['web.new_title'];
                self.set('title_part', {"zopenerp": odoo.debranding_new_title});
            });
        }
    });

});
