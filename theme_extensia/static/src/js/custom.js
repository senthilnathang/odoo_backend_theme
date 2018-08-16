odoo.define('theme_extensia.custom', function (require) {
"use strict";	
    $(document).ready(function () {
        // Add active class in menu parent
        $('.oe_menu_leaf').on('click', function() {
            var $items = $(this).parents('li');
            setTimeout(function(){
                $items.addClass('active');
            });
        });
        
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#scroll-top').fadeIn();
			} else {
				$('#scroll-top').fadeOut();
			}
		});

		$('#scroll-top').click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});
        
        $('.oe_menu_toggler').on('click', function() {
			return false;
		});
		
		$('ul.metismenu li').on('click', function() {
			$('ul.metismenu li').removeClass('highlight');
			$(this).toggleClass('highlight');
		});
		
		//to add water mark 
		$('body').append("<div class='DIS_watermark'></div>");
		
		//custom scroll bar
		
		$("body").addClass('fixed-sidebar');
		$('.sidebar-collapse').slimScroll({
			height: '100%',
			railOpacity: 0.9,
			disableFadeOut: true,
			alwaysVisible: true,
		});
		
		if (localStorageSupport){
			localStorage.setItem("fixedsidebar",'on');
		}	
		$('.oe_menu_leaf').click(function(evt){
			$('#side-menu > li').removeClass('active');
			$('ul.collapse').removeClass('in');
			$(this).parents('li').addClass('active');
			$(this).parents('ul.collapse').addClass('in');
			evt.preventDefault();
		});
		$('#side-menu').click(function(event){
			event.preventDefault();
		});
    });
   
	
    // Override controlpanel styling
    var controlPanel = require('web.ControlPanel');
    controlPanel.include({
        _update_search_view: function(searchview, is_hidden) {
            if (searchview) {
                searchview.$buttons = this.nodes.$searchview_buttons;
                searchview.toggle_visibility(!is_hidden);
                // Set title based on current breadcrumb
                //this.$title_col.html(this.nodes.$breadcrumbs.find('.active').html());
            }
        }
    });
    
    
});
