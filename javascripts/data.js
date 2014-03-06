loadScript('javascripts/XML.js',    null);
loadScript('javascripts/class.js',  null);

var actualDataHash, aluno, cursos,
    xmlPath    = 'xml',
    cursosFile = 'cursos.xml';

function loadFromData(data)
{
    aluno = new alunoClass(data);
    stopIntervalMessages();
    carregarPortalDoAluno(false);
}

function loadFromRaw(raw)
{
    var dataHash = getHashFromRaw(raw);
    var XML      = new xmlClass(dataHash);
    if (actualDataHash != dataHash)
    {
        actualDataHash = dataHash;
        loadFromData(XML);
        console.log('Dados atualizados.');
    }
    else console.log('Hashcode coincidente.');
}

function getHashFromRaw(data)
{
    var uri     = new URI('?' + data);
    var uncoded = uri.search(true).aluno;
        uncoded = (uncoded !== null && uncoded !== undefined) ? decodeURIComponent(uncoded) : data;
    console.log('Hashcode obtido com sucesso:');
    //console.log(uncoded);
    return atob(uncoded);
}

function atualizarCursos()
{
    var XML = importXML(xmlPath + '/' + cursosFile);
    cursos  = new cursosClass(XML);
    updateForms();
}