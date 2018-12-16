var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],
        search_param:{page:1,"rows":per_page_cnt,"name":"","product_id":null},        
        totalPages: 0,    
        level_one_list:[],   
        product_category_list:[], 
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
                    jquery_ajax(ACTION_URL.product_model_list,"post",this.search_param,true,this.list_callback);  
                }
            }); 
                              
        },
        load_list:function(){                                                  
            jquery_ajax(ACTION_URL.product_model_list,"post",this.search_param,true,this.list_callback);      
        },
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){
                jquery_ajax(ACTION_URL.product_model_delete,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        }
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);       
        jquery_ajax(ACTION_URL.product_category_list,"post",{"page":1,"rows":5000},true,(e)=>{
            this.product_category_list = e.data.records;
        }); 
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }
        this.load_list();            
    },
    mounted() {        
        $("#product_category_id").on('change', (e)=> {
            this.search_param.product_id = $("#product_category_id").val();
        });
        $('select').select2(); 
    },
})
