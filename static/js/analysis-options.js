function analysisOptions(obj){
    var option = $(obj).val();
    $("#analysis_options").toggle(option!='0');
    $("#analysis_options0").toggle(option=='0');
}
$(function(){
    $("#analysisType").trigger("change");
});