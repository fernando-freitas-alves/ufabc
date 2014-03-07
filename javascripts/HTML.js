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
    if (!atualizar)
        document.getElementById('curso').value = aluno.curso;  //.innerHTML = aluno.curso;
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
        for (var d = 0; d < aluno.quadrimestre[q].disciplinas.length; d++)
        {
            var innerHTML = '<td>'                           + aluno.quadrimestre[q].disciplinas[d].codigo    + '</td>' + '\n' +
                            '<td style="text-align: left;">' + aluno.quadrimestre[q].disciplinas[d].nome      + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].creditos  + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].conceito  + '</td>' + '\n' +
            //                '<td>'                           + aluno.quadrimestre[q].disciplinas[d].peso      + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].situacao  + '</td>' + '\n' +
                            '<td>'                           + aluno.quadrimestre[q].disciplinas[d].categoria + '</td>';

            insertElement('tr',
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
    document.getElementById('CP').innerHTML = formatNumber(aluno.CP, 3);
    document.getElementById('CR').innerHTML = formatNumber(aluno.CR, 3);
    document.getElementById('CA').innerHTML = formatNumber(aluno.CA, 3);
    document.getElementById('I' ).innerHTML = formatNumber(aluno.I , 3);
}

function clearData()
{
    removeElementsByClass('quadrimestre');
    removeElementsByClass('disciplina');
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
    var    cursosSelection     = document.getElementById('curso');
    //var newCursosSelection     = document.createElement('select');
    var newCursosSelection     = $("#curso").clone(true);
    /*
    for (var a = 0; a < cursosSelection.attributes.length; a++)
    {
        //newCursosSelection.setAttributeNode(cursosSelection.attributes.item(a));
        var attr = cursosSelection.attributes.item(a);
        alert('[' + (a+1) + '/' + cursosSelection.attributes.length + '] ' + attr.nodeName + ': ' + attr.nodeValue);
        newCursosSelection.setAttribute(attr.nodeName, attr.nodeValue);
        alert('copied');  
    }
    */
    removeAllChildsNodes(cursosSelection);
    newCursosSelection.innerHTML = '';
    for (var t = 0; t < cursos.tipos.length; t++)
    {
        var cursoGrp       = document.createElement('optgroup');
            cursoGrp.label = cursos.tipos[t].nome;
        for (var c = 0; c < cursos.tipos[t].length; c++)
        {
            var cursoOpt      = document.createElement('option');
                cursoOpt.text = cursos.tipos[t][c].nome;
                cursoGrp.appendChild(cursoOpt);
        }
        try       {    cursosSelection.add(cursoGrp, null); }
        catch (e) {    cursosSelection.add(cursoGrp);       }

        try       { newCursosSelection[0].innerHTML += cursoGrp.outerHTML; }
        catch (e) { newCursosSelection[0].innerHTML += cursoGrp.outerText; }
//                    try { newCursosSelection.innerHTML += cursoGrp.outerHTML;     }
//        catch (e) { try { newCursosSelection.innerHTML += cursoGrp.outerText;     }
//        catch (e) { try { newCursosSelection.innerHTML += $('<div>').append(cursoGrp.clone()).html(); } }
        //catch (e) {       newCursosSelection.innerHTML += getOuterHTML(cursoGrp); } }
    }
    if (cursosSelection.hasChildNodes())
        replaceElement(newCursosSelection[0].outerHTML, cursosSelection);
        //replaceElement(outerHTML(newCursosSelection), cursosSelection);
        //replaceElement(getOuterHTML(newCursosSelection), cursosSelection);
    //{
  //      try       { replaceElement(newCursosSelection.outerHTML, cursosSelection); }
  //      catch (e) { replaceElement(newCursosSelection.outerText, cursosSelection); }
//                    try { replaceElement(newCursosSelection.outerHTML, cursosSelection); }
//        catch (e) { try { replaceElement(newCursosSelection.outerText, cursosSelection); }
//        catch (e) {       replaceElement(newCursosSelection.outerText, cursosSelection); } }
    //}
}