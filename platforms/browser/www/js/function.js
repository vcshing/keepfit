Url = {
    get get(){
        var vars= {};
        if(window.location.search.length!==0)
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
                key=decodeURIComponent(key);
                if(typeof vars[key]==="undefined") {vars[key]= decodeURIComponent(value);}
                else {vars[key]= [].concat(vars[key], decodeURIComponent(value));}
            });
        return vars;
    }
};


function toCode(TempStrWord,BIGtoGB){
	var TempStr = "";
	var TempStr1 = "";
	var TempWordMath = 0;
	var TempWordHex = new Array();

	for(i=0;i<TempStrWord.length;i++){
		TempStr1 = TempStrWord.charAt(i);
		TempWordMath = TempStr1.charCodeAt(0);
		switch(BIGtoGB){
		case 0:
			if(!toGB[TempWordMath]){
				TempStr += TempStr1;
			}else{
				TempStr += String.fromCharCode(toGB[TempWordMath]);
			}
			break;
		case 1:
			if(!toBIG[TempWordMath]){
				TempStr += TempStr1;
			}else{
				TempStr += String.fromCharCode(toBIG[TempWordMath]);
			}
			break;
		case 2:
			if(!toGB2[TempWordMath]){
				TempStr += TempStr1;
			}else{
				TempStr += toGB2[TempWordMath];
			}
			break;
		case 3:
			if(!toBIG2[TempWordMath]){
				TempStr += TempStr1;
			}else{
				TempStr += toBIG2[TempWordMath];
			}
			break;
		}
	}
	return TempStr;
}

