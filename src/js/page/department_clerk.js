var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        province_list:[],        
        search_param:{page:1,"rows":per_page_cnt,"provinceId":0},        
        totalPages: 0,        
    },
    methods: {
        list_callback: function (ajax_json) {  
            this.list = ajax_json.data.records;
            this.totalPages = ajax_json.data.pages;      
                        
            $('#pageLimit1').bootstrapPaginator({
                currentPage: this.search_param.page,
                totalPages: this.totalPages,
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
                onPageClicked: (event, originalEvent, type, page)=> {
                    this.search_param.page = page;
                    console.log("clicked page", page);
                    jquery_ajax_obj({"url":ACTION_URL.user_list_page,"request_type":"post","post_data":this.search_param,"is_json_param":true,"callback_func":this.list_callback});
                }
            }); 
                              
        },
        load_list:function(){                 
            console.log(this.search_param);            
            jquery_ajax_obj({"url":ACTION_URL.user_list_page,"request_type":"post","post_data":this.search_param,"is_json_param":true,"callback_func":this.list_callback});     
        },
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){
                jquery_ajax(ACTION_URL.user_delete,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        },        
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }
        jquery_ajax_obj({"url":ACTION_URL.province_list,"request_type":"post","post_data":undefined,"is_json_param":true,
            "callback_func":(e)=>{
                this.province_list = e.data;            
            },
        }); 
        this.load_list();            
    },
    mounted() {
        $("#addBtn").click(function() {
            location.href = "./clerkAdd.html";
        });
        //拉取省列表        
        $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});       
        $("#addressContent li").click(function() {
            var $this = $(this);
            if($this.hasClass("active")) {
                return;
            }

            $this.addClass("active").siblings().removeClass("active");
        });    
    },
})

