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
               langMap[val.name] = val.code;
            });
            $("#sourceLang").val("English");
            $("#targetLang").val("English");
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
    
    // Update translation when target language is changed
    $("#targetLang").on("change" , function() {
         updateTranslation();
    });
    
    // Update translation when target language is changed
    $("#sourceLang").on("change" , function() {
         updateTranslation();
    });
    
    
});
    