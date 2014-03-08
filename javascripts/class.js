function alunoClass(xmlDOC)
{
    /*
    STRINGS
        nome
        email
        RA

    CLASS
        quadrimestre
        curso
        CPk

    NUMBERS
        CR
        CA
        T

        CP
        I

        aprovado_quantidade
        aprovado_creditos
        aprovado_creditos_CR
        aprovado_peso
        aprovado_peso_CR
        aprovado_carga_horaria

        reprov_freq_quantidade
        reprov_freq_creditos
        reprov_freq_carga_horaria

        reprovado_quantidade
        reprovado_creditos
        reprovado_carga_horaria

        trancamento_quantidade
        trancamento_creditos
        trancamento_carga_horaria

        livre_quantidade
        livre_creditos
        livre_p_concluida
        livre_carga_horaria

        obrigatoria_quantidade
        obrigatoria_creditos
        obrigatoria_p_concluida
        obrigatoria_carga_horaria

        opcao_limitada_quantidade
        opcao_limitada_creditos
        opcao_limitada_p_concluida
        opcao_limitada_carga_horaria

        total_quantidade
        total_creditos
        total_p_concluida
        total_carga_horaria
    */

    this.loadFromXML = function(xmlDOC)
    {
        this.nome  = xmlDOC.getFirstElementValue('nome');   if (this.nome  === null) this.nome  = '';
        this.email = xmlDOC.getFirstElementValue('email');  if (this.email === null) this.email = '';
        this.RA    = xmlDOC.getFirstElementValue('ra');     if (this.RA    === null) this.RA    = '';
        cursoNome  = xmlDOC.getFirstElementValue('curso');  if (cursoNome  === null) cursoNome  = '';
        else
        this.curso = cursos.getCursoByName(cursoNome);
        this.quadrimestre = [];
        var qr = xmlDOC.getElements('quadrimestre');
        for (var q = 0; q < qr.length; q++)
            this.quadrimestre.push(new quadrimestreClass(qr[q]));
        this.T = this.quadrimestre.length;
        this.analisarCPks();
        this.analisar(this.curso, false, true);
    }
    this.analisarCPks = function()
    {
        this.CPk = [];
        for (var t = 0; t < cursos.tipos.length; t++)
        {
            var lista = [];
            lista.nome = cursos.tipos[t].nome;
            for (var c = 0;  c < cursos.tipos[t].length; c++)
            {
                var curso = cursos.tipos[t][c];
                this.analisar(curso, false, false);
                var novoCPk = new CPkClass(this.CP, curso.nome);
                lista.push(novoCPk);
            }
            this.CPk.push(lista);
        }
    }
    this.analisar = function(cursoArg, atualizar_categorias, atualizar_CR_CA)
    {
        var curso;
              if (typeof cursoArg == 'string' && cursoArg != '')  curso = cursos.getCursoByName(cursoArg);
        else  if (typeof cursoArg == 'object')                    curso = cursoArg;
        if (atualizar_categorias)
            this.atualizarCategorias(curso);
        this.calcularQuantidades(curso);
        if (atualizar_CR_CA)
        {
            this.calcularCR();
            this.calcularCA();
        }
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
        NC      = curso.obrigatoria_creditos + curso.opcao_limitada_creditos + curso.livre_creditos;
        this.CP = (this.obrigatoria_creditos +
                   Math.min((curso.opcao_limitada_creditos + curso.livre_creditos), this.opcao_limitada_creditos +
                                                                                    Math.min(this.livre_creditos, curso.livre_creditos))) / NC;
    }
    this.calcularCR = function()
    {
        this.CR = this.aprovado_peso_CR / this.aprovado_creditos_CR;
    }
    this.calcularCA = function()
    {
        this.CA = this.aprovado_peso / this.aprovado_creditos;
    }
    this.calcularI = function()
    {
        this.I = (0.07 * this.CR) + (0.63 * this.CP) + (0.005 * this.T);
    }
    this.calcularQuantidades = function(curso)
    {
        this.aprovado_quantidade    = 0;
        this.aprovado_creditos      = 0;
        this.aprovado_creditos_CR   = 0;
        this.aprovado_peso          = 0;
        this.aprovado_peso_CR       = 0;
        this.aprovado_carga_horaria = 0;

        this.reprov_freq_quantidade    = 0;
        this.reprov_freq_creditos      = 0;
        this.reprov_freq_carga_horaria = 0;

        this.reprovado_quantidade    = 0;
        this.reprovado_creditos      = 0;
        this.reprovado_carga_horaria = 0;

        this.trancamento_quantidade    = 0;
        this.trancamento_creditos      = 0;
        this.trancamento_carga_horaria = 0;

        this.livre_quantidade    = 0;
        this.livre_creditos      = 0;
        this.livre_carga_horaria = 0;

        this.obrigatoria_quantidade    = 0;
        this.obrigatoria_creditos      = 0;
        this.obrigatoria_carga_horaria = 0;

        this.opcao_limitada_quantidade    = 0;
        this.opcao_limitada_creditos      = 0;
        this.opcao_limitada_carga_horaria = 0;

        for (var q = 0; q < this.quadrimestre.length; q++)
            for (var d = 0; d < this.quadrimestre[q].disciplinas.length; d++)
            {
                var disc = this.quadrimestre[q].disciplinas[d];
                if (disc.conceitoN != -1)
                {
                    this.aprovado_creditos_CR += disc.creditos;
                    this.aprovado_peso_CR     += disc.peso;
                    if (disc.calculoCA)
                        switch (disc.situacao)
                        {
                            case 'Aprovado':
                                this.aprovado_quantidade++;
                                this.aprovado_creditos      += disc.creditos;
                                this.aprovado_peso          += disc.peso;
                                this.aprovado_carga_horaria += disc.cargaHoraria;
                                //switch (disc.categoria)
                                var categoria;
                                var curso_disc = curso.getDisciplinaByCod(disc.nome);
                                if (curso_disc)
                                    categoria = curso_disc.categoria;
                                if (!curso_disc || categoria === null || categoria === undefined)
                                    categoria = disc.categoria;
                                switch (categoria)
                                {
                                    case 'Obrigatória':
                                        this.obrigatoria_quantidade++;
                                        this.obrigatoria_creditos      += disc.creditos;
                                        this.obrigatoria_carga_horaria += disc.cargaHoraria;
                                        break;

                                    case 'Opção Limitada':
                                        this.opcao_limitada_quantidade++;
                                        this.opcao_limitada_creditos      += disc.creditos;
                                        this.opcao_limitada_carga_horaria += disc.cargaHoraria;
                                        break;

                                    case 'Livre Escolha':
                                        this.livre_quantidade++;
                                        this.livre_creditos      += disc.creditos;
                                        this.livre_carga_horaria += disc.cargaHoraria;
                                        break;

                                    default: break;
                                }
                                break;

                            case 'Trancado':         // ???? // CONFERIR ESTA INFORMAÇÃO
                                this.trancamento_quantidade++;
                                this.trancamento_creditos      += disc.creditos;
                                this.trancamento_carga_horaria += disc.cargaHoraria;
                                break;

                            case 'Reprovado':        // ???? // CONFERIR ESTA INFORMAÇÃO
                                this.reprovado_quantidade++;
                                this.reprovado_creditos      += disc.creditos;
                                this.reprovado_carga_horaria += disc.cargaHoraria;
                                break;

                            case 'Reprovado Freq.':  // ???? // CONFERIR ESTA INFORMAÇÃO
                                this.reprov_freq_quantidade++;
                                this.reprov_freq_creditos      += disc.creditos;
                                this.reprov_freq_carga_horaria += disc.cargaHoraria;
                                break;

                            default: break;
                        }
                }
            }
        this.obrigatoria_p_concluida    = this.obrigatoria_creditos    / curso.obrigatoria_creditos;
        this.opcao_limitada_p_concluida = this.opcao_limitada_creditos / curso.opcao_limitada_creditos;
        this.livre_p_concluida          = this.livre_creditos          / curso.livre_creditos;

        this.total_quantidade    = this.obrigatoria_quantidade    + this.opcao_limitada_quantidade    + this.livre_quantidade;
        this.total_creditos      = this.obrigatoria_creditos      + this.opcao_limitada_creditos      + this.livre_creditos;
        this.total_p_concluida   = this.obrigatoria_p_concluida   + this.opcao_limitada_p_concluida   + this.livre_p_concluida;
        this.total_carga_horaria = this.obrigatoria_carga_horaria + this.opcao_limitada_carga_horaria + this.livre_carga_horaria;
    }
    this.loadFromXML(xmlDOC);
}

function CPkClass(valor, nomeDoCurso)
{
    /*
    NUMBERS
        valor

    STRINGS
        nomeDoCurso
    */
    this.initialize = function(valor, nomeDoCurso)
    {
        this.valor = valor;
        this.nome  = nomeDoCurso;
    }
    this.initialize(valor, nomeDoCurso);
}

function disciplinaClass(parseType, xml)
{
    var codigo,
        nome,
        creditos,
        cargaHoraria,
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
        this.conceitoN    = this.converterConceito(this.conceito);
        this.peso         = this.creditos * this.conceitoN;
        this.calculoCA    = true;
        this.cargaHoraria = this.calcularCargaHoraria(this.creditos);
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
    this.calcularCargaHoraria = function(creditos)
    {
        return creditos * 12;
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
        obrigatoria_creditos,
        opcao_limitada_creditos,
        livre_creditos;
    this.parse = function(xml)
    {
        this.nome                    =          xml.getElementsByTagName('nome'                   )[0].innerHTML;
        this.arquivo                 =          xml.getElementsByTagName('arquivo'                )[0].innerHTML;
        this.obrigatoria_creditos    = parseInt(xml.getElementsByTagName('obrigatoria_creditos'   )[0].innerHTML);
        this.opcao_limitada_creditos = parseInt(xml.getElementsByTagName('opcao_limitada_creditos')[0].innerHTML);
        this.livre_creditos          = parseInt(xml.getElementsByTagName('livre_creditos'         )[0].innerHTML);
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
                //    this.obrigatoria_quantidade += disciplina.creditos;
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