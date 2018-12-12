$(document).ready(function() {
    var order = "";
    $("#slangByLang").prop("checked", true);
    search();
    //searchbar
    $("#slangSearch").change(function() {
        console.log("search calls");
        search();
    });
    //language select
    $("#slangLang").change(function() {
        console.log("lang calls");
        search();
    });
    //dialect select
    $("#slangDialect").change(function() {
        console.log("dialect calls");
        search();
    });
    //order by oldest/newest
    $(".slangOrderBy").change(function() {
        console.log("oldest/newest calls");
        console.log($(this).attr("id"));
        order = $(this).attr("id");
        search();
    });
    
    function search() {
        $.ajax({
            type: "post",
            url: "./search.php",
            datatype: "application/json",
            data: {"slang": $("#slangSearch").val(),
            "lang": $("#slangLang").val(),
            "dialect": $("#slangDialect").val(),
            "order": order
            },
            success: function(data) {
                console.log(data);
            },
            fail: function(status) {
                console.log(status);
            }
        });
    }
    
});