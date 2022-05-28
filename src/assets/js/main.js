$(window).on("load", function () {
	/*_____ Toggle _____*/
	$(document).on("click", ".toggle", function () {
		$(".toggle").toggleClass("active");
		$("html").toggleClass("flow");
		$("#nav").toggleClass("active");
	});
	$(document).on("click", "#nav .run_btn", function () {
		$(".toggle").removeClass("active");
		$("html").removeClass("flow");
		$("#nav").removeClass("active");
	});

	/*_____ Drop Down _____*/
	$(document).on("click", ".drop_btn", function (e) {
		e.stopPropagation();
		if ($(this).parents(".drop_cnt:first").hasClass("active")) $(this).parents(".drop_cnt:first").find(".drop_cnt:first").addClass("active");
		else {
			$(".drop_cnt").not($(this).parent().children(".drop_cnt")).removeClass("active");
			$(this).parents(".drop_down:first").find(".drop_cnt:first").toggleClass("active");
		}
	});
	$(document).on("click", ".drop_cnt", function (e) {
		e.stopPropagation();
	});
	$(document).on("click", function () {
		$(".drop_cnt").removeClass("active");
	});

	/*_____ Upload Blk _____*/
	$(document).on("click", ".upload_blk > button", function () {
		$(this).parent().children("input[type='file']").trigger("click");
	});
	$(document).on("change", "input[type='file']", function () {
		let file = $(this).val();
		if (this.files.length > 0) {
			$(this).parent(".upload_blk").children("button").text(file);
		} else {
			$(this).parent(".upload_blk").children("button").text("Choose File");
		}
	});

	/*_____ Popup _____*/
	$(document).on("click", ".popup", function (e) {
		if ($(e.target).closest(".popup ._inner, .popup .inside").length === 0) {
			$(".popup").fadeOut("3000");
			$("html").removeClass("flow");
			$("#vid_blk > iframe, #vid_blk > video").attr("src", "");
		}
	});
	$(document).on("click", ".x_btn", function () {
		$(".popup").fadeOut();
		$("html").removeClass("flow");
		$("#vid_blk > iframe, #vid_blk > video").attr("src", "");
	});
	$(document).keydown(function (e) {
		if (e.keyCode == 27) $(".popup .x_btn").click();
	});
	$(document).on("click", ".pop_btn", function () {
		var popUp = $(this).attr("data-popup");
		$("html").addClass("flow");
		$(".popup[data-popup= " + popUp + "]").fadeIn();
	});
	$(document).on("click", ".pop_btn[data-src]", function () {
		var src = $(this).attr("data-src");
		$("#vid_blk > iframe, #vid_blk > video").attr("src", src);
	});

	/*_____ FAQ's _____*/
	$(document).on("click", ".faq_blk > h6", function () {
		$(".faq_blk").not($(this).parent().toggleClass("active")).removeClass("active");
		$(".faq_blk > .txt").not($(this).parent().children(".txt").slideToggle()).slideUp();
	});
	// $(".faq_lst > .faq_blk:nth-child(1)").addClass("active");

	/*_____ Footer _____*/
	$(document).on("click", "footer h5.drop", function () {
		w = $(window).width();
		if (w < 991) {
			$(this).next(".list").slideToggle();
		}
	});

	/*_____ Wallet _____*/
	$(document).on("change", "[data-payment='wallet'] .lbl_btn > input.tglBlk", function () {
		let checked = this.checked;
		if (checked == true) {
			$(this).parents("[data-payment='wallet']").find(".inside_blk").slideToggle();
		} else $(this).parents("[data-payment='wallet']").find(".inside_blk").slideUp();
	});

	/*_____ Run Button _____*/
	$(document).on("click", ".run_btn", function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			console.log(hash);
			$("html, body").animate(
				{
					scrollTop: $(hash).offset().top - 20,
				},
				800
			);
		}
	});

	/*
	|----------------------------------------------------------------------
	|       OTHER JAVASCRIPT
	|----------------------------------------------------------------------
	*/

	$("#slick-serve").slick({
		dots: false,
		arrows: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 10000,
		speed: 1000,
		prevArrow: ".serve-prev",
		nextArrow: ".serve-next",
		variableWidth: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1030,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});
	$("#slick-case").slick({
		dots: false,
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 12000,
		speed: 1000,
		variableWidth: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1030,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});
});
