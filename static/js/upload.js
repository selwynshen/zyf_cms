function afterImport(html)
{
    bootbox.dialog({
        message: html,
        title: "",
        closeButton: false,
        buttons: {
            success: {
                label: "确定",
                className: "btn-success",
                callback: function() {
                    $("#contentiframe").get(0).contentWindow.location.reload(true);
                }
            }
        }
    });
}
function importSuccess()
{
    var html = '<div class="import-pop"><h3>导入成功</h3><img src="/static/image/suc.png"></div>';
    afterImport(html);
}
function importFailed(errorMsg,url)
{
    var html = '<div class="import-pop"><h3>'+errorMsg+'</h3><img src="/static/image/fail.png"></div>';
    bootbox.dialog({
        message: html,
        title: "",
        closeButton: false,
        buttons: {
            success: {
                label: "确定",
                className: "btn-success",
                callback: function() {
                    $("#contentiframe").get(0).contentWindow.location.reload(true);
                }
            },
            main: {
                label: "导出错误文件",
                className: "btn-primary",
                callback: function() {
                    var dForm = $("<form>");
                    dForm.attr("action",url);
                    dForm.attr("name","dForm");
                    dForm.submit();
                    $("#contentiframe").get(0).contentWindow.location.reload(true);
                }
            }
        }
    });
}
function uploadFile(upload_url)
{
    $.ajaxFileUpload
    (
        {
            url:upload_url,
            secureuri:false,
            fileElementId:'import_file',
            dataType: 'json',
            data:{
                csrfmiddlewaretoken:$("input[name='csrfmiddlewaretoken']").val(),
                file_name:$("#file_name").val()
            },
            success: function (jsondata, status)
            {
                bootbox.hideAll();

                if (jsondata.flag)
                {
                    importSuccess();
                }
                else{
                    importFailed(jsondata.message,jsondata.error_export_url);
                }

            },
            error: function (data, status, e)
            {
                alert(e);
            }
        }
    );
}