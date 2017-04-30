Url = {
    get get() {
        var vars = {};
        if (window.location.search.length !== 0)
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                key = decodeURIComponent(key);
                if (typeof vars[key] === "undefined") {
                    vars[key] = decodeURIComponent(value);
                } else {
                    vars[key] = [].concat(vars[key], decodeURIComponent(value));
                }
            });
        return vars;
    }
};


function toCode(TempStrWord, BIGtoGB) {
    var TempStr = "";
    var TempStr1 = "";
    var TempWordMath = 0;
    var TempWordHex = new Array();

    for (i = 0; i < TempStrWord.length; i++) {
        TempStr1 = TempStrWord.charAt(i);
        TempWordMath = TempStr1.charCodeAt(0);
        switch (BIGtoGB) {
            case 0:
                if (!toGB[TempWordMath]) {
                    TempStr += TempStr1;
                } else {
                    TempStr += String.fromCharCode(toGB[TempWordMath]);
                }
                break;
            case 1:
                if (!toBIG[TempWordMath]) {
                    TempStr += TempStr1;
                } else {
                    TempStr += String.fromCharCode(toBIG[TempWordMath]);
                }
                break;
            case 2:
                if (!toGB2[TempWordMath]) {
                    TempStr += TempStr1;
                } else {
                    TempStr += toGB2[TempWordMath];
                }
                break;
            case 3:
                if (!toBIG2[TempWordMath]) {
                    TempStr += TempStr1;
                } else {
                    TempStr += toBIG2[TempWordMath];
                }
                break;
        }
    }
    return TempStr;
}

function checkLang() {
    if (typeof(navigator.language) != "undefined") {
        if (navigator.language.split('-')[0] == "zh") {
            if (typeof(navigator.language.split('-')[1]) != "undefined") {
                if (navigator.language.split('-')[1].toLowerCase() == "tw" ||
                    navigator.language.split('-')[1].toLowerCase() == "hk") {
                    var lang = "zh-tw"
                } else {
                    var lang = "zh-cn"
                }
            }
        } else {
            var lang = navigator.language.split('-')[0];
        }
    } else {
        var lang = "en";
    }

    return lang;
}

function setLang() {
    if (checkLang() == "zh-tw") {
        $(".langtc").hide();
    }

    if (lang == checkLang()) {
        $(".langDefault").addClass("button-fill");
        $(".langtc").removeClass("button-fill");
        $(".langen").removeClass("button-fill");
    } else if (lang == "zh-tw") {
        $(".langtc").addClass("button-fill");
        $(".langen").removeClass("button-fill");
        $(".langDefault").removeClass("button-fill");
    } else {
        $(".langen").addClass("button-fill");
        $(".langtc").removeClass("button-fill");
        $(".langDefault").removeClass("button-fill");
    }
}

function getCookieLang() {
    cookie = storageManager.getCookie();
    if (cookie == "" || cookie == null) {
        storageManager.setCookie({
            "selectedLang": checkLang()
        });
    }
    cookie = storageManager.getCookie();
    return cookie.selectedLang;
}

function frontEndTranslateToSelectedLang(defaultLangArr,callback) {
    var defaultLangArrToWord = "";

    $.each(defaultLangArr, function(a, b) {
        defaultLangArrToWord += ("[[" + b + "]]");
    })
    var translatedLangArr = [];
    translate(defaultLangArrToWord, lang, function(translatedText) {
        translatedText = translatedText.match(/[^[\[\]]+/gm);

        $.each(translatedText, function(a, b) {
            if (b != "" && b != " ") {
                translatedLangArr.push(b);
            }
        })

        if (typeof(callback) == "function"){
          callback(translatedLangArr);
        }
    })
}

function assignWordClassTranslation(translatedLangArr){
  $(".word").each(function(a, b) {
      if ($(this).html() != "" && $(this).html() != "undefined") {
          $(this).html(translatedLangArr[a]);
      } else if ($(this).attr("placeholder") != "" && $(this).attr("placeholder") != "undefined") {
          $(this).attr("placeholder", translatedLangArr[a]);
      }
  })
}

function translate(keyword, lang, callback) {
    if (typeof(callback) != "function") {
        callback = function() {};
    }
    $.ajax({
        type: "post",
        url: "http://gogogo.synology.me/googletranslate/translate.php",
        data: {
            "keyword": keyword,
            "lang": lang
        },
        dataType: "json",
        success: function(response) {
            var translatedText = response["data"]["translations"][0]["translatedText"]
            var JsonTranslatedText = translatedText;
            callback(JsonTranslatedText);
        },
        error: function(response) {
            var translatedText = keyword;
            var JsonTranslatedText = translatedText;
            callback(JsonTranslatedText);
        }
    });
}


function getHomePageListRank(listType) {
    $.ajax({
        type: "post",
        url: "http://gogogo.synology.me/api/riskgame/getGoodRanking.php",
        data: {
            "listType": listType
        },
        dataType: "json",
        success: function(response) {
            var homeGoodlist = "";
            homeGoodlist += "                                <div class=\"swiper-slide\">";
            homeGoodlist += "                                    <div class=\"card demo-card-header-pic\">";

            homeGoodlist += "                                        <div style=\"background-image:url(http:\/\/wallpaper-gallery.net\/images\/image\/image-13.jpg)\" valign=\"bottom\" class=\"card-header color-white no-border\">Journey To Mountains<\/div>";
            //homeGoodlist +=" <img src=\"http:\/\/wallpaper-gallery.net/images/image/image-13.jpg\"  class=\"card-header\">";
            homeGoodlist += "                                        <div class=\"card-content\">";

            homeGoodlist += "                                            <div class=\"card-content-inner\">";
            homeGoodlist += "                                                <p class=\"color-gray\">Posted on January 21, 2015<\/p>";
            homeGoodlist += "                                                <p>Quisque eget vestibulum nulla...<\/p>";
            homeGoodlist += "                                            <\/div>";
            homeGoodlist += "                                        <\/div>";
            homeGoodlist += "                                        <div class=\"card-footer\">";
            homeGoodlist += "                                            <a href=\"#\" class=\"link\">Like<\/a>";
            homeGoodlist += "                                            <a href=\"#\" class=\"link\">Read more<\/a>";
            homeGoodlist += "                                        <\/div>";
            homeGoodlist += "                                    <\/div>";
            homeGoodlist += "                                <\/div>";
            homeGoodlist += "                                <div class=\"swiper-slide\"><span>Slide 33<\/span><\/div>";
            homeGoodlist += "";
            homeGoodlist += "                                <div class=\"swiper-slide\"><span>Slide 1330<\/span><\/div>";


            $(".swiper-wrapper").html(homeGoodlist);

            var mySwiper = myApp.swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                spaceBetween: 100,
                preloadImages: false,
                lazyLoading: true
            });
        },
        error: function(response) {
            alert("ERROR");
        }
    });
}
