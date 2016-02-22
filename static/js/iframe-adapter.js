/*
 * Usage: $.AdaptIframe(iframe_id)
 * Example: $.AdaptIframe('f_1');
 */
(function($){
    $.AdaptIframe = function(_o){
        var _o_= new Function("return "+_o)();
        if($.support.msie){
            $('#'+_o).ready(function(){
//                $('#'+_o).height(_o_.document.body.scrollHeight);
                $('#'+_o).height($(window).height()-128);
            });
        }else{
            //chrome
            $('#'+_o).load(function(){
//                $('#'+_o).height($('#'+_o)[0].contentWindow.document.body.scrollHeight);
                $('#'+_o).height($(window).height()-128);
            });
        }
    }
})(jQuery);