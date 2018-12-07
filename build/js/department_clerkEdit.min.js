$(function(){
    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});

    $("#cancelBtn").click(function() {
        location.href = "./clerk.html";
    });
});



var app = new Vue({
    el: '#app',
    data: {
        user: {},
        company_list:["公司A","公司B"],
    },
    methods: {
        submit_form:function () {
            console.log(this.user.phone);
            console.log(this.user.start_date);
            console.log($("#start_date").val());
            console.log(this.user);
            return;
            $.ajax({
                url: "http://106.12.154.195:8081/api/areas/getlistDic",
                type: "post",
                dataType: "json",
                data: 1,
                contentType: "application/json",
                success: function(e) {
                    console.log(e);
                    if(e.result === "00000000") {
                        this.province_list = e.data;
                    }
                }
            });
        }
    },
    created: function () {
        
    }
})
$("#update_user_btn").click(function() {    
    var user_info = {};    
    $(".form_data").each(function(){
        user_info[$(this).attr("data-name")] = $(this).val();        
    });
    console.log(user_info);    
    function result_callback_func(result){
        console.log(result);
    }
    jquery_ajax(ACTION_URL.province_list,"post",user_info,result_callback_func);    
});
