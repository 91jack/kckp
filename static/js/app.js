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
var year = myDate.getFullYear();
var month = myDate.getMonth()+1;
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
		weekDay='星期日'
		break;
	case 1:
		weekDay='星期一'
		break;
	case 2:
		weekDay='星期二'
		break;
	case 3:
		weekDay='星期三'
		break;
	case 4:
		weekDay='星期四'
		break;
	case 5:
		weekDay='星期五'
		break;
	case 6:
		weekDay='星期六'
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
var dateTime = month +'月'+day+'日 ' + weekDay
$('#indexTime').html(dateTime);

// 获取用户token
var token = localStorage.getItem('token');
var accidentId = localStorage.getItem('accidentId');
// 首页判断是否存在用户token
$('#quickstart').on('click',function(){
//	token = localStorage.getItem('token');
//	accidentId = localStorage.getItem('accidentId');
	
	if(token){
		window.location.href = 'step2.html';
	}else{
		window.location.href = 'login.html';
	}
})

//$('#index-user').on('click',function(){
//	if(token){
//		window.location.href = 'user.html';
//	}else{
//		window.location.href = 'login.html';
//	}
//})


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
	var token = localStorage.getItem('token');
	var accidentId = localStorage.getItem('accidentId');
	console.log(token)
	console.log(accidentId)
	if(token){
		window.location.href = 'step2.html';
	}else{
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
	}
	
	
})

// step4.html 
// 创建事故
$('#createAccident').on('click', function(){
	$.ajax({
	   type: "POST",
	   url: createAccidentUrl,
	   data: {
	   	type:'2',
	   	token: token,
	   },
	   success: function(data){
//	   	if(){
//	   		
//	   	}
	   	console.log(data)
	   	// 事故id
		localStorage.setItem('accidentId',data.obj);
	   	window.location.href = 'step5.html'
	   }
	})
	 
});
////获取本地的事件信息
//var token = localStorage.getItem('token');
//var accidentId = localStorage.getItem('accidentId');
//console.log(accidentId)

//step5事件交互
$(function(){
	if (localStorage.getItem('add')) {
		$('#detail-add').html(localStorage.getItem('add'))
	}
})
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


$('#step5 .takePhotos input').each(function(){
	$(this).change(function(){
		var that = $(this)
		uploadImg(that)
	});
})

// 图片上传通用函数
function uploadImg(that){
	var formData = new FormData();	
	formData.append('files',that[0].files[0]);
	formData.append('accidentId',accidentId)

	$.ajax({
		type:"post",
		url:uploadImgUrl,
		data: formData,
		processData: false,
        contentType: false,
        dataType: "json",
		success: function(data){
			if(data.status == 2000){
				console.log(data.list[0])
				that.parent().siblings().children('img').attr("src",data.list[0]).css({
					'width':'100%',
					'height':'2.66667rem',
					'margin-top':'0'
				});
			}
		}
	});
	that.closest('div').css('background','none');
}





//step5 提交照片进行审核
$('#subpic').click(function(){
	var isExpressway = $('.where em.active').attr('isExpressway')||'0';
	var dataTime = $('#nowData').html()+'  '+'   '+$('#result').html();
	var weather = $('#userResult').attr('data')||'雨';
	var otherPic1 = $('.ac-pic img').eq(3).attr('src') || '';
	var otherPic2 = $('.ac-pic img').eq(4).attr('src') || '';
	var otherPic3 = $('.ac-pic img').eq(5).attr('src') || '';
	$.ajax({
	   type: "post",
	   url: accidentImgUrl,
	   data: {
	   	token: token,
	   	accidentId:accidentId,
	   	address:localStorage.getItem('add'),
	   	address_xy:(localStorage.getItem('lng'),localStorage.getItem('lat')),
	   	isExpressway:isExpressway,
	   	datetime:dateTime,
	   	weather:weather,
	   	mainPic1:$('.ac-pic img').eq(0).attr('src'),
	   	mainPic2:$('.ac-pic img').eq(1).attr('src'),
	   	mainPic3:$('.ac-pic img').eq(2).attr('src'),
	   	otherPic1:otherPic1,
	   	otherPic2:otherPic2,
	   	otherPic3:otherPic3,
	   },
	   success: function(data){
	   	console.log(data);
	   	if(data.status==2000){
	   		var status = data.obj
	   		// 照片审核状态
	   		localStorage.setItem('status',data.obj);
	   		if (status==0) {
	   			window.location.href='step6-unpass.html';
	   		} else if(status==1){
	   			window.location.href='step6-pass.html';
	   		}
	   	}
	   }
	})
});
	
// step6 



//step7
$('#handle .handletype').click(function(){
	var handleType = $(this).attr('data');
	$.ajax({
		type:"post",
		url:choseHandleTypeUrl,
		async:true,
		data:{
			token:token,
			handleType:handleType,
			accidentId:accidentId
		},
		success:function(data){
			if(data.status==2000){
				window.location.href='step8.html'
			}
		}
	})
});




	
//step8
$('.page8.content .btn-blue').click(function(){
	window.location.href = 'step8-1.html';
})


//step8-1




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

