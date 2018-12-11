/* 
* 
* Contribution Core
*
*/

$(document).ready(function() {
    $("#contributeButton").on("click" , function() {
        console.log("Button clicked");
        $.ajax({
           type:"GET",
           url: "makeContribution.php",
           dataType: "json",
           
           data: {
               "language1": $("#contributeLangOne").val(),
               "language2": $("#contributeLangTwo").val(),
               "dialect1": $("#contributeDialectOne").val(),
               "dialect2": $("#contributeDialectTwo").val(),
               "phrase1": $("#contributeTextOne").val().toLowerCase(),
               "phrase2": $("#contributeTextTwo").val().toLowerCase(),
           },
           success: function(data) {
               console.log(data);
           },
           complete: function(data, status) {
                //Clear out input and update the contributions being shown
                $("#contributeLangOneDefault").attr('selected', true);
                $("#contributeLangTwoDefault").attr('selected', true);
                $("#contributeDialectOne").val("Standard");
                $("#contributeDialectTwo").val("Standard");
                $("#contributeTextOne").val("");
                $("#contributeTextTwo").val("");
                $('#contributeLink').trigger('click');
           }
           
            
        });
    });
    
});