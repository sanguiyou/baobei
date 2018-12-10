var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":0},
        baobei_list:[],
        current_page:1,
    },
    methods: {
        submit_form:function () {                        
            console.log(this.form_data);                         
            jquery_ajax(ACTION_URL.shadow_users_modify,"post",this.form_data,true,this.submit_form_callback);                    
        },
        submit_form_callback:function(json_result){
            console.log(json_result);
            if(this.form_data.id > 0){
                location.href="/production/agent/index.html?current_page="+this.current_page;
            }else{
                location.href="/production/agent/index.html";
            }
            
        },
        load_edit_data(){ //拉取修改页的数据            
            jquery_ajax(ACTION_URL.shadow_user_detail+"?id="+this.form_data.id,"get",undefined,false,this.load_edit_data_callback);                    
        },
        load_edit_data_callback(json_result){ //拉取修改页的数据回调
            this.form_data = json_result.data; //赋值
            console.log(this.form_data);
            //有时间控件的需要用jquery赋值
            //$("#perceptionTime").val();            
        },
        load_baobei_list(){
            jquery_ajax(ACTION_URL.user_list,"post",undefined,false,this.load_baobei_callback);             
        },
        load_baobei_callback(json_result){            
            this.baobei_list = json_result.data;            
        }
    },
    created: function () {
        //拉取报表列表
        this.load_baobei_list();
        //拉取数据库里的编辑数据，初始化
        var page_param = parseURL(window.location.href);        
        if(page_param["id"] != undefined){
            this.form_data.id = page_param["id"];            
        }
        if(page_param["current_page"] != undefined){
            this.current_page = page_param["current_page"];            
        }
        this.load_edit_data();        
    },
    mounted() {
        $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});
        $("#cancelBtn").click(function() {
            location.href = "./project.html";
        });        
    },
})