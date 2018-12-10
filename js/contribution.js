/* 
* 
* Contribution Core
*
*/

$(document).ready(function() {
    $("#contributeButton").on("click" , function() {
        $.ajax({
           type:"GET",
           url: "makeContribution.php",
           dataType: "json",
           
           data: {
               "language1": $("#contributeLangOne").val(),
               "language2": $("#contributeLangTwo").val(),
               "dialect1": $("#contributeDialectOne").val(),
               "dialect2": $("#contributeDialectTwo").val(),
               "phrase1": $("#contributeTextOne").val(),
               "phrase2": $("#contributeTextTwo").val(),
           },
           
           complete: function(data, status) {
               //Clear out input and update the contributions being shown
           }
           
            
        });
    });
    
});