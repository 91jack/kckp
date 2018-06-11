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
				$.totalStorage('token',data.token);
				$.totalStorage('accidentId',data.obj);
				console.log($.totalStorage('token'));
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
	   	window.location.href = 'step5.html'
	   	// 
	   }
	})
	 
});


//step5事件交互
$('#address').click(function(){
	window.location.href = 'step5_1.html'
})
$('.page5.content .where span').click(function(){
	if($(this).hasClass('active')){
		$(this).siblings('span').addClass('active')
		$(this).removeClass('active');
	}else{
		$(this).siblings('span').removeClass('active')
		$(this).addClass('active');
	}
})
$('#nowData').html(newData);
$('#result').html(newTime);

//step5时间
(function($) {
	$.init();
	var result = $('#result')[0];
	var btns = $('#demo5');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				result.innerText = rs.h.value+':'+rs.i.value;
				picker.dispose();
			});
		}, false);
	});
})(mui);

//step5天气交互
(function($, doc) {
	$.init();
	$.ready(function() {
		var _getParam = function(obj, param) {
			return obj[param] || '';
		};
		var userPicker = new $.PopPicker();
		userPicker.setData([{
			value: 'q',
			text: '晴'
		}, {
			value: 'sc',
			text: '沙尘'
		}, {
			value: 'df',
			text: '大风'
		}, {
			value: 'bb',
			text: '冰雹'
		}, {
			value: 'x',
			text: '雪'
		}]);
		var showUserPickerButton = doc.getElementById('weather');
		var userResult = doc.getElementById('userResult');
		showUserPickerButton.addEventListener('tap', function(event) {
			userPicker.show(function(items) {
				userResult.innerText = items[0].text;
			});
		}, false);
	});
})(mui, document);


//step5摄像头的调用
$('.takePhotos').click(function(){
//	alert(1);
	$(this).siblings('input').css('display','block');
})

//step5页面跳转
$('#subpic').click(function(){
	$.ajax({
	   type: "POST",
	   url: createAccidentUrl,
	   data: {
	   	type:'2',
	   	token:'3661363439356430613064343464366539306566306664353466313962643034',
//	   	accidentId
//	   	address
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
		
