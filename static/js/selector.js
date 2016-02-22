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
        $.post("/ajax/get_regions/",
            {
                'regionid':-1,
                'level':level
            },
            function (data, textStatus){
                $('#regionDiv').html(data);
            });
    });
    $("#role_select").trigger('change');
})