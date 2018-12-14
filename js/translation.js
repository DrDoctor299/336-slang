/* 
* 
* Translation Core
*
*/

$(document).ready(function() {
    // Change right textbox as left one changes
    $("#sourceMessage").on("change keyup" ,function() {
        $("#rightArrow").css("opacity", "");
        if($("#sourceLang").val() == $("#targetLang").val() && !$("#dialect").val() && $.trim($("#sourceLang").val()) != "") {
            $("#targetMessage").val($("#sourceMessage").val());
        }
        else {
            $("#rightArrow").css("opacity", "1");
            updateTranslation();
        }
    });
    
    // Update translation when selection boxes change
    $("#targetLang, #sourceLang, #dialect").on("change" , function() {
         updateTranslation();
    });
    
    // Emphasize swap button upon hover
    $("#swapArrows").on("mouseover", function() {
         $("#swapArrows").css("opacity", "1");
         $("#swapArrows").css( 'cursor', 'pointer' );
    });
    $("#swapArrows").on("mouseout", function() {
         $("#swapArrows").css("opacity", "0.2");
         $("#swapArrows").css( 'cursor', 'default' );
    });
    
    // Swap left and right fields upon click
    $("#swapArrows").on("click", function() {
        var inputMsg = $("#sourceMessage").val();
        var inputLang = $("#sourceLang").val();
        $("#sourceMessage").val($("#targetMessage").val());
        $("#targetMessage").val(inputMsg);
        $("#sourceLang").val($("#targetLang").val())
        $("#targetLang").val(inputLang);
        updateTranslation();
    });
    
});
    