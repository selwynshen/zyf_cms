function fillSelector(selector_id,level)
{
    $.post("/ajax/get_single_region/",
    {
        'regionid':-1,
        'level':level
    },
    function (data, textStatus){
        $('#' + selector_id).html(data);
    });
}
