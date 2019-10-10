

$("#btnconvert").click(function () {
	
	var amnt = $("#amountfrom").val();
	var fromCur = $("#divfrom").val();
	var toCur = $("#divto").val();
	
	var c = Cur$(amnt, fromCur, toCur);
	c.HTMLexchange("#amountto");
	
});
