function xmlClass(str)
{
    var doc;
    this.loadXML = function(str)
    {
        this.doc = parseXML(str);
        console.log('XML obtido com sucesso.');
    }
    this.getFirstElement = function(tag)
    {
        try
        {
            return this.doc.getElementsByTagName(tag)[0].childNodes[0];
        }
        catch(e)
        {
            return null;
        }
    }
    this.getFirstElementValue = function(tag)
    {
        try
        {
            return this.getFirstElement(tag).nodeValue;
        }
        catch(e)
        {
            return null;
        }
    }
    this.getElements = function(tag)
    {
        try
        {
            return this.doc.getElementsByTagName(tag);
        }
        catch(e)
        {
            return null;
        }
    }
    this.getElementsByAttributeValue = function(tag, attName, attValue)
    {
        try
        {
            elements = [];
            nodes = this.getElements(tag);
            for (i = 0; i < nodes.length; i++)
            {
                node = nodes.item(i);
                if (node.getAttributeNode(attName).value == attValue)
                    elements.push(node);
            }
            if (elements.length == 0) return null;
            else                      return elements;
        }
        catch(e)
        {
            return null;
        }
    }
    this.getFirstElementByAttributeValue = function(tag, attName, attValue)
    {
        try
        {
            return this.getElementsByAttributeValue(tag, attName, attValue)[0];
        }
        catch(e)
        {
            return null;
        }
    }
    this.loadXML(str);
}

function importXML(xmlfile)
{
    var xmlDoc, xmlloaded;
    try
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlfile, false);
    }
    catch (Exception)
    {
        var ie = (typeof window.ActiveXObject != 'undefined');

        if (ie)
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            while(xmlDoc.readyState != 4) {};
            xmlDoc.load(xmlfile);
            readXML();
            xmlloaded = true;
        }
        else
        {
            xmlDoc = document.implementation.createDocument("", "", null);
            xmlDoc.onload = readXML;
            xmlDoc.load(xmlfile);
            xmlloaded = true;
        }
    }

    if (!xmlloaded)
    {
        xmlhttp.setRequestHeader('Content-Type', 'text/xml')
        xmlhttp.send("");
        xmlDoc = xmlhttp.responseXML;
        readXML();
        xmlloaded = true;
    }

    if(xmlloaded) return xmlDoc;
    else          return null;
}

function parseXML(s)
{
    var xmlDOC;
    if (window.DOMParser)
        xmlDOC = new DOMParser().parseFromString(s, 'text/xml');
    else // Internet Explorer
    {
        xmlDOC = new ActiveXObject('Microsoft.XMLDOM');
        xmlDOC.async = false;
        xmlDOC.loadXML(s);
    }
    return xmlDOC;
}