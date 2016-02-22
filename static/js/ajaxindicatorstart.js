
function ajaxindicatorstart(text)
{
    //$("#waitMsg").text(text);
    var activeTab = $("div .tab-content.open");
    var container = activeTab.find('#container');
    if(container.find('#resultLoading').attr('id') != 'resultLoading'){

        container.html('').append('<div id="resultLoading" style="display:none"><div id="show"><img src="/static/images/ajax-loader.gif"><div>'+text+'</div></div><div class="bg"></div></div>');
    }

    $('#resultLoading .bg').height('100%');
    $('#resultLoading').fadeIn(300);
    $('body').css('cursor', 'wait');
}