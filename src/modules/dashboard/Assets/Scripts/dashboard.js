$(document).ready(function(){
    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    }).on("focusout", function(){
        $(this).parent().removeClass("active");
    })
})
