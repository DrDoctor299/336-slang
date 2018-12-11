/*
*
* Navigation core
*
*/

$(document).ready(function() {
    var url = window.location.href.substring(window.location.href.indexOf('#')+1);
    var loggedIn = false;
    
    var hideAll = function() {
        $("#homePage").hide();
        $("#homeLink a").attr("class", "nav-link")
        $("#slangPage").hide();
        $("#slangLink a").attr("class", "nav-link")
        $("#contributePage").hide();
        $("#contributeLink a").attr("class", "nav-link")
        $("#loginDiv").css("display", "none");
        $("#signupDiv").css("display", "none");
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
                    $("#contributeLink").css("display", "inline-block");
                    $("#loginLink a").html("Logout");
                    loggedIn = true;
                }
                else {
                    $("#signupPrompt").show();
                    $("#loginDiv").css("display", "inline-block");
                    $("#loginLink a").html("Login");
                    $("#contributeLink").css("display", "none");
                    
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
    else if(url=="Contribute" && loggedIn) {
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
        $.ajax({
            type: "get",
            url: "./getUserContributions.php",
            success: function(data) {
                console.log(data);
                $("#displayUserContributions").html("<ul>");
                for(var i = 0; i < data.length; i++) {
                    $("#displayUserContributions").append("<li>" + 
                    data[i].language1 + " (" + data[i].dialect1 + "): " + data[i].phrase1
                    + " <--> " 
                    + data[i][7] + " (" + data[i].dialect2 + "): " + data[i].phrase2 
                    //TODO change links to be styled as buttons instead
                    + " <a class='removeCont' value='" + data[i].contributionID + "'>Delete</a>" 
                    + " <a class='editCont' value='" + data[i].contributionID + "'>Edit</a>"
                    + "</li>");
                }
                $("#displayUserContributions").append("</ul>");
                $(".removeCont").click(function() {
                    $.ajax({
                        type: "get",
                        url: "./deleteUserContribution.php",
                        datatype: "application/json",
                        data: {"id": $(this).attr("value")},
                        success: function(data) {
                            $('#contributeLink').trigger('click');
                        },
                        fail: function(status) {
                            console.log(status);
                        }
                    });
                    console.log("Deleting contribution with id: " + $(this).attr("value"));
                });
                //clicked "edit" for one of the contributions"
                $(".editCont").click(function() {
                    //Call getUserContributions.php to retrieve the single contribution information needed to fill the edit form
                    $.ajax({
                        type: "post",
                        url: "./getUserContributions.php",
                        datatype: "application/json",
                        data: {"id": $(this).attr("value")},
                        //show modal and populate fields with old values
                        success: function(data) {
                            console.log(data);
                            //TODO adjust language selector based on result
                            $("#editTextOne").attr("value", data[0].phrase1);
                            $("#editTextTwo").attr("value", data[0].phrase2);
                            $("#editDialectOne").attr("value", data[0].dialect1);
                            $("#editDialectTwo").attr("value", data[0].dialect2);
                            $('#editModal').modal('toggle');
                        },
                        fail: function(status) {
                            console.log(status);
                        }
                    });
                    //call editUserContribution.php which updates a record
                    $("#editButton").click(function() {
                        $.ajax({
                            type: "post",
                            url: "./editUserContribution.php",
                            datatype: "application/json",
                            data: {"id": $(this).attr("value"),
                            "textOne": $("#editTextOne").val(),
                            "textTwo": $("#editTextTwo").val(),
                            "dialectOne": $("#editDialectOne").val(),
                            "dialectTwo": $("#editDialectTwo").val(),
                            "langOne": $("#editLangOne").val(),
                            "langTwo": $("#editLangTwo").val()},
                            success: function(data) {
                                console.log(data);
                                $('#contributeLink').trigger('click');
                            },
                            fail: function(status) {
                                console.log(status);
                            }
                        });    
                    });
                    
                    console.log("Editing contribution with id: " + $(this).attr("value"));
                });
                
                
                
            },
            fail: function(status) {
                console.log(status);
            }
            
        });
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
                    loggedIn = false;
                    showLogin();
                    
                }
            });
        }
    });
    
    
});