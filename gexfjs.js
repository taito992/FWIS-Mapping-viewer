/* Lead developer: Raphaël Velt
 * Other developers: Jakko Salonen, Tobias Bora, Jan de Mooij
 *
 * Licensed under the MIT License
 * Translations by:
 *    Vicenzo Cosenza (Italian)
 *    Eduardo Ramos Ibáñez (Spanish)
 *    Jaakko Salonen (Finnish)
 *    Zeynep Akata (Turkish)
 *    Σωτήρης Φραγκίσκος (Greek)
 *    Martin Eckert (German)
 *    Jan de Mooij (Dutch)
 *    Bruna Delazeri (Brazilian Portuguese)
 *    Adil Aliyev (Azerbaijani)
 * */

var blue = "rgb(0,57,91)"

// Namespace
var GexfJS = {
	drawings : [],
    lensRadius : 200,
    lensGamma : 0.5,
    graphZone : {
        width : 0,
        height : 0
    },
    oldGraphZone : {},
    params : {
        centreX : 400,
        centreY : 350,
        activeNode : -1,
        currentNode : -1
    },
    oldParams : {},
    minZoom : 0,
    maxZoom : 10,
    overviewWidth : 200,
    overviewHeight : 175,
    baseWidth : 800,
    baseHeight : 700,
    overviewScale : .25,
    totalScroll : 0,
    autoCompletePosition : 0,
    i18n : {
        "az" : {
            "search" : "Təpələri axtar",
            "nodeAttr" : "Attributlar",
            "nodes" : "Təpə nöqtələri",
            "inLinks" : "Daxil olan əlaqələr:",
            "outLinks" : "Çıxan əlaqələr:",
            "undirLinks" : "İstiqamətsiz əlaqələr:",
            "lensOn" : "Linza rejiminə keç",
            "lensOff" : "Linza rejimindən çıx",
            "edgeOn" : "Tilləri göstər",
            "edgeOff" : "Tilləri gizlət",
            "zoomIn" : "Yaxınlaşdır",
            "zoomOut" : "Uzaqlaşdır",
            "browserErr" : 'Sizin brauzeriniz bu səhifəni düzgün göstərə bilmir.<br />Sizə <a href="http://www.mozilla.com/" target="_blank">Firefox</a> və ya <a href="http://www.google.com/chrome/" target="_blank">Chrome</a> brauzerlərinin sonuncu versiyasını yükləməyi tövsiyyə edirik.',
            "modularity_class" : "Modullaşma sinfi",
            "degree" : "Dərəcə"
        },    	
        "de": {
            "search" : "Suche Knoten",
            "nodeAttr" : "Attribute",
            "nodes" : "Knoten",
            "inLinks" : "Ankommende Verknüpfung von",
            "outLinks" : "Ausgehende Verknüpfung zu",
            "undirLinks" : "Ungerichtete Verknüpfung mit",
            "lensOn" : "Vergrößerungsmodus an",
            "lensOff" : "Vergrößerungsmodus aus",
            "edgeOn" : "Kanten anzeigen",
            "edgeOff" : "Kanten verstecken",
            "zoomIn" : "Vergrößern",
            "zoomOut" : "Verkleinern",
            "browserErr" : 'Ihr Browser kann die Seite nicht richtig anzeigen.<br />Wir empfehlen die Verwendung der neusten <a href="http://www.mozilla.com/" target="_blank">Firefox</a> oder <a href="http://www.google.com/chrome/" target="_blank">Chrome</a> Version.'
        },
        "el" : {
            "search" : "Αναζήτηση Κόμβων",
            "nodeAttr" : "Χαρακτηριστικά",
            "nodes" : "Κόμβοι",
            "inLinks" : "Εισερχόμενοι δεσμοί από",
            "outLinks" : "Εξερχόμενοι δεσμοί προς",
            "undirLinks" : "Ακατεύθυντοι δεσμοί με",
            "lensOn" : "Ενεργοποίηση φακού",
            "lensOff" : "Απενεργοποίηση φακού",
            "edgeOn" : "Εμφάνιση ακμών",
            "edgeOff" : "Απόκρυψη ακμών",
            "zoomIn" : "Μεγέθυνση",
            "zoomOut" : "Σμίκρυνση",
            "browserErr" : 'Ο περιηγητής σας δεν μπορεί να εμφανίσει σωστά αυτή τη σελίδα.<br />Σας προτείνουμε να χρησιμοποιήσετε την τελευταία έκδοση του <a href="http://www.mozilla.com/" target="_blank">Firefox</a> ή του <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>'
        },
        "en" : {
            "search" : "Search nodes",
            "nodeAttr" : "Attributes",
            "nodes" : "Nodes",
            "inLinks" : "Inbound Links from:",
            "outLinks" : "Outbound Links to:",
            "undirLinks" : "Related to:",
            "lensOn" : "Activate lens mode",
            "lensOff" : "Deactivate lens mode",
            "edgeOn" : "Show edges",
            "edgeOff" : "Hide edges",
            "zoomIn" : "Zoom In",
            "zoomOut" : "Zoom Out",
            "browserErr" : 'Your browser cannot properly display this page.<br />We recommend you use the latest <a href="http://www.mozilla.com/" target="_blank">Firefox</a> or <a href="http://www.google.com/chrome/" target="_blank">Chrome</a> version'
        },
        "es" : {
            "search" : "Buscar un nodo",
            "nodeAttr" : "Atributos",
            "nodes" : "Nodos",
            "inLinks" : "Aristas entrantes desde :",
            "outLinks" : "Aristas salientes hacia :",
            "undirLinks" : "Aristas no dirigidas con :",
            "lensOn" : "Activar el modo lupa",
            "lensOff" : "Desactivar el modo lupa",
            "edgeOn" : "Mostrar aristas",
            "edgeOff" : "Ocultar aristas",
            "zoomIn" : "Acercar",
            "zoomOut" : "Alejar",
            "browserErr" : 'Tu navegador no es capaz de mostrar esta p&aacute;gina correctamente.<br />Le recomendamos utilizar la &uacute;ltima versi&oacute;n de <a href="http://www.mozilla.com/" target="_blank">Firefox</a> o <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>',
            "modularity_class" : "Clase de modularidad",
            "degree" : "Grado",
            "indegree" : "Grado de entrada",
            "outdegree" : "Grado de salida",
            "weighted degree" : "Grado ponderado",
            "weighted indegree" : "Grado de entrada ponderado",
            "weighted outdegree" : "Grado de salida ponderado",
            "closnesscentrality" : "Cercan&iacute;a",
            "betweenesscentrality" : "Intermediaci&oacute;n",
            "authority" : "Puntuaci&oacute;n de autoridad (HITS)",
            "hub" : "Puntuaci&oacute; de hub (HITS)",
            "pageranks" : "Puntuaci&oacute; de PageRank"
        },
        "fi" : {
            "search" : "Etsi solmuja",
            "nodeAttr" : "Attribuutit",
            "nodes" : "Solmut",
            "inLinks" : "Lähtevät yhteydet :",
            "outLinks" : "Tulevat yhteydet :",
            "undirLinks" : "Yhteydet :",
            "lensOn" : "Ota linssitila käyttöön",
            "lensOff" : "Poista linssitila käytöstä",
            "edgeOn" : "Näytä kaikki yhteydet",
            "edgeOff" : "Näytä vain valitun solmun yhteydet",
            "zoomIn" : "Suurenna",
            "zoomOut" : "Pienennä",
            "browserErr" : 'Selaimesi ei voi näyttää tätä sivua.<br />Suosittelemme käyttämään uusinta versiota <a href="http://www.mozilla.com/" target="_blank">Firefox</a>- tai <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>-selaimesta'
        },
        "fr" : {
            "search" : "Rechercher un n&oelig;ud",
            "nodeAttr" : "Attributs",
            "nodes" : "Nœuds",
            "inLinks" : "Liens entrants depuis :",
            "outLinks" : "Liens sortants vers :",
            "undirLinks" : "Relié à :",
            "lensOn" : "Activer le mode loupe",
            "lensOff" : "Désactiver le mode loupe",
            "edgeOn" : "Afficher les sommets",
            "edgeOff" : "Cacher les sommets",
            "zoomIn" : "S'approcher",
            "zoomOut" : "S'éloigner",
            "browserErr" : 'Votre navigateur n\'est malheureusement pas compatible avec les fonctionnalités de ce site<br />Nous vous suggérons d\'utiliser une version récente de <a href="http://www.mozilla.com/" target="_blank">Firefox</a> ou <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>',
            "modularity_class" : "Classe de modularité",
            "degree" : "Degr&eacute;",
            "indegree" : "&frac12; degr&eacute; int&eacute;rieur",
            "outdegree" : "&frac12; degr&eacute; ext&eacute;rieur",
            "weighted degree" : "Degr&eacute; pond&eacute;r&eacute;",
            "weighted indegree" : "&frac12; degr&eacute; int&eacute;rieur pond&eacute;r&eacute;",
            "weighted outdegree" : "&frac12; degr&eacute; ext&eacute;rieur pond&eacute;r&eacute;",
            "closnesscentrality" : "Centralit&eacute; de proximit&eacute;",
            "betweenesscentrality" : "Centralit&eacute; d'interm&eacute;diarit&eacute;",
            "authority" : "Score d'autorit&eacute; (HITS)",
            "hub" : "Score de hub (HITS)",
            "pageranks" : "Score de PageRank"
        },
        "it" : {
            "search" : "Cerca i nodi",
            "nodeAttr" : "Attributi",
            "nodes" : "Nodi",
            "inLinks" : "Link in entrata da :",
            "outLinks" : "Link in uscita verso :",
            "undirLinks" : "Link non direzionati con :",
            "lensOn" : "Attiva la lente d'ingrandimento",
            "lensOff" : "Disattiva la lente d'ingrandimento",
            "edgeOn" : "Mostra gli spigoli",
            "edgeOff" : "Nascondi gli spigoli",
            "zoomIn" : "Zoom in avanti",
            "zoomOut" : "Zoom indietro",
            "browserErr" : 'Il tuo browser non pu&ograve; visualizzare correttamente questa pagina.<br />Ti raccomandiamo l\'uso dell\'ultima versione di  <a href="http://www.mozilla.com/" target="_blank">Firefox</a> o <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>'
        },
        "tr" : {
            "search" : "Düğüm ara",
            "nodeAttr" : "Özellikler",
            "nodes" : "Düğümler",
            "inLinks" : "Gelen bağlantılar",
            "outLinks" : "Giden bağlantılar",
            "undirLinks" : "Yönsüz bağlantılar",
            "lensOn" : "Merceği etkinleştir",
            "lensOff" : "Merceği etkisizleştir",
            "edgeOn" : "Kenar çizgilerini göster",
            "edgeOff" : "Kenar çizgilerini gizle",
            "zoomIn" : "Yaklaştır",
            "zoomOut" : "Uzaklaştır",
            "browserErr" : "Tarayıcınız sayfayı doğru bir biçimde görüntüleyemiyor.<br />En son Firefox veya Chrome sürümünü kullanmanızı tavsiye ederiz."
        },
        "nl" : {
            "search" : "Knooppunten doorzoeken",
            "nodeAttr" : "Attributen",
            "nodes" : "Knooppunten",
            "inLinks" : "Binnenkomende verbindingen van :",
            "outLinks" : "Uitgaande verbindingen naar :",
            "undirLinks" : "Ongerichtte verbindingen met:",
            "lensOn" : "Loepmodus activeren",
            "lensOff" : "Loepmodus deactiveren",
            "edgeOn" : "Kanten tonen",
            "edgeOff" : "Kanten verbergen",
            "zoomIn" : "Inzoomen",
            "zoomOut" : "Uitzoomen",
            "browserErr" : 'Uw browser kan deze pagina niet correct tonen.<br />We raden aan de meest recente versie van <a href="http://www.mozilla.com/" target="_blank">Firefox</a> of <a href="http://www.google.com/chrome/" target="_blank">Chrome</a> te gebruiken'
        },
        "pt": {
            "search" : "Pesquisar nós",
            "nodeAttr" : "Atributos",
            "nodes" : "Nós",
            "inLinks" : "Ligações de entrada",
            "outLinks" : "Ligações de saída",
            "undirLinks" : "Ligações sem direção",
            "lensOn" : "Ativar modo lente",
            "lensOff" : "Ativar modo lente",
            "edgeOn" : "Mostrar arestas",
            "edgeOff" : "Esconder arestas",
            "zoomIn" : "Aumentar zoom",
            "zoomOut" : "Diminuir zoom",
            "browserErr" : "Seu navegador não pode exibir esta página corretamente.<br />Recomendamos que você use a versão mais recente do navegador Firefox ou Chrome."
        }
    },
    lang : "en"
};

