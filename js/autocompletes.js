$( function() {
    
	//for client details in buyer and shipped to
	var clientDetails = [
		/*Enter list of json items to enter as autocomplete for client details in this format
		{
			"name" : "<name>",
			"address" : "<address>",
			"gstIn" : "<gstIn>",
			"state" : "<stateCode>"
		} */
		
    ];
	var names = clientDetails.map(function(a) {return a.name;});
	var addresses = clientDetails.map(function(a) {return a.address;});
	var gstInNos = clientDetails.map(function(a) {return a.gstIn;});
	
    $( "#buyerName,#shipName" ).autocomplete({
		source: names,
		select: function( event, ui ) {
			for(var i=0;i<clientDetails.length;i++){
				
				if(clientDetails[i].name == ui.item.value){
				
					var prop = $(this).parents(".sub-container");
					$(prop).find(".radio:eq(0) input").val(clientDetails[i].name);
					$(prop).find(".radio:eq(1) input").val(clientDetails[i].address);
					$(prop).find(".radio:eq(2) select").val(clientDetails[i].state);
					$(prop).find(".radio:eq(3) input").val(clientDetails[i].gstIn);
					
					//if buyer state is changed, set the tax rates to be used
					if($(prop).find(".radio:eq(0) input").attr("id") == "buyerName"){
						setTaxRatesToBeApplied();
					}
					
					break;
				}
			}
		}
    });
	$( "#buyerBillAddr,#shipDelAddr" ).autocomplete({
		source: addresses
    });
	$( "#buyerGstIn,#shipGstIn" ).autocomplete({
		source: gstInNos,
		select: function( event, ui ) {
			for(var i=0;i<clientDetails.length;i++){
			
				if(clientDetails[i].gstIn == ui.item.value){
				
					var prop = $(this).parents(".sub-container");
					$(prop).find(".radio:eq(0) input").val(clientDetails[i].name);
					$(prop).find(".radio:eq(1) input").val(clientDetails[i].address);
					$(prop).find(".radio:eq(2) select").val(clientDetails[i].state);
					$(prop).find(".radio:eq(3) input").val(clientDetails[i].gstIn);
					
					//if buyer state is changed, set the tax rates to be used
					if($(prop).find(".radio:eq(0) input").attr("id") == "buyerName"){
						setTaxRatesToBeApplied();
					}
					
					break;
				}
			}
		}
    });
 });
 
//for unit of measurement in individual records
var uoms = [
	"Nos","Metres","Pieces","Kg"
];

$("body").on('keydown.autocomplete', ".uoms", function() {
    $(this).autocomplete({
		source: uoms
    });
});

//for description of items in individual records
var itemDescriptions = [
	//Enter array items to enter as autocomplete for item descriptions
];

$("body").on('keydown.autocomplete', ".descriptions", function() {
    $(this).autocomplete({
		source: itemDescriptions
    });
});