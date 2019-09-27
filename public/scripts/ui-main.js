$(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let pageurl = urlParams.get('url');

    const webpageRenderer = $("#webpage-renderer");
    const inputWebpageUrl = $("#input-webpage-url");
    const btnWebpageLoad = $("#btn-webpage-load");
    
    
    btnWebpageLoad.click(function () {
        insertUrlParam(urlParams, "url", inputWebpageUrl.val());
        pageurl = urlParams.get('url');
        initUI();
    });
    
    if (pageurl) {
        inputWebpageUrl.val(pageurl);
        initUI();
    }

    function initUI() {
        if (!pageurl) return;
        let annotatorUrl = "/annotator?url=" + pageurl + "&requestType=webproxy";
        webpageRenderer.attr("data", annotatorUrl);
        console.log(annotatorUrl);
    }

});


function insertUrlParam(urlParams, key, value) {
    if (history.pushState) {
        urlParams.set(key, value);
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString();
        window.history.replaceState({path: newurl}, '', newurl);
    }
}