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

});
