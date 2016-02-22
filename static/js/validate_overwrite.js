/**
 * Created with PyCharm.
 * User: Amanda
 * Date: 14-10-24
 * Time: 下午5:49
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    var demo=$("#form").Validform({
        tiptype:3,
        label:".label",
        postonce:true,
        showAllError:true,
        datatype:{
            "dddd":/^\d{1,8}(\.\d+)?$/
        }
    });

//    $("form").submit(function (){
//        $("#datetimepicker").parent().find("p").remove();
//        console.log("a")
//        if($("#datetimepicker").val()==""){
//            $("#datetimepicker").parent().append("<p style='width:450px;color:red;'>请选择年份</p>");
//            console.log("1")
//            return false;
//        }
//        else{
//            var start = new Date($("#datetimepicker").val().replace(/-/g,"/"));
//            var end = new Date();
//            console.log("2")
//            if(start.getFullYear() < end.getFullYear()){
//                $("#datetimepicker").parent().append("<p style='width:450px;color:red;'>输入年份不能小于当前年份</p>");
//                console.log("3")
//                return false;
//            }
//        };
//    });

});

function checkTime(){
    var datetimePicker = $("#datetimepicker");
    var pDatetimePicker = datetimePicker.parent();
    pDatetimePicker.find("span.Validform_checktip").remove();
//    console.log("a")
    if(datetimePicker.val()==""){
        pDatetimePicker.append("<span class=\"Validform_checktip Validform_wrong\">请填写信息！</span>");
//        console.log("1")
        return false;
    }
    else{
//        var start = new Date(datetimePicker.val().replace(/-/g,"/"));
//        var end = new Date();
//        if(start.getFullYear() < end.getFullYear()){
//            $("#datetimepicker").parent().append("<p style='color:red;'>输入年份不能小于当前年份</p>");
//            return false;
//        }else{
//            $("#form").submit();
//        }
        $("#form").submit();

    };
}