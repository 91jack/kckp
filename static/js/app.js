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
				localStorage.setItem('token',data.obj);

				window.location.href = 'step2.html';
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
	   	console.log(data)
		localStorage.setItem('accidentId',data.obj);
	   	window.location.href = 'step5.html'
	   }
	})
	 
});
//获取本地的事件信息
var Atoken = localStorage.getItem('token');
var AaccidentId = localStorage.getItem('accidentId');

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
	



//step7
$('#handle .handletype').click(function(){
	var handleType = $(this).attr('data');
	$.ajax({
		type:"post",
		url:choseHandleTypeUrl,
		async:true,
		data:{
			token:Atoken,
			handleType:handleType,
			accidentId:AaccidentId
		},
		success:function(data){
			console.log(data);
			console.log(Atoken);
			console.log(AaccidentId);
		}
	})
});




	
//step8
$('.page8.content .btn-blue').click(function(){
	window.location.href = 'step8-1.html';
})


//step8-1


var name = $('#name').val();
//判断身份证号是否18位
var reg = /^\d{15}||\d{18}$/;
var cnumber =$('#cnumber').val();
if (!reg.test(cnumber)) {
	cnumber='身份证信息有误，请重新输入';
}
//判断手机号是否11位
var re = /^1\d{10}$/;
if(!re.test(teiNum)){
	teiNum='手机号码有误，请重新输入'
}
var teiNum =$('#telnum').val();
var carNum = $('#carnum').val();
var numKind = $('#checkKinds').html();
var numKindCode = $('#checkKinds').attr('code');
var insurance = $('#insuranceKinds').html();
var insuranceCode = $('#insurance').attr('code');
$('#over').click(function(){
	$('.modal').css('display','block');
	var str = '';
	str += '<li>姓名：'+name+'</li>'
					+'<li>身份证号码：'+cnumber+'</li>'
					+'<li>手机号码：'+teiNum+'</li>'
					+'<li>号牌号码：'+carNum+'</li>'
					+'<li>号牌种类：'+numKind+'</li>'
					+'<li>保险公司：'+insurance+'</li>'
					+'<li class="color-orange">请认证核实你的信息</li>';
	$('.modal .info-modal').children('ul').html('');
	$('.modal .info-modal').children('ul').append(str);
})

$('.modal').click(function(){
	$('.modal').css('display','none');
})
$('.modal .info-modal .btn-bottom span').click(function(){
	$('.modal').css('display','none');
})
$('#ca').click(function(){
	$('#driving').css('display','block');
})
$('#cam').click(function(){
	$('#mushytown').css('display','block')
})
$('#default').click(function(){
	$('#driving').css('display','none');
})
$('#default1').click(function(){
	$('#mushytown').css('display','none');
})
$('.del-modal.page8-1').click(function(){
	$('.del-modal.page8-1').css('display','none');
})
$('#itsRight').click(function(){
	$.ajax({
		type:"POST",
		url:addAccidentUserUrl,
		data:{
			token:Atoken,
			accidentId:AaccidentId,
			name:name,
			cardNo:cnumber,
			phone:teiNum,
			carNo:carNum,
			carType:numKindCode,
			insuranceId:insuranceCode,
			firstpic:'',
			secondpic:''
		},
		success:function(data){
			console.log(data);
		}
	})
})
//step11

