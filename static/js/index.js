$(function(){
    var h = $(document.body).height();
	pageInit(h);
    window.onresize = function(){
        h = $(document.body).height()
        pageInit(h);
    }
	/*sidebar-menu*/
    $("#main-menu  li.has-sub > a").bind("click",function(){
        $(this).parent().toggleClass("opened").siblings().removeClass("opened");
        $(this).parent().find("ul").eq(0).slideToggle("slow").parent().siblings().find("ul").slideUp("slow");
        //$(this).find('i').toggleClass('entypo-minus-circled').parent().parent().siblings().find("i").removeClass("entypo-minus-circled");
    });
    $("#main-menu li.has-sub > ul > li > a").bind("click",function(){

          $(this).addClass("current").parent().siblings().find('a').removeClass("current");
        $(this).parents(".root-level").siblings().find("ul li a").removeClass("current");
        $(this).find('i').toggleClass('entypo-minus-circled').parent().parent().siblings().find("i").removeClass("entypo-minus-circled");
    });
    $("#main-menu li.has-sub  > ul > li > ul >li >a").bind("click",function(){
        $(this).parent().parent().find("li a").removeClass("current");
        $(this).addClass("current");
        $(this).find('i').toggleClass('entypo-minus-circled').parent().parent().siblings().find("i").removeClass("entypo-minus-circled");
    });
    $("#main-menu li.has-sub > ul li a").bind("click",function(){
        $(this).parent().parent().find("li a").removeClass("current");
        $(this).addClass("current");
    });
});
//$(function(){
//    $(".show_right").hover(function(){
//        $(this).find(".show_action").show();
//        $(this).find("a").addClass("current");
//    },function(){
//        $(this).find(".show_action").hide();
//        $(this).find("a").removeClass("current");
//    });
//});


function pageInit(h){
	$(".sidebar-menu").height(h-80);
	$(".main-content").height(h-40-80);
}
