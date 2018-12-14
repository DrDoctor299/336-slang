/*
* General Functions
* Navigation Functions
* Slang Page Functions
* Contribution Functions
*/

// Stores languages with their language codes
var langMap = new Array();
var order = "";
var langsAreSet = false;
// General Functions //

 // Translate left textbox contents and output to right
var updateTranslation = function() {
    var delay = 500;
    var timer;
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
        $.ajax({
            type: "GET",
            url: "getTranslation.php",
            dataType: "json",
            data: {
                    "message": $.trim($("#sourceMessage").val()).toLowerCase(),
                    "sourceLang": langMap[$("#sourceLang").val()],
                    "targetLang": langMap[$("#targetLang").val()],
                    "dialect": $("#dialect").val().toLowerCase()
            },
                  
            success: function(data, status) {
           
                // If slang exists
                if(data.slangText) {
                    $("#targetMessage").val(data.slangText);
                    $("#accordion").show();
                    $(".card-body").html(data.convertedWord.text);
                }
                else {
                    $("#targetMessage").val(data.convertedWord.text);
                    $("#accordion").hide();
                    // print out slang not found and ask to contribute
                }
            }
        });
    }, delay);
};

var populateLangs = function() {
    $.ajax({
        type: "GET",
        url: "getAvailableLangs.php",
        dataType: "json",
        data: {
            "language2": $("#targetLang").val()
        },
        
        success: function(data, status) {
            // Populate language dropdowns
            $.each(data["langs"], function(index, val) {
               $("#sourceLang").append("<option>" + val.name + "</option>");
               $("#targetLang").append("<option>" + val.name + "</option>");
               $("#contributeLangOne").append("<option>" + val.name + "</option>");
               $("#contributeLangTwo").append("<option>" + val.name + "</option>");
               $("#editLangOne").append("<option value='" + (index+1) + "'>" + val.name + "</option>");
               $("#editLangTwo").append("<option value='" + (index+1) + "'>" + val.name + "</option>");
               $("#slangLang").append("<option value='" + (index+1) + "'>" + val.name + "</option>");
               langMap[val.name] = val.code;
            });
            // Populate slang dropdowns
            $("#dialect").empty();
            $("#dialect").append("<option>Dialect</option><option>Standard</option>");
            $.each(data["slangs"], function(index, val) {
                if(val!="Standard")
                    $("#dialect").append("<option>" + val + "</option>");
            });
            if(!langsAreSet) {
                $("#sourceLang").val("English");
                $("#targetLang").val("English");
            }
            $("#contributeLangOne").val("English");
            $("#contributeLangTwo").val("English");
            langsAreSet = true;
        }
        
    });    
}

function search() {
    $.ajax({
        type: "post",
        url: "search.php",
        datatype: "application/json",
        data: {"slang": $("#slangSearch").val(),
        "lang": $("#slangLang").val(),
        "dialect": $("#slangDialect").val(),
        "order": order
        },
        success: function(data) {
            console.log(data);
            $("#results").html("");
            for(var i = 0; i < data.length; i++) {
                $("#results").append("<li><p class='slangData'>" + 
                data[i].username + "</p>  " + data[i].lang1plaintext + " (" + data[i].dialect1 + "): <p class='slangData'>" + data[i].phrase1
                + "</p> <div class='arrowBorder'> <--> </div> " 
                + data[i].lang2plaintext + " (" + data[i].dialect2 + "): <p class='slangData'>" + data[i].phrase2 
                + "</p></li>");
            }
            if(data["loggedinCount"]) {
                $("#resultsMetadata").html("Over <p class='slangNumber'>" + data["totalResults"] + "</p> entries" + 
                "<br>Contributed by <p class='slangNumber'>" + data["usersCount"] + "</p> members of our community" + 
                "<br>With <p class='slangNumber'>" + data["loggedinCount"] + "</p> of our entries being thanks to you!");
            }
            else {
                $("#resultsMetadata").html("Over <p class='slangNumber'>" + data["totalResults"] + "</p> entries" + 
                "<br>Contributed by <p class='slangNumber'>" + data["usersCount"] + "</p> members of our community");
            }
            if($("#results").html()!="")
                $("#results").css("display", "inline-block");
            
        },
        fail: function(status) {
            console.log(status);
        }
    });
}

// Navigation Functions //

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
    $("#loginLink a").attr("class", "nav-link")
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
    populateLangs();
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
    $("#loginLink a").attr("class", "nav-link active")
}


// Slang Functions //

// Contribution Functions //

var listContributions = function() {
    $.ajax({
        type: "get",
        url: "./getUserContributions.php",
        success: function(data) {
            $("#displayUserContributions").html("<ul>");
            for(var i = 0; i < data.length; i++) {
                $("#displayUserContributions ul").append("<li class='contributeItem'>" + 
                data[i].language1 + " (" + data[i].dialect1 + "): " + data[i].phrase1
                + "<p class='arrowBorder'> <--> </p>" 
                + data[i][7] + " (" + data[i].dialect2 + "): " + data[i].phrase2 
                //TODO change links to be styled as buttons instead
                + " <a style='width: 80px; color: white; margin-left: 10px' role='button' class='btn btn-success removeCont' value='" + data[i].contributionID + "'>Delete</a>" 
                + " <a style='width: 80px; color: white; margin-right: -10px' role='button' class='btn btn-success editCont' value='" + data[i].contributionID + "'>Edit</a>"
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
}


    
    
    