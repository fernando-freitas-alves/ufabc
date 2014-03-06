function xmlClass(str)
{
    var data;
    this.loadXML = function(str)
    {
        this.data = parseXML(str);
        console.log('XML obtido com sucesso.');
    }
    this.getElements = function(tag)
    {
        try
        {
            return this.data.getElementsByTagName(tag);
        }
        catch(e)
        {
            return null;
        }
    }
    this.getFirstElement = function(tag)
    {
        try
        {
            return this.getElements(tag)[0].childNodes[0];
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

function importXML(xmlFile)
{
    var xmlDOC, xmlLoaded;
    try
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, false);
    }
    catch (Exception)
    {
        var ie = (typeof window.ActiveXObject != 'undefined');

        if (ie)
        {
            xmlDOC = new ActiveXObject("Microsoft.XMLDOM");
            xmlDOC.async = false;
            while(xmlDOC.readyState != 4) {};
            xmlDOC.load(xmlFile);
            //readXML();
            xmlLoaded = true;
        }
        else
        {
            xmlDOC = document.implementation.createDocument("", "", null);
            //xmlDOC.onload = readXML;
            xmlDOC.load(xmlFile);
            xmlLoaded = true;
        }
    }

    if (!xmlLoaded)
    {
        xmlhttp.setRequestHeader('Content-Type', 'text/xml')
        xmlhttp.send("");
        xmlDOC = xmlhttp.responseXML;
        //readXML();
        xmlLoaded = true;
    }

    if (xmlLoaded) return xmlDOC;
    else           return null;
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