(function () {
		    var html = document.documentElement;
		
		    function onWindowResize() {
		        html.style.fontSize = html.getBoundingClientRect().width /10 + 'px';
		    }
		
		    window.addEventListener('resize', onWindowResize);
		    onWindowResize();
		})();
		
		
		
//page5
$('.page5.content .where span').click(function(){
	if($(this).hasClass('active')){
		$(this).siblings('span').addClass('active')
		$(this).removeClass('active');
	}else{
		$(this).siblings('span').removeClass('active')
		$(this).addClass('active');
	}
})
//摄像头

