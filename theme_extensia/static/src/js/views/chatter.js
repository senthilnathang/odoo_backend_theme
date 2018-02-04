odoo.define('theme_extensia.chatter', function (require) {
"use strict";

//~ var chat_manager = require('mail.chat_manager');
//~ var composer = require('mail.composer');
//~ var ChatThread = require('mail.ChatThread');

//~ var ajax = require('web.ajax');
//~ var config = require('web.config');
var core = require('web.core');
//~ var data = require('web.data');
//~ var Dialog = require('web.Dialog');
//~ var form_common = require('web.form_common');
//~ var framework = require('web.framework');
var session = require('web.session');
//~ var _t = core._t;
//~ var qweb = core.qweb;

var chatter = require('mail.Chatter');


var form_widgets = require('web.form_widgets');

//~ var Followers = core.form_widget_registry.get('mail_followers');

form_widgets.Followers.include({
    
    /**
     * Remove users, partners, or channels from the followers
     * @param {Array} [ids.user_ids] the user ids
     * @param {Array} [ids.partner_ids] the partner ids
     * @param {Array} [ids.channel_ids] the channel ids
     */
    do_unfollow: function (ids) {
        if (swal(_t("Warning! \n Remove a follower, he won't be notified of any email or discussion on this document. Do you really want to remove this follower ?"))) {
            _(this.$('.o_subtype_checkbox')).each(function (record) {
                $(record).attr('checked',false);
            });

            this.$('.o_subtypes_list > .dropdown-toggle').attr('disabled', true);
            var context = new data.CompoundContext(this.build_context(), {});

            if (ids.partner_ids || ids.channel_ids) {
                return this.ds_model.call(
                    'message_unsubscribe', [
                        [this.view.datarecord.id],
                        ids.partner_ids,
                        ids.channel_ids,
                        context]
                    ).then(this.proxy('read_value'));
            } else {
                return this.ds_model.call(
                    'message_unsubscribe_users', [
                        [this.view.datarecord.id],
                        ids.user_ids,
                        context]
                    ).then(this.proxy('read_value'));
            }
        }
        return false;
    },
 });


});
