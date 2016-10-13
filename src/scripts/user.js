"use strict";

$(document).ready(function() {

	$("header").removeClass('active');
	$("#nav-trigger").on("click", function(event) {
		event.stopPropagation();
		$("header").addClass('active');
	});
	$("#menu").on("click", function(event) {
		event.stopPropagation();
	});
	$("body").on("click", function() {
		$("header").removeClass('active');
	});

	$(".openSignUp").on("click", function(event) {
		event.stopPropagation();
		$(".signUp").addClass('active');
		$("body").addClass('lock');
	});
	$(".signUp .fa-close").on("click", function(event) {
		event.stopPropagation();
		$(".signUp").removeClass('active');
		$("body").removeClass('lock');
	});

	$('[name="phone"]').mask('+7 (000) 000-00-00');

	// $("[type='search']").on("blur", function() {
	// 	var value = $(this).val(),
	// 		trimed = $.trim(value);
	// 	$(this).val(trimed);
	// });

	// function getChar(e) {
	// 	if (e.which === null) {
	// 		if (e.keyCode < 32) return null;
	// 		return String.fromCharCode(e.keyCode);
	// 	}
	// 	if (e.which !== 0 && e.charCode !== 0) {
	// 		if (e.which < 32) return null;
	// 		return String.fromCharCode(e.which);
	// 	}
	// 	return null;
	// }

	// $("[type='search']").on("keypress", function(e) {
	// 	if (e.ctrlKey || e.altKey || e.metaKey) return;
	// 	var char = getChar(e);
	// 	if (!char) return;
	// 	this.value += char.toUpperCase();
	// 	return false;
	// });

	// var input = document.querySelector("[type='search']");
	// input.addEventListener('invalid', function(e) {
	// 	if (input.validity.valueMissing) {
	// 		e.target.setCustomValidity("Заполните это поле"); 
	// 	} else if (!input.validity.valid) {
	// 		e.target.setCustomValidity("Введите данные в формате: А111АА111, А111АА11"); 
	// 	} 
	// }, false);

});
