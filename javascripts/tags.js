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
/*
jQuery.fn.outerHTML = function()
{
    return $( $('<div></div>').html(this.clone()) ).html();
}
*/
function outerHTML(node, val)
{
    if (val)
    {
        $(val).insertBefore(this);
        $(node).remove();
    }
    else {
        var str = $('<div>').append($(node).clone()).html(); 
    return str;
    }
}
/*
$.fn.outer = function(val)
{
    if (val)
    {
        $(val).insertBefore(this);
        $(this).remove();
    }
    else return $("<div>").append($(this).clone()).html();
}
/*
var _emptyTags = {
   "IMG":   true,
   "BR":    true,
   "INPUT": true,
   "META":  true,
   "LINK":  true,
   "PARAM": true,
   "HR":    true
};

function getOuterHTML(node)
{
   var attrs = node.attributes;
   var str = "<" + node.tagName;
   for (var i = 0; i < attrs.length; i++)
      str += " " + attrs[i].name + "=\"" + attrs[i].value + "\"";

   if (_emptyTags[node.tagName])
      return str + ">";

   return str + ">" + node.innerHTML + "</" + node.tagName + ">";
}

function setOuterHTML(node, sHTML)
{
   var r = node.ownerDocument.createRange();
   r.setStartBefore(node);
   var df = r.createContextualFragment(sHTML);
   node.parentNode.replaceChild(df, node);
}
/*
function outerHTML(node)
{
    var h;
    try       { h = node.outerHTML; }
    catch (e) { h = node.outerText; }
    if (h === null || h === undefined)
    {
        var div = document.createElement('div');
        div.appendChild(node.cloneNode(true));
        return div.innerHTML;
    }
    return h;
}
*/
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
function replaceElement(innerHTML, target)
{
    $(innerHTML).insertBefore(target);
    $(target).remove();

    /*
    var elementTarget = getElement(target);

    try       { elementTarget.outerHTML = innerHTML; }
    catch (e) { elementTarget.outerText = innerHTML; }

//               try { elementTarget.outerHTML = innerHTML;    }
//    catch(e) { try { elementTarget.outerText = innerHTML;    }
//    catch(e) {       setOuterHTML(elementTarget, innerHTML); } }
/*
    var type = innerHTML.indexOf('<td') != -1 ? 'tr' : 'div';
    var tmp  = document.createElement(type);
    tmp.innerHTML = innerHTML;
    var newElement,
        lastElement = elementTarget;
    for (var i = tmp.childNodes.length; i > 0; i--)
    {
        newElement  = tmp.childNodes[i];
        elementTarget.parentNode.insertBefore(newElement, lastElement);
        lastElement = newElement;
    }
    elementTarget.parentNode.removeChild(elementTarget);
*/
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