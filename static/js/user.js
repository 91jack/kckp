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
				that.parent().siblings().children('img').attr("src",data.list[0]);
			}
			
		}
	});
}


//login_1
$(function(){
	$.ajax({
		type:"get",
		url:"",
		async:true
	});
})
