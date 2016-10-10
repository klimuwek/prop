"use strict";

$(document).ready(function() {

	$("[type='search']").on("blur", function() {
		var value = $(this).val(),
			trimed = $.trim(value);
		$(this).val(trimed);
	});

	function getChar(e) {
		if (e.which === null) {
			if (e.keyCode < 32) return null;
			return String.fromCharCode(e.keyCode);
		}
		if (e.which !== 0 && e.charCode !== 0) {
			if (e.which < 32) return null;
			return String.fromCharCode(e.which);
		}
		return null;
	}

	$("[type='search']").on("keypress", function(e) {
		if (e.ctrlKey || e.altKey || e.metaKey) return;
		var char = getChar(e);
		if (!char) return;
		this.value += char.toUpperCase();
		return false;
	});

	var input = document.querySelector("[type='search']");
	input.addEventListener('invalid', function(e) {
		if (input.validity.valueMissing) {
			e.target.setCustomValidity("Заполните это поле"); 
		} else if (!input.validity.valid) {
			e.target.setCustomValidity("Введите данные в формате: А111АА111, А111АА11"); 
		} 
	}, false);

});
