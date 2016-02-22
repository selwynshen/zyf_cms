function fillFixedValues(val)
{
    $("input[type='text']").each(function(idx,ele){
        $(ele).val(val);
    });
}
function fillValues()
{
    var range = 100;
    $("input[type='text']").each(function(idx,ele){
        var randomVal = Math.floor(Math.random()*range);
        $(ele).val(randomVal);
    });
}
function createButton()
{
    $(document.body).append("<input id='btnFill' type='button' class='but btn-info' title='测试专用' value='猛戳我'/>");
    $("#btnFill").click(function(){
        fillValues();
    });
}
function createFixedButton()
{
    $(document.body).append("<input type='text' id='inputFill' value='1'/><input id='btnFill' type='button' class='but btn-info' title='测试专用' value='猛戳我'/>");
    $("#btnFill").click(function(){
        var inputVal = $("#inputFill").val();
        fillFixedValues(inputVal);
    });
}
$(function(){
    //createButton();
    createFixedButton();
});