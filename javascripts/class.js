function alunoClass(xmlDOC)
{
    var nome,
        email,
        RA,
        curso,
        quadrimestre,
        coeficientes,
        situacao,
        tipoDeDisciplina,
        CP, CR, CA,
        I,  T;
    this.loadFromXML = function(xmlDOC)
    {
        this.nome  = xmlDOC.getFirstElementValue('nome');   if (this.nome  === null) this.nome  = '';
        this.email = xmlDOC.getFirstElementValue('email');  if (this.email === null) this.email = '';
        this.RA    = xmlDOC.getFirstElementValue('ra');     if (this.RA    === null) this.RA    = '';
        this.curso = xmlDOC.getFirstElementValue('curso');  if (this.curso === null) this.curso = '';
        this.quadrimestre = [];
        var qr = xmlDOC.getElements('quadrimestre');
        for (var q = 0; q < qr.length; q++)
            this.quadrimestre.push(new quadrimestreClass(qr[q]));
        this.T = this.quadrimestre.length;
        this.analisar(false);
    }
    this.analisar = function(atualizarDisc)
    {
        this.calcularCR();
        this.calcularCA();
        this.analisarCurso(this.curso, atualizarDisc);
    }
    this.analisarCurso = function(cursoStr, atualizarDisc)
    {
        var curso = cursos.getCursoByName(cursoStr);
        if (atualizarDisc) this.atualizarCategorias(curso);
        this.calcularCP(curso);
        this.calcularI();
    }
    this.atualizarCategorias = function(curso)
    {
        for (var q = 0; q < this.quadrimestre.length; q++)
            for (var d = 0; d < this.quadrimestre[q].disciplinas.length; d++)
            {
                var disc1 = this.quadrimestre[q].disciplinas[d];
                var disc2 = curso.getDisciplinaByCod(disc1.codigo);
                if (disc2 !== null && disc2 !== undefined &&
                    disc1.categoria != disc2.categoria &&
                    disc1.situacao  == 'Aprovado' &&
                    disc1.conceitoN != -1 && disc1.calculoCA)
                {
                    disc1.categoria = disc2.categoria;
                }
            }
    }
    this.calcularCP = function(curso)
    {
        var n_obr   = 0,
            n_lim   = 0,
            n_livre = 0,
            NC;
        for (var q = 0; q < this.quadrimestre.length; q++)
            for (var d = 0; d < this.quadrimestre[q].disciplinas.length; d++)
            {
                var disc = this.quadrimestre[q].disciplinas[d];
                if (disc.situacao  == 'Aprovado' &&
                    disc.conceitoN != -1 && disc.calculoCA)
                {
                    switch (disc.categoria)
                    {
                        case 'Obrigatória'   : n_obr   += disc.creditos; break;
                        case 'Opção Limitada': n_lim   += disc.creditos; break;
                        case 'Livre Escolha' : n_livre += disc.creditos; break;
                        default: break;
                    }
                }
            }
        NC = curso.N_obr + curso.N_lim + curso.N_livre;
        this.CP = (n_obr + Math.min((curso.N_lim + curso.N_livre), n_lim + Math.min(n_livre, curso.N_livre))) / NC;
    }
    this.calcularCR = function()
    {
        var num = 0,
            den = 0;
        for (var q = 0; q < this.quadrimestre.length; q++)
            for (var d = 0; d < this.quadrimestre[q].disciplinas.length; d++)
            {
                var disc = this.quadrimestre[q].disciplinas[d];
                if (disc.situacao  == 'Aprovado' &&
                    disc.conceitoN != -1)
                {
                    num += disc.peso;
                    den += disc.creditos;
                }
            }
        this.CR = num / den;
    }
    this.calcularCA = function()
    {
        var num = 0,
            den = 0;
        for (var q = 0; q < this.quadrimestre.length; q++)
            for (var d = 0; d < this.quadrimestre[q].disciplinas.length; d++)
            {
                var disc = this.quadrimestre[q].disciplinas[d];
                if (disc.situacao  == 'Aprovado' &&
                    disc.conceitoN != -1 &&
                    disc.calculoCA)
                {
                    num += disc.peso;
                    den += disc.creditos;
                }
            }
        this.CA = num / den;
    }
    this.calcularI = function()
    {
        this.I = (0.07 * this.CR) + (0.63 * this.CP) + (0.005 * this.T);
    }
    this.loadFromXML(xmlDOC);
}

function disciplinaClass(parseType, xml)
{
    var codigo,
        nome,
        creditos,
        conceito,
        conceitoN,
        peso,
        situacao,
        categoria,
        calculoCA;
    this.parseByAluno = function(xml)
    {
        this.codigo    =          xml.getAttribute('codigo');
        this.nome      =          xml.getElementsByTagName('nome'     )[0].childNodes[0].nodeValue;
        this.creditos  = parseInt(xml.getElementsByTagName('creditos' )[0].childNodes[0].nodeValue);
        this.conceito  =          xml.getElementsByTagName('conceito' )[0].childNodes[0].nodeValue;
        this.situacao  =          xml.getElementsByTagName('situacao' )[0].childNodes[0].nodeValue;
        this.categoria =          xml.getElementsByTagName('categoria')[0].childNodes[0].nodeValue;
        this.conceitoN = this.converterConceito(this.conceito);
        this.peso      = this.creditos * this.conceitoN;
        this.calculoCA = true;
    }
    this.parseByCurso = function(xml)
    {
        this.codigo    =          xml.getElementsByTagName('CODIGO'    )[0].innerHTML;
        this.nome      =          xml.getElementsByTagName('DISCIPLINA')[0].innerHTML;
        this.creditos  = parseInt(xml.getElementsByTagName('CREDITOS'  )[0].innerHTML);
        this.categoria =          xml.getElementsByTagName('CATEGORIA' )[0].innerHTML;
    }
    this.converterConceito = function(c)
    {
        switch (c)
        {
            case 'A': return  4;
            case 'B': return  3;
            case 'C': return  2;
            case 'D': return  1;
            case 'F': return  0;
            case 'O': return  0;
            case 'I': return -1;
            default : return -1;
        }
    }
    switch (parseType)
    {
        case 0:  this.parseByAluno(xml); break;
        case 1:  this.parseByCurso(xml); break;
        default: break;
    }
}

function quadrimestreClass(xml)
{
    var n, ano, disciplinas;
    this.parse = function(xml)
    {
        this.ano = xml.getAttribute('ano');
        this.n   = xml.getAttribute('num');
        this.disciplinas = [];
        var dr = xml.getElementsByTagName('disciplina');
        for (var d = 0; d < dr.length; d++)
        {
            nova_disciplina = new disciplinaClass(0, dr[d]);
            for (var i = 0; i < this.disciplinas.length; i++)
                if (nova_disciplina.codigo == this.disciplinas[i].codigo)
                {
                    if (this.disciplinas[i].conceitoN < nova_disciplina.conceitoN)
                        this.disciplinas[i].calculoCA = false;
                    else    nova_disciplina.calculoCA = false;
                }
            this.disciplinas.push(nova_disciplina);
        }
    }
    this.parse(xml);
}

function cursoClass(xml)
{
    var nome, arquivo, disciplinas,
        N_obr,
        N_lim,
        N_livre;
    this.parse = function(xml)
    {
        this.nome        =          xml.getElementsByTagName('nome'   )[0].innerHTML;
        this.arquivo     =          xml.getElementsByTagName('arquivo')[0].innerHTML;
        this.N_obr       = parseInt(xml.getElementsByTagName('N_obg'  )[0].innerHTML);
        this.N_lim       = parseInt(xml.getElementsByTagName('N_lim'  )[0].innerHTML);
        this.N_livre     = parseInt(xml.getElementsByTagName('N_livre')[0].innerHTML);
        this.disciplinas = [];
        if (this.arquivo !== null && this.arquivo !== undefined && this.arquivo != '')
        {
            var xmlCurso = importXML(xmlPath + '/' + this.arquivo);
            var dr = xmlCurso.getElementsByTagName('row');
            for (var d = 0; d < dr.length; d++)
            {
                var disciplina = new disciplinaClass(1, dr[d])
                this.disciplinas.push(disciplina);
                //if (disciplina.categoria == 'Obrigatória')
                //    this.N_obr += disciplina.creditos;
            }
        }
    }
    this.getDisciplinaByCod = function(codigo)
    {
        for (var d = 0; d < this.disciplinas.length; d++)
        {
            var disciplina = this.disciplinas[d];
            if (codigo == disciplina.codigo)
                return disciplina;
        }
        return null;
    }
    this.parse(xml);
}

function cursosClass(xmlDOC)
{
    var tipos;
    this.loadFromXML = function(xmlDOC)
    {
        this.tipos = [];
        var graduacao = xmlDOC.getElementsByTagName('tipo');
        for (var t = 0; t < graduacao.length; t++)
        {
            var tipo   = graduacao[t].getElementsByTagName('curso');
            var lista  = [];
            lista.nome = tipo[0].parentNode.getAttribute('nome');
            for (var c = 0; c < tipo.length; c++)
            {
                var curso = new cursoClass(tipo[c]);
                lista.push(curso);
            }
            this.tipos.push(lista);
        }
    }
    this.getCursoByName = function(cursoStr)
    {
        for (var t = 0; t < this.tipos.length; t++)
            for (var c = 0; c < this.tipos[t].length; c++)
            {
                var curso = this.tipos[t][c];
                if (cursoStr == curso.nome)
                    return curso;
            }
        return null;
    }
    this.loadFromXML(xmlDOC);
}