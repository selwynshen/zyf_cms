//window.onload = function(){

	var bg = document.getElementById("bg");
	var foot = document.getElementById("footer");
    
    // if(document.body.scrollHeight == 0){
    // 	bg.style.height = document.documentElement.clientHeight   +'px';
    // 	footer.style.marginTop = (document.documentElement.clientHeight-150) +"px";
    // }else{
    // 	bg.style.height = document.body.scrollHeight +'px';
    // 	footer.style.marginTop = (document.body.scrollHeight-150) +"px";
    // }
    bg.style.height = document.documentElement.clientHeight   +'px';
    footer.style.marginTop = (document.documentElement.clientHeight-150) +"px";
    //alert("scrollHeight:"+document.body.scrollHeight );
    //alert("clientHeight:"+document.documentElement.clientHeight)
	//alert(bg.style.height);
//}