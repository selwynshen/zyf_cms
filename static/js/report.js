function filterByDate(parentDiv,reportType,moduleName,selectedDate)
{
    $.post("/ajax/get_report_list/",
        {
            'selected_date': selectedDate,
            'report_type': reportType,
            'module_name':moduleName
        },
        function (data, textStatus){
            $(parentDiv).html(data);
        });
}
function filterByStatus(parentDiv,reportType,moduleName)
{
    $.post("/ajax/get_unverified_report_list/",
        {
            'report_type': reportType,
            'module_name':moduleName
        },
        function (data, textStatus){
            $(parentDiv).html(data);
        });
}
//tab专用
function loadListPage(parentDiv,listUrl)
{
    $.get(listUrl,
        function (data, textStatus){
            $(parentDiv).html(data);
    });
}


function get_govern_data(parentDiv,reportType,moduleName,role_id)
{
    $.post("/ajax/get_unverified_report_list/",
        {
            'report_type': reportType,
            'module_name':moduleName
        },
        function (data, textStatus){
            $(parentDiv).html(data);
        });
}
function beforeImport(url){

    $.get('/ajax/show_import_page?import_url='+url,
        function (data, textStatus){
            parent.dialogPop(data,url);

        });
    return false;
}
function exportTemplate(url){
    var dForm = $("#hidden_form");
    dForm.attr("action",url);
//    var dForm = $("<form>");
//    dForm.attr("action",url);
//    dForm.attr("method","get");
//    dForm.attr("name","dForm");
//    dForm.append("<input type='submit' value='submit'/>");
    dForm.submit();
}

function beforeDelete(url)
{
    var confrim = '<h3>您确定删除此数据？</h3>';
    var href = $(this).attr("href");
    parent.a(confrim,url);
    return false;
}
function beforeFollow(url){
    var confrim = '<h3>您确定沿用此数据？</h3>';
    var href = $(this).attr("href");
    parent.a(confrim,url);
    return false;
}
function beforeReject(url)
{
    var confrim = '<h3>您确定驳回此数据？</h3>';
    var href = $(this).attr("href")
    parent.a(confrim,url);
    return false;
}
function beforePass(url)
{
    var confrim = '<h3>您确定通过此数据？</h3>';
    var href = $(this).attr("href");
    parent.a(confrim,url);
    return false;
}
function beforeCopy(url)
{
    var confrim = '<h3>您确定复制此数据？</h3>';
    var href = $(this).attr("href");
    parent.a(confrim,url);
    return false;
}
function beforeCommit(url)
{
    var confrim = '<h3>您确定上报此数据？</h3>';
    var href = $(this).attr("href");
    parent.a(confrim,url);
    return false;
}



function data_report(parentDiv,reportType,moduleName)
{
    var params = {
        'ids':[],
        'report_type': reportType,
        'module_name':moduleName
    };
    var idInputs = parentDiv.find("form input[name='ids']:checked");
    $.each(idInputs,function(idx,ele){
        params.ids.push($(ele).val());
    });
    $.post("/ajax/data_report/",
        params,
        function (data, textStatus){
            //alert(data);
            $("div .tab.active").trigger("click");
        });
}


function data_to_preview(parentDiv,reportType,moduleName)
{
    var params = {
        'ids':[],
        'report_type':reportType,
        'module_name':moduleName
    };
//    var idInputs = parentDiv.find("input:checked");
    var idInputs = parentDiv.find("form input[name='ids']:checked");
    $.each(idInputs, function(id,ele){
        params.ids.push($(ele).val());
    });
    $.post("/ajax/data_to_preview/",
            params
    )
}



