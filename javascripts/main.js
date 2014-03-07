/*
// Externos
$.getScript('javascripts/URI.js');      // Interpretra a URL
//$.getScript('javascripts/j.js');        // Interpretra arquivos do Excel

// Internos
$.getScript('javascripts/tags.js');     // Manipula os elementos tags de um HTML
$.getScript('javascripts/data.js');     // Gerencia e manipula os dados
$.getScript('javascripts/color.js');    // Manipula cores
$.getScript('javascripts/HTML.js');     // Gerencia e manipula os estados da HTML
$.getScript('javascripts/events.js');   // Gerencia e manipula os eventos
//*/

//*
// Externos
loadScript('javascripts/jquery-1.11.0.min.js',  null);   // Utilizado para a função 'clone'
loadScript('javascripts/URI.js',    null);   // Interpretra a URL
//loadScript('javascripts/j.js',      null);   // Interpretra arquivos do Excel

// Internos
loadScript('javascripts/tags.js',   null);   // Manipula os elementos tags de um HTML
loadScript('javascripts/data.js',   null);   // Gerencia e manipula os dados
loadScript('javascripts/color.js',  null);   // Manipula cores
loadScript('javascripts/HTML.js',   null);   // Gerencia e manipula os estados da HTML
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
//*/