function strLang(_str) {
    var _l = GexfJS.i18n[GexfJS.lang];
    return ( _l[_str] ? _l[_str] : ( GexfJS.i18n["en"][_str] ? GexfJS.i18n["en"][_str] : _str.replace("_"," ") ) );
}

function replaceURLWithHyperlinks(text) {
    if (GexfJS.params.replaceUrls) {
        var _urlExp = /(\b(?:https?:\/\/)?[-A-Z0-9]+\.[-A-Z0-9.:]+(?:\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*)?)/ig,
            _protocolExp = /^https?:\/\//i,
            _res = text.split(_urlExp);
        return _res.map(function(_txt) {
            if (_txt.match(_urlExp)) {
                return $('<a>').attr({
                    href: ( _protocolExp.test(_txt) ? '' : 'http://' ) + _txt,
                    target: "_blank"
                }).text(_txt.replace(_protocolExp,''));
            } else {
                return $('<span>').text(_txt);
            }
        });
    }
    return $("<span>").text(text);
}

function displayNode(_nodeIndex, _recentre) {
    GexfJS.params.currentNode = _nodeIndex;
    if (_nodeIndex != -1) {
        var _d = GexfJS.graph.nodeList[_nodeIndex],
            _b = _d.coords.base,
            _html = $('<div>'),
            _ul = $('<ul>'),
            _cG = $("#leftcolumn");
            
			/*
			_cG.animate({
                "left" : "0px"
            }, function() {
                $("#aUnfold").attr("class","leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
			*/
        $('<h3>')
            .append($('<div>').addClass('largepill').css('background', _d.color.base))
            .append($('<span>').text(_d.label))
            .appendTo(_html);
        // $('<h4>').text(strLang("nodeAttr")).appendTo(_html);
        _ul.appendTo(_html);
        if (GexfJS.params.showId) {
            var _li = $("<li>");
            $("<b>").text("id: ").appendTo(_li);
            $("<span>").text(_d.id).appendTo(_li);
            _li.appendTo(_ul);
        }
        if(_d.attributes_['Photo']) {
            var _li = $("<li>");
            $('<br>').appendTo(_li);
            $('<img>').attr("src", GexfJS.params.imageRoot + _d.attributes_['Photo'] + ".png").appendTo(_li).addClass("attrimg");
            _li.appendTo(_ul);
        }
        for (var i = 0, l = _d.attributes.length; i < l; i++) {
            var attr = _d.attributes[i];
			if(GexfJS.params.hiddenAttributes.indexOf(attr.key) != -1)
				continue;
			if(!attr.value)
				continue;
            var _li = $("<li>");
            $("<b>").text(strLang(attr.key) + ": ").appendTo(_li);
            if (attr.key === 'image') {
                $('<br>').appendTo(_li);
                $('<img>').attr("src", attr.value).appendTo(_li).addClass("attrimg"); 
            } else {
                _li.append(replaceURLWithHyperlinks(attr.value));
            }
            _li.appendTo(_ul);
        }
        var _str_in = [],
            _str_out = [],
            _str_undir = [],
			_related = [];

		function showRelated(_e_n, _e) {
		    var _n = GexfJS.graph.nodeList[_e_n];
            var _li = $("<li>");
            $("<div>").addClass("smallpill").css("background", _n.color.base).appendTo(_li);
            $("<a>")
                .text(_n.label)
                .attr("href","#")
                .mouseover(function() {
                    GexfJS.params.activeNode = _e_n;
                })
                .click(function() {
                    displayNode(_e_n, true);
                    return false;
                })
                .appendTo(_li);
            if (GexfJS.params.showEdgeLabel) {
                $('<span>').text(" – " + _e.label).appendTo(_li);
            }
            if (GexfJS.params.showEdgeWeight) {
                $('<span>').text("(" + _e.weight + ")").appendTo(_li);
            }
            if ( _e.directed ) {
                _str_out.push(_li);
            } else {
                _str_undir.push(_li);
            }
		}

        GexfJS.graph.edgeList.forEach(function(_e) {
            if ( _e.target == _nodeIndex ) {
				_related.push([_e.source, _e, GexfJS.graph.nodeList[_e.source].attributes_.Type]);
            }
            if ( _e.source == _nodeIndex ) {
				_related.push([_e.target, _e, GexfJS.graph.nodeList[_e.target].attributes_.Type]);
            }
        });
        
        ranks = {'Name': 1, "N-2": 2, "N-3": 3}
		_related.sort(function(a, b) {
			return ranks[a[2]] > ranks[b[2]]; // a[2] > b[2];
		})
        
		var _current_type
		_related.forEach(function(_r, i) {
			if (_current_type != _r[2]) {
            	var _li = $("<li>"),
					typeName = GexfJS.params.formattedLabels[_r[2]] || _r[2];
		        $("<p>")
		            .text(GexfJS.params.formattedLabels[_r[2]])
		            .appendTo(_li);
                _str_undir.push(_li);
			}
			_current_type = _r[2];
            showRelated(_r[0], _r[1]);
        });

        if ( _str_in.length ) {
            $('<h4>').text(strLang("inLinks")).appendTo(_html);
            $('<ul>').html(_str_out).appendTo(_html);
        }
        if ( _str_out.length ) {
            $('<h4>').text(strLang("outLinks")).appendTo(_html);
            $('<ul>').html(_str_out).appendTo(_html);
        }
        if ( _str_undir.length ) {
            // $('<h4>').text(strLang("undirLinks")).appendTo(_html);
			$('<br>').appendTo(_html);
            $('<ul>').html(_str_undir).appendTo(_html);
        }
        $("#leftcontent").html(_html);
        if (_recentre) {
            GexfJS.params.centreX = _b.x;
            GexfJS.params.centreY = _b.y;
        }
        $("#searchinput")
            .val(_d.label)
            .removeClass('grey');
    }
}

