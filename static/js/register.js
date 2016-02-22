function showAlertDialog(msg)
{
    bootbox.dialog({
        message:msg,
        buttons: {
            success: {
                label: "确定",
                className: "btn-success",
                callback: function() {
                    //
                }
            }
        }
    });
}
function formSubmit()
{
    var username = ''+$("input[name='username']").val();
    var  password = '******';
    var role = $("select[name='role']").find("option:selected").text();
    var region = $("select[name='region']").find("option:selected").text();
    var magname = $("input[name='magname']").val();
    var magphone = $("input[name='magphone']").val();
    var magemail = $("input[name='magemail']").val();
    var longitude = $("input[name='longitude']").val();
    var latitude = $("input[name='latitude']").val();
    //公共建筑
    var archname = $("input[name='archname']").val();
    var type = $("input[name='type']").val();
    var area = $("input[name='area']").val();
    var owner = $("input[name='owner']").val();
    var address = $("input[name='address']").val();
    //工业企业
    var en_org_code = $("input[name='en_org_code']").val();
    var gyqyname = $("input[name='gyqyname']").val();
    var enterprise_id = $("select[name='enterprise_id']").find("option:selected").html();

    var content ='<h2 style="border-bottom:1px solid #ccc;margin-bottom:10px;padding-bottom:10px;font-size:16px;">注册信息</h2>'+
        '<table class="table table-bordered">'+
        '<tr><td>用户名：</td><td>'+username+'</td></tr>'+
    '<tr><td>角色：</td><td>'+role+'</td></tr>'+
    '<tr><td>所属地区：</td><td>'+region+'</td></tr>'+
    '<tr><td>联系人：</td><td>'+magname+'</td></tr>'+
    '<tr><td>联系电话：</td><td>'+magphone+'</td></tr>'+
    '<tr><td>联系邮箱：</td><td>'+magemail+'</td></tr>'+
    '<tr><td>经度：</td><td>'+longitude+'</td></tr>'+
    '<tr><td>纬度：</td><td>'+latitude+'</td></tr>';
    if(role == '公共建筑'){
        content += '<tr><td>公建名称：</td><td>'+archname+'</td></tr>'+
        '<tr><td>公建类别：</td><td>'+type+'</td></tr>'+
        '<tr><td>公建面积：</td><td>'+area+'</td></tr>'+
        '<tr><td>业主单位：</td><td>'+owner+'</td></tr>'+
        '<tr><td>公建地址：</td><td>'+address+'</td></tr>'+
        '</table>'
    }else if(role == '工业企业'){
        var indrcaginfos = $("select[name='indrcaginfo_id']").find("option:selected");
        var indrcaginfo_text = "";
        for (var i= 0,count=indrcaginfos.length;i<count;++i)
        {
            indrcaginfo_text = indrcaginfo_text + indrcaginfos[i].text + "<br/>";
        }

        content += '<tr><td>企业机构代码：</td><td>'+en_org_code+'</td></tr>'+
        '<tr><td>企业名称：</td><td>'+gyqyname+'</td></tr>'+
        '<tr><td>所属行业：</td><td>'+enterprise_id+'</td></tr>'+
        '<tr><td style="vertical-align:top;">涉及的工业过程：</td><td>'+indrcaginfo_text+'</td></tr>'+
        '</table>'
    }

    bootbox.confirm(content, function(result) {
        if(result||result=='true') {
            $("#form").submit();
            //return true;
        }else{
            //return false;
        }
    });
}
$(function(){
    var groupOtions = $('#group_select option').clone();
    $("#role_select").change(function(){
        roleid = $(this).val();
        var values = $.map(groupOtions,function(e){
            return e.value;
        });
        groupids = values.join(',');
        $.post("/ajax/get_groups/",
            {
                'roleid':roleid,
                'groupids':groupids
            },
            function (data, textStatus){
                $('#group_select').html(data);
                $("#group_select").trigger("change");
            });
    });
    $("#group_select").change(function(){
        level = $(this).find(":selected").attr("level");
        $.post("/ajax/get_all_regions/",
            {
                'regionid':-1,
                'level':level
            },
            function (data, textStatus){
                $('#regionDiv').html(data);
            });
    });
    $("#role_select").trigger('change');
});