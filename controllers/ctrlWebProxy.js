const fetch = require('node-fetch'); 

const manageRequest = async function(req, res) {
    let response = await fetch(req.query.url)
    let responseText = await response.text()
    let baseUrl = getBaseUrl(req.query.url)
    responseText = injectBaseUrl(responseText, baseUrl)
    responseText = injectScript(req, responseText, "/resources/libs/jquery/jquery.min.js")
    responseText = injectScript(req, responseText, "/resources/libs/annotatorjs/annotator.min.js")
    responseText = injectScript(req, responseText, "/resources/scripts/test.js")
    responseText = injectScript(req, responseText, "/resources/scripts/ctrl-highlight-answers.js")
    responseText = injectCss(req, responseText, "/resources/css/test.css")
    
    res.send(responseText)

}

const injectBaseUrl = function(html, baseUrl) {
    return html.replace(/<head>/, '<head>\n<base href="' + baseUrl + '">')
}
const injectScript = function(req, html, scriptUrl) {
    scriptUrl =  req.protocol + '://' + req.get('host') + scriptUrl
    return html.replace(/<\/body>/, '<script src="' + scriptUrl + '"></script><\/body>')
}
const injectCss = function(req, html, scriptUrl) {
    cssUrl =  req.protocol + '://' + req.get('host') + scriptUrl
    return html.replace(/<\/head>/, '<link rel="stylesheet" type="text/css" href="' + cssUrl + '">    <\/head>')
}

const getBaseUrl = function(url) {
    let pathArray = url.split( '/' );
    let protocol = pathArray[0];
    let host = pathArray[2];
    return protocol + '//' + host;
}

module.exports = {
    manageRequest
}