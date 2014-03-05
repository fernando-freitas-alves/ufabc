// Externos
loadScript('javascripts/URI.js',    null);   // Interpretra a URL
//loadScript('javascripts/j.js',      null);   // Interpretra arquivos do Excel

// Internos
loadScript('javascripts/html.js',   null);   // Gerencia e manipula os estados da HTML
loadScript('javascripts/tags.js',   null);   // Manipula os elementos tags de um HTML
loadScript('javascripts/data.js',   null);   // Gerencia e manipula os dados
loadScript('javascripts/color.js',  null);   // Manipula cores
loadScript('javascripts/events.js', null);   // Gerencia e manipula os eventos

function loadScript(url, callback)           // Importa um script
{
    var head    = document.getElementsByTagName('head')[0];
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = url;
    script.onreadystatechange = callback;
    script.onload             = callback;
    head.appendChild(script);
}