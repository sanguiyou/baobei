console.log("department_clerk");

$(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});

$('#pageLimit1').bootstrapPaginator({
    currentPage: 1,
    totalPages: 100,
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
    }
});

$("#addressContent li").click(function() {
    var $this = $(this);
    if($this.hasClass("active")) {
        return;
    }
    alert("fff");
    $this.addClass("active").siblings().removeClass("active");
});

$("#addBtn").click(function() {
    location.href = "./clerkAdd.html";
});

var app = new Vue({
    el: '#app',
    data: {
        customer_list: [],
        province_list:[],
        isActive:0,
    },
    methods: {
        load_list: function () {
            this.customer_list = [{'name':"aaffa","department":"bbb"},{'name':"BBB","department":"bbb"}];
        },
        provice_search:function(){

        },
        get_provice_list:function () {
            this.province_list = ["北京","山东"]
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
        this.load_list();
        this.get_provice_list();
    }
})