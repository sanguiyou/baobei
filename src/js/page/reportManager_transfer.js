var vue_instance = new Vue({
    el: '#app',
    data: {
        list: [],        
        totalPages: 0,        
        left_list:[{"is_checked":false},{"is_checked":false}], 
        right_list:[],       
    },
    methods: {
        list_callback: function (ajax_json) {                         
            this.list = ajax_json.data.records;
            this.totalPages = ajax_json.data.pages;                                                                        
        },
        load_list:function(){                 
                
        },    
        transfer_left_to_right:function(){                         
            var i =0;
            while(this.left_list[i] != undefined){
                if(this.left_list[i].is_checked == true){
                    this.right_list.push(this.left_list[i]);
                    this.left_list.splice(i,1);
                }else{
                    i++;
                }
            }
        }, 
        transfer_right_to_left:function(){                       
            var i =0;
            while(this.right_list[i] != undefined){
                if(this.right_list[i].is_checked == true){
                    this.left_list.push(this.right_list[i]);
                    this.right_list.splice(i,1);
                }else{
                    i++;
                }
            }        
        }               
    },
    created: function () {
        var page_param = parseURL(window.location.href);
        console.log(page_param["current_page"]);
        if(page_param["current_page"] != undefined){
            this.search_param.page = page_param["current_page"];
        }
        //报备人
        jquery_ajax_obj({"url":ACTION_URL.user_list,"post_data":undefined,"is_json_param":true,
            "callback_func":(e)=>{                    
                this.owner_list = e.data;            
            },
        });
        this.load_list();            
    },
    mounted() {    
        var setting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };        
        var zNodes =[
            { id:1, pId:0, name:"徐海涛部门", open:true},
            { id:11, pId:1, name:"杨锴", open:true},
            { id:12, pId:1, name:"陈子栋部门", open:true},
            { id:2, pId:0, name:"陈子栋部门", open:true},
            { id:22, pId:2, name:"赵海洋部门", open:true},
            { id:221, pId:22, name:"李松"},
            { id:222, pId:22, name:"胡江"},
            { id:23, pId:2, name:"李文东"}
        ];
        
        var code;
        
        function setCheck() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                py = $("#py").attr("checked")? "p":"",
                sy = $("#sy").attr("checked")? "s":"",
                pn = $("#pn").attr("checked")? "p":"",
                sn = $("#sn").attr("checked")? "s":"",
                type = { "Y":py + sy, "N":pn + sn};
            zTree.setting.check.chkboxType = type;
            showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
        }
        function showCode(str) {
            if (!code) code = $("#code");
            code.empty();
            code.append("<li>"+str+"</li>");
        }

        $.fn.zTree.init($(".tree"), setting, zNodes);
        setCheck();
        $("#py").bind("change", setCheck);
        $("#sy").bind("change", setCheck);
        $("#pn").bind("change", setCheck);
        $("#sn").bind("change", setCheck);   
    },
})

