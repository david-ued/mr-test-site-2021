// JavaScript Document
$(function () {

	
});
var captureOutboundLink = function(url, page) {
    // ga('send', 'event', 'officialSite', 'navigate-click', page, {
    //   'hitCallback': function(){
	// 	  console.log('dd');
	// 	  // document.location = url;
	// 	}
	// });
	ga('send', 'event', 'outbound', 'click', page, {
		'transport': 'beacon',
		'hitCallback': function(){document.location = url;}
	  });
	  document.location = url
 }
$( window ).load(function(e) {
  $.get("https://itunes.apple.com/tw/lookup?id=425309574", function(data, status) {
      if (status == "success") {
          var appVersion = data.results[0].version;
          $('.js-app-version').text(appVersion);
      } else {
          $('.js-app-version').text('8.0.0');
      }
  }, 'json').fail(function() {
      $('.js-app-version').text('8.0.0');
  });

	if($(".page-index").length > 0){
		Page.initScroll();
	}

	// Page.initFireworksAni();
	Page.initPopups();
	Page.initResize();

	// Page.initStoreAni();
	// Page.initCardAni();
	// Page.initFavAni();

	$(".btn-to-top").click(function(){
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	})
	$(".page-hash-link").each(function(ix,ele){
		$(this).click(function(){
			var _a  = $(this);
			var _div = $(_a.attr("href"));
			if(_div.length>0){
				$('html, body').animate({
					scrollTop: _div.offset().top
				}, 500);
			}
		})
	})
	if(Page.isIE){
		$("body").addClass("isie");
	}else{
		$("body").addClass("noie");
	}
	
})

var IndexPage = {

}
var Page = {
	LOG:function(s){
		if ('console' in self && 'log' in console) console.log(s)
	  	else false
	}
}
Page.rwdLine = 768;
Page.isScrolling = false;
Page.initFavAni = function(){
	if($(".fav-cell-group").length > 0 ){

		$(".fav-cell-group").each(function(ix,ele){
			var _group = $(this);
			_group.data("Interval",setInterval(function(){

				var _len = _group.find(".fav-cell-list li").length;

				Page.LOG("Interval:"+_len);

				var _last = _group.find(".fav-cell-list li").eq(_len-1);
				_last.addClass("ready");
				_group.find(".fav-cell-list").prepend(_last);
				setTimeout(function(){
					_last.removeClass("ready");
				},100);
				
			},1000));

		})
	}
}
Page.initStoreAni = function(){

	if($(".store-map-group").length>0){
		$(".store-map-group").each(function(ix,ele){
			var _group = $(this);
			_group.data("playTimes",0);
			_group.data("childLen",_group.find(".map-mark").length);
			_group.data("maxTimes",_group.find(".map-mark").length + 2);


			_group.data("Interval",setInterval(function(){
				var _currid = _group.data("playTimes");
				var _nexid = _currid+1;

				if(_group.find(".map-mark").eq(_currid).length > 0 ){
					_group.find(".map-mark").eq(_currid).addClass("active");
					_group.find(".place-list li").eq(_currid).addClass("active");
				}
				_currid = _nexid;
				if(_nexid >= _group.data("maxTimes")){
					_group.find(".map-mark").removeClass("active");
					_group.find(".place-list li").removeClass("active");
					_group.data("playTimes",0);
				}else{
					_group.data("playTimes",_nexid);
				}

			},1000));
			


		})
	}
}
Page.initCardAni = function(){
	if($(".card-screens").length>0){
		Page.RunCardAni();
	}
}


Page.RunCardAni = function(){
	if(Page.clientWidth() < 768 ){
		$(".card-screen-3").addClass("_step-2");
		$(".card-screen-2").addClass("_step-1")
	}else{
		setTimeout(function(){
			$(".card-screen-3").addClass("_step-1")
			setTimeout(function(){
				$(".card-screen-3").addClass("_step-2").removeClass("_step-1");
				$(".card-screen-2").addClass("_step-1")
				setTimeout(function(){
					$(".card-screen-3").addClass("reset");
					$(".card-screen-2").addClass("reset");

					
					setTimeout(function(){
						$(".card-screen-3").removeClass("_step-2").addClass("_step-0").hide();
						$(".card-screen-2").removeClass("_step-1").addClass("_step-0").hide();

						setTimeout(function(){
							$(".card-screen-3").fadeIn().removeClass("reset");
							$(".card-screen-2").fadeIn().removeClass("reset");
							Page.RunCardAni();
						},50);

						//Page.RunCardAni();
					},100);

				},3000);
			},1400);
		},800);
	}
	
}
Page.initPopups = function(){
	if($('.open-popup-link').length > 0){
		var iframeObjConfig = {
	       markup: '<div class="mfp-iframe-scaler popup-iframe-css">'+
	                        '<div class="mfp-close"></div>'+
	                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen>            </iframe>'+
	                    '</div>'
	   };
		$('.open-popup-link').magnificPopup({type: 'iframe',iframe: iframeObjConfig,fixedContentPos: true,
  callbacks: {
    beforeOpen: function() {
      $('html').addClass('mfp-helper'); },
    close: function() { 
      $('html').removeClass('mfp-helper'); }
  }});
	}
	
}
Page.initFireworksAni = function(){
	if($(".ani-firework").length > 0){
		$(".ani-firework").each(function(ix,ele){
			var _firew  =$(this);
			_firew.data("frameid",0);

			setInterval(function(){ 
				var _id1 = _firew.data("frameid");
				var _id2 = _id1 +1;
				if(_id2 > 2){
					_id2 = 0;
				}
				var _pos = (2-_id2) *118;
				_firew.data("frameid",_id2);

				_firew.css({"background-position":"center -"+_pos+"px"});
				
			}, 300);
		})
	}
}
Page.mmenuSwitch = function(){
	if($(".page-nav-menu").hasClass("active")){
		$(".page-nav-menu").removeClass("active")
	}else{
		$(".page-nav-menu").addClass("active")
	}
}
Page.initResize = function(){
	Page.ResizeDetect();
	$( window ).resize(function() {
  		Page.ResizeDetect();
	});
}
Page.ResizeDetect = function(){
	if(Page.clientWidth() >= Page.rwdLine){
		$("body").removeClass("mobile").addClass("destop");

		$(".mobile-set-fit").css({"transform":"scale(6%, 6%)"})
	}else{
		$("body").removeClass("destop").addClass("mobile");
	}

	// if(Page.clientWidth() > 980 ){
	// 	$(".mobile-set-fit").css({"transform":"scale(1, 1)"});
	// 	$(".mobile-front-zoom-auto").css({"zoom":"1"});
	// }else if(Page.clientWidth() < 768 ){
	// 	if(Page.clientWidth() > 500){
	// 		$(".mobile-set-fit").css({"transform":"scale(1, 1)"});
	// 		$(".mobile-front-zoom-auto").css({"zoom":"1"});
	// 	}else{
	// 		var s = Page.clientWidth()/500; 
	// 		$(".mobile-front-zoom-auto").each(function(ix,ele){
	// 			$(".mobile-front-zoom-auto").css({"zoom":s});
	// 		});
	// 		$(".mobile-set-fit").each(function(ix,ele){

	// 			if($(this).hasClass("ix-s6-mobile-set")){
	// 				s = Page.clientWidth()/450; 
	// 			}
	// 			$(this).css({"transform":"scale("+s+", "+s+")"});
				
	// 			var _oh = $(this).height() ;
	// 			var _nh = _oh * s;
	// 			var _hpt = parseInt((_oh - _nh)/2);
	// 			var _hpb = parseInt((_oh - _nh)/2);

	// 			if($(this).hasClass("ix-s3-mobile-set")){
	// 				_hpb = _hpb + 40;
	// 			}
	// 			if($(this).hasClass("ix-s5-mobile-set")){
	// 				_hpb = _hpb + 30;
	// 			}
	// 			if($(this).hasClass("ix-s6-mobile-set")){
	// 				if(Page.clientWidth() > 400 ){
	// 					_hpb = _hpb + 250;
	// 				}else if(Page.clientWidth() > 320){
	// 					_hpb = _hpb + 230;
	// 				}else{
	// 					_hpb = _hpb + 200;
	// 				}
	// 			}
	// 			$(this).css({"transform":"scale("+s+", "+s+")","margin-top":-_hpt+"px","margin-bottom":-(_hpb)+"px"});
	// 			//-36% 0% -36% 0%;

	// 		});


	// 	}
	// }else{
	// 	var s = Page.clientWidth()/980; 
	// 	$(".mobile-set-fit").css({"transform":"scale("+s+", "+s+")"});

	// }

}
Page.initScroll = function(){
	$(window).scroll(function() {
		if(!Page.isScrolling){
			Page.isScrolling = true;
			Page.onScrollStart();
		}else{
			Page.onScrolling();
		}
		clearTimeout($.data(this, 'scrollTimer'));
		$.data(this, 'scrollTimer', setTimeout(function() {
			Page.isScrolling = false;
		    Page.onScrollStop();
		}, 200));
	});
}
Page.onScrolling = function(){
	if(Page.clientWidth() >= Page.rwdLine){
		Page.navDetect();
	}
	
}
Page.onScrollStart = function(){
	
}
Page.onScrollStop = function(){
	
}
if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	Page.isMobile = true;
	$("body").addClass("mobile");
}else{
	Page.isMobile = false;
	$("body").addClass("destop");
}

Page.navDetect = function(){
	if(Page.scrollTop() > 680){
		if(!$(".page-nav").hasClass("active")){
			$(".page-nav").addClass("active")
		}
	}else{
		if($(".page-nav").hasClass("active")){
			$(".page-nav").removeClass("active")
		}
	}
}

Page.clientWidth = function() {
	return Page.fixResults (
		window.innerWidth ? window.innerWidth : 0,
		document.documentElement ? document.documentElement.clientWidth : 0,
		document.body ? document.body.clientWidth : 0
	);
}
Page.clientHeight = function() {
	return Page.fixResults (
		window.innerHeight ? window.innerHeight : 0,
		document.documentElement ? document.documentElement.clientHeight : 0,
		document.body ? document.body.clientHeight : 0
	);
}
Page.scrollLeft = function() {
	return Page.fixResults (
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
Page.scrollTop = function() {
	return Page.fixResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
Page.getHeight = function() {
	Page.height = (document.height !== undefined) ? document.height : document.body.offsetHeight;
	return Page.height;
}
Page.fixResults  = function (n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel))){
		n_result = n_docel;
	}
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}
if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0)
{
 
  Page.isIE = true;
  if(navigator.appVersion.indexOf('Trident/') >0){
	  Page.isIE11 = true;
	  
  }
}
