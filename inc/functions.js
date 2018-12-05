$(document).ready(function() {
    
    $("#startMessage").on("change keyup" ,function() {
        var delay = 500;
        var timer;
        $.ajax({
            type: "GET",
            url: "getTranslation.php",
            dataType: "json",
            data: {
                    "message": $("#startMessage").val()
            },
                  
            success: function(data,status) {
                console.log(data);
                window.clearTimeout(timer);
                timer = window.setTimeout(function () {
                    $("#resultMessage").val(data.rawTranslatedText.text);
                }, delay);
                
            }
        });
    });
    
    
});
    