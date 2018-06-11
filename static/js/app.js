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
var myDate = new Date();
console.log(myDate)
var year = myDate.getFullYear();
var month = myDate.getMonth();
var day = myDate.getDate();
var newData = year+'-'+month+'-'+day;
console.log(newData);

var hour = myDate.getHours();
var minute =myDate.getMinutes();
if (minute<=9) {
	minute = '0'+minute;
}
var newTime = hour+':'+minute;
console.log(newTime)

var weekDay = myDate.getDay();
switch (weekDay){
	case 0:
		weekDay='星期一'
		break;
	case 1:
		weekDay='星期二'
		break;
	case 2:
		weekDay='星期三'
		break;
	case 3:
		weekDay='星期四'
		break;
	case 4:
		weekDay='星期五'
		break;
	case 5:
		weekDay='星期六'
		break;
	case 6:
		weekDay='星期日'
		break;
	default:
		break;
}
console.log(weekDay)


// 返回上一页
$('#goback').on('click', function(){
	window.history.back();
})

// 首页 index.html
//首页时间
var dateTime = month+'月'+day+'日 ' + weekDay
$('#indexTime').html(dateTime);


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
				window.localStorage.setItem('token',data.token);
				window.localStorage.setItem('accidentId',data.obj);

				window.location.href = 'step2.html';
			}else{
				console.log(data)
			}
	    }
	})	
})
//console.log(window.localStorage.getItem('token'));

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
	   	console.log(data)
	   	window.location.href = 'step5.html'
	   }
	})
	 
});


//step5事件交互
$('#address').click(function(){
	window.location.href = 'step5_1.html';
})
$('.page5.content .where span').click(function(){
	if($(this).hasClass('active')){
		$(this).siblings('span').addClass('active')
		$(this).removeClass('active');
		$(this).siblings('em').removeClass('active')
		$(this).next('em').addClass('active')
	}else{
		$(this).siblings('span').removeClass('active')
		$(this).addClass('active');
		$(this).siblings('em').removeClass('active')
		$(this).next('em').addClass('active')
	}
})
$('#nowData').html(newData);
$('#result').html(newTime);




//step5 上传照片
//$('#photo1').change(function() {
//	var objUrl = getObjectURL(this.files[0]);
//	//console.log("objUrl=" + objUrl);
////	if(objUrl) {
////		$("#userlogo").attr("src", objUrl);
////	}
//	// 图片地址
//	console.log(objUrl)
//})

//建立一個可存取到該file的url  
function getObjectURL(file) {
	var url = '';
	if(window.createObjectURL != undefined) {
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
$('#step5 .takePhotos input').each(function(){
	$(this).change(function(){
		//临时地址
		var objUrl = getObjectURL(this.files[0]);
		if(objUrl) {
			$(this).parent().siblings().children('img').attr("src", objUrl);
		}
		// 图片地址
		console.log(objUrl)
		
		console.log($(this).parent().siblings().children('img')[0].files[0])
		
	});
})
//$('.takePhotos').click(function(){
	//$(this).siblings('input').css('display','block');
	
	
//})

//step5页面跳转

$('#subpic').click(function(){
	var isExpressway = $('.where em.active').attr('isExpressway');
	var accidentId = $.totalStorage('accidentId');
	var token = $.totalStorage('token');
	var isExpressway = $('.where em.active').html();
	$.ajax({
	   type: "POST",
	   url: uploadImgUrl,
	   data: {
	   	type:'2',
	   	token:'3661363439356430613064343464366539306566306664353466313962643034',
	   	accidentId:accidentId
//	   	address:token
//	   	address_xy
//	   	isExpressway
//	   	datetime
//	   	weather
//	   	mainPic1
//	   	mainPic2
//	   	mainPic3
//	   	otherPic1
//	   	otherPic2
//	   	otherPic3
	   },
	   success: function(data){
	   	console.log(data)
		window.location.href = 'step6.html';
	   }
	})
});
//		
	
	
	
//step8
$('.page8.content .btn-blue').click(function(){
//	alert(1);
	window.location.href = 'step8-1.html';
})
//step8-1
