function alunoClass(xmlDOC)
{
    var nome,
        email,
        RA,
        curso,
        quadrimestre,
        coeficientes,
        situacao,
        tipoDeDisciplina;
    this.loadFromXML = function(xmlDOC)
    {
        this.nome  = xmlDOC.getFirstElementValue('nome');   if (this.nome  === null) this.nome  = '';
        this.email = xmlDOC.getFirstElementValue('email');  if (this.email === null) this.email = '';
        this.RA    = xmlDOC.getFirstElementValue('ra');     if (this.RA    === null) this.RA    = '';
        this.curso = xmlDOC.getFirstElementValue('curso');  if (this.curso === null) this.curso = '';
        this.quadrimestre = [];
        qr = xmlDOC.getElements('quadrimestre');
        for (q = 0; q < qr.length; q++)
            this.quadrimestre.push(new quadrimestreClass(qr[q]));
        this.analisarCurso(this.curso);
    }
    this.analisarCurso = function(curso)
    {
        //cursoID = this.obterCursoID(curso);
        var cursoID;
        switch(cursoID)
        {
            case  0:
            case  1:
                break;
            case  2:
                break;
            case  3:
                break;
            case  4:
                break;
            case  5:
                break;
            case  6:
                break;
            case  7:
                break;
            case  8:
                break;
            case  9:
                break;
            case 10:
                break;
            case 11:
                break;
            case 12:
                break;
            case 13:
                break;
            case 14:
                break;
            case 15:
                break;
            case 16:
                break;
            case 17:
                break;
            case 18:
                break;
            case 19:
                break;
            case 20:
                break;
            case 21:
                break;
            case 22:
                break;
            case 23:
                break;
            case 24:
                break;
            default: break;
        }
    }
    this.loadFromXML(xmlDOC);
}

function disciplinaClass(xml)
{
    var codigo,
        nome,
        creditos,
        conceito,
        situacao,
        categoria;
    this.parse = function(xml)
    {
        this.codigo    = xml.getAttribute('codigo');
        this.nome      = xml.getElementsByTagName('nome'     )[0].childNodes[0].nodeValue;
        this.creditos  = xml.getElementsByTagName('creditos' )[0].childNodes[0].nodeValue;
        this.conceito  = xml.getElementsByTagName('conceito' )[0].childNodes[0].nodeValue;
        this.situacao  = xml.getElementsByTagName('situacao' )[0].childNodes[0].nodeValue;
        this.categoria = xml.getElementsByTagName('categoria')[0].childNodes[0].nodeValue;
    }
    this.parse(xml);
}

function quadrimestreClass(xml)
{
    var ano,
        n,
        disciplina;
    this.parse = function(xml)
    {
        this.ano = xml.getAttribute('ano');
        this.n   = xml.getAttribute('num');
        this.disciplina = [];
        dr = xml.getElementsByTagName('disciplina');
        for (d = 0; d < dr.length; d++)
            this.disciplina.push(new disciplinaClass(dr[d]));
    }
    this.parse(xml);
}

function cursoClass(xmlDOC)
{
    var id, nome;
    this.loadFromXML = function(xmlDOC)
    {
        
    }
    this.obterCursoID = function(curso)
    {
        //if (curso === null || curso === undefined) return -1;
             if (curso == 'Bacharelado em Ciência e Tecnologia') return  0;
        else if (curso == 'Bacharelado em Ciências e Humanidades') return  1;
        else if (curso == 'Engenharia Aeroespacial') return  2;
        else if (curso == 'Engenharia Ambiental e Urbana') return  3;
        else if (curso == 'Engenharia Biomédica') return  4;
        else if (curso == 'Engenharia de Energia') return  5;
        else if (curso == 'Engenharia de Gestão') return  6;
        else if (curso == 'Engenharia de Instrumentação, Automação e Robótica') return  7;
        else if (curso == 'Engenharia de Informação') return  8;
        else if (curso == 'Engenharia de Materiais') return  9;
        else if (curso == 'Bacharelado em Ciências Biológicas') return 10;
        else if (curso == 'Bacharelado em Ciência da Computação') return 11;
        else if (curso == 'Bacharelado em Física') return 12;
        else if (curso == 'Bacharelado em Matemática') return 13;
        else if (curso == 'Bacharelado em Química') return 14;
        else if (curso == 'Bacharelado em Neurociência') return 15;
        else if (curso == 'Bacharelado em Filosofia') return 16;
        else if (curso == 'Bacharelado em Ciências Econômicas') return 17;
        else if (curso == 'Bacharelado em Planejamento Territorial') return 18;
        else if (curso == 'Bacharelado em Políticas Públicas') return 19;
        else if (curso == 'Bacharelado em Relações Internacionais') return 20;
        else if (curso == '') return 21;
        else if (curso == '') return 22;
        else if (curso == '') return 23;
        else return -1;
    }
    this.loadFromXML(xmlDOC);
}