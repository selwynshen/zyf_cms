function category_analysis(params){
    $.ajax({
        type:"POST",
        url:"",
        data:params,
        dataType:"text",
        success:function(data){
            alert(data);
        }
    });
}
