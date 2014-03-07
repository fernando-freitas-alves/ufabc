function getElement(element)
{
    var elementObj = null;
    if (element !== null)
    {
        if (typeof element == 'string' && element != '')  elementObj = document.getElementById(element);
        else  if (typeof element == 'object')             elementObj = element;
    }
    return elementObj;
}

function insertElement(type, id, title, className, innerHTML, onclick, target, before, after)
{
    var elementTarget = getElement(target);
    if (elementTarget !== null)
    {
        var elementBefore = getElement(before);
        var elementAfter  = getElement(after);
        if (elementBefore === null &&
            elementAfter  !== null)                 elementBefore = elementAfter.nextSibling;
        
        var element = document.createElement(type);
        if (id        !== null && id        != '')  element.id        = id;
        if (title     !== null && title     != '')  element.title     = title;
        if (className !== null && className != '')  element.className = className;
        if (innerHTML !== null && innerHTML != '')  element.innerHTML = innerHTML;
        if (onclick   !== null && onclick   != '')  element.onclick   = onclick;
        
        if (elementBefore !== null)                 elementTarget.insertBefore(element, elementBefore);
        else                                        elementTarget.appendChild(element);
        return document.getElementById(id);
    }
    return null;
}

//function replaceElement(node, target)
function replaceElement(outerHTML, target)
{
//    $(innerHTML).insertBefore(target);
//    $(target).remove();

    ///*
    var elementTarget = getElement(target);

    try       { elementTarget.outerHTML = outerHTML; }
    catch (e) { elementTarget.outerText = outerHTML; }
}

function removeElementsByClass(className)
{
    var element,
        elements = document.getElementsByClassName(className);
    for (var e = elements.length - 1; e >= 0; e--)
    {
        element = elements[e];
        element.parentNode.removeChild(element);
    }
}

function removeAllChildsNodes(target)
{
    var elementTarget = getElement(target);
    for (var c = elementTarget.childNodes.length - 1; c >= 0; c--)
        elementTarget.removeChild(elementTarget.childNodes[c]);
}

function insertCSS(css)
{
    var head  = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet)
         style.styleSheet.cssText = css;
    else style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}