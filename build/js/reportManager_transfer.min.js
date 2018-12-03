console.log("transfer");

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

$(document).ready(function(){
    $.fn.zTree.init($(".tree"), setting, zNodes);
    setCheck();
    $("#py").bind("change", setCheck);
    $("#sy").bind("change", setCheck);
    $("#pn").bind("change", setCheck);
    $("#sn").bind("change", setCheck);
});
