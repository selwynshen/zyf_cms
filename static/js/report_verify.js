function resetSelectedDate()
{
    $("#selected_date").val('');
}
$(function(){
    $("#reset").click(function(){
        resetSelectedDate();
    });
});