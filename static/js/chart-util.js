function category_analysis(chart_url,report_url,params,chartDiv,reportDiv){
    $.ajax({
        url:chart_url,
        type:"POST",
        data:params,
        success:function(data){
            showBarChar(chartDiv,data)
        }
    });
    $.ajax({
        url:report_url,
        type:"POST",
        data:params,
        success:function(data){
            $(reportDiv).html("").append(data);
        }
    });
}
function simplechart_analysis(chart_url,report_url,params,chartDiv,reportDiv)
{

    $.ajax({
        url:chart_url,
        type:"POST",
        data:params,
        success:function(data){
            showSimpleBar(chartDiv,data);
        }
    });
    $.ajax({
        url:report_url,
        type:"POST",
        data:params,
        success:function(data){
            $(reportDiv).html("").append(data);
        }
    });
}
function singleyear_analysis(chart_url,report_url,params,chartDiv,reportDiv)
{
    $.ajax({
        url:chart_url,
        type:"POST",
        data:params,
        success:function(data){
            showPieChart(chartDiv,data)
        }
    });
    $.ajax({
        url:report_url,
        type:"POST",
        data:params,
        success:function(data){
            $(reportDiv).html('').append(data);
        }
    });
}
function alarm_analysis(chart_url,report_url,params,chartDiv,reportDiv){
    $.ajax({
        url:chart_url,
        type:"POST",
        data:params,
        success:function(data){
            showNegativeBarChar(chartDiv,data)
        }
    });
    $.ajax({
        url:report_url,
        type:"POST",
        data:params,
        success:function(data){
            $(reportDiv).html("").append(data);
        }
    });
}

//柱状图，堆叠
function copycharts(chart_url,report_url,params,chartDiv,reportDiv){
    $.ajax({
        url:chart_url,
        type:"POST",
        data:params,
        success:function(data){
            showNegativeBarChar(chartDiv,data)
        }
    });
    $.ajax({
        url:report_url,
        type:"POST",
        data:params,
        success:function(data){
            $(reportDiv).html("").append(data);
        }
    });
}

//柱状图 N条
function show_Basebar(chart_url,report_url,params,chartDiv,reportDiv){
    $.ajax({
        url:chart_url,
        type:"POST",
        data:params,
        success:function(data){
            showSimpleBarByEmission(chartDiv,data);
        }
    });
    $.ajax({
        url:report_url,
        type:"POST",
        data:params,
        success:function(data){
            $(reportDiv).html("").append(data);
        }
    });
}

//柱状图(比例)
function showBarChar(chartDiv,jsondata){
    $(chartDiv).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: jsondata.title
        },
        subtitle: {
            text: '来源：' + jsondata.source
        },
        xAxis: {
            categories: jsondata.xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: '碳排放量（万吨）'
            }
        },
        tooltip: {
//            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//                '<td style="padding:0"><b>{point.y:.2f} 万吨</b></td></tr>',
//            footerFormat: '</table>',
            shared: false,
            useHTML: true
            ,formatter: function() {
                var header = '<span style="font-size:10px">'+this.key+'</span><table>';
                var footer = '</table>';
                var decimal_power_str = decimal_to_power(this.y);
                return  header + '<tr><td style="color:'+this.series.color+';padding:0">'+this.series.name+': </td>' +
                    '<td style="padding:0"><b>'+decimal_power_str+' 万吨</b></td></tr>' + footer;
            }
        },
        legend: {
            backgroundColor:'#FFFFFF',
            reversed:true

        },

        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: jsondata.series
    });
    ////////
}
function showSimpleBar(chartDiv,jsondata)
{
    $(chartDiv).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: jsondata.title
        },
        subtitle: {
            text: '来源：' + jsondata.source
        },
        xAxis: {
            categories: jsondata.xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: jsondata.yAxis
            }
        },
        tooltip: {
//            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//                '<td style="padding:0"><b>{point.y:.2f} 万吨/万元</b></td></tr>',
//            footerFormat: '</table>',
            shared: false,
            useHTML: true
            ,formatter: function() {
                var header = '<span style="font-size:10px">'+this.key+'</span><table>';
                var footer = '</table>';
                var decimal_power_str = decimal_to_power(this.y);
                return  header + '<tr><td style="color:'+this.series.color+';padding:0">'+this.series.name+': </td>' +
                    '<td style="padding:0"><b>'+decimal_power_str+' 吨/万元</b></td></tr>' + footer;
            }
        },
        legend: {
            backgroundColor:'#FFFFFF',
            reversed:true

        },

        plotOptions: {
            bar: {

            }
        },
        credits: {
            enabled: false
        },
        series: jsondata.series
    });

}
function showSimpleBarByEmission(chartDiv,jsondata)
{
    $(chartDiv).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: jsondata.title
        },
        subtitle: {
            text: '来源：' + jsondata.source
        },
        xAxis: {
            categories: jsondata.xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: jsondata.yAxis
            }
        },
        tooltip: {
//            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//                '<td style="padding:0"><b>{point.y:.2f} 万吨/万元</b></td></tr>',
//            footerFormat: '</table>',
            shared: false,
            useHTML: true
            ,formatter: function() {
                var header = '<span style="font-size:10px">'+this.key+'</span><table>';
                var footer = '</table>';
                var decimal_power_str = decimal_to_power(this.y);
                return  header + '<tr><td style="color:'+this.series.color+';padding:0">'+this.series.name+': </td>' +
                    '<td style="padding:0"><b>'+decimal_power_str+' 万吨</b></td></tr>' + footer;
            }
        },
        legend: {
            backgroundColor:'#FFFFFF',
            reversed:true

        },

        plotOptions: {
            bar: {

            }
        },
        credits: {
            enabled: false
        },
        series: jsondata.series
    });

}
function showNegativeBarChar(chartDiv,jsondata){
    $(chartDiv).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: jsondata.title
        },
        subtitle: {
            text: '来源：' + jsondata.source
        },
        xAxis: {
            categories: jsondata.xAxis
        },
        yAxis: {
            // ... 省略代码
            plotLines:[{
                color:'red',           //线的颜色，定义为红色
                dashStyle:'solid',     //默认值，这里定义为实线
                value:0,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                width:2                //标示线的宽度，2px
            }]
        },
        yAxis:{
            title:{
                text:jsondata.yAxis
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: false,
            useHTML: true
        },
        credits: {
            enabled: false
        },
        series: jsondata.series
    });
}
//柱状图(分类)
function showBarCharSeries(chartDiv,jsondata){
    /////////
    $(chartDiv).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: jsondata.title
        },
        subtitle: {
            text: '来源：' + jsondata.source
        },
        xAxis: {
            categories: jsondata.xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: '碳排放量 (万吨)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.2f} 万吨</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: jsondata.series
    });
    ////////
}

//饼状图
function showPieChart(chartDiv,jsondata)
{
    $(chartDiv).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: jsondata.title
        },
        subtitle:{
            text: '来源：' + jsondata.source
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                },
                showInLegend: true
            }
        },
        series: jsondata.series
    });
}

//堆叠图
function showCopyBar(chartDiv,jsondata){

    $(chartDiv).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: jsondata.title
        },
        xAxis: {
            categories: jsondata.xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: '碳排放量(万吨)'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: jsondata.series
    });
}


//柱状图，N条
function BaseBar(chartDiv,jsondata) {
    $(chartDiv).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: jsondata.title
        },
        xAxis: {
            categories: jsondata.xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: '碳排放量 (万吨)'
            },
            stackLabels: {
                enabled: true
                ,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: jsondata.series
    });
}

//    $(chartDiv).highcharts({
//        chart: {
//            type: 'column'
//        },
//        title: {
//            text: jsondata.title
//        },
//        subtitle: {
//            text: '来源: '+ jsondata.source
//        },
//        xAxis: {
//            categories: jsondata.xAxis
//        },
//        yAxis: {
//            min: 0,
//            title: {
//                text: '碳排放量 (万吨)'
//            }
//        },
//        tooltip: {
//            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//                '<td style="padding:0"><b>{point.y:.2f} mm</b></td></tr>',
//            footerFormat: '</table>',
//            shared: true,
//            useHTML: true
//        },
//        plotOptions: {
//            column: {
//                pointPadding: 0.2,
//                borderWidth: 0
//            }
//        },
//        series: jsondata.series
//
//    });


//function setTheme(){
//    /**
//     * Grid-light theme for Highcharts JS
//     * @author Torstein Honsi
//     */
//
//// Load the fonts
//    Highcharts.createElement('link', {
//        href: 'http://fonts.googleapis.com/css?family=Dosis:400,600',
//        rel: 'stylesheet',
//        type: 'text/css'
//    }, null, document.getElementsByTagName('head')[0]);
//
//    Highcharts.theme = {
//        colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
//            "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
//        chart: {
//            backgroundColor: null,
//            style: {
//                fontFamily: "Dosis, sans-serif"
//            }
//        },
//        title: {
//            style: {
//                fontSize: '16px',
//                fontWeight: 'bold',
//                textTransform: 'uppercase'
//            }
//        },
//        tooltip: {
//            borderWidth: 0,
//            backgroundColor: 'rgba(219,219,216,0.8)',
//            shadow: false
//        },
//        legend: {
//            itemStyle: {
//                fontWeight: 'bold',
//                fontSize: '13px'
//            }
//        },
//        xAxis: {
//            gridLineWidth: 1,
//            labels: {
//                style: {
//                    fontSize: '12px'
//                }
//            }
//        },
//        yAxis: {
//            minorTickInterval: 'auto',
//            title: {
//                style: {
//                    textTransform: 'uppercase'
//                }
//            },
//            labels: {
//                style: {
//                    fontSize: '12px'
//                }
//            }
//        },
//        plotOptions: {
//            candlestick: {
//                lineColor: '#404048'
//            }
//        },
//
//
//        // General
//        background2: '#F0F0EA'
//
//    };
//
//// Apply the theme
//    Highcharts.setOptions(Highcharts.theme);
//}

function analysisOptions(obj){
    var val = $(obj).val();
    $(".analysis-options").toggle(val!=0);
}


function ajaxindicatorstart(text)
{
    //$("#waitMsg").text(text);
    var activeTab = $("div .tab-content.open");
    var container;
    if(activeTab.length>0)
    {
        container = activeTab.find('#container');
    }
    else{
        container = $("#container");
    }

    if(container.find('#resultLoading').attr('id') != 'resultLoading'){

        container.html('').append('<div id="resultLoading" style="display:none"><div id="show"><img src="/static/images/ajax-loader.gif"><div>'+text+'</div></div><div class="bg"></div></div>');
    }

    $('#resultLoading .bg').height('100%');
    $('#resultLoading').fadeIn(300);
    $('body').css('cursor', 'wait');
}

$(function(){
    d=new Date();
    document.getElementById("start_year").value=d.getFullYear();
    document.getElementById("end_year").value=d.getFullYear();
    document.getElementById("only_year").value=d.getFullYear();
    //赋值年份给起始年份和结束年份
});