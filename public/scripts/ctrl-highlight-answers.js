var app = new annotator.App();
app.include(annotator.ui.main);
app.include(annotator.storage.http, {
    prefix: 'http://localhost:3000/api',
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