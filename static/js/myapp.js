
////上传建议按钮
$('#msg-submit').click(function() {
    var t = $('#contact_us').serializeArray();
    var name,phone,advice
    $.each(t, function () {
        if (this.name=="name"){                // 镜像名
          name=this.value;
        }
        if (this.name=="phone"){                 // 镜像源
          phone=this.value;
        }
        if (this.name=="advice"){                      // 版本号
          advice=this.value;
        }
    })
    $.ajax({
        type: 'POST',
        url: "/contact_us/",
        dataType: "json",
        data: {
            'name':name,
            'phone':phone,
            'advice':advice,
        },
        async: false,
        success:function(data){
            alert(data['message']);
        }
    });
});