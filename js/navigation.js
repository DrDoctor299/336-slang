/*
*
* Navigation core
*
*/

$(document).ready(function() {
    var url = window.location.href.substring(window.location.href.indexOf('#')+1);
    
    var hideAll = function() {
        $("#homePage").hide();
        $("#homeLink a").attr("class", "nav-link")
        $("#slangPage").hide();
        $("#slangLink a").attr("class", "nav-link")
        $("#contributePage").hide();
        $("#contributeLink a").attr("class", "nav-link")
        $("#loginDiv").css("display", "none");
        $("#signupDiv").attr("display", "none");
        $("#signupPrompt").hide();
        $("#loginLink a").css("class", "nav-link")
    };
    
    var checkLoggedIn = function() {
        $.ajax({
           type: "GET",
            url: "checkLoggedIn.php",
            dataType: "json", 
            
            complete: function(data, status) {
                // If already logged in
                if(data.success) {
                    $("#signupPrompt").hide();
                    $("#loginDiv").css("display", "none");
                    $("#loginLink a").html("Logout");
                }
                else {
                    $("#signupPrompt").show();
                    $("#loginDiv").css("display", "inline-block");
                    $("#loginLink a").html("Login");
                    
                }
            }
        });    
    }
    
    var showHome = function() {
        hideAll();
        $("#homePage").show();
        $("#homeLink a").attr("class", "nav-link active")
    }
    var showSlang = function () {
        hideAll();
        $("#slangPage").show();
        $("#slangLink a").attr("class", "nav-link active")
    }
    var showContribute = function () {
        hideAll();
        $("#contributePage").show();
        $("#contributeLink a").attr("class", "nav-link active")
    }
    var showLogin = function () {
        hideAll();
        checkLoggedIn();
        $("#loginErrorMessage").css("display", "none");
        $("#signupDiv").css("display", "none");
        $("#loginLink a").css("class", "nav-link active")
        
        
    }
    
    //Redirect to proper page
    
    // go to slang page
    if(url=="Slang") {
        showSlang();
    }
    // go to contribute page
    else if(url=="Contribute") {
        showContribute();
    }
    // go to login page
    else if(url=="Login") {
        showLogin();
    }
    // go to homepage
    else {
        showHome();
    }

    //homepage click
    $("#homeLink").on("click", function() {
         showHome();
    });
    //slang page click
     $("#slangLink").on("click", function() {
         showSlang();
    });
    //contribute page click
     $("#contributeLink").on("click", function() {
         showContribute();
    });
    //login page click
     $("#loginLink").on("click", function() {
        // When clicked, if text = logout then the user will be logged out
        if($("#loginLink a").text()=="Login")
            showLogin();
            
        else {
            $.ajax({
                type: "GET",
                url: "logout.php",
                
                complete: function() {
                    $("#loginUsername").val("");
                    $("#loginPassword").val("");
                    $("#contributeLink").css("display", "none");
                    showLogin();
                    
                }
            });
        }
    });
    
    
});