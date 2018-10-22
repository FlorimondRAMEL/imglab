var prev_img=$(this);
$(document).on("click keypress", function(){
	$("[id^='thumbnail_']").on("click keypress" , function(){
		prev_img.css({"opacity": "0.3"});
		$(this).css({"opacity": "1"});
		prev_img=$(this);
		})
	})
