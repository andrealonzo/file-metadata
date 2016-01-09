$(document).ready(function() {

    var files;
    $('input[type=file]').on('change', function() {
        files = event.target.files;
    });
    $("#fileForm").submit(function(e) {
        handleFormSubmit(e, files);
    });


});

function handleFormSubmit(e, files) {
    e.preventDefault();
    if (!files) {
        return;
    }
    var file = files[0];
    var data = new FormData();
    
    data.append("inputFile", file);
    $("#results").html("<img src='public/ajax-loader.gif'/>");
    $.ajax({
        url: window.location.origin + '/fileanalyze/',
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        error: function(jqXHR, textStatus, errorThrown) {
            $("#results").html("There was an error: " + textStatus);
        },
        success: function(data) {
            $("#results").html(parseResults(data));
        }.bind(file)
    });

}

function parseResults(results) {
    var resultText;
    if (!results) {
        resultText = "There was an error";
    }
    else {
        resultText = '<p>'+results.filename + ' is ' + results.fileSize + ' bytes</p>';
        resultText += '<p>Mime type is ' + results.mimetype+'</p>' ;
        resultText += '<p>Encoding is ' + results.encoding+'</p>';
    }
    var output = '	<div class="panel panel-default">' +
        '<div class="panel-body">' +
        resultText +
        '</div>' +
        '</div>';
    return output;
}