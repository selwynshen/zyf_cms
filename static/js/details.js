window.onload = function(){

	function getByClass(classname, tagname, parent){
		var result=[],
			_array=parent.getElementsByTagName(tagname);
		for(var i=0,j=_array.length;i<j;i++){
			if((new RegExp("(?:^|\\s+)"+classname+"(?:\\s+|$)")).test(_array[i].className)){
				result.push(_array[i]);
			}
		}
		return result;
	}

    if (document.body && document.body.scrollTop && document.body.scrollLeft){
		top=document.body.scrollTop;
		left=document.body.scrollleft; 
	}
	if (document.documentElement && document.documentElement.scrollTop && document.documentElement.scrollLeft){
		top=document.documentElement.scrollTop;
		left=document.documentElement.scrollLeft;
	}

	//details nav
	var linkList = document.getElementById("linkList");
	var link = linkList.getElementsByTagName("li");
    
	var main = document.getElementById("main");
	var tabList = getByClass("sl","div",main);
    
    
	window.onscroll = function(){
		sTop = document.body.scrollTop;

        for(var i in tabList){
			var tabTop = tabList[i].offsetTop - sTop;
			
			if(tabTop <= 70 && tabTop >= 0){
	            index = i;
	            change(index);
			}
		}
    }

 //    for(var j=0; j<link.length;j++){

	// 	link[j].onclick = function(){
 //             //a = j;
 //             turn(j);
 //             change(j);
	// 	}
	// }
    
    // var timer =null;
    // function turn(flag){
    //     timer = setTimeout(function(){
    //     	//alert(t);
    //     	document.body.scrollTop = tabList[flag].offsetTop;
    //     },100)        
    // }

    function change(flag){
    	//alert(flag);
    	for(var j=0; j<link.length;j++){
			link[j].style.backgroundColor = "#32323a";
		}
        link[flag].style.backgroundColor = "#1eb5ad";
    }
	
}