loadScript('javascripts/XML.js',    null);
loadScript('javascripts/class.js',  null);

var actualDataHash, cursos;

function loadFromData(data)
{
    aluno = new alunoClass(data);
    carregarPortalDoAluno(aluno);
}

function loadFromRaw(raw)
{
    dataHash = getHashFromRaw(raw);
    XML      = new xmlClass(dataHash);
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
    uri     = new URI('?' + data);
    uncoded = uri.search(true).aluno;
    uncoded = (uncoded !== null && uncoded !== undefined) ? decodeURIComponent(uncoded) : data;
    console.log('Hashcode obtido com sucesso:');
    console.log(uncoded);
    return atob(uncoded);
}

function atualizarCursos()
{
    XML    = importXML('xml/cursos.xml');
    cursos = new cursoClass(XML);
    updateForms();
}