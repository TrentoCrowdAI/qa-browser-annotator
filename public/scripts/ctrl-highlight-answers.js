const urlParams = new URLSearchParams(window.location.search);
const pageurl = urlParams.get('url');

function annotationCreatedInfo() {
    return {
        beforeAnnotationCreated: function (annotation) 
        {
            annotation.pageurl = pageurl;
        },
    };
}

var app = new annotator.App();
app.include(annotator.ui.main);
app.include(annotator.storage.http, {
    prefix: getPageBaseUrl() + '/api',
    urls: {
        create: '/annotations',
        update: '/annotations/{id}',
        destroy: '/annotations/{id}',
        search: '/search'
    }
});
app.include(annotationCreatedInfo);

annotator.storage.StorageAdapter.prototype.load = function (query) {
    var self = this;
    return this.query(query)
        .then(function (data) {
            let tmp = data.meta;
            //Filter db stuff like creation date, ecc...
            let realAnnotations = tmp.data
            self.runHook('annotationsLoaded', [realAnnotations]);
        });
};


app.start()
.then(function () {
    app.annotations.load({pageurl: pageurl});
});;

function getPageBaseUrl() {
    return window.location.protocol + "//" + window.location.host;
}