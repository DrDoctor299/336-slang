/* 
* 
* Login and Sign Up Core
*
*/

$(document).ready(function() {
    
    $("#signupButton").on("click", function() {
        $("#loginDiv").hide();
        $("#signupPrompt").hide();
        $("#signupDiv").css("display", "inline-block");
    });
    
    // Verify user login info
    $("#tryLoginButton").on("click", function() {
        $.ajax ({ 
                type: "GET",
                url: "login.php",
                dataType: "json",
                    
                data: {
                        "sentUsername": $("#loginUsername").val(),
                        "sentPassword": $("#loginPassword").val()
                },
                      
                success: function(data,status) {
                    console.log(data);
                    
                    if(data.success) {
                        $("#signupPrompt").hide();
                        $("#loginDiv").css("display", "none");
                        $("#loginLink a").html("Logout");
                        $("#contributeLink").show();
                        $("#homePage").show();
                        $("#homeLink a").attr("class", "nav-link active")
                    }
                    else {
                        $("#loginErrorMessage").show();
                    }
                }
            });     
    });
    
    // Verify user signup info
    $("#trySignupButton").on("click", function() {
        var valid = true;
        // Check if username is empty
        if($("#signupUsername").val()=="") {
            $("#usernameErrorMessage").html("Username Cannot Be Empty");
            $("#usernameErrorMessage").show();
            valid = false;
        }
        
        if($("#signupPassword").val()=="") {
            $("#passwordErrorMessage").html("Password Cannot Be Empty");
            $("#passwordErrorMessage").show();
            valid = false;
        }
        
        // Passwords don't match
        if ($("#signupPassword").val() != $("#retypedPassword").val()){
            $("#passwordErrorMessage").html("Please Retype Your Password");
            $("#passwordErrorMessage").show();
            valid = false;
        }
  
        // Username checking is done through ajax call
        if(valid) {
            $.ajax ({ 
                type: "GET",
                url: "signup.php",
                dataType: "json",
                    
                data: {
                        "sentUsername": $("#signupUsername").val(),
                        "sentPassword": $("#signupPassword").val()
                },
                      
                success: function(data,status) {
                    console.log(data);
                    // If successful signup, "redirect" to login screen
                    if(data.success) {
                        $("#signupDiv").css("display", "none");
                        $("#signupPrompt").show();
                        $("#loginDiv").show();
                        $("#loginLink a").attr("class", "nav-link active")
                    }
                    else {
                        $("#usernameErrorMessage").show();
                    }
                }
            });
        } 
    });
    
    // Get rid of usernameErrorMessage if user is typing
    $("#signupUsername").on("input", function() {
        $("#usernameErrorMessage").hide();
    });
});