function updateWorkspaceBounds() {
    
    var _elZC = $("#zonecentre");
    var _top = {
        top : $("#titlebar").height() + "px"
    };
    _elZC.css(_top);
    
    $("#leftcolumn").css(_top);
    GexfJS.graphZone.width = _elZC.width();
    GexfJS.graphZone.height = _elZC.height();
    GexfJS.areParamsIdentical = true;
    
    for (var i in GexfJS.graphZone) {
        GexfJS.areParamsIdentical = GexfJS.areParamsIdentical && ( GexfJS.graphZone[i] == GexfJS.oldGraphZone[i] );
    }
    if (!GexfJS.areParamsIdentical) {
    
    $("#carte")
        .attr({
            width : GexfJS.graphZone.width,
            height : GexfJS.graphZone.height
        })
        .css({
            width : GexfJS.graphZone.width + "px",
            height : GexfJS.graphZone.height + "px"
        });
        for (var i in GexfJS.graphZone) {
            GexfJS.oldGraphZone[i] = GexfJS.graphZone[i];
        }
    }
}

function onTouchStart(evt)
{
    
    var coords = evt.originalEvent.targetTouches[0];
    if(evt.originalEvent.targetTouches.length == 1)
    {
        GexfJS.lastMouse = {
            x : coords.pageX,
            y : coords.pageY
        }
        GexfJS.dragOn = true;
        GexfJS.mouseHasMoved = false;
    } else {
        GexfJS.lastPinch = getPinchDistance(evt);
        GexfJS.pinchOn = true;  
    }
    
}

function startMove(evt) {
    evt.preventDefault();
    GexfJS.dragOn = true;
    GexfJS.lastMouse = {
        x : evt.pageX,
        y : evt.pageY
    };
    GexfJS.mouseHasMoved = false;
}

function onTouchEnd(evt)
{
    GexfJS.dragOn = false;
    GexfJS.pinchOn = false;
    GexfJS.mouseHasMoved = false;
}

function endMove(evt) {
    document.body.style.cursor = "default";
    GexfJS.dragOn = false;
    GexfJS.mouseHasMoved = false;
}

function onGraphClick(evt) {
    if (!GexfJS.mouseHasMoved && !GexfJS.pinchOn) {
        displayNode(GexfJS.params.activeNode);
    }
    endMove();
}

function changeGraphPosition(evt, echelle) {
    document.body.style.cursor = "move";
    var _coord = {
        x : evt.pageX,
        y : evt.pageY
    };
    GexfJS.params.centreX += ( GexfJS.lastMouse.x - _coord.x ) / echelle;
    GexfJS.params.centreY += ( GexfJS.lastMouse.y - _coord.y ) / echelle;
    GexfJS.lastMouse = _coord;
}

function onGraphMove(evt) {
    evt.preventDefault();
    if (!GexfJS.graph) {
        return;
    }
    GexfJS.mousePosition = {
        x : evt.pageX - $(this).offset().left,
        y : evt.pageY - $(this).offset().top
    };
    if (GexfJS.dragOn) {
        changeGraphPosition(evt,GexfJS.globalScale);
        GexfJS.mouseHasMoved = true;
    } else {
        GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
        document.body.style.cursor = ( GexfJS.params.activeNode != -1 ? "pointer" : "default" );
    }
}

function onGraphDrag(evt)
{
    evt.preventDefault();
    if (!GexfJS.graph) {
        return;
    }
    if(evt.originalEvent.targetTouches.length == 1)
    {
        var coords = evt.originalEvent.targetTouches[0];
        GexfJS.mousePosition = {
            x : coords.pageX - $(this).offset().left,
            y : coords.pageY - $(this).offset().top
        };
        if (GexfJS.dragOn) {
            evt.pageX = coords.pageX;
            evt.pageY = coords.pageY;
            changeGraphPosition(evt,GexfJS.globalScale);
            GexfJS.mouseHasMoved = true;
        } else {
            GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
        }
    } else {

        evt.pageX = evt.originalEvent.targetTouches[0].pageX + 
            (
                (
                    evt.originalEvent.targetTouches[1].pageX - 
                    evt.originalEvent.targetTouches[0].pageX
                ) /2 
            );
        evt.pageY = evt.originalEvent.targetTouches[0].pageY + 
        (
            (
                evt.originalEvent.targetTouches[1].pageY - 
                evt.originalEvent.targetTouches[0].pageY 
            ) / 2
        );

        var currentPinch = getPinchDistance(evt);
        
        var delta = currentPinch - GexfJS.lastPinch;
        if(Math.abs(delta) >= 20)
        {
            GexfJS.lastPinch = currentPinch;
            onGraphScroll(evt, delta);
        } else {
            GexfJS.totalScroll = 0;
        }
    }
}

function getPinchDistance(evt)
{
    return Math.sqrt(
        Math.pow(
            evt.originalEvent.targetTouches[0].pageX - 
            evt.originalEvent.targetTouches[1].pageX, 2) +
        Math.pow(
            evt.originalEvent.targetTouches[0].pageY - 
            evt.originalEvent.targetTouches[1].pageY, 2
        )
    );
}

function onOverviewMove(evt) {
    if (GexfJS.dragOn) {
        changeGraphPosition(evt,-GexfJS.overviewScale);
    }
}

function onOverviewDrag(evt)
{
    var coords = evt.originalEvent.targetTouches[0];
    evt.pageX = coords.pageX;
    evt.pageY = coords.pageY;
    if(GexfJS.dragOn) {
        changeGraphPosition(evt,-GexfJS.overviewScale);
    }
}

function onGraphScroll(evt, delta) {
    GexfJS.totalScroll += delta;
    if (Math.abs(GexfJS.totalScroll) >= 1) {
        if (GexfJS.totalScroll < 0) {
            if (GexfJS.params.zoomLevel > GexfJS.minZoom) {
                GexfJS.params.zoomLevel--;
                var _el = (typeof($(this).offset()) == 'object') ? $(this) : $('#carte'),
                    _off = _el.offset(),
                    _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                    _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                GexfJS.params.centreX -= ( Math.SQRT2 - 1 ) * _deltaX / GexfJS.globalScale;
                GexfJS.params.centreY -= ( Math.SQRT2 - 1 ) * _deltaY / GexfJS.globalScale;
                $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
            }
        } else {
            if (GexfJS.params.zoomLevel < GexfJS.maxZoom) {
                GexfJS.params.zoomLevel++;
                GexfJS.globalScale = Math.pow( Math.SQRT2, GexfJS.params.zoomLevel );
                var _el = (typeof($(this).offset()) == 'object') ? $(this) : $('#carte'),
                    _off = _el.offset(),
                    _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                    _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                GexfJS.params.centreX += ( Math.SQRT2 - 1 ) * _deltaX / GexfJS.globalScale;
                GexfJS.params.centreY += ( Math.SQRT2 - 1 ) * _deltaY / GexfJS.globalScale;
                $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
            }
        }
        GexfJS.totalScroll = 0;
    }
}

function initializeMap() {
    clearInterval(GexfJS.timeRefresh);
    GexfJS.oldParams = {};
    GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);
    $("#zoomSlider").slider({
        orientation: "vertical",
        value: GexfJS.params.zoomLevel,
        min: GexfJS.minZoom,
        max: GexfJS.maxZoom,
        range: "min",
        step: 1,
        slide: function( event, ui ) {
            GexfJS.params.zoomLevel = ui.value;
        }
    });
    $("#overviewzone").css({
        width : GexfJS.overviewWidth + "px",
        height : GexfJS.overviewHeight + "px"
    });
    $("#overview").attr({
        width : GexfJS.overviewWidth,
        height : GexfJS.overviewHeight
    });
    GexfJS.timeRefresh = setInterval(traceMap, 60);
    GexfJS.graph = null;
    loadGraph();
}

function loadGraph() {
    console.log(document.location.hash.length > 1 ? document.location.hash.substr(1) : GexfJS.params.graphFile)
    
    $.ajax({
        url: ( document.location.hash.length > 1 ? document.location.hash.substr(1) : GexfJS.params.graphFile ),
        dataType: "xml",
        success: function(data) {
            var _s = new Date();
            var _g = $(data).find("graph"),
                _nodes = _g.children().filter("nodes").children(),
                _edges = _g.children().filter("edges").children();
            GexfJS.graph = {
                directed : ( _g.attr("defaultedgetype") == "directed" ),
                source : data,
                nodeList : [],
                nodeIndexById : [],
                indexOfLabels : [],
                edgeList : []
            };
            var _xmin = 1e9, _xmax = -1e9, _ymin = 1e9, _ymax = -1e9; _marge = 30;
            $(_nodes).each(function() {
                var _n = $(this),
                _pos = _n.find("viz\\:position,position"),
                _x = _pos.attr("x"),
                _y = _pos.attr("y");
                _xmin = Math.min(_x, _xmin);
                _xmax = Math.max(_x, _xmax);
                _ymin = Math.min(_y, _ymin);
                _ymax = Math.max(_y, _ymax);
            });
            
            var _scale = Math.min( ( GexfJS.baseWidth - _marge ) / ( _xmax - _xmin ) , ( GexfJS.baseHeight - _marge ) / ( _ymax - _ymin ) );
            var _deltax = ( GexfJS.baseWidth - _scale * ( _xmin + _xmax ) ) / 2;
            var _deltay = ( GexfJS.baseHeight - _scale * ( _ymin + _ymax ) ) / 2;
            
            GexfJS.ctxMini.clearRect(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
            
            $(_nodes).each( function() {
                var _n = $(this),
                    _id = _n.attr("id"),
                    _label = _n.attr("label") || _id,
                    _d = {
                        id: _id,
                        label: _label
                    },
                    _pos = _n.find("viz\\:position,position"),
                    _x = _pos.attr("x"),
                    _y = _pos.attr("y"),
                    _size = _n.find("viz\\:size,size").attr("value"),
                    _col = _n.find("viz\\:color,color"),
                    _r = _col.attr("r"),
                    _g = _col.attr("g"),
                    _b = _col.attr("b"),
                    _attr = _n.find("attvalue");
                _d.coords = {
                    base : {
                        x : _deltax + _scale * _x,
                        y : _deltay - _scale * _y,
                        r : _scale * _size
                    }
                };
                _d.color = {
                    rgb : {
                        r : _r,
                        g : _g,
                        b : _b
                    },
                    base : "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                    gris : "rgba(" + Math.floor(84 + .33 * _r) + "," + Math.floor(84 + .33 * _g) + "," + Math.floor(84 + .33 * _b) + ",.5)"
                };
                _d.attributes = [];
                $(_attr).each(function() {
                    var _a = $(this),
                        _for = _a.attr("for");                    
                    _d.attributes.push({
                        key: _for ? _for : 'attribute_' + _a.attr("id"),
                        value:_a.attr("value")
                    });
                });

                _d.attributes_ = {};
                $(_attr).each(function() {
                    var _a = $(this),
                        _for = _a.attr("for");
					_for = (_for ? _for : 'attribute_' + _a.attr("id"));            
                    _d.attributes_[_for] = _a.attr("value");
                });

                if (GexfJS.params.sortNodeAttributes) {
                    _d.attributes.sort(function(a,b) {
                        return (a.key < b.key ? -1 : (a.key > b.key ? 1 : 0));
                    });
                }
                GexfJS.graph.nodeIndexById.push(_id);
                GexfJS.graph.indexOfLabels.push(_label.toLowerCase());
                GexfJS.graph.nodeList.push(_d);
                GexfJS.ctxMini.fillStyle = _d.color.base;
                GexfJS.ctxMini.beginPath();
                GexfJS.ctxMini.arc(_d.coords.base.x * GexfJS.overviewScale , _d.coords.base.y * GexfJS.overviewScale , _d.coords.base.r * GexfJS.overviewScale + 1 , 0 , Math.PI*2 , true );
                GexfJS.ctxMini.closePath();
                GexfJS.ctxMini.fill();
            });
            
            $(_edges).each(function() {
                var _e = $(this),
                    _sid = _e.attr("source"),
                    _six = GexfJS.graph.nodeIndexById.indexOf(_sid);
                    _tid = _e.attr("target"),
                    _tix = GexfJS.graph.nodeIndexById.indexOf(_tid);
                    _w = _e.find('attvalue[for="weight"]').attr('value') || _e.attr('weight');
                    _col = _e.find("viz\\:color,color"),
		    _directed = GexfJS.graph.directed;
		if (_e.attr("type") == "directed") _directed = true;
		if (_e.attr("type") == "undirected") _directed = false;
                if (_col.length) {
                    var _r = _col.attr("r"),
                        _g = _col.attr("g"),
                        _b = _col.attr("b");
                } else {
                    var _scol = GexfJS.graph.nodeList[_six].color.rgb;
                    if (GexfJS.graph.directed) {
                        var _r = _scol.r,
                            _g = _scol.g,
                            _b = _scol.b;
                    } else {
                        var _tcol = GexfJS.graph.nodeList[_tix].color.rgb,
                            _r = Math.floor( .5 * _scol.r + .5 * _tcol.r ),
                            _g = Math.floor( .5 * _scol.g + .5 * _tcol.g ),
                            _b = Math.floor( .5 * _scol.b + .5 * _tcol.b );
                    }
                }
                GexfJS.graph.edgeList.push({
                    source : _six,
                    target : _tix,
                    width : Math.max( GexfJS.params.minEdgeWidth, Math.min( GexfJS.params.maxEdgeWidth, ( _w || 1 ) ) ) * _scale * GexfJS.params.edgeThicknessScale,
                    weight : parseFloat(_w || 0),
                    color : "rgba(200, 200, 200, .7)", // "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                    label: _e.attr("label") || "",
		    directed: _directed
                });
            });
            
            GexfJS.imageMini = GexfJS.ctxMini.getImageData(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
        
        //changeNiveau(0);
        }
    });
}

function getNodeFromPos( _coords ) {
    for (var i = GexfJS.graph.nodeList.length - 1; i >= 0; i--) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.withinFrame) {
            var _c = _d.coords.actual;
                _r = Math.sqrt( Math.pow( _c.x - _coords.x , 2) + Math.pow( _c.y - _coords.y , 2 ) );
            if ( _r < _c.r ) {
                return i;
            }
        }
    }
    return -1;
}

function calcCoord(x, y, coord) {
    var _r = Math.sqrt( Math.pow( coord.x - x , 2 ) + Math.pow( coord.y - y , 2 ) );
    if ( _r < GexfJS.lensRadius ) {
        var _cos = ( coord.x - x ) / _r;
        var _sin = ( coord.y - y ) / _r;
        var _newr = GexfJS.lensRadius * Math.pow( _r / GexfJS.lensRadius, GexfJS.lensGamma );
        var _coeff = ( GexfJS.lensGamma * Math.pow( ( _r + 1 ) / GexfJS.lensRadius, GexfJS.lensGamma - 1 ) );
        return {
            "x" : x + _newr * _cos,
            "y" : y + _newr * _sin,
            "r" : _coeff * coord.r
        };
    }
    else {
        return coord;
    }
}

function findAngle(sx, sy, ex, ey) {
    var tmp = Math.atan((ey - sy) / (ex - sx));
    if (ex - sx >= 0) {
	return tmp
    } else {
	return tmp + Math.PI
    }
}

function drawArrowhead(contexte, locx, locy, angle, sizex, sizey) {
    tmp = contexte.lineWidth;
    var hx = sizex / 2;
    var hy = sizey / 2;
    contexte.translate((locx ), (locy));
    contexte.rotate(angle);
    contexte.translate(-hx,-hy);
    contexte.lineWidth = 1;
    contexte.beginPath();
    contexte.moveTo(0,0);
    contexte.lineTo(0,1*sizey);    
    contexte.lineTo(1*sizex,1*hy);
    contexte.closePath();
    contexte.fillStyle = "#424242";
    contexte.fill();
    contexte.stroke();
    contexte.translate(hx,hy);
    contexte.rotate(-angle);
    contexte.translate(-locx, -locy);
    contexte.lineWidth = tmp;
}

function traceArc(contexte, source, target, arrow_size, draw_arrow) {
    contexte.beginPath();
    contexte.moveTo(source.x, source.y);
    if (GexfJS.params.curvedEdges) {
	var x2,y2,x3,y3,x4,y4,x5,y5;
	x2 = source.x;
	y2 = source.y;
        if ( ( source.x == target.x ) && ( source.y == target.y ) ) {
            x3 = source.x + 2.8 * source.r;
            y3 = source.y - source.r;
            x4 = source.x;
            y4 = source.y + 2.8 * source.r;
	    x5 = source.x + 1;
	    y5 = source.y;
        } else {
            x3 = .3 * target.y - .3 * source.y + .8 * source.x + .2 * target.x;
            y3 = .8 * source.y + .2 * target.y - .3 * target.x + .3 * source.x;
            x4 = .3 * target.y - .3 * source.y + .2 * source.x + .8 * target.x;
            y4 = .2 * source.y + .8 * target.y - .3 * target.x + .3 * source.x;
	    x5 = target.x;
	    y5 = target.y;
        }
	contexte.bezierCurveTo(x3,y3,x4,y4,x5,y5);
	contexte.stroke();
	if (draw_arrow){
	    // Find the middle of the bezierCurve
	    var tmp = Math.pow(0.5, 3)
	    var x_middle = tmp * (x2 + 3*x3 + 3*x4 + x5)
	    var y_middle = tmp * (y2 + 3*y3 + 3*y4 + y5)
	    // Find the angle of the bezierCurve at the middle point
	    var tmp = Math.pow(0.5,2)
	    var x_prime_middle = 3*tmp*(- x2 - x3 + x4 + x5)
	    var y_prime_middle = 3*tmp*(- y2 - y3 + y4 + y5)
	    drawArrowhead(contexte,x_middle,y_middle, findAngle(0,0,x_prime_middle, y_prime_middle), arrow_size, arrow_size);
	}
    } else {
        contexte.lineTo(target.x,target.y);
	contexte.stroke();
	if (draw_arrow) {
	    drawArrowhead(contexte,(source.x+target.x)/2, (source.y + target.y)/2, findAngle(source.x, source.y, target.x, target.y), GexfJS.overviewScale*arrow_size, GexfJS.overviewScale*arrow_size);
	    contexte.stroke();
	}
    }
}

function traceMap() {
    updateWorkspaceBounds();
    if (!GexfJS.graph) {
        return;
    }
    var _identical = GexfJS.areParamsIdentical;
    GexfJS.params.mousePosition = ( GexfJS.params.useLens ? ( GexfJS.mousePosition ? ( GexfJS.mousePosition.x + "," + GexfJS.mousePosition.y ) : "out" ) : null );
    for (var i in GexfJS.params) {
        _identical = _identical && ( GexfJS.params[i] == GexfJS.oldParams[i] );
    }
    if (_identical) {
        return;
    } else {
        for (var i in GexfJS.params) {
            GexfJS.oldParams[i] = GexfJS.params[i];
        }
    }
    
    GexfJS.globalScale = Math.pow( Math.SQRT2, GexfJS.params.zoomLevel );
    GexfJS.decalageX = ( GexfJS.graphZone.width / 2 ) - ( GexfJS.params.centreX * GexfJS.globalScale );
    GexfJS.decalageY = ( GexfJS.graphZone.height / 2 ) - ( GexfJS.params.centreY * GexfJS.globalScale );
    
    var _sizeFactor = GexfJS.globalScale * Math.pow(GexfJS.globalScale, -.15),
        _edgeSizeFactor = _sizeFactor * GexfJS.params.edgeWidthFactor,
        _nodeSizeFactor = _sizeFactor * GexfJS.params.nodeSizeFactor,
        _textSizeFactor = 0.8;
    
    GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);
    
    if (GexfJS.params.useLens && GexfJS.mousePosition) {
        GexfJS.ctxGraphe.fillStyle = "rgba(220,220,250,0.4)";
        GexfJS.ctxGraphe.beginPath();
        GexfJS.ctxGraphe.arc( GexfJS.mousePosition.x , GexfJS.mousePosition.y , GexfJS.lensRadius , 0 , Math.PI*2 , true );
        GexfJS.ctxGraphe.closePath();
        GexfJS.ctxGraphe.fill();
    }
    
    var _centralNode = ( ( GexfJS.params.activeNode != -1 ) ? GexfJS.params.activeNode : GexfJS.params.currentNode );
    
    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        _d.coords.actual = {
            x : GexfJS.globalScale * _d.coords.base.x + GexfJS.decalageX,
            y : GexfJS.globalScale * _d.coords.base.y + GexfJS.decalageY,
            r : _nodeSizeFactor * _d.coords.base.r 
        };
        _d.withinFrame = ( ( _d.coords.actual.x + _d.coords.actual.r > 0 ) && ( _d.coords.actual.x - _d.coords.actual.r < GexfJS.graphZone.width ) && ( _d.coords.actual.y + _d.coords.actual.r > 0) && (_d.coords.actual.y - _d.coords.actual.r < GexfJS.graphZone.height) );
        _d.visible = ( GexfJS.params.currentNode == -1 || i == _centralNode || GexfJS.params.showEdges );
    }
    
    var _tagsMisEnValeur = [];
    
    if ( _centralNode != -1 ) {
        _tagsMisEnValeur = [ _centralNode ];
    }
    
    var _displayEdges = ( GexfJS.params.showEdges && GexfJS.params.currentNode == -1 );
    
    for (var i in GexfJS.graph.edgeList) {
        var _d = GexfJS.graph.edgeList[i],
            _six = _d.source,
            _tix = _d.target,
            _ds = GexfJS.graph.nodeList[_six],
            _dt = GexfJS.graph.nodeList[_tix];
        var _isLinked = false;
        if (_centralNode != -1) {
            if (_six == _centralNode) {
                _tagsMisEnValeur.push(_tix);
                _coulTag = _dt.color.base;
                _isLinked = true;
                _dt.visible = true;
            }
            if (_tix == _centralNode) {
                _tagsMisEnValeur.push(_six);
                _coulTag = _ds.color.base;
                _isLinked = true;
                _ds.visible = true;
            }
        }

        if ( ( _isLinked || _displayEdges ) && ( _ds.withinFrame || _dt.withinFrame ) &&  _ds.visible && _dt.visible ) {
            GexfJS.ctxGraphe.lineWidth = _edgeSizeFactor * _d.width;
            var _coords = ( ( GexfJS.params.useLens && 0
.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _ds.coords.actual ) : _ds.coords.actual );
            _coordt = ( (GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dt.coords.actual ) : _dt.coords.actual );
            GexfJS.ctxGraphe.strokeStyle = ( _isLinked ? _d.color : "rgba(100,100,100,0.2)" );
            traceArc(GexfJS.ctxGraphe, _coords, _coordt, _sizeFactor * 3.5, GexfJS.params.showEdgeArrow && _d.directed);
        }
    }
    GexfJS.ctxGraphe.lineWidth = 4;
    GexfJS.ctxGraphe.strokeStyle = "rgba(0,100,0,0.8)";
    
    if (_centralNode != -1) {
        var _dnc = GexfJS.graph.nodeList[_centralNode];
        _dnc.coords.real = ( (GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dnc.coords.actual ) : _dnc.coords.actual );
    }
	
	var centralNodeNeighbors = [];
	GexfJS.graph.edgeList.forEach(function(_e) {
		if (_e.target == _centralNode) {
			centralNodeNeighbors.push(String(_e.source));
		}
		if (_e.source == _centralNode) {
			centralNodeNeighbors.push(String(_e.target));
		}
	});
    
    for (var i in GexfJS.graph.nodeList) {

        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.withinFrame) {
            if (i != _centralNode) {
                _d.coords.real = ( ( GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _d.coords.actual ) : _d.coords.actual );
                _d.isTag = ( _tagsMisEnValeur.indexOf(parseInt(i)) != -1 );
                GexfJS.ctxGraphe.beginPath();
                GexfJS.ctxGraphe.fillStyle = ( ( _tagsMisEnValeur.length && !_d.isTag ) ? _d.color.gris : _d.color.base );
                GexfJS.ctxGraphe.arc( _d.coords.real.x , _d.coords.real.y , _d.coords.real.r , 0 , Math.PI * 2, true );
                GexfJS.ctxGraphe.closePath();
                GexfJS.ctxGraphe.fill();
            }
			
			if (_d.attributes_['Type'] == 'Name') {
				// Draw node icons
				var _r = _d.coords.real.r * 1.7,
					_x = _d.coords.real.x - _r / 2,
					_y = _d.coords.real.y - _r / 2;
				if(GexfJS.drawings[i] == undefined) {
					GexfJS.drawings[i] = new Image();
					GexfJS.drawings[i].src = GexfJS.params.imageRoot + _d.attributes_.Photo + ".png";// "1.png";//"icons/1.png";
					GexfJS.drawings[i].onload = function() {
                        try {
                            GexfJS.ctxGraphe.drawImage(GexfJS.drawings[i], _x, _y, _r, _r);
                        }
                        catch (e) {}
					};
				} else {
                    try {
                        GexfJS.ctxGraphe.drawImage(GexfJS.drawings[i], _x, _y, _r, _r);
                    }
                    catch (e) {}
				}
			}				
			

			var isCentralNodeNeighbor = (centralNodeNeighbors.indexOf(i) != -1);

			if (i != _centralNode && _centralNode != -1) {
				// fade secondary nodes with a transparent white mask
	            _d.coords.real = ( ( GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _d.coords.actual ) : _d.coords.actual );
	            GexfJS.ctxGraphe.beginPath();
				var opacity = isCentralNodeNeighbor ? 0 : 0.7;
	            GexfJS.ctxGraphe.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
	            GexfJS.ctxGraphe.arc( _d.coords.real.x , _d.coords.real.y , _d.coords.real.r , 0 , Math.PI * 2, true );
	            GexfJS.ctxGraphe.closePath();
	            GexfJS.ctxGraphe.fill();
	        }
        }
    }
    
    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.withinFrame) {
            if (i != _centralNode) {
                var _fs = _d.coords.real.r * _textSizeFactor;
                if (_d.isTag) {
                    if (_centralNode != -1) {
                        var _dist = Math.sqrt( Math.pow( _d.coords.real.x - _dnc.coords.real.x, 2 ) + Math.pow( _d.coords.real.y - _dnc.coords.real.y, 2 ) );
                        if (_dist > 80) {
                            _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _fs);
                        }
                    } else {
                        _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _fs);
                    }
                }
                if (_fs > GexfJS.params.textDisplayThreshold) {
                    GexfJS.ctxGraphe.fillStyle = ( ( i != GexfJS.params.activeNode ) && _tagsMisEnValeur.length && ( ( !_d.isTag ) || ( _centralNode != -1 ) ) ? "rgba(60,60,60,0.3)" : "rgb(0,0,0)" );
					if ( _centralNode != -1 && centralNodeNeighbors.indexOf(i) != -1 )
						GexfJS.ctxGraphe.fillStyle = "rgb(0,0,0)";
                    var font = Math.floor( _fs )+"px";
					font += (_d.attributes_.Type == 'Name' ? " 'regular'" : " 'bodoni'");
					GexfJS.ctxGraphe.font = font;
                    GexfJS.ctxGraphe.textAlign = "center";
                    GexfJS.ctxGraphe.textBaseline = "middle";
					var _pad = _d.attributes_.Type == 'Name' ? _d.coords.real.r * _textSizeFactor: 0;// 40 : 0;
                    GexfJS.ctxGraphe.fillText(_d.label, _d.coords.real.x, _d.coords.real.y + _pad);
                }
            }
        }
    }

    if (_centralNode != -1) {
        GexfJS.ctxGraphe.fillStyle = _dnc.color.base;
        GexfJS.ctxGraphe.strokeStyle = "rgb(255, 255, 255)";
        GexfJS.ctxGraphe.beginPath();
        GexfJS.ctxGraphe.arc( _dnc.coords.real.x , _dnc.coords.real.y , _dnc.coords.real.r * 1.0 , 0 , Math.PI*2 , true );
        GexfJS.ctxGraphe.closePath();
        GexfJS.ctxGraphe.fill();
        //GexfJS.ctxGraphe.stroke();
		
		if (_dnc.attributes_['Type'] == 'Name') {
			var _r = _dnc.coords.real.r * 1.7,
				_x = _dnc.coords.real.x - _r / 2,
				_y = _dnc.coords.real.y - _r / 2;
			GexfJS.ctxGraphe.drawImage(GexfJS.drawings[_centralNode], _x, _y, _r, _r);
		}

		// if (GexfJS.displayTextOnHover) {
		if (_dnc.attributes_['Type'] != 'Name') {
		    var _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _dnc.coords.real.r * _textSizeFactor) + 2;
		    // GexfJS.ctxGraphe.font = "bold " + Math.floor( _fs )+"px Arial";
		    GexfJS.ctxGraphe.font = Math.floor( _fs )+"px 'bodoni'";
		    GexfJS.ctxGraphe.textAlign = "center";
		    GexfJS.ctxGraphe.textBaseline = "middle";
		    GexfJS.ctxGraphe.fillStyle = "rgba(255,255,250,0.5)";
		    GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x - 2, _dnc.coords.real.y);
		    GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x + 2, _dnc.coords.real.y);
		    GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y - 2);
		    GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y + 2);
		    GexfJS.ctxGraphe.fillStyle = "rgb(0,0,0)";
		    GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y);
		}
    }
    
    GexfJS.ctxMini.putImageData(GexfJS.imageMini, 0, 0);
    var _r = GexfJS.overviewScale / GexfJS.globalScale,
        _x = - _r * GexfJS.decalageX,
        _y = - _r * GexfJS.decalageY,
        _w = _r * GexfJS.graphZone.width,
        _h = _r * GexfJS.graphZone.height;
    
    GexfJS.ctxMini.strokeStyle = "rgb(0,57,91)";
    GexfJS.ctxMini.lineWidth = 1;
    GexfJS.ctxMini.fillStyle = "rgba(120,120,120,0.2)";
    GexfJS.ctxMini.beginPath();
    GexfJS.ctxMini.fillRect( _x, _y, _w, _h );
    GexfJS.ctxMini.strokeRect( _x, _y, _w, _h );
}

function hoverAC() {
    $("#autocomplete li").removeClass("hover");
    $("#liac_"+GexfJS.autoCompletePosition).addClass("hover");
    GexfJS.params.activeNode = GexfJS.graph.indexOfLabels.indexOf( $("#liac_"+GexfJS.autoCompletePosition).text().toLowerCase() );
}

function changePosAC(_n) {
    GexfJS.autoCompletePosition = _n;
    hoverAC();
}

function updateAutoComplete(_sender) {
    var _val = $(_sender).val().toLowerCase();
    var _ac = $("#autocomplete");
    var _acContent = $('<ul>');
    if (_val != GexfJS.dernierAC || _ac.html() == "") {
        GexfJS.dernierAC = _val;
        var _n = 0;
        GexfJS.graph.indexOfLabels.forEach(function(_l, i) {
            if (_n < 30 && _l.search(_val) != -1) {
                var closure_n = _n;
                $('<li>')
                    .attr("id", "liac_" + _n)
                    .append($("<div>")
                        .addClass("smallpill")
                        .css("background", GexfJS.graph.nodeList[i].color.base)
                     )
                    .append($("<span>").css('margin-left', '10px'))
                    .append($('<a>')
                        .mouseover(function() {
                            changePosAC(closure_n);
                        })
                        .click(function() {
                            displayNode(i, true);
                            return false;
                        })
                        .text(GexfJS.graph.nodeList[i].label)
                    )
                    .appendTo(_acContent);
                _n++;
            }
        });
        GexfJS.autoCompletePosition = 0;
        _ac.html(
            $('<div>').append(
                $('<h4>').text(strLang("nodes"))
            ).append(_acContent)
        );
    }
    hoverAC();
    _ac.show();
}

function updateButtonStates() {
    $("#lensButton").attr("class",GexfJS.params.useLens?"":"off")
        .attr("title", strLang( GexfJS.params.showEdges ? "lensOff" : "lensOn" ) );

    $("#edgesButton").attr("class",GexfJS.params.showEdges?"":"off")
        .attr("title", strLang( GexfJS.params.showEdges ? "edgeOff" : "edgeOn" ) );
}

function setParams(paramlist) {
    for (var i in paramlist) {
        GexfJS.params[i] = paramlist[i];
    }
}

$(document).ready(function() {
    
    var lang = (
        typeof GexfJS.params.language != "undefined" && GexfJS.params.language
        ? GexfJS.params.language
        : (
            navigator.language
            ? navigator.language.substr(0,2).toLowerCase()
            : (
                navigator.userLanguage
                ? navigator.userLanguage.substr(0,2).toLowerCase()
                : "en"
            )
        )
    );
    GexfJS.lang = (GexfJS.i18n[lang] ? lang : "en");
    
    if ( !document.createElement('canvas').getContext ) {
        $("#bulle").html('<p><b>' + strLang("browserErr") + '</b></p>');
        return;
    }
    
    updateButtonStates();
    
    GexfJS.ctxGraphe = document.getElementById('carte').getContext('2d');
    GexfJS.ctxMini = document.getElementById('overview').getContext('2d');
    updateWorkspaceBounds();
    
    initializeMap();
    
    window.onhashchange = initializeMap;
    
    $("#searchinput")
        .focus(function() {
            if ( $(this).is('.grey') ) {
                $(this).val('').removeClass('grey');
            }
        })
        .keyup(function(evt) {
            updateAutoComplete(this);
        }).keydown(function(evt){
            var _l = $("#autocomplete li").length;
            switch (evt.keyCode) {
                case 40 :
                    if (GexfJS.autoCompletePosition < _l - 1) {
                        GexfJS.autoCompletePosition++;
                    } else {
                        GexfJS.autoCompletePosition = 0;
                    }
                break;
                case 38 :
                    if (GexfJS.autoCompletePosition > 0) {
                        GexfJS.autoCompletePosition--;
                    } else {
                        GexfJS.autoCompletePosition = _l - 1;
                    }
                break;
                case 27 :
                    $("#autocomplete").slideUp();
                break;
                case 13 :
                    if ($("#autocomplete").is(":visible")) {
                        var _liac = $("#liac_"+GexfJS.autoCompletePosition);
                        if (_liac.length) {
                            $(this).val(_liac.text());
                        }
                    }
                break;
                default :
                    GexfJS.autoCompletePosition = 0;
                break;
            }
            updateAutoComplete(this);
            if (evt.keyCode == 38 || evt.keyCode == 40) {
                return false;
            }
        });
    $("#recherche").submit(function() {
        if (GexfJS.graph) {
            displayNode( GexfJS.graph.indexOfLabels.indexOf($("#searchinput").val().toLowerCase()), true);
        }
        return false;
    });
    $("#carte")
        .mousemove(onGraphMove)
        .bind('touchmove', onGraphDrag)
        .click(onGraphClick)
        .bind('touchend', onGraphClick)
        .mousedown(startMove)
        .bind('touchstart', onTouchStart)
        .mouseout(function() {
            GexfJS.mousePosition = null;
            endMove();
        })
        .bind('touchend', function(){
            GexfJS.mousePosition = null;
            onTouchEnd();
        })
        .mousewheel(onGraphScroll);
    $("#overview")
        .mousemove(onOverviewMove)
        .bind('touchmove', onOverviewDrag)
        .mousedown(startMove)
        .bind('touchstart', onTouchStart)
        .mouseup(endMove)
        .bind('touchend', onTouchEnd)
        .mouseout(endMove)
        .mousewheel(onGraphScroll);
    $("#zoomMinusButton").click(function() {
        GexfJS.params.zoomLevel = Math.max( GexfJS.minZoom, GexfJS.params.zoomLevel - 1);
        $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
        return false;
    })
        .attr("title", strLang("zoomOut"));
    $("#zoomPlusButton").click(function() {
        GexfJS.params.zoomLevel = Math.min( GexfJS.maxZoom, GexfJS.params.zoomLevel + 1);
        $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
        return false;
    })
        .attr("title", strLang("zoomIn"));
    $(document).click(function(evt) {
        $("#autocomplete").slideUp();
    });
    $("#autocomplete").css({
        top: ( $("#searchinput").offset().top + $("#searchinput").outerHeight() ) + "px",
        left: $("#searchinput").offset().left + "px"
    });
    $("#lensButton").click(function () {
        GexfJS.params.useLens = !GexfJS.params.useLens;
        updateButtonStates();
        return false;
    });
    $("#edgesButton").click(function () {
        GexfJS.params.showEdges = !GexfJS.params.showEdges;
        updateButtonStates();
        return false;
    });

	var unfold = function() {
        var _cG = $("#leftcolumn");
        if (_cG.offset().left < 0) {
            _cG.animate({
                "left" : "0px"
            }, function() {
                $("#aUnfold").attr("class","leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
        } else {
            _cG.animate({
                "left" : "-" + _cG.width() + "px"
            }, function() {
                $("#aUnfold").attr("class","rightarrow");
                $("#zonecentre").css({
                    left: "0"
                });
            });
        }
        return false;
    };
	// unfold()
    $("#aUnfold").click(unfold);
});
