odoo.define('theme_extensia.web_custom', function(require) {
"use strict";

var BasicRenderer = require('web.BasicRenderer');
var config = require('web.config');
var core = require('web.core');
var Dialog = require('web.Dialog');
var dom = require('web.dom');
var field_utils = require('web.field_utils');
var Pager = require('web.Pager');
var utils = require('web.utils');

var _t = core._t;

// Hiding Tooltip for all the fields.
BasicRenderer.include({
    _addFieldTooltip: function (widget, $node) {
        // optional argument $node, the jQuery element on which the tooltip
        // should be attached if not given, the tooltip is attached on the
        // widget's $el
        $node = $node.length ? $node : widget.$el;
// $node.tooltip({
// delay: { show: 1000, hide: 0 },
// title: function () {
// return qweb.render('WidgetLabel.tooltip', {
// debug: config.debug,
// widget: widget,
// });
// }
// });
    },
});
// End

var FIELD_CLASSES = {
    float: 'o_list_number',
    integer: 'o_list_number',
    monetary: 'o_list_number',
    text: 'o_list_text',
};

var ListRenderer = require('web.ListRenderer');
ListRenderer.include({
	_renderGroupRow: function (group, groupLevel) {
        var aggregateValues = _.mapObject(group.aggregateValues, function (value) {
            return { value: value };
        });
        var $cells = this._renderAggregateCells(aggregateValues);
        if (this.hasSelectors) {
            $cells.unshift($('<td>'));
        }
        var name = group.value === undefined ? _t('Undefined') : group.value;
        var groupBy = this.state.groupedBy[groupLevel];
        if (group.fields[groupBy.split(':')[0]].type !== 'boolean') {
            name = name || _t('Undefined');
        }
        // Color code added for groups
        var my_first_string = '<th style="background-color: ';
        var given_group_color = name.split(":")[1];
	    var my_thrid_string = '!important">';
	    var final_header = my_first_string.concat(given_group_color, my_thrid_string);
	    name = name.split(":")[0];
	    // End
        var $th = $('<th>')
                    .addClass('o_group_name')
                    .text(name + ' (' + group.count + ')');
        var $arrow = $('<span>')
                            .css('padding-left', (groupLevel * 20) + 'px')
                            .css('padding-right', '5px')
                            .addClass('fa');
        if (group.count > 0) {
            $arrow.toggleClass('fa-caret-right', !group.isOpen)
                    .toggleClass('fa-caret-down', group.isOpen);
        }
        $th.prepend($arrow);
        if (group.isOpen && !group.groupedBy.length && (group.count > group.data.length)) {
            var $pager = this._renderGroupPager(group);
            var $lastCell = $cells[$cells.length-1];
            $lastCell.addClass('o_group_pager').append($pager);
        }
        // Background image removed for tr tag
        var my_tr = '<tr style="background-image: none ! important; background-color: ';
        var final_header = my_tr.concat(given_group_color, my_thrid_string);         
        // End
        return $(final_header)
                    .addClass('o_group_header')
                    .toggleClass('o_group_open', group.isOpen)
                    .toggleClass('o_group_has_content', group.count > 0)
                    .data('group', group)
                    .append($th)
                    .append($cells);
    },
    
	_renderBodyCell: function (record, node, colIndex, options) {
        var tdClassName = 'o_data_cell';
        if (node.tag === 'button') {
            tdClassName += ' o_list_button';
        } else if (node.tag === 'field') {
            var typeClass = FIELD_CLASSES[this.state.fields[node.attrs.name].type];
            if (typeClass) {
                tdClassName += (' ' + typeClass);
            }
            if (node.attrs.widget) {
                tdClassName += (' o_' + node.attrs.widget + '_cell');
            }
        }
        var $td = $('<td>', {class: tdClassName});

        // We register modifiers on the <td> element so that it gets the correct
        // modifiers classes (for styling)
        var modifiers = this._registerModifiers(node, record, $td, _.pick(options, 'mode'));
        // If the invisible modifiers is true, the <td> element is left empty.
        // Indeed, if the modifiers was to change the whole cell would be
        // rerendered anyway.
        if (modifiers.invisible && !(options && options.renderInvisible)) {
            return $td;
        }

        if (node.tag === 'button') {
            return $td.append(this._renderButton(record, node));
        } else if (node.tag === 'widget') {
            return $td.append(this._renderWidget(record, node));
        }
        if (node.attrs.widget || (options && options.renderWidgets)) {
            var widget = this._renderFieldWidget(node, record, _.pick(options, 'mode'));
            this._handleAttributes(widget.$el, node);
            return $td.append(widget.$el);
        }
        var name = node.attrs.name;
        var field = this.state.fields[name];
        var value = record.data[name];
        var formattedValue = field_utils.format[field.type](value, field, {
            data: record.data,
            escape: true,
            isPassword: 'password' in node.attrs,
        });
        this._handleAttributes($td, node);
		
		name = formattedValue.toString().split(":")[0];		
        return $td.html(name);
    },
    
});

});
