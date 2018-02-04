{
    "name": "Extensia",
    "description": "Bootstrap Admin Template",
    "version": "0.1",
    "author": "Senthilnathan G",
    "category": "Theme/Backend",
    "data": [
        "views/assets.xml",
        "views/web.xml",
        "views/setting_views.xml",
    ],
    "images":[
        "images/screen.png"
    ],
    "depends": [
        "web","mail"
    ],
    "auto_install": False,
    "installable": True,
    "qweb": [
        "static/src/xml/web.xml",
        "static/src/xml/profile.xml",
        "static/src/xml/systray.xml",
    ],
}
