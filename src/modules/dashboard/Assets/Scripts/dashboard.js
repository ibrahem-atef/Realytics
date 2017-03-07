CheckLoggedIn();

$(document).ready(function(){
    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    }).on("focusout", function(){
        $(this).parent().removeClass("active");
    })
})

function CheckLoggedIn(){
    auth = Cookies.get("authorization");
    $.ajax({type: "GET", url:"/api/loggedin", headers:{authorization: Cookies.get('authorization')}}).fail( function(){
        window.location.replace("/login");
        // console.log("failed");
    });
}