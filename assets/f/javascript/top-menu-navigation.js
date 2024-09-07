function positionXY(id,axis)
{
	var el = document.getElementById(id);
	if(axis == 'x' || axis == 'X') {
		var pos = el.offsetLeft;
		el = el.offsetParent;
		while (el != null && el != 'undefined') { if(el.offsetLeft != 'undefined' && el.offsetLeft > 0) {pos += el.offsetLeft ; } el = el.offsetParent; }
	  }
	if(axis == 'y' || axis == 'Y') {
	  var pos = el.offsetTop;
		  el = el.offsetParent;
		  while (el != null && el != 'undefined') { if(el.offsetTop != 'undefined' && el.offsetTop > 0) {pos += el.offsetTop ; } el = el.offsetParent; }
	}
  return (pos);
}

// Function for the worldwide popup
function worldwideCountries(from)
{
	document.writeln("<div id=\'panelDiv\' style=\"position:absolute; visibility:hidden; left:0px; z-index:20000; WIDTH: 620px; BORDER-RIGHT: #9A9A9A 1px solid; PADDING-RIGHT: 12px;BORDER-TOP: #9A9A9A 1px solid; PADDING-LEFT: 12px; PADDING-BOTTOM: 12px; BORDER-LEFT: #9A9A9A 1px solid; PADDING-TOP: 12px;BORDER-BOTTOM: #9A9A9A 1px solid; BACKGROUND-COLOR: #ffffff\" onmouseover=\"panelMOv(\'panelDiv\',\'img1\');\" onmouseout=\"panelMOu(\'panelDiv\');\">");
document.writeln("<table width=100%>");
document.writeln("<tr align=left><td colspan=5 class=\'sngPst\' style=\"border-bottom:#cccccc 1px solid\" title=\"select a country region\"><b>SELECT A COUNTRY/REGION<\/b><\/td><\/tr>");
document.writeln("<tr valign=top align=left><td width=20% class=\'sngPst\'>");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ao/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:AFRICA OPERATIONS\';\" id=\"Africa Operations\">Africa Operation<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:ARGENTINA\';\" id=\"Argentina\">Argentina<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/au/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:AUSTRALIA\';\" id=\"Australia\">Australia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/at/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:AUSTRIA\';\" id=\"Austria\">Austria<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BAHRAIN\';\" id=\"Bahrain\">Bahrain<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BANGLADESH\';\" id=\"Bangladesh\">Bangladesh<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/be/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BELGIUM AND LUXEMBOURG\';\" id=\"Belgium &amp; Luxembourg\">Belgium &amp; Luxembourg<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BELIZE\';\" id=\"Belize\">Belize<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BHUTAN\';\" id=\"Bhutan\">Bhutan<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BOLIVIA\';\" id=\"Bolivia\">Bolivia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ba/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BOSNIA AND HERZEGOVINA\';\" id=\"Bosnia &amp; Herzegovina\">Bosnia &amp; Herzegovina<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/br/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BRASIL\';\" id=\"Brasil\">Brasil<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BRUNEI\';\" id=\"Brunei\">Brunei<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/bg/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:BULGARIA\';\" id=\"Bulgaria\">Bulgaria<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CAMBODIA\';\" id=\"Cambodia\">Cambodia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ca-en/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CANADA - ENGLISH\';\" id=\"Canada - English\">Canada - English<\/a><\/div> ");

document.writeln("<div nowrap><a href=\"http://www.oracle.com/ca-fr/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CANADA - FRENCH\';\" id=\"Canada - French\">Canada - French<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CHILE\';\" id=\"Chile\">Chile<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/cn/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CHINA\';\" id=\"China\">China<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:COLOMBIA\';\" id=\"Colombia\">Colombia<\/a><\/div> ");
document.writeln("<\/td>");
document.writeln("<td width=20% class=\'sngPst\'>");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:COSTA RICA\';\" id=\"Costa Rica\">Costa Rica<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/hr/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CROATIA\';\" id=\"Croatia\">Croatia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/cy/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CYPRUS\';\" id=\"Cyprus\">Cyprus<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/cz/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:CZECH REPUBLIC\';\" id=\"Czech Republic\">Czech Republic<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/dk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:DENMARK\';\" id=\"Denmark\">Denmark<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:ECUADOR\';\" id=\"Ecuador\">Ecuador<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:EGYPT\';\" id=\"Egypt\">Egypt<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ee/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:ESTONIA\';\" id=\"Estonia\">Estonia<\/a><\/div> ");

document.writeln("<div nowrap><a href=\"http://www.oracle.com/fi/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:FINLAND\';\" id=\"Finland\">Finland<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/fr/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:FRANCE\';\" id=\"France\">France<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/de/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:GERMANY\';\" id=\"Germany\">Germany<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/gr/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:GREECE\';\" id=\"Greece\">Greece<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:GAUTEMALA\';\" id=\"Guatemala\">Guatemala<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:HONDURAS\';\" id=\"Honduras\">Honduras<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/hk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:HONGKONG\';\" id=\"Hong Kong\">Hong Kong<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/hu/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:HUNGARY\';\" id=\"Hungary\">Hungary<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/in/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:INDIA\';\" id=\"India\">India<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/ea/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:INDONESIA\';\" id=\"Indonesia\">Indonesia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:IRAQ\';\" id=\"Iraq\">Iraq<\/a><\/div>");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ie/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:IRELAND\';\" id=\"Ireland\">Ireland<\/a><\/div>");
document.writeln("<\/td>");
document.writeln("<td width=20% class=\'sngPst\'>");

document.writeln("<div nowrap><a href=\"http://www.oracle.com/il/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:ISRAEL\';\" id=\"Israel\">Israel<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/it/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:ITALY';\" id=\"Italy\">Italy<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.co.jp/\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:JAPAN\';\" id=\"Japan\">Japan<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:JORDAN\';\" id=\"Jordan\">Jordan<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ru/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:KAZAKHSTAN\';\" id=\"Kazakhstan\">Kazakhstan<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/kr/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:KOREA\';\" id=\"Korea\">Korea<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:KUWAIT\';\" id=\"Kuwait\">Kuwait<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/my/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:LAOS\';\" id=\"Laos\">Laos<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/lv/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:LATVIA\';\" id=\"Lativa\">Latvia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:LEBANON\';\" id=\"Lebanon\">Lebanon<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/lt/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:LITHUANIA\';\" id=\"Lithuania\">Lithuania<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/my/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:MALAYSIA\';\" id=\"Malaysia\">Malaysia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:MALDIVES\';\" id=\"Maldives\">Maldives<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/mt/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:MALTA\';\" id=\"Malta\">Malta<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:MEXICO\';\" id=\"Mexico\">Mexico<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ru/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:MOLDOVA\';\" id=\"Moldova\">Moldova<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:NEPAL\';\" id=\"Nepal\">Nepal<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/nl/\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:NETHERLANDS\';\" id=\"Netherlands\">Netherlands<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/nz/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:NEW ZEALAND\';\" id=\"New Zealand\">New Zealand<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:NICARAGUA\';\" id=\"Nicaragua\">Nicaragua<\/a><\/div> ");
document.writeln("<\/td>");
document.writeln("<td width=20% class=\'sngPst\'>");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/no/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:NORWAY\';\" id=\"Norway\">Norway<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:OMAN\';\" id=\"Oman\">Oman<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:PAKISTAN\';\" id=\"Pakistan\">Pakistan<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:PANAMA\';\" id=\"Panama\">Panama<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:PARAGUAY\';\" id=\"Paraguay\">Paraguay<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:PERU\';\" id=\"Peru\">Peru<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/ea/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:PHILLIPINES\';\" id=\"Philippines\">Philippines<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/pl/\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:POLAND\';\" id=\"Poland\">Poland<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/pt/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:PORTUGAL\';\" id=\"Portugal\">Portugal<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:PUERTO RICO\';\" id=\"Puerto Rico\">Puerto Rico<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:QATAR\';\" id=\"Qatar\">Qatar<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ro/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:ROMANIA\';\" id=\"Romania\">Romania<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/ru/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:RUSSIA\';\" id=\"Russia\">Russia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SAUDI ARABIA\';\" id=\"Saudi Arabia\">Saudi Arabia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/yu/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SERBIA AND MONTENGRO\';\" id=\"Serbia &amp; Montenegro\">Serbia &amp; Montenegro<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/ea/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SINGAPORE\';\" id=\"Singapore\">Singapore<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/sk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SLOVAKIA\';\" id=\"Slovakia\">Slovakia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/si/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SLOVENIA\';\" id=\"Slovenia\">Slovenia<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/za/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SOUTH AFRICA\';\" id=\"South Africa\">South Africa<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/es/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SPAIN\';\" id=\"Spain\">Spain<\/a><\/div> ");
document.writeln("<\/td>");
document.writeln("<td width=20% class='sngPst'>");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SRI LANKA\';\" id=\"Sri Lanka\">Sri Lanka<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/se/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SWEDEN\';\" id=\"Sweden\">Sweden<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ch-fr/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SWITZERLAND -- FRENCH\';\" id=\"Switzerland - French\">Switzerland -- French<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/ch-de/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:SWITZERLAND -- GERMAN\';\" id=\"Switzerland - German\">Switzerland -- German<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/tw/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:TAIWAN\';\" id=\"Taiwan\">Taiwan<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/th/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:THAILAND\';\" id=\"Thailand\">Thailand<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/tr/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:TURKEY\';\" id=\"Turkey\">Turkey<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/ru/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:UKRAINE\';\" id=\"Ukraine\">Ukraine<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:UNITED ARAB EMIRATES\';\" id=\"United Arab Emirates\">United Arab Emirates<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/uk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:UNITED KINGDOM\';\" id=\"United Kingdom\">United Kingdom<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/us/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:UNITED STATES\';\" id=\"United States\">United States<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:URAGUAY\';\" id=\"Uruguay\">Uruguay<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/lad/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:VENEZUELA\';\"id=\"Venezuela\">Venezuela<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/pk/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:VIETNAM\';\" id=\"Vietnam\">Vietnam<\/a><\/div> ");
document.writeln("<div nowrap><a href=\"http://www.oracle.com/global/me/index.html\" class=\'sngPst\' onClick=\"s_objectID=\'R8:WW:YEMEN\';\" id=\"Yemen\">Yemen<\/a><\/div> ");
document.writeln("<\/td><\/tr>");
document.writeln("<tr><td><\/td><\/tr>");
document.writeln("<\/table>");
document.writeln("<\/div>");
}


// new functions to find dynamic position of any given element added.

function positionedOffsetLeft(element) {
    var valueT = 0, valueL = 0;
    do {
      // valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element.tagName.toUpperCase() == 'BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);
   return valueL ;
  }
  
  function positionedOffsetTop(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      // valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element.tagName.toUpperCase() == 'BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);
    return valueT;
  }

function panelMOv(panelID) {
	if (navigator.appName != "Netscape") {
		var dropdown = document.getElementById("group");
	}
	var p = document.getElementById(panelID);
	p.style.visibility = "visible";
}

function panelMOu(panelID) {
	var p = document.getElementById(panelID);
	p.style.visibility = "hidden";
	
	if (navigator.appName != "Netscape") {
		var dropdown = document.getElementById("group");
	}
}

function mvqMOv(panelID,imgID) {

	var el = document.getElementById(imgID);
	if ( typeof el != 'undefined' && el != null ) {
		var x = positionedOffsetLeft(el);
		var y = positionedOffsetTop(el);
		var imgWidth = el.width ;
		
		if(panelID=="panelDiv")
		{
			document.getElementById(panelID).style.left = x - (413) +"px";
			document.getElementById(panelID).style.top = y+9 +"px";
		}
		else if(panelID=="panelDiv_iam" || panelID=="panelDiv_comm")
		{
			document.getElementById(panelID).style.left = x -195 +"px";
			document.getElementById(panelID).style.top = y+9 +"px";
		}
		else if(panelID=="panelDiv_iwanto")
		{
			document.getElementById(panelID).style.left = x -195 +"px";
			document.getElementById(panelID).style.top = y+9 +"px";
		}
		else if(panelID=="panelDiva")
		{
			document.getElementById(panelID).style.left = x - 35 +"px";
			document.getElementById(panelID).style.top = y+18 +"px";	
		}
		else if(panelID=="OPNpanelDiv")
		{
			document.getElementById(panelID).style.left = x - (navigator.appName!="Netscape" ? 340:365) +"px";
			document.getElementById(panelID).style.top = y + 12+"px";	
		}
		else if(panelID=="panelDivOTN")
		{
			document.getElementById(panelID).style.left = x - 195 +"px";
			document.getElementById(panelID).style.top = y+9 +"px";	
		}
	}

	if (navigator.appName != "Netscape") {
		var dropdown = document.getElementById("group");
	}
	
	var mvqPDiv = document.getElementById(panelID); 
	mvqPDiv.style.visibility = "visible";

}

function mvqMOu(panelID) {
	var mvqPDiv = document.getElementById(panelID); 
	mvqPDiv.style.visibility = "hidden";

	if (navigator.appName != "Netscape") {
		var dropdown = document.getElementById("group");
	}
}

