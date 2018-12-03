$('#pageLimit2').bootstrapPaginator({
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
var chart1, chart2;
function initChart1() {
    var dom = document.getElementById("chart1");
    chart1 = echarts.init(dom);
    option = null;
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'',
                type:'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:135, name:''},
                    {value:1548, name:''}
                ],
                color: ['#DDE9F9', 'rgb(250,80,203)']
            }
        ]
    };
    chart1.setOption(option, true);
}
function initChart2() {
    var dom = document.getElementById("chart2");
    chart2 = echarts.init(dom);
    option = null;
    option = {
        series: [
            {
                name:'',
                type:'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                data:[
                    {value:135, name:''},
                    {value:1548, name:''}
                ],
                color: ['#DDE9F9', 'rgb(250,80,203)']
            }
        ]
    };
    chart2.setOption(option, true);
}

initChart1();
initChart2();

window.onresize = function () {
    chart1 && chart1.resize();
    chart2 && chart2.resize();
}
/*切换tab*/
$("a[data-toggle='tab']").on("show.bs.tab", function (e) {
    var target = e.currentTarget;
    var type = target.getAttribute("data-type");
    var href = target.getAttribute("href");
    console.log(type);
    switch(type) {
        default:
            $(href).html(template("template", {
                list: ["wo de tian", "wo de tian", "wo de tian", "wo de tian"]
            }));
            break;
    }
});