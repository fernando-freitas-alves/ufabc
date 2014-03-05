function carregarPortalDoAluno(aluno)
{
    fillData(aluno);
    changeRowColor(aluno.nome);
    setStaticState();
    stopIntervalMessages();
}

function fillData(aluno)
{
    document.getElementById('nome').innerHTML  = aluno.nome;
    //document.getElementById('email').innerHTML = aluno.email;
    document.getElementById('RA').innerHTML    = aluno.RA;
    document.getElementById('curso').value = aluno.curso;  //.innerHTML = aluno.curso;
    d_acc = 0;
    ficha_individual = document.getElementsByClassName('ficha_individual')[0];
    for (q = 0; q < aluno.quadrimestre.length; q++)
    {
        qn = insertElement('tr',
                           'quadrimestre ' + q,
                           null,
                           'quadrimestre',
                           '<td colspan=6 class="ano_periodo">' + aluno.quadrimestre[q].n + ' de ' + aluno.quadrimestre[q].ano + '</td>',
                           null,
                           ficha_individual,
                           null,
                           'cabecalho');
        for (d = 0; d < aluno.quadrimestre[q].disciplina.length; d++)
        {
            innerHTML = '<td>' + aluno.quadrimestre[q].disciplina[d].codigo    + '</td>' + '\n' +
                        '<td style="text-align: left;">' + aluno.quadrimestre[q].disciplina[d].nome + '</td>' + '\n' +
                        '<td>' + aluno.quadrimestre[q].disciplina[d].creditos  + '</td>' + '\n' +
                        '<td>' + aluno.quadrimestre[q].disciplina[d].conceito  + '</td>' + '\n' +
                        '<td>' + aluno.quadrimestre[q].disciplina[d].situacao  + '</td>' + '\n' +
                        '<td>' + aluno.quadrimestre[q].disciplina[d].categoria + '</td>';

            dn = insertElement('tr',
                               'disciplina ' + d_acc++,
                               null,
                               'disciplina',
                               innerHTML,
                               null,
                               ficha_individual,
                               null,
                               qn);
        }
    }
}

function setDynamicState()
{
    fade = document.getElementById('fade');
    fade.onclick = openPortal;
    window.setTimeout(function()
    {
        fade.className = 'fade';
    }, 1000);
}

function setStaticState()
{
    fade = document.getElementById('fade');
    fade.onclick   = null;
    fade.className = 'static';
}

function changeRowColor(str)
{

    bgColor = intToRGB(hashCode(str));
    insertCSS('#conteudo tr:hover td { background: #' + bgColor + '; }');

    cp      = document.getElementsByClassName('coeficientes')[0].childNodes[1].childNodes[2].childNodes[1];
    cpColor = document.defaultView.getComputedStyle(cp, null)['color'];
    cpColor = rgbToString(cpColor);
    //if (getBrightness(0, bgColor) <= 255*.7)
    //    bgColor = rgbBrightness(bgColor, .50);
    if (getBrightness(0, bgColor) <= 255*.7 ||
        rgbProximity(bgColor, cpColor) > .80)
        insertCSS('#conteudo tr:hover td { color: #FFFFFF; }' + '\n' +
                  '#conteudo tr.quadrimestre:hover td { color: initial; }');
}

function updateForms()
{
    cursosLista = document.getElementById('curso');
    for (c = 0; c < cursos.length; c++)
    {
        curso = cursos[c];
        cursoOpt      = document.createElement('option');
        cursoOpt.text = curso.nome;
        cursosLista.add(cursoOpt);
    }
}