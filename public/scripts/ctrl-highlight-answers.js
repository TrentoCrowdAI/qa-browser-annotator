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


app.start()
.then(function () {
    app.annotations.load({uri: window.location.href});
});;

function getPageBaseUrl() {
    return window.location.protocol + "//" + window.location.host;
}