$(document).ready(function() {
    
    $("#startMessage").on("input" ,function() {
        $.ajax({
            type: "GET",
            url: "getTranslation.php",
            dataType: "json",
            data: {
                    "message": $("#startMessage").val()
            },
                  
            success: function(data,status) {
                console.log(data);
                $("#resultMessage").val(data.rawTranslatedText.text);
            }
        });
    });
    
    
});
    