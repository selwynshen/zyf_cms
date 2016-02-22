//柱状图
function loadData(flag){
    $(".charTitle").show();
    var analysisType = $("#analysisType").val();
    var params = {};
    if(analysisType=="0"){
        params={'type':analysisType};
    }else if(analysisType=="1"){
        var analysisYear = $("#analysis_options").find(".datetimepicker").val();
        params={'type':analysisType,'year':analysisYear};
    }else if(analysisType=="2"){
        var analysisYear = $("#analysis_options").find(".datetimepicker").val();
        params={'type':analysisType,'year':analysisYear};
    }
    if(flag=="pa_output"){
        $.ajax({
            url:"/housing/spa_do_total_chart_analysis/",
            type:"POST",
            data:params,
            success:function(data){
                hightChar(data.title,data.xAxis,data.series)
            }
        });
        $.ajax({
            url:"/housing/spa_do_total_report_analysis/",
            type:"POST",
            data:params,
            success:function(data){
                $("#reportDiv").html("").append(data);
            }
        });
    }else if(flag=='pa_origin'){
        $.ajax({
            url:"/housing/spa_do_category_chart_analysis/",
            type:"POST",
            data:params,
            success:function(data){
                hightChar(data.title,data.xAxis,data.series)
            }
        });
        $.ajax({
            url:"/housing/spa_do_category_report_analysis/",
            type:"POST",
            data:params,
            success:function(data){
                $("#reportDiv").html("").append(data);
            }
        });
    }else if(flag=='ha_output'){
        $.ajax({
            url:"/housing/spa_do_chart_analysis/",
            type:"POST",
            data:params,
            success:function(data){
                hightChar(data.title,data.xAxis,data.series)
            }
        })
    }else if(flag=='ha_origin'){
        $.ajax({
            url:"/housing/spa_do_chart_analysis/",
            type:"POST",
            data:params,
            success:function(data){
                hightChar(data.title,data.xAxis,data.series)
            }
        })
    }
}
function analysisOptions(obj){
    var val = $(obj).val();
    $(".analysis-options").toggle(val!=0);
}
function hightChar(title,xAxis,series){
    /////////
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: '来源: 吴江区住建部门'
        },
        xAxis: {
            categories: xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: '碳排放量 (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
        series: series
    });
    ////////
}
