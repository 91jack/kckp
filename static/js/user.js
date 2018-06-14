$('#getdrive').click(function(){
	$(this).change(function(){
		var that = $(this);
		uploadImgFn1(that);
	});
});
$('#getcat').click(function(){
	$(this).change(function(){
		var that = $(this);
		uploadImgFn1(that);
	});
})
// 图片上传通用函数
var token =localStorage.getItem('token');
function uploadImgFn1(that){
	var accidentId = localStorage.getItem('accidentId');
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
				that.parent('.take-pho').siblings('img').attr("src",data.list[0]);
			}
			
		}
	});
}


//-------------------------------------user

$('#binddrive').click(function(){
	window.location.href='binddrive.html';
})
$('#bindcar').click(function(){
	window.location.href='bindcar.html';
})
$('#bindnum').click(function(){
	window.location.href='bindnum.html';
})
$('#tellus').click(function(){
	window.location.href='opinion.html';
})
$('#aboutus').click(function(){
	window.location.href='about_us.html';
})
//绑定驾驶证
$('#subbinddriver').click(function(){
	$.ajax({
		type:"post",
		url:addBindingDriverUrl,
		data:{
			token:token,
			name:$('#drivename').val(),
			card:$('#drivecard').val(),
			data:$('#res').html()
		},
		success:function(data){
			console.log(data);
			if(data.status==2000){
				window.location.href='user.html'
			}
		}
	});
})
//绑定机动车
$('#subbindcar').click(function(){
	$.ajax({
		type:"post",
		url:addBindingCarUrl,
		data:{
			token:token,
			carNo:$('#carnum').val(),
			identityNum:$('#carpic').val(),
			motorNum:$('#careng').val(),
			registerDate:$('#resu').html()
		},
		success:function(data){
			console.log(data);
			if(data.status==2000){
				window.location.href='user.html'
			}
		}
	});
})


//绑定手机号
$('#getbindcode').on('click',function(){
	$.ajax({
	    type: "POST",
	    url: yzcodeUrl,
	  	data:{
			phone:$('#bindtelnum').val(),
			type:'4'
		},
	    success: function(data){
	   		//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.status == 2000){
				console.log(data)
				$('#writeyzcode').val(data.obj)
			}else{
				console.log(data)
			}
	    }
	})
})
//绑定手机号
//$('#bindphone').click(function(){
//	alert(1);
//	window.location.href='user.html'
//})
//修改手机号
$('#getnewbindcode').on('click',function(){
	$.ajax({
	    type: "POST",
	    url: yzcodeUrl,
	  	data:{
			phone:$('#bindnewtelnum').val(),
			type:'4'
		},
	    success: function(data){
	   		//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.status == 2000){
				console.log(data)
				$('#writenewyzcode').val(data.obj)
			}else{
				console.log(data)
			}
	    }
	})
})

//提交意见反馈
$('#subopinion').click(function(){
	$.ajax({
		type:"post",
		url:addFeedback,
		data:{
			token:token,
			content:$('#opinion').val(),
			contactInfo:$('#yourtel').val()
		},
		success:function(data){
			if (data.status==2000) {
				window.location.href='user.html'
			}
		}
	});
})
