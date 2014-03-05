function hashCode(str)
{
    hash = 0;
    for (i = 0; i < str.length; i++)
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return hash;
} 

function intToRGB(i)
{
    r = (i >> 16) & 0xFF;
    g = (i >>  8) & 0xFF;
    b =  i        & 0xFF;
    //return ((i >> 24) & 0xFF).toString(16) +
    return (r <= 0xF ? '0' : '') + r.toString(16) +
           (g <= 0xF ? '0' : '') + g.toString(16) +
           (b <= 0xF ? '0' : '') + b.toString(16);
}

function rgbBrightness(hex, percent)
{
    rgb = hexToRGB(hex);
    return ((0|(1<<8) + rgb[0] + (256 - rgb[0]) * percent / (percent > 1 ? 100 : 1)).toString(16)).substr(1) +
           ((0|(1<<8) + rgb[1] + (256 - rgb[1]) * percent / (percent > 1 ? 100 : 1)).toString(16)).substr(1) +
           ((0|(1<<8) + rgb[2] + (256 - rgb[2]) * percent / (percent > 1 ? 100 : 1)).toString(16)).substr(1);
}

function hexToRGB(hex)
{
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3)
        hex = hex.replace(/(.)/g, '$1$1');
    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
    return [r, g, b];
}

function getBrightness(typeOfCalc, hex)
{
    rgb = hexToRGB(hex);
    switch (typeOfCalc)
    {
        case  0: return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];                  // Luminance (standard, objective)
        case  1: return 0.299 *rgb[0] + 0.587 *rgb[1] + 0.114 *rgb[2];                  // Luminance (perceived option 1)
        case  2: return Math.sqrt( 0.241*rgb[0]^2 + 0.691*rgb[1]^2 + 0.068*rgb[2]^2 );  // Luminance (perceived option 2)
        default: return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];                  // Luminance (standard, objective)
    }
}

function rgbToString(rgb)
{
    ini = rgb.indexOf('(') + 1;
    end = rgb.indexOf(',');
    r   = rgb.substring(ini, end);

    ini = end + 1;
    end = rgb.lastIndexOf(',');
    g   = rgb.substring(ini, end);

    ini = end + 1;
    end = rgb.lastIndexOf(')');
    b   = rgb.substring(ini, end);
    
    num =  (parseInt(r) << 16) |
           (parseInt(g) <<  8) |
            parseInt(b);
    return intToRGB(num);
}

function rgbProximity(hex1, hex2)
{
    rgb1 = hexToRGB(hex1);
    rgb2 = hexToRGB(hex2);
    rp = 1 - Math.abs(rgb1[0] - rgb2[0]) / 0xFF;
    gp = 1 - Math.abs(rgb1[1] - rgb2[1]) / 0xFF;
    bp = 1 - Math.abs(rgb1[2] - rgb2[2]) / 0xFF;
    return Math.min(Math.min(rp, gp), bp);
}