console.log("recycle_bin");
$("#addProejctBtn").click(function() {
    location.href = "./addProject.html"
});

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

$(".form_datetime").datetimepicker({format: 'yyyy-mm-dd', minView: "month"});