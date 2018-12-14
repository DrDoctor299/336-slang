$(document).ready(function() {

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
    // Hide results if nothing in them
    $("#results").on("DOMSubtreeModified", function() {
        if($("#results").html()=="")
            $("#results").css("display", "none");
    });
    
    $("#slangLink, #homeLink").on("click", function() {
        search();
    });
    
    
    
});