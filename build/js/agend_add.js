$(function(){
    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});

    $("#cancelBtn").click(function() {
        location.href = "./project.html";
    });
});

var app = new Vue({
    el: '#app',
    data: {
        form_data: {},
        baobei_list:["报备人A","报备人B"],
    },
    methods: {
        submit_form:function () {                        
            console.log(form_data);                         
        }
    },
    created: function () {
        
    }
})