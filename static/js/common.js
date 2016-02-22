/*
    所有表单的id都叫form，如果有多个，自行解决
    Author: Selwyn Shen
 */
//提交审核,/xxx/xx_manage/ 将manage替换为submit
function submitToVerify()
{
    var str_to_replace = 'manage';
    var str_replaced = 'submit';

    var $form = $("#form");

    var prevAction = $form.attr("action");
    var newAction = prevAction.replace(str_to_replace,str_replaced);
    $form.attr('action',newAction);
    $form.submit();
}
$(".required").focus(function(){
    $(this).closest(".form-group").find(".error").remove();
})
$(".required").blur(function(){
    if($(this).val()==""){
        $(this).closest(".form-group").find(".error").remove().end().append('<span class="error">*此处不能为空！</span>')
        flag=false;
        return false;
    }{
        $(this).closest(".form-group").find(".error").remove();
    }
})
function checkForm(){
    var flag=true;
    $(".required").each(function(){
        if($(this).val()==""){
            $(this).closest(".form-group").find(".error").remove().end().append('<span class="error">*此处不能为空！</span>')
            flag=false;
            return false;
        }
    })
    if(!flag){
        return false;
    }
}