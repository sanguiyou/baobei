var vue_instance = new Vue({
    el: '#app',
    data: {
        form_data: {"id":0},
        baobei_list:[],
    },
    methods: {
        submit_form:function () {                        
            console.log(this.form_data);                         
            jquery_ajax(ACTION_URL.shadow_users_modify,"post",this.form_data,true,this.submit_form_callback);                    
        },
        submit_form_callback:function(json_result){
            console.log(json_result);
            //location.href="";
        },
        load_edit_data(){ //拉取修改页的数据
            //jquery_ajax(ACTION_URL.shadow_users_modify,"post",this.form_data,this.load_edit_data_callback);                    
        },
        load_edit_data_callback(json_result){ //拉取修改页的数据回调
            //this.form_data = json_result; //赋值
            //有时间控件的需要用jquery赋值
            //$("#perceptionTime").val();
        },
        load_baobei_list(){
            jquery_ajax(ACTION_URL.user_list,"post",undefined,false,this.load_baobei_callback);             
        },
        load_baobei_callback(json_result){
            //json_result = ["报备人A","报备人B"];
            this.baobei_list = json_result.data;
            console.log(this.baobei_list);
        }
    },
    created: function () {
        //拉取报表列表
        this.load_baobei_list();
        //拉取数据库里的编辑数据，初始化
        var page_param = parseURL(this.location.href);
        console.log(page_param["id"]);
        if(page_param["id"] != undefined){
            vue_instance.form_data.id = page_param["id"];
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