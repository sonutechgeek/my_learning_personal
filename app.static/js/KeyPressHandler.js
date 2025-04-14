function KeyPressHandler(type,e,allowChar)
{
   
        var code;
        if (!e) e=window.event;
        if ((e.charCode) && (e.keyCode==0))
            code = e.charCode
        else
             code = e.keyCode;

        var charCode = code;
//        alert(charCode);

	   if(type.trim().toUpperCase()=='NUMNOSPACE')
       {
           if((charCode > 47 && charCode < 58)  || charCode == 8  || charCode == 9)
            return true;
       }

       if(type.trim().toUpperCase()=='NUM')
       {
           if((charCode > 47 && charCode < 58)  || charCode == 8 || charCode == 46 || charCode == 37 || charCode == 39 || charCode == 32 || charCode == 9 || charCode == 45 || charCode == 118 )
            return true;
       }
       if(type.trim().toUpperCase()=='ALPHA')
       {
           if((charCode > 96 && charCode<123) || (charCode > 64 && charCode <91) || charCode == 32 || charCode == 95 || charCode == 8 || charCode == 46 || charCode == 37 || charCode == 39 || charCode == 9 || charCode == 45 || charCode == 118)
            return true;
       }
       if(type.trim().toUpperCase()=='ALPHANUM')
       {
           if((charCode > 47 && charCode < 58) ||(charCode > 96 && charCode<123) || (charCode > 64 && charCode <91) || charCode == 32 || charCode == 95 || charCode == 40 || charCode == 41 || charCode == 8 || charCode == 46|| charCode == 37 || charCode == 39 || charCode == 9 || charCode == 45 || charCode == 118)
            return true;
       }
       if(type.trim().toUpperCase()=='ALPHANUMCHAR')
       {
                if(typeof(allowChar)!= "undefined" )
                {
                     var chr;
                    if((charCode > 96 && charCode<123) || (charCode > 64 && charCode <91) || (charCode > 47 && charCode < 58) || charCode == 32 || charCode == 8 || charCode == 46||charCode == 37 || charCode == 39 || charCode == 9 || charCode == 45 || charCode == 118)
                       return true;

                    var spltchar= allowChar.trim().split("");
                    for(var i=0;i<spltchar.length;i++)
                    {
                        chr = spltchar[i].charCodeAt(0);
                         if((charCode == chr))
                         {
                            return true;
                         }

                    }
                }
        }
        return false;
}