//上传行驶证，驾驶证
$('#imSure input').each(function(){
	$(this).change(function(){
		var that = $(this)
		uploadImgFn(that)
	});
})
$('#imSure1 input').each(function(){
	$(this).change(function(){
		var that = $(this)
		uploadImgFn(that)
	});
})
function uploadImgFn(that){
	var formData = new FormData();	
	formData.append('files',that[0].files[0]);
	formData.append('accidentId',accidentId)
	$.ajax({
		type:"post",
		url:uploadImgUrl,
		data: formData,
		processData: false,
        contentType: false,
        dataType: "json",
		success: function(data){
			if(data.status == 2000){
				console.log(data.list[0])
				that.parent().siblings('img').attr("src",data.list[0]);
			}
		}
	});
}
$('#over').click(function(){
	$('.modal').css('display','block');
	var name = $('#name').val();
	//判断身份证号是否18位
	var reg = /^\d{15}||\d{18}$/;
	var cnumber =$('#cnumber').val();
	if (!reg.test(cnumber)) {
		$('#cnumber').val('身份证信息有误，请重新输入！');
	}
	//判断手机号是否11位
	var re = /^1\d{10}$/;
	var teiNum =$('#telnum').val();
	if(!re.test(teiNum)){
		teiNum='手机号码有误，请重新输入！'
	}
	var carNum = $('#carnum').val();
	var numKind = $('#checkKinds').html();
	var numKindCode = $('#checkKinds').attr('code');
	var insurance = $('#insuranceKinds').html();
	var insuranceCode = $('#insurance').attr('code');
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
$('#itsRight').click(function(){
	$.ajax({
		type:"POST",
		url:addAccidentUserUrl,
		data:{
			token:token,
			accidentId:accidentId,
			name:$('#name').val(),
			cardNo:$('#cnumber').val(),
			phone:$('#telnum').val(),
			carNo:$('#carnum').val(),
			carType:$('#checkKinds').attr('code'),
			insuranceId:$('#insurance').attr('code'),
			firstpic:'',
			secondpic:''
		},
		success:function(data){
			console.log(data)
			if(data.status==2000){
				window.location.href='step8-2.html'
			}
		}
	})
})



//获取当事人以及事故人信息
//$(function(){
//	$.ajax({
//		type:"post",
//		url:getAccidentUserInfoUrl,
//		async:true,
//		success:function(data){
//			console.log(data);
//			if (data.status==2000) {
//				$('#selfname').html(data)
//			} 
//		}
//	});
//})



//添加对方信息step8-2
$('#addAnother').click(function  () {
	window.location.href='step8-1-1.html'
})
$('#step81over').click(function(){
	$('.modal').css('display','block');
	var name = $('#name').val();
	//判断身份证号是否18位
	var reg = /^\d{15}||\d{18}$/;
	var cnumber =$('#cnumber').val();
	if (!reg.test(cnumber)) {
		$('#cnumber').val('身份证信息有误，请重新输入！');
	}
	//判断手机号是否11位
	var re = /^1\d{10}$/;
	var teiNum =$('#telnum').val();
	if(!re.test(teiNum)){
		teiNum='手机号码有误，请重新输入！'
	}
	var carNum = $('#carnum').val();
	var numKind = $('#checkKinds').html();
	var numKindCode = $('#checkKinds').attr('code');
	var insurance = $('#insuranceKinds').html();
	var insuranceCode = $('#insurance').attr('code');
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
$('#itsRight81').click(function(){
	$.ajax({
		type:"POST",
		url:addAccidentUserUrl,
		data:{
			token:token,
			accidentId:accidentId,
			name:$('#name').val(),
			cardNo:$('#cnumber').val(),
			phone:$('#telnum').val(),
			carNo:$('#carnum').val(),
			carType:$('#checkKinds').attr('code'),
			insuranceId:$('#insurance').attr('code'),
			firstpic:'',
			secondpic:''
		},
		success:function(data){
			console.log(data)
			if(data.status==2000){
				window.location.href='step8-3.html'
			}
		}
	})
})
//获取事故人以及当事人信息step8-3

$('#step83').click(function(){
	window.location.href='step9.html';
})


//step9获取事故双方的证件
//$(function(){
//	$.ajax({
//		type:"post",
//		url:getFourInOnePicUrl,
//		success:function(data){
//			console.log(data);
//			if (data.status==2000) {
////				window.location.href='step10.html';
//			}
//		}
//	});
//})
$('#sub9').click(function(){
	alert(111);
	window.location.href='step10.html';	
});



//选择事故step10

$('#acchose').on('click','.checkac',function(){
	$('.mi').attr('src','static/img/page5/right.png')
	$(this).children('div').children('.mi').attr('src','static/img/page5/bigo.png')
	var code = $(this).children('div').children('.mi').attr('code');
	$('#detail-acpic').css('display','block');
	$('#detail-acpic div').children('img').attr('src',$(this).children('img').attr('src'));
	$('#detail-acpic div button').click(function(){
		$.ajax({
			type:"post",
			url:choseAccidentType,
			data:{
				token:token,
				accidentId:accidentId,
				accidentType:code
			},
			success:function(data){
				if(data.status==2000){
					window.location.href='step11.html'
				}
			}
		});
	})
})


//step12
$('#get').on('click',function(){
	$.ajax({
	    type: "POST",
	    url: yzcodeUrl,
	  	data:{
			phone:$('#phonenum').html(),
			type:'4'
		},
	    success: function(data){
	   		//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.status == 2000){
				console.log(data)
				$('#getyzcode').val(data.obj)
			}else{
				console.log(data)
			}
	    }
	})
	if ($('getyzcode').val()!='') {
		$('#get').css('background','#F56954').html('重新发送');
	}
})
//step12事故定责。