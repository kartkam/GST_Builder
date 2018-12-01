//script to upload and populate excel template

//get chosen template
var template = "";

//initial row number of table
var recordNumber = 1;

// Promise is not defined in IE so xlsx-populate uses a polyfill via JSZip.
var Promise = XlsxPopulate.Promise;

//choosing template out of available options
var radioBlank = document.getElementById("radio-blank");
var radioLocal = document.getElementById("radio-local");
var urlInput = document.getElementById("url-input");
var fileInput = document.getElementById("file-input");

function getWorkbook() {
	if (radioBlank.checked) {
		return XlsxPopulate.fromBlankAsync();
	} 
	else if (radioLocal.checked) {
		var file = fileInput.files[0];
		if(file != null) template = file.name;
		if (!file) return Promise.reject("You must select a file.");
		return XlsxPopulate.fromDataAsync(file);
	}
}

function generate(type) {
	return getWorkbook()
		.then(function (workbook) {
			//choose way of populating depending on template
			switch(template){
				case "GST Invoice Format NEW.xlsx": populateGSTSupplyForNewTemplate(workbook);
			}
			return workbook.outputAsync(type);
		})
}

function generateBlob() {
	return generate()
	
		.then(function (blob) {
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				//window.navigator.msSaveOrOpenBlob(blob, "invoice.xlsx");
			} else {
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement("a");
				document.body.appendChild(a);
				a.href = url;
				a.download = "/GSTBilling/"+$("#invoiceNo").val() != "" ? $("#invoiceNo").val() : "invoice"+".xlsx";
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
			}
		})
		.catch(function (err) {
			alert(err.message || err);
			throw err;
		});
}

function generateBase64() {
	return generate("base64")
		.then(function (base64) {
		
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				throw new Error("Navigating to data URI is not supported in IE.");
			} else {
				location.href = "data:" + XlsxPopulate.MIME_TYPE + ";base64," + base64;
			}
		})
		.catch(function (err) {
			alert(err.message || err);
			throw err;
		});
}

function populateGSTSupplyForNewTemplate(workbook){
	var sheet1 = workbook.sheet(0);
	
	//populating user details
	sheet1.cell("E7").value($("#invoiceNo").val());
	sheet1.cell("E8").value(convertToDdMmYyyyFormat($("#dtOfIssue").val()));
	sheet1.cell("E9").value( ($("#challanNo").val() == "" ? "-" : $("#challanNo").val()) +","+convertToDdMmYyyyFormat($("#challanDate").val()));
	sheet1.cell("P3").value($("input[name=invoiceVersion]:checked").val());
	sheet1.cell("M7").value($("#transportMode").val());
	sheet1.cell("M8").value($("#vehicleNo").val());
	sheet1.cell("M9").value(convertToDdMmYyyyFormat($("#dtOfSupply").val()));
	
	//sheet1.cell("BI11").value("GSTIN : "+$("#gstIn").val());
	//sheet1.cell("BI12").value("STATE : "+$("#state").val());
	//sheet1.cell("B43").value("CIN NO : "+$("#cinNo").val());
	
	//populating buyer details
	sheet1.cell("D12").value($("#buyerName").val());
	sheet1.cell("D13").value($("#buyerBillAddr").val());
	sheet1.cell("D15").value($("#buyerState option:selected").text());
	sheet1.cell("J15").value($("#buyerState").val());
	sheet1.cell("D16").value($("#buyerGstIn").val());
	
	//populating consignee details
	sheet1.cell("M12").value($("#shipName").val());
	sheet1.cell("M13").value($("#shipDelAddr").val());
	sheet1.cell("M15").value($("#shipState option:selected").text());
	sheet1.cell("S15").value($("#shipState").val());
	sheet1.cell("M16").value($("#shipGstIn").val());
	
	//populating billing items in table
	var index = 19;
	$(".bill-items tbody tr").each(function(){
			
		if($(this).find(".itemName").val() != ""){
			
			sheet1.cell("B"+index.toString()).value(index-18);
			sheet1.cell("D"+index.toString()).value($(this).find(".itemName").val());
			sheet1.cell("E"+index.toString()).value($(this).find(".hsn").val());
			sheet1.cell("F"+index.toString()).value($(this).find(".uom").val());
			sheet1.cell("G"+index.toString()).value($(this).find(".qty").val());
			sheet1.cell("I"+index.toString()).value($(this).find(".rate").val());
			sheet1.cell("J"+index.toString()).value($(this).find(".amount").val());
			sheet1.cell("K"+index.toString()).value($(this).find(".discount").val());
			sheet1.cell("L"+index.toString()).value($(this).find(".taxableValue").val());
			
			if($(this).find(".cgstRate").val() != ""){
				sheet1.cell("M"+index.toString()).value($(this).find(".cgstRate").val()+"%");
			}
			sheet1.cell("N"+index.toString()).value($(this).find(".cgstAmt").val());
			
			if($(this).find(".sgstRate").val() != ""){
				sheet1.cell("O"+index.toString()).value($(this).find(".sgstRate").val()+"%");
			}
			sheet1.cell("P"+index.toString()).value($(this).find(".sgstAmt").val());
			
			if($(this).find(".igstRate").val() != ""){
				sheet1.cell("Q"+index.toString()).value($(this).find(".igstRate").val()+"%");
			}
			sheet1.cell("R"+index.toString()).value($(this).find(".igstAmt").val());
			sheet1.cell("S"+index.toString()).value($(this).find(".total").val());
			
			index++;
		}
		
		
	});
	
	//populating all totals
	sheet1.cell("J31").value($("#totalAmtHidden").val());
	//sheet1.cell("K31").value($("#totalDiscountHidden").val());
	sheet1.cell("L31").value($("#totalAmtBeforeTax").val());
	sheet1.cell("N31").value($("#cgstTotal").val());
	sheet1.cell("P31").value($("#sgstTotal").val());
	sheet1.cell("R31").value($("#igstTotal").val());
	sheet1.cell("S31").value($("#totalAmtAfterTax").val());
	sheet1.cell("R33").value($("#totalAmtBeforeTax").val());
	sheet1.cell("R34").value($("#cgstTotal").val());
	sheet1.cell("R35").value($("#sgstTotal").val());
	sheet1.cell("R36").value($("#igstTotal").val());
	sheet1.cell("R37").value($("#gstTotal").val());
	sheet1.cell("R38").value($("#totalAmtAfterTax").val());
	
	//bold value for amount in words
	sheet1.cell("B33").style("bold", true);
	sheet1.cell("B33").value("Amount in Words: "+$("#amtInWords").text());
	
	return workbook;
}