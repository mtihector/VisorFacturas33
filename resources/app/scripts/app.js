
window.urlpreffix = './';

requirejs.config({
    baseUrl: window.urlpreffix,

    paths: {
        lib: window.urlpreffix + "scripts/libs",
        jquery: window.urlpreffix + "scripts/libs/jquery.min",
		text: 'scripts/libs/text',
    }

});






require(["jquery"],function($){
	$(document).ready(function(){

   // Load module for Invoices

		require(["scripts/modules/Visor"], function(visor){
			visor.init();
		});


		 
	});
});

