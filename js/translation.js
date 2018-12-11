/* 
* 
* Translation Core
*
*/

$(document).ready(function() {
    var langMap = new Array();
    // Translate left textbox contents and output to right
    var updateTranslation = function() {
        var delay = 500;
        var timer;
        $.ajax({
                type: "GET",
                url: "getTranslation.php",
                dataType: "json",
                data: {
                        "message": $("#sourceMessage").val(),
                        "sourceLang": langMap[$("#sourceLang").val()],
                        "targetLang": langMap[$("#targetLang").val()]
                },
                      
                success: function(data, status) {
                    window.clearTimeout(timer);
                    timer = window.setTimeout(function () {
                        $("#targetMessage").val(data.rawTranslatedText.text);
                    }, delay);
                    
                }
            });
    }
    // Populate selectable languages
    $.ajax({
        type: "GET",
        url: "getAvailableLangs.php",
        dataType: "json",
        
        success: function(data, status) {
            $.each(data, function(index, val) {
               $("#sourceLang").append("<option>" + val.name + "</option>");
               $("#targetLang").append("<option>" + val.name + "</option>");
               $("#contributeLangOne").append("<option>" + val.name + "</option>");
               $("#contributeLangTwo").append("<option>" + val.name + "</option>");
               $("#editLangOne").append("<option>" + val.name + "</option>");
               $("#editLangTwo").append("<option>" + val.name + "</option>");
               $("#slangLang").append("<option>" + val.name + "</option>");
               langMap[val.name] = val.code;
            });
            $("#sourceLang").val("English");
            $("#targetLang").val("English");
            $("#contributeLangOne").val("English");
            $("#contributeLangTwo").val("English");
            $("#slangLang").val("English");
        }
        
    });
    
    // Change right textbox as left one changes
    $("#sourceMessage").on("change keyup" ,function() {
        if($("#sourceLang").val() == $("#targetLang").val() || !$.trim($("#sourceLang").val())) {
            $("#targetMessage").val($("#sourceMessage").val());
        }
        else {
            updateTranslation();
        }
    });
    
    // Update translation when selection boxes change
    $("#targetLang, #sourceLang").on("change" , function() {
         updateTranslation();
    });
    
});
    