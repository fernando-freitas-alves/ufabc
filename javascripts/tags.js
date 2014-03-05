function getElement(element)
{
    elementObj = null;
    if (element !== null)
    {
        if (typeof element == 'string' && element != '')  elementObj = document.getElementById(element);
        else  if (typeof element == 'object')             elementObj = element;
    }
    return elementObj;
}

function insertElement(type, id, title, className, innerHTML, onclick, target, before, after)
{
    elementTarget = getElement(target);
    if (elementTarget !== null)
    {
        elementBefore = getElement(before);
        elementAfter  = getElement(after);
        if (elementBefore === null &&
            elementAfter  !== null)                 elementBefore = elementAfter.nextSibling;
        
        element = document.createElement(type);
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

function insertCSS(css)
{
    head  = document.head || document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet)
         style.styleSheet.cssText = css;
    else style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}