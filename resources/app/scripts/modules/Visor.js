define(["lib/mustache","jquery"],function(Mustache,$){

	var visor=function(){


	const ipc = nodeRequire('electron').ipcRenderer;
	// ipc.on('wrote-pdf', function(event, path){
		// alert(`Document saved in ${path}`);
	// });

		this.printPdf = function() {

			ipc.send('print-to-pdf');

		};


		this.init=function(){
		//	$("body").html("Module loaded");
			var {dialog} = window.nodeRequire('electron').remote;
			var fileSelected=dialog.showOpenDialog(
				{
					properties: ['openFile'],
					filters:[{
						name: "CFDIS", extensions:["xml"],
					}]
				}
			);
			if (fileSelected.length >0)
			{



				var filename = fileSelected[0];
				console.log(filename);



				fs = nodeRequire('fs');
				fs.readFile(filename, 'utf8', function(err,data){
					if (err){
						return console.log(err);						
					}

					var parseString = nodeRequire('xml2js').parseString;




					 var prefixMatch;

					prefixMatch = new RegExp(/(?!xmlns)^.*:/);

					var sp = function(str) {

					    if (str.substring(0,1)!="2")
					    {

						str=  str.replace(prefixMatch, '');
					    }

					    if (str=="$")
					    {
						str = "Labels";
					    }

					    return str.toLowerCase();
					};

					var same = x => x;

					parseString(data,{
						tagNameProcessors: [sp],
						attrNameProcessors: [sp],
						valueProcessors: [same],
						attrValueProcessors: [same]

					}, function (err, factura) {

						if (err){
							return console.log(err);						
						}


						console.dir(factura);


						//load template

						var template = "resources/app/scripts/modules/templates/visor.html";
						if (factura.comprobante.$.version === "3.3"){
							template= "resources/app/scripts/modules/templates/visor33.html"
						}




						fs.readFile(template, 'utf8', function(err,template){
						    if (err){
							return console.log(err);						
						    }	

						    $("body").html(Mustache.to_html(template, factura));
						    $("#btnopen").off("click",this.init);
						    $("#btnopen").on("click",this.init.bind(this));

							$("#btnPrint").off("click",this.printPdf);
						    $("#btnPrint").on("click",this.printPdf.bind(this));
							//console.log(template);
						}.bind(this));
					}.bind(this));
					//console.log(data);
				}.bind(this));

			}
		}		

	}



	return new visor();


});
