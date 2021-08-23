// JavaScript Document

function switchImage(element, url){
	document.getElementById(element).src = url;
}

function mousePointer(pointer){
	if (pointer)
		document.body.style.cursor='pointer';
	else	document.body.style.cursor='default';
	
}


$(function(){ 
	$('#sel_quantity').change(function() {
		var newQty = $('#sel_quantity').val();
		if (newQty == 0){
			$('#span_quanityYes').hide();
			$('#span_quanityNo').show();
		}else{ 
			$('#span_quanityYes').show();
			$('#span_quanityNo').hide();
			$('#span_maskQty').html(newQty);
			var price = (Number($('#hid_priceSingle').val())*Number(newQty)).toFixed(2);
			$('#span_priceTotal').html(price);	
	
		}
	});
});
