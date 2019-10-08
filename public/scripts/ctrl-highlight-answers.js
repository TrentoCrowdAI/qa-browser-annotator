const urlParams = new URLSearchParams(window.location.search);
const pageurl = urlParams.get('url');
const urlprefix = getPageBaseUrl() + '/api'

const LOCALSTORAGE_ANNOTATIONS_KEY = "qabrowser_annotations";
const LOCALSTORAGE_ANNOTATIONS_LAST_UPDATE_KEY = "qabrowser_annotations_last_update";


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


var app = new annotator.App();
var allAnnotations = [];

app.include(annotator.ui.main);
/*app.include(annotator.storage.http, {
    prefix: getPageBaseUrl() + '/api',
    urls: {
        create: '/annotations',
        update: '/annotations/{id}',
        destroy: '/annotations/{id}',
        search: '/search'
    }
});*/

function customStorage() {    
    return {
        start: function (app) {
            var request = $.ajax({
                url: urlprefix + "/search",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: {pageurl: pageurl},
            });
            request.then(function (data) {
                let dbAnnotations = data.data;
                
                let tmpLocal = getAnnotationsLocalStorage();
                let tmpLocalUpdateAt = getAnnotationsLastUpdateLocalStorage();
                if (!tmpLocalUpdateAt || new Date(data.updated_at) > tmpLocalUpdateAt) {
                    console.log("Using db annotations");
                    allAnnotations = dbAnnotations;    
                } else {
                    console.log("Using local annotations");
                    allAnnotations = tmpLocal;
                }
                if (!allAnnotations) allAnnotations = [];
                app.runHook('annotationsLoaded', [allAnnotations]);
            })
            
        },
        beforeAnnotationCreated: function (annotation) {
            annotation.pageurl = pageurl;
            annotation.id = "local_" + uuidv4();
        },
        annotationCreated: function (annotation) {
            console.log(annotation);
            allAnnotations.push(annotation);
            setAnnotationsLocalStorage(allAnnotations);
        },
        annotationDeleted: function (annotation) {
            console.log(annotation);
            allAnnotations = allAnnotations.filter(function(item) 
            { 
                return item.id != annotation.id; 
            })
            setAnnotationsLocalStorage(allAnnotations);

        }
    };
}
app.include(customStorage);

app.start().then(function () {});


function submitAnnotation() {
    //TODO: delete annotation._local
    var request = $.ajax({
        url: urlprefix + "/annotations",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({pageurl: pageurl, highlights: getAnnotationsLocalStorage()}),
    });
    request.then(function (data) {

    });
}
function deleteAnnotations() {
    setAnnotationsLocalStorage([]);
    allAnnotations = [];
    app.runHook("undrawHighlightsAll");
}

function getPageBaseUrl() {
    return window.location.protocol + "//" + window.location.host;
}
function setAnnotationsLocalStorage(annotations) {
    localStorage.setItem(LOCALSTORAGE_ANNOTATIONS_KEY, JSON.stringify(annotations));
    localStorage.setItem(LOCALSTORAGE_ANNOTATIONS_LAST_UPDATE_KEY, new Date().toISOString());
}
function getAnnotationsLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_ANNOTATIONS_KEY));
}
function getAnnotationsLastUpdateLocalStorage() {
    let tmp = localStorage.getItem(LOCALSTORAGE_ANNOTATIONS_LAST_UPDATE_KEY);
    if (tmp) return new Date(tmp);
    return undefined;
}