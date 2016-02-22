//tab专用
function tabOperation(parentDiv,operUrl,list_url,cur_page)
{
    var new_list_url = list_url + "?page=" + cur_page;
    $.get(operUrl,function(data){
        loadListPage(parentDiv,new_list_url);
    });
}
function doCallback(params)
{
    var tabDiv = $("div.tab-content.open");
    var listUrl = tabDiv.attr("listUrl");
    //alert(listUrl);
    tabOperation(tabDiv,params[0],listUrl,params[1]);
}
function beforeTabCopy(operUrl,cur_page)
{
    var params = [
        operUrl,
        cur_page
    ];
    var confirm = '<h3>您确定复制此数据？</h3>';
    parent.showConfirmDialog(confirm,doCallback,params);
}
function beforeTabDelete(operUrl,cur_page)
{
    var params = [
        operUrl,
        cur_page
    ];
    var confirm = '<h3>您确定删除此数据？</h3>';
    parent.showConfirmDialog(confirm,doCallback,params);
}