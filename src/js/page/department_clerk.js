$(function(){
    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
    $('#pageLimit1').bootstrapPaginator({
        currentPage: 1,
        totalPages: vue_instance.totalPages,
        size:"normal",
        bootstrapMajorVersion: 3,
        alignment:"right",
        numberOfPages:10,
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first": return "首页";
                case "prev": return "上一页";
                case "next": return "下一页";
                case "last": return "末页";
                case "page": return page;
            }
        },
        onPageClicked: function(event, originalEvent, type, page) {
            console.log("page", page);
            vue_instance.load_list(page);
        }
    });
    $("#addressContent li").click(function() {
        var $this = $(this);
        if($this.hasClass("active")) {
            return;
        }
        $this.addClass("active").siblings().removeClass("active");
    });
    
    $("#addBtn").click(function() {
        location.href = "./clerkAdd.html";
    });
});


var vue_instance = new Vue({
    el: '#app',
    data: {
        customer_list: [],
        province_list:[],
        currentPage:12,
        totalPages: 1,
        isActive:0,
    },
    methods: {
        load_list: function (page) {
            this.customer_list = [{'name':"aaffa","department":"bbb"},{'name':"BBB","department":"bbb"}];
            this.totalPages = 11;
        },
        provice_search:function(){

        },
        get_provice_list:function () {
            this.province_list = ["北京","山东"]
            jquery_ajax(ACTION_URL.province_list,"post",{},this.get_provice_list_callback);
        },
        get_provice_list_callback:function(result){            
            console.log(result);
        }
    },
    created: function () {
        this.load_list(1);
        this.get_provice_list();
    }
})