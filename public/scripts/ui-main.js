$(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageurl = urlParams.get('url');

    const webpageRenderer = $("#webpage-renderer");
    
    let annotatorUrl = "/annotator?url=" + pageurl + "&requestType=webproxy";
    webpageRenderer.attr("data", annotatorUrl);
    console.log(annotatorUrl);

});