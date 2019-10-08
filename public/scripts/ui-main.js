$(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let pageurl = urlParams.get('url');

    const webpageRenderer = $("#webpage-renderer");
    const divHeader = $("#div-header");
    const inputWebpageUrl = $("#input-webpage-url");
    const labelWebpageUrl = $("#label-webpage-url");
    const btnWebpageLoad = $("#btn-webpage-load");
    const btnSubmit = $("#btn-submit");
    const btnDeleteAll = $("#btn-delete-all");

    const readonly = divHeader.data("url-readonly");
    console.log("Readonly: " + readonly);
    
    
    btnWebpageLoad.click(function () {
        insertUrlParam(urlParams, "url", inputWebpageUrl.val());
        pageurl = urlParams.get('url');
        initUI();
    });
    btnSubmit.click(function () {
        webpageRenderer.get(0).contentWindow.submitAnnotation();
    });
    btnDeleteAll.click(function () {
        webpageRenderer.get(0).contentWindow.deleteAnnotations();
    });
    
    if (pageurl) {
        inputWebpageUrl.val(pageurl);
        initUI();
    }

    if (readonly) {
        divHeader.find(".webpage-selector").addClass("hidden");
        divHeader.find(".webpage-title").removeClass("hidden");
        labelWebpageUrl.html(pageurl);
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