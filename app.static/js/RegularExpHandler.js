function RegularExpHandler(type, id, allowChar)
{
    var patt;
    var cntrl = $('#' + id).val();
    var splt = cntrl.split("");
    if (type.trim().toUpperCase() == 'NUM')
        patt = "^([0-9]+)$";
    else if (type.trim().toUpperCase() == 'ALPHA')
        patt = "^([a-zA-Z]+)$"
    else if (type.trim().toUpperCase() == 'ALPHASPACE')
        patt = "^([a-zA-Z ]+)$"
    else if (type.trim().toUpperCase() == 'ALPHANUM')
        patt = "^([a-zA-Z0-9]+)$"
    else if (type.trim().toUpperCase() == 'ALPHANUMCHAR')
    {
        if (typeof (allowChar) !== "undefined")
        {
            //var b="_+/-";
            patt = "^([a-zA-Z0-9" + allowChar + "]*)$";
        }

    }
    var ex = new RegExp(patt);
    var str = "";
    for (i = 0; i < splt.length; i++)
    {
        if (ex.test(splt[i]))
            str += splt[i];
    }
    $('#' + id).val(str.trimLeft());
}
