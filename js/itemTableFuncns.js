//script to convert number figures to words
function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}


/*script to dynamically add rows in billing items table
script to calculate all prices in billing items table*/

$(document).ready(function(){
	
	//adding a new row to the table of billing items
	$("#addRecord").click(function(){
			
		//adding a new row to the table
		var newRow = '<tr>' +
						'<td>'+
							'<h5 class="record-number">'+
								($(".bill-items tbody tr").length+1)+
							'</h5>'+
							'<div class="margin-top-220">'+
								'<button class="btn btn-default clear-record">Clear</button>'+
							'</div>'+
							'<div>'+
								'<button class="btn btn-default remove-record">Remove</button>'+
							'</div>'+
						'</td>' +
						'<td>'+
							'<div>'+
								'<div>'+
									'Description: <input class="form-control itemName" style="display: inline; width: 600px" type="text">' +
								'</div>'+
								'<div>'+
									'HSN/SAC: <input class="form-control hsn" type="text" style="width:125px">'+
								'</div>'+
								'<div class="col-sm-4">'+
									'QTY: <input value="0" class="form-control price-calc qty" type="text" style="width:90px">'+
								'</div>'+
								'<div class="col-sm-4">'+
									'UOM: '+
									'<input class="form-control uoms uom" type="text" style="width:90px">'+
									/*'<select class="form-control uoms" style="width:120px">'+
										'<option value=""></option>'+
										'<option value="Nos">Nos</option>'+
										'<option value="Metres">Metres</option>'+
										'<option value="Pieces">Pieces</option>'+
										'<option value="Kg">Kg</option>'+
									'</select>'+*/
								'</div>'+
								'<div class="col-sm-4">'+
									'RATE: <input value="0" class="form-control price-calc rate" type="text" style="width:90px">'+
								'</div>'+
								'<div class="col-sm-4">'+
									'AMOUNT: <input value="0" class="form-control amount" type="text" style="width:130px" disabled>'+
								'</div>'+
								'<div class="col-sm-4">'+
									'Less DISCOUNT%: <input value="0" class="form-control price-calc discount" type="text" style="width:90px">'+
								'</div>'+
								'<div class="col-sm-4">'+
									'Taxable Value: <input value="0" class="form-control taxableValue" type="text" style="width:130px" disabled>'+
								'</div>'+
							'</div>'+
						'</td>'+
						'<td>'+
							'<div>'+
								'CGST:'+
								'<div>'+
									'Rate %: <select class="form-control price-calc cgstRate" '+
									//checking whether cgst dropdown should be disabled
									(checkWhichTaxRateToBeApplied() == "CGST-SGST rates" ? " " : " disabled ") +
									'style="display: inline;width:87px">'+
										'<option value="0">0</option>'+
										'<option value="0.125">0.125</option>'+
										'<option value="1.5">1.5</option>'+
										'<option value="6">6</option>'+
										'<option value="9">9</option>'+
										'<option value="14">14</option>'+
										'<option value="18">18</option>'+
									'</select>'+
								'</div>'+
								'<div>'+
									'Amount: <input value="0" class="form-control cgstAmt" type="text" style="display: inline;width:130px" disabled>'+
								'</div>'+
							'</div>'+
							'<div>'+
								'SGST:'+
								'<div>'+
									'Rate %: <select class="form-control price-calc sgstRate" '+
									//checking whether sgst dropdown should be disabled
									(checkWhichTaxRateToBeApplied() == "CGST-SGST rates" ? " " : " disabled ") +
									'style="display: inline;width:87px">'+
										'<option value="0">0</option>'+
										'<option value="0.125">0.125</option>'+
										'<option value="1.5">1.5</option>'+
										'<option value="6">6</option>'+
										'<option value="9">9</option>'+
										'<option value="14">14</option>'+
										'<option value="18">18</option>'+
									'</select>'+
								'</div>'+
								'<div>'+
									'Amount: <input value="0" class="form-control sgstAmt" type="text" style="display: inline;width:130px" disabled>'+
								'</div>'+
							'</div>'+
							'<div>'+
								'IGST: '+
								'<div>'+
									'Rate %: <select class="form-control price-calc igstRate" '+
									//checking whether cgst dropdown should be disabled
									(checkWhichTaxRateToBeApplied() == "IGST rate" ? " " : " disabled ") +
									'style="display: inline;width:87px">'+
										'<option value="0">0</option>'+
										'<option value="0.125">0.125</option>'+
										'<option value="1.5">1.5</option>'+
										'<option value="6">6</option>'+
										'<option value="9">9</option>'+
										'<option value="14">14</option>'+
										'<option value="18">18</option>'+
									'</select>'+
								'</div>'+
								'<div>'+
									'Amount: <input value="0" class="form-control igstAmt" type="text" style="display: inline;width:130px" disabled>'+
								'</div>'+
							'</div>'+
						'</td>'+
						'<td><input value="0" class="form-control total" type="text" style="width:130px" disabled></td>'+
					'</tr>';
				
		$(".bill-items tbody").append(newRow);
		
	});
	
});

//setting precision of number to 2
function convertToMoney(str){
	return parseFloat(str).toLocaleString('en-IN', { maximumFractionDigits: 2,minimumFractionDigits: 2 });
}

//converting number by removing decimals
function convertToFinalMoney(str){
	return parseFloat(str).toLocaleString('en-IN', { maximumFractionDigits: 0,minimumFractionDigits: 0 });
}

//converting string to float
function convertToFloat(str){
	str = str.replace(/[,]/g,"");
	return parseFloat(str);
}

//price is selected when trying to click on it to change
$("body").on("click",".price-calc",function(){
	$(this).select();
});

//changing price total of the item record which is currently being entered
$("body").on("keyup change",".price-calc",function(){

	validateInput(this);
	
	var selectedRecord = $(this).closest("tr");
			
	//changing the amount
	var amount = convertToFloat($(selectedRecord).find(".qty").val())*convertToFloat($(selectedRecord).find(".rate").val());
	$(selectedRecord).find(".amount").val(convertToMoney(amount));
	
	//changing taxable value
	var taxableValue = convertToFloat($(selectedRecord).find(".amount").val())*(100-convertToFloat($(selectedRecord).find(".discount").val()))/100;
	$(selectedRecord).find(".taxableValue").val(convertToMoney(taxableValue));
	
	//changing cgst amount
	var cgstAmount = convertToFloat($(selectedRecord).find(".taxableValue").val())*convertToFloat($(selectedRecord).find(".cgstRate").val())/100;
	$(selectedRecord).find(".cgstAmt").val(convertToMoney(cgstAmount));
	
	//changing sgst amount
	var sgstAmount = convertToFloat($(selectedRecord).find(".taxableValue").val())*convertToFloat($(selectedRecord).find(".sgstRate").val())/100;
	$(selectedRecord).find(".sgstAmt").val(convertToMoney(sgstAmount));
	
	//changing igst amount
	var igstAmount = convertToFloat($(selectedRecord).find(".taxableValue").val())*convertToFloat($(selectedRecord).find(".igstRate").val())/100;
	$(selectedRecord).find(".igstAmt").val(convertToMoney(igstAmount));
	
	//changing total amount of single row
	var total = convertToFloat($(selectedRecord).find(".taxableValue").val());
	
	if(checkWhichTaxRateToBeApplied() == "CGST-SGST rates"){
		total += convertToFloat($(selectedRecord).find(".cgstAmt").val())+convertToFloat($(selectedRecord).find(".sgstAmt").val());
	}else{
		total += convertToFloat($(selectedRecord).find(".igstAmt").val());
	}
				
	$(selectedRecord).find(".total").val(convertToMoney(total));
	
	changeOverallTotals();
	
});

//changing overall price total of all item records(bottom section)
function changeOverallTotals(){
	
	var totalAmtBeforeTax=0,cgstTotal=0,sgstTotal=0;igstTotal=0,gstTotal=0,totalAmtHidden=0,totalDiscountHidden=0;
	
	$(".bill-items tbody tr").each(function(){
		
		//changing total of all amounts before discount
		totalAmtHidden += convertToFloat($(this).find(".amount").val());
		
		//changing total of all discounts
		totalDiscountHidden += convertToFloat($(this).find(".discount").val());
		
		//changing total amount before tax
		totalAmtBeforeTax += convertToFloat($(this).find(".taxableValue").val());
		
		//changing total cgst
		cgstTotal += convertToFloat($(this).find(".cgstAmt").val());
		
		//changing total sgst
		sgstTotal += convertToFloat($(this).find(".sgstAmt").val());
		
		//changing total igst
		igstTotal += convertToFloat($(this).find(".igstAmt").val());
		
	});
	
	//changing total of all amounts before discount
	$("#totalAmtHidden").val(convertToMoney(totalAmtHidden));
	
	//changing total of all discounts
	$("#totalDiscountHidden").val(convertToMoney(totalDiscountHidden));
	
	//changing total amount before tax
	$("#totalAmtBeforeTax").val(convertToMoney(totalAmtBeforeTax));
	
	//changing total cgst
	$("#cgstTotal").val(convertToMoney(cgstTotal));
	
	//changing total sgst
	$("#sgstTotal").val(convertToMoney(sgstTotal));
	
	//changing total igst
	$("#igstTotal").val(convertToMoney(igstTotal));
	
	//changing total gst
	if(checkWhichTaxRateToBeApplied() == "CGST-SGST rates"){
		gstTotal = convertToFloat($("#cgstTotal").val()) + convertToFloat($("#sgstTotal").val());
	}else{
		gstTotal = convertToFloat($("#igstTotal").val())
	}
	$("#gstTotal").val(convertToMoney(gstTotal));
	
	//changing total amount after tax
	var totalAmtAfterTax = convertToFloat($("#totalAmtBeforeTax").val()) + convertToFloat($("#gstTotal").val());
	$("#totalAmtAfterTax").val(convertToFinalMoney(totalAmtAfterTax));
	
	//changing amount in words
	if(convertToFinalMoney(totalAmtAfterTax) == 0){
		$("#amtInWords").text("Zero Only");
	}
	else{
		$("#amtInWords").text(convertNumberToWords(convertToFinalMoney(totalAmtAfterTax))+" Only");
	}
	
}

