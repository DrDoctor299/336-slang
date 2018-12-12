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
        $("#signupDiv").css("display", "none");
        $("#signupPrompt").hide();
        $("#loginLink a").css("class", "nav-link")
    };
    
    var listContributions = function() {
        $.ajax({
            type: "get",
            url: "./getUserContributions.php",
            success: function(data) {
                $("#displayUserContributions").html("<ul>");
                for(var i = 0; i < data.length; i++) {
                    $("#displayUserContributions").append("<li>" + 
                    data[i].language1 + " (" + data[i].dialect1 + "): " + data[i].phrase1
                    + "<p class='arrowBorder'> <--> </p>" 
                    + data[i][7] + " (" + data[i].dialect2 + "): " + data[i].phrase2 
                    //TODO change links to be styled as buttons instead
                    + " <a style='width: 80px; color: white; margin-left: 10px' role='button' class='btn btn-primary removeCont' value='" + data[i].contributionID + "'>Delete</a>" 
                    + " <a style='width: 80px; color: white; margin-right: -10px' role='button' class='btn btn-primary editCont' value='" + data[i].contributionID + "'>Edit</a>"
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
                });
                //clicked "edit" for one of the contributions
                $(".editCont").click(function() {
                    //Call getUserContributions.php to retrieve the single contribution information needed to fill the edit form
                    $("#editButton").data("contributionID", $(this).attr("value"));
                    $.ajax({
                        type: "post",
                        url: "./getUserContributions.php",
                        datatype: "application/json",
                        data: {"id": $(this).attr("value")},
                        //show modal and populate fields with old values
                        success: function(data) {
                            $("#editLangOne").prop('selectedIndex', (data[0].langID1 - 1));
                            $("#editLangTwo").prop('selectedIndex', (data[0].langID2 - 1));
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
                    //clicked submit edit
                    //call editUserContribution.php which updates a record
                    $("#editButton").click(function() {
                        $.ajax({
                            type: "post",
                            url: "./editUserContribution.php",
                            datatype: "application/json",
                            data: {"id": $("#editButton").data("contributionID"),
                            "textOne": $("#editTextOne").val(),
                            "textTwo": $("#editTextTwo").val(),
                            "dialectOne": $("#editDialectOne").val(),
                            "dialectTwo": $("#editDialectTwo").val(),
                            "langOne": $("#editLangOne").val(),
                            "langTwo": $("#editLangTwo").val()},
                            success: function(data) {
                                console.log(data);
                                $('#contributeLink').trigger('click');
                                $('#editModal').modal('toggle');
                            },
                            fail: function(status) {
                                console.log(status);
                            }
                        });    
                    });
                });
                
                
                
            },
            fail: function(status) {
                console.log(status);
            }
            
        });
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
        search();
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
    
    
});