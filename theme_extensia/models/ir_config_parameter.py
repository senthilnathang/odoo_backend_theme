# -*- coding: utf-8 -*-

from openerp import models, fields, api, _
from openerp.exceptions import ValidationError

PARAMS = [
    ('web.new_name', _('Extensia')),
    ('web.new_title', _('Bootstrap')),
    ('web.new_website', ''),
    ('web.favicon_url', '/theme_extensia/static/src/img/favicon.ico'),
    ('web.logo', '/theme_extensia/static/src/img/logo.png'),
    ('web.logo_mini', '/theme_extensia/static/src/img/logo_mini.png'),
]


class IrConfigParameter(models.Model):

    _inherit = 'ir.config_parameter'

    @api.model
    def get_debranding_parameters(self):
        res = {}
        for param, default in PARAMS:
            value = self.env['ir.config_parameter'].get_param(param, default)
            res[param] = value.strip()
        return res

    @api.model
    def create_debranding_parameters(self):
        for param, default in PARAMS:
            if not self.env['ir.config_parameter'].get_param(param):
                self.env['ir.config_parameter'].set_param(param, default or ' ')

class ThemeSetting(models.Model):
    _name = 'theme.settings'
    _description = 'Theme Settings'

    _inherit = 'res.config.settings'

    name = fields.Char('Web Name', translate=True)
    title = fields.Char('Web Title', translate=True)
    favicon = fields.Char('Web Favicon', translate=True)
    logo = fields.Char('Logo', translate=True)
    logo_mini = fields.Char('Logo Mini', translate=True)


    #~ switcher_theme = fields.Selection([('0', 'Hide Switcher'),
                                       #~ ('1', 'Show Switcher')],
                                      #~ 'Switcher Theme', required=True, translate=True)

   

    

   

    @api.model
    def get_default_theme(self, fields):
        Param = self.env["ir.config_parameter"]
        return {
            'name': Param.get_param('web.new_name'),
            'title': Param.get_param('web.new_title'),
            'favicon': Param.get_param('web.favicon_url'),
            'logo': Param.get_param('web.logo'),
            'logo_mini': Param.get_param('web.logo_mini'),
        }

    @api.multi
    def set_thmeme(self):
        Param = self.env["ir.config_parameter"]
        Param.set_param('web.new_name', self.name)
        Param.set_param('web.new_title', self.title)
        Param.set_param('web.favicon_url', self.favicon)
        Param.set_param('web.logo', self.logo)
        Param.set_param('web.logo_mini', self.logo_mini)
       