//clearing all the fields for the particular item record
$("body").on("click",".clear-record",function(){
	
	var selectedRecord = $(this).closest("tr");
	
	//resetting all fields to default values
	$(selectedRecord).find(".itemName").val("");
	$(selectedRecord).find(".hsn").val("");
	$(selectedRecord).find(".qty").val(0);
	$(selectedRecord).find(".uom").val("");
	$(selectedRecord).find(".rate").val(0);
	$(selectedRecord).find(".amount").val(0);
	$(selectedRecord).find(".discount").val(0);
	$(selectedRecord).find(".taxableValue").val(0);
	$(selectedRecord).find(".cgstRate").val(0);
	$(selectedRecord).find(".cgstAmt").val(0);
	$(selectedRecord).find(".sgstRate").val(0);
	$(selectedRecord).find(".sgstAmt").val(0);
	$(selectedRecord).find(".igstRate").val(0);
	$(selectedRecord).find(".igstAmt").val(0);
	$(selectedRecord).find(".total").val(0);
	
	changeOverallTotals();
	
});

//removing the item record from the list table
$("body").on("click",".remove-record",function(){
	
	var recordTotalBeforeRemoving = $(".bill-items tbody tr").length;
	if(recordTotalBeforeRemoving == 1){
		alert("There should be at least one item in the invoice");
	}else{
		$(this).closest("tr").remove();
		
		var num = 1;
		//changing the item number of each record
		$(".bill-items tbody tr").each(function(){
			$(this).find(".record-number").text(num++);
		});
		
		changeOverallTotals();
	}
	
	
});

//validate the input entered in the item table
function validateInput(prop){
	
	//if invalid input is entered, set it to 0
	if($(prop).val().trim() == "" || isNaN($(prop).val())){
		$(prop).val(0);
	}
	
}

//update which i.e cgst-sgst combo or igst is to be applied(from dropdown) from buyer state
$("#buyerState").change(function(){
	setTaxRatesToBeApplied();
});

//check whether cgst-sgst combo or igst is to be applied(from autocompletes) from buyer state
function checkWhichTaxRateToBeApplied(){
	
	if($("#buyerState").val() == "27"){
		return "CGST-SGST rates";
	}else{
		return "IGST rate";
	}

}

//update which i.e cgst-sgst combo or igst is to be applied(from autocompletes) from buyer state
function setTaxRatesToBeApplied(){
	
	var selectedTaxRate = checkWhichTaxRateToBeApplied();
	var taxRateMsg = "You have selected "+$("#buyerState :selected").text()+" as the buyer's state. Hence only "+selectedTaxRate+" apply. The updated tax rates will be set to 0. Are you sure you want to continue?";
	
	if(confirm(taxRateMsg)){
		
		if(selectedTaxRate == "CGST-SGST rates"){
			//disable igst rates
			$(".bill-items tbody tr").each(function(){
				$(this).find(".igstRate").prop("disabled", true);
				$(this).find(".igstRate").val(0);
				$(this).find(".igstAmt").val(0);
				$(this).find(".cgstRate").prop("disabled", false);
				$(this).find(".cgstRate").val(0);
				$(this).find(".cgstAmt").val(0);
				$(this).find(".sgstRate").prop("disabled", false);
				$(this).find(".sgstRate").val(0);
				$(this).find(".sgstAmt").val(0);
				
				//calculate item totals again
				$(this).find(".price-calc").trigger("change");
			});
		}else{
			//disable cgst-sgst rates
			$(".bill-items tbody tr").each(function(){
				$(this).find(".cgstRate").prop("disabled", true);
				$(this).find(".cgstRate").val(0);
				$(this).find(".cgstAmt").val(0);
				$(this).find(".sgstRate").prop("disabled", true);
				$(this).find(".sgstRate").val(0);
				$(this).find(".sgstAmt").val(0);
				$(this).find(".igstRate").prop("disabled", false);
				$(this).find(".igstRate").val(0);
				$(this).find(".igstAmt").val(0);
				
				//calculate item totals again
				$(this).find(".price-calc").trigger("change");
			});
		}
		
		changeOverallTotals();
	}
	
}

//convert date string to ddmmyyyy format
function convertToDdMmYyyyFormat(usualFormat){
	if(usualFormat != ""){
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = new Date(usualFormat);
		return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
	}else{
		return usualFormat;
	}
}
