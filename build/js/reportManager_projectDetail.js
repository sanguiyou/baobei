$("#backBtn").click(function() {
    location.href = "./project.html";
});

$("a[data-toggle='tab']").on("show.bs.tab", function (e) {
    var target = e.currentTarget;
    var type = target.getAttribute("data-type");
    switch (type) {
        case "1":
        case "2":
            $("#addReportPriceBtn").hide();
            break;
        case "3":
            $("#addReportPriceBtn").show();
            break;
    }
});