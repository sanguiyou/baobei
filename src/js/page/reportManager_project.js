
Vue.component('table_content', {
    props: ['list'],
    template: `
            <div>
                <table class="table  table-striped">
                <thead>
                <tr>
                    <th>项目名称</th>
                    <th>地区</th>
                    <th>报备人</th>
                    <th>审批人</th>
                    <th>报备日期</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="obj in list">
                    <td><a  v-html="obj.name" :href="'/production/reportManager/projectDetail.html?project_id='+obj.id"></a></td>
                    <td v-html="obj.provinceName+'-'+obj.cityName+'-'+obj.areaName"></td>
                    <td v-html="obj.ownerName"></td>
                    <td v-html="obj.approvalName"></td>
                    <td v-html="obj.updateAt"></td>
                </tr>                                    
                </tbody>
            </table>            
        </div>
    `
  });
var vue_instance = new Vue({
    el: '#app',
    data: {
        list:[] ,    
        search_param:{page:1,"rows":per_page_cnt,"name":"","status":""},        
        totalPages: 0,  
        agent_list:[],  
        owner_list:[],          
    },
    methods: {
        list_callback: function (ajax_json) {              
            console.log(this.search_param);            
            this.list = ajax_json.data.records;            
            this.totalPages = ajax_json.data.pages;                                                            
        },
        load_list:function(){       
            this.search_param.ownerId = $("#owner_id").val();
            this.search_param.realName = $("#agent_id").val();
            jquery_ajax(ACTION_URL.project_list,"post",this.search_param,true,this.list_callback);  
            setTimeout(() => {
                this.bootstrapPaginator();
            }, 200);              
        },
        bootstrapPaginator:function(){
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
                    jquery_ajax(ACTION_URL.project_list,"post",this.search_param,true,this.list_callback);  
                }
            }); 
        },
        del_record(id){            
            if(confirm("确定要删除此记录吗？")){    
                jquery_ajax(ACTION_URL.project_delete_logic,"post",id,true,()=>{
                    alert("操作成功");
                    location.href = location.href;
                }); 
            }                 
        }
        
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }
        //拉代理商列表
        jquery_ajax_obj({"url":ACTION_URL.shadow_users_list,"post_data":{"page":1,"rows":3000},"is_json_param":true,
            "callback_func":(e)=>{                    
                this.agent_list = e.data.records;            
            },
        });
        //报备人
        jquery_ajax_obj({"url":ACTION_URL.user_list,"post_data":undefined,"is_json_param":true,
            "callback_func":(e)=>{                    
                this.owner_list = e.data;            
            },
        }); 
        this.load_list();            
    },
    mounted() {    
		$("#addProejctBtn").click(function() {
			location.href = "./addProject.html"
		});
		$(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
		$("a[data-toggle='tab']").on("show.bs.tab", (e)=> {            
			var target = e.currentTarget;
            this.search_param.status = target.getAttribute("data-type");
            this.search_param.page = 1;
            setTimeout(() => {
                this.bootstrapPaginator();
            }, 200);    
            jquery_ajax(ACTION_URL.project_list,"post",this.search_param,true,this.list_callback); 			
        });   
        $('#agent_id').select2();  
        $('#owner_id').select2();                       
    },    
})


