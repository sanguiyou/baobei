$(function(){
    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});

    $("#cancelBtn").click(function() {
        location.href = "./project.html";
    });
});