$(document).ready(function(){

    GetUserName();
    GetUserSites();

    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        // $(this).parent().addClass("active");
    }).on("focusout", function(){
        $(this).parent().removeClass("active");
    })
})

function GetUserName(){
    $.ajax({type: "GET", url:"/api/user_name", headers:{authorization: Cookies.get('authorization')}}).done( function(data, status){
        $('#user-name').text(data.email);
        // console.log(data.email);
    });
}

function GetUserSites(){
    $.ajax({type: "GET", url:"/api/sites", headers:{authorization: Cookies.get('authorization')}}).done( function(data, status){
        // console.log(data);
        $('#site-list').append('<li class><a href="">' + "All Sites" + '</a></li>');
        for(var item of data){
            // console.log(item);            
            $('#site-list').append('<li class><a href="">' + item + '</a></li>');    
        }

        // event handling
        $("#site-list li").click(function(){
            if($(this).find("a").text() != "New Site...")
                $("#selected-site").text($(this).find("a").text());
            else{
                // new site
            }
        })
    });
}

