// 移动端响应式适配
(function () {
    var html = document.documentElement;

    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width /10 + 'px';
    }

    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();

// 获取本地时间



// 返回上一页
$('#goback').on('click', function(){
	window.history.back();
})

// 首页 index.html

// 登录
// 获取验证码
		
$('#getcode').on('click',function(){
	$.ajax({
	    type: "POST",
	    url: yzcodeUrl,
	  	data:{
			phone:$('#phone').val(),
			type:'4'
		},
	    success: function(data){
	   		//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.status == 2000){
				console.log(data)
				$('#yzcode').val(data.obj)
			}else{
				console.log(data)
			}
	    }
	})
})	

// 登录
$('#login').on('click',function(){
	$.ajax({
	    type: "POST",
	    url: loginUrl,
	  	data:{
			loginType:'2',
			phoneType:'2',
			userName:$('#phone').val(),
			yzcode: $('#yzcode').val()
		},
	    success: function(data){
	   		//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.status == 2000){
				console.log(data)
				
				// localstorge.token
				window.location.href = 'step2.html'
				
				
			}else{
				console.log(data)
			}
	    }
	})	
})


// step4.html 
// 创建事故
$('#createAccident').on('click', function(){
	 
	$.ajax({
	   type: "POST",
	   url: createAccidentUrl,
	   data: {
	   	type:'2',
	   	token:'3661363439356430613064343464366539306566306664353466313962643034',
	   },
	   success: function(data){
	   	console.log(res)
	   	// 
	   }
	})
	 
});


//












		
		
		
//page5
//$('.page5.content .where span').click(function(){
//	if($(this).hasClass('active')){
//		$(this).siblings('span').addClass('active')
//		$(this).removeClass('active');
//	}else{
//		$(this).siblings('span').removeClass('active')
//		$(this).addClass('active');
//	}
//})
//摄像头

//$('.page5.content .photos .box .picblue').click(function(){
//
//})