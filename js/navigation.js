/*
*
* Navigation core
*
*/

$(document).ready(function() {
    var url = window.location.href.substring(window.location.href.indexOf('#')+1);
    
    // Redirect to proper page
    
    // go to slang page
    if(url=="Slang") {
        showSlang();
        
    }
    // go to contribute page
    else if(url=="Contribute" && $("#loginLink").text()=="Logout") {
        showContribute();
        listContributions();
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
        listContributions();
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
    
    populateLangs();
    
    
});