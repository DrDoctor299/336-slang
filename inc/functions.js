$(document).ready(function() {
    
    $("#startMessage").on("change keyup" ,function() {
        var delay = 200;
        $.ajax({
            type: "GET",
            url: "getTranslation.php",
            dataType: "json",
            data: {
                    "message": $("#startMessage").val()
            },
                  
            success: function(data,status) {
                console.log(data);
                setTimeout(function () {
                    $("#resultMessage").val(data.rawTranslatedText.text);
                }, delay);
                
            }
        });
    });
    
    
});
    