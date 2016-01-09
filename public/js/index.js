$(document).ready(function() {

    $("#recentSearchesButton").click(function() {
        handleSearchesButtonClick();
    });
    $("#searchForm").submit(function(e) {
        handleSearchFormSubmit(e);
    });


});

function handleSearchFormSubmit(e) {
    e.preventDefault();
    var url = window.location.protocol + "//" + window.location.hostname + "/imagesearch/" + $("#query").val() + "?offset=" + $("#offset").val();
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: function(data) {

            $("#results")
                .html(parseSearchResults(data));

        }
    });
}

function handleSearchesButtonClick() {
    var url = window.location.protocol + "//" + window.location.hostname + "/latest/imagesearch/";
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        success: function(data) {
            $("#results")
                .html(parseRecentSearchResults(data));

        }
    });
}

function parseSearchResults(results) {

    var output = '<div class="panel panel-default">' +
        '<div class="panel-body">';
    for (var i = 0; i < results.length; i++) {
        if (i % 4 === 0) {
            //start new row
            output += '<div class="row">';
        }
        output += '<div class="col-md-3">' +
            '<a href="'+results[i].context+'" target="_blank" title="'+results[i].snippet+'">' +
            '<img src="'+results[i].url+'" class="img-responsive img-thumbnail">' +
            '</a> </div>';

            if (i % 4 === 3) {
                //end new row
                output += '</div>';
            }
    }
    output += '</div>' +
        '</div>';
    return output;
}

function parseRecentSearchResults(results) {
    var output = "<table class=\"table table-striped\">" +
        "<thead>" +
        "<tr>" +
        "<th>term</th>" +
        "<th>when</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";
    for (var i = 0; i < results.length; i++) {
        output += "<tr>" +
            "<td>" + results[i].term + "</td>" +
            "<td>" + results[i].when + "</td>" +
            "</tr>";
    }
    output += "</tbody>" +
        "</table>";
    return output;
}