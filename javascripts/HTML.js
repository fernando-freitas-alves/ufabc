function carregarPortalDoAluno(atualizar)
{
    if (atualizar)
        clearData();
    else
    {
        changeRowColor(aluno.nome);
        setStaticState();
    }
    fillData(atualizar);
}

function fillData(atualizar)
{
    document.getElementById('nome').innerHTML  = aluno.nome;
    //document.getElementById('email').innerHTML = aluno.email;
    document.getElementById('RA').innerHTML    = aluno.RA;
    var cursoSelecionado;
    var cursoSelectionElement = document.getElementById('curso');
    if (cursoSelectionElement)
    {
        if (!atualizar)
            cursoSelectionElement.value = aluno.curso.nome;  //.innerHTML = aluno.curso.nome;
        cursoSelecionado = cursos.getCursoByName(cursoSelectionElement.value);
    }
    var d_acc = 0;
    var ficha_individual = document.getElementsByClassName('ficha_individual')[0];
    for (var q = 0; q < aluno.quadrimestre.length; q++)
    {
        var qn = insertElement('tr',
                               'quadrimestre ' + q,
                               null,
                               'quadrimestre',
                               '<td colspan=6 class="ano_periodo">' + aluno.quadrimestre[q].n + ' de ' + aluno.quadrimestre[q].ano + '</td>',
                               null,
                               ficha_individual,
                               null,
                               'cabecalho');
        var last = qn;
        for (var d = 0; d < aluno.quadrimestre[q].disciplinas.length; d++)
        {
            var innerHTML = '<td>'                           + aluno.quadrimestre[q].disciplinas[d].codigo    + '</td>' + '\n' +
                            '<td style="text-align: left;">' + aluno.quadrimestre[q].disciplinas[d].nome      + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].creditos  + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].conceito  + '</td>' + '\n' +
            //                '<td>'                           + aluno.quadrimestre[q].disciplinas[d].peso      + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].situacao  + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].categoria + '</td>';

            last = insertElement('tr',
                                 'disciplina ' + d_acc++,
                                 null,
                                 'disciplina',
                                 innerHTML,
                                 null,
                                 ficha_individual,
                                 null,
                                 last);
        }
    }
    document.getElementById('CP').innerHTML = formatNumber(aluno.CP, 3);
    document.getElementById('I' ).innerHTML = formatNumber(aluno.I , 3);
    document.getElementById('T' ).innerHTML = formatNumber(aluno.T , 0);
    document.getElementById('CR').innerHTML = formatNumber(aluno.CR, 3);
    document.getElementById('CA').innerHTML = formatNumber(aluno.CA, 3);


    document.getElementById('aprovado_quantidade'   ).innerHTML = aluno.aprovado_quantidade;
    document.getElementById('aprovado_creditos'     ).innerHTML = aluno.aprovado_creditos;
    document.getElementById('aprovado_carga_horaria').innerHTML = aluno.aprovado_carga_horaria;

    document.getElementById('reprov_freq_quantidade'   ).innerHTML = aluno.reprov_freq_quantidade;
    document.getElementById('reprov_freq_creditos'     ).innerHTML = aluno.reprov_freq_creditos;
    document.getElementById('reprov_freq_carga_horaria').innerHTML = aluno.reprov_freq_carga_horaria;

    document.getElementById('reprovado_quantidade'   ).innerHTML = aluno.reprovado_quantidade;
    document.getElementById('reprovado_creditos'     ).innerHTML = aluno.reprovado_creditos;
    document.getElementById('reprovado_carga_horaria').innerHTML = aluno.reprovado_carga_horaria;

    document.getElementById('trancamento_quantidade'   ).innerHTML = aluno.trancamento_quantidade;
    document.getElementById('trancamento_creditos'     ).innerHTML = aluno.trancamento_creditos;
    document.getElementById('trancamento_carga_horaria').innerHTML = aluno.trancamento_carga_horaria;


    document.getElementById('livre_quantidade'   ).innerHTML =              aluno.livre_quantidade;
    document.getElementById('livre_creditos'     ).innerHTML =              aluno.livre_creditos      + (cursoSelecionado ? '  /  ' + cursoSelecionado.livre_creditos : '');
    document.getElementById('livre_p_concluida'  ).innerHTML = formatNumber(aluno.livre_p_concluida * 100, 1);
    document.getElementById('livre_carga_horaria').innerHTML =              aluno.livre_carga_horaria + (cursoSelecionado ? '  /  ' + new disciplinaClass(null, null).calcularCargaHoraria(cursoSelecionado.livre_creditos) : '');

    document.getElementById('obrigatoria_quantidade'   ).innerHTML =              aluno.obrigatoria_quantidade;
    document.getElementById('obrigatoria_creditos'     ).innerHTML =              aluno.obrigatoria_creditos      + (cursoSelecionado ? '  /  ' + cursoSelecionado.obrigatoria_creditos : '');
    document.getElementById('obrigatoria_p_concluida'  ).innerHTML = formatNumber(aluno.obrigatoria_p_concluida * 100, 1);
    document.getElementById('obrigatoria_carga_horaria').innerHTML =              aluno.obrigatoria_carga_horaria + (cursoSelecionado ? '  /  ' + new disciplinaClass(null, null).calcularCargaHoraria(cursoSelecionado.obrigatoria_creditos) : '');

    document.getElementById('opcao_limitada_quantidade'   ).innerHTML =              aluno.opcao_limitada_quantidade;
    document.getElementById('opcao_limitada_creditos'     ).innerHTML =              aluno.opcao_limitada_creditos      + (cursoSelecionado ? '  /  ' + cursoSelecionado.opcao_limitada_creditos: '');
    document.getElementById('opcao_limitada_p_concluida'  ).innerHTML = formatNumber(aluno.opcao_limitada_p_concluida * 100, 1);
    document.getElementById('opcao_limitada_carga_horaria').innerHTML =              aluno.opcao_limitada_carga_horaria + (cursoSelecionado ? '  /  ' + new disciplinaClass(null, null).calcularCargaHoraria(cursoSelecionado.opcao_limitada_creditos) : '');

    if (cursoSelecionado)
    {
        var curso_total_creditos      = cursoSelecionado.obrigatoria_creditos + cursoSelecionado.opcao_limitada_creditos + cursoSelecionado.livre_creditos;
        var curso_total_carga_horaria = new disciplinaClass(null, null).calcularCargaHoraria(curso_total_creditos);
    }
    document.getElementById('total_quantidade'   ).innerHTML = aluno.total_quantidade;
    document.getElementById('total_creditos'     ).innerHTML = aluno.total_creditos      + (cursoSelecionado ? '  /  ' + curso_total_creditos      : '');
    document.getElementById('total_p_concluida'  ).innerHTML = cursoSelecionado ? formatNumber(aluno.total_creditos / curso_total_creditos * 100, 1) : '';
    //document.getElementById('total_p_concluida'  ).innerHTML = formatNumber(aluno.total_p_concluida * 100, 1);
    document.getElementById('total_carga_horaria').innerHTML = aluno.total_carga_horaria + (cursoSelecionado ? '  /  ' + curso_total_carga_horaria : '');


    var c_acc = 0;
    var CPk = document.getElementsByClassName('CPk')[0];
    for (var t = 0; t < aluno.CPk.length; t++)
    {
        var cn = insertElement('tr',
                               'CPk_tipo ' + t,
                               null,
                               'CPk_tipo',
                               '<td colspan=6 class="CPk_tipo_nome">' + aluno.CPk[t].nome + '</td>',
                               null,
                               CPk,
                               null,
                               'cabecalho2');
        var last = cn;
        for (var c = 0; c < aluno.CPk[t].length; c++)
        {
            var innerHTML = '<td>                          ' + formatNumber(aluno.CPk[t][c].valor, 3) + '</td>' + '\n' +
                            '<td style="text-align: left;">' +              aluno.CPk[t][c].nome      + '</td>';

            last = insertElement('tr',
                                 'CPk_curso ' + c_acc++,
                                 null,
                                 'CPk_curso' + (aluno.CPk[t][c].nome == cursoSelecionado.nome ? '_atual' : ''),
                                 innerHTML,
                                 null,
                                 CPk,
                                 null,
                                 last);
        }
    }
}

function clearData()
{
    removeElementsByClass('quadrimestre'   );
    removeElementsByClass('disciplina'     );
    removeElementsByClass('CPk_tipo'       );
    removeElementsByClass('CPk_curso'      );
    removeElementsByClass('CPk_curso_atual');
}

function setDynamicState()
{
    var cursosSelection = document.getElementById('curso');
    //var blankOpt  = document.createElement('option');
    //blankOpt.text = '';
    //cursosSelection.add(blankOpt, 0);
    //cursosSelection.selectedIndex = 0;
    cursosSelection.selectedIndex = -1;
    cursosSelection.disabled = true;

    var fade     = document.getElementById('fade');
    fade.onclick = openPortal;
    window.setTimeout(function()
    {
        fade.className = 'fade';
    }, 1000);
}

function setStaticState()
{
    var cursosSelection = document.getElementById('curso');
    //if (cursosSelection.options[0].text == '')
    //    cursosSelection.remove(0);
    cursosSelection.disabled = false;

    var fade       = document.getElementById('fade');
    fade.onclick   = null;
    fade.className = 'static';
}

function changeRowColor(str)
{

    var bgColor = intToRGB(hashCode(str));
    insertCSS('#conteudo tr:hover td { background: #' + bgColor + '; }');

    var cp      = document.getElementsByClassName('coeficientes')[0].childNodes[1].childNodes[2].childNodes[1];
    var cpColor = document.defaultView.getComputedStyle(cp, null)['color'];
        cpColor = rgbToString(cpColor);
    //if (getBrightness(0, bgColor) <= 255*.7)
    //    bgColor = rgbBrightness(bgColor, .50);
    if (getBrightness(0, bgColor) <= 255*.7 ||
        rgbProximity(bgColor, cpColor) > .80)
        insertCSS('#conteudo tr:hover td { color: #FFFFFF; }' + '\n' +
                  '#conteudo tr.quadrimestre:hover td { color: initial; }');
}

function formatNumber(numberToStr, decimalPrec)
{
    return numberToStr.toFixed(decimalPrec).replace('.', ',');
}

function updateForms()
{
    var    cursosSelection = document.getElementById('curso');
    var newCursosSelection = cursosSelection.cloneNode();
    removeAllChildsNodes(cursosSelection);
    newCursosSelection.innerHTML = '';
    for (var t = 0; t < cursos.tipos.length; t++)
    {
        var cursoGrp       = document.createElement('optgroup');
            cursoGrp.label = cursos.tipos[t].nome;
        for (var c = 0;  c < cursos.tipos[t].length; c++)
        {
            var cursoOpt      = document.createElement('option');
                cursoOpt.text = cursos.tipos[t][c].nome;
                cursoGrp.appendChild(cursoOpt);
        }
        try       {    cursosSelection.add(cursoGrp, null); }
        catch (e) {    cursosSelection.add(cursoGrp);       }
        try       { newCursosSelection.innerHTML += cursoGrp.outerHTML; }
        catch (e) { newCursosSelection.innerHTML += cursoGrp.outerText; }
    }
    if (!cursosSelection.hasChildNodes())
        try       { replaceElement(newCursosSelection.outerHTML, cursosSelection); }
        catch (e) { replaceElement(newCursosSelection.outerText, cursosSelection); }

    cursosSelection.onchange = cursoOnChange;
}