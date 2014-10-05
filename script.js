$(document).ready(function() {
  var HN_BASE = 'http://shanedewael.com/Sociali/display.php?title=' + getTitle();
  
  var port = chrome.extension.connect({}),
    callbacks = [];
  
  port.onMessage.addListener(function(msg) {
    callbacks[msg.id](msg.text);
    delete callbacks[msg.id];
  });

  function doXHR(params, callback) {
    params.id = callbacks.push(callback) - 1;
    port.postMessage(params);
  }

      createPanel(HN_BASE);


  function toggleElement(elemName) {
    var element = $(elemName);
    if (element.style.display == 'none') {
      element.style.display = 'block';
      return;
    }
    element.style.display = 'none';
  }

  function createPanel(HNurl, title) {

    var tabTitle = title ? ('HN - ' + title) : title;

    var HNembed = $("<div />").attr({'id' : 'HNembed'});
    var HNsite = $("<iframe />").attr({'id' : 'HNsite', 'src' : 'about: blank'});
    var HNtab = $("<div>Sociali</div>").attr({'id' : 'HNtab'});

    var HNtitle = $('<span id="HNtitleNormal">Sociali</span><span id="HNtitleHover">Hide</span>');
    var HNheader = $("<div/>").attr({'id' : 'HNheader'});

    $(window).resize(fixIframeHeight);

    function fixIframeHeight() {
      HNembed.height($(window).height());
      HNsite.height(HNembed.height()-20);  
    }

    function togglePanel() {
      var openPanel = HNtab.is(":visible");

      var embedPosition = openPanel ? "0px" : "-700px";
      var tabPosition = openPanel ? "-25px" : "0px";

    var easing = "swing",
      tabAnimationTime = 50,
      embedAnimationTime = 100;

      if (openPanel) {
        fixIframeHeight();
        HNtab.animate({right: tabPosition}, tabAnimationTime, easing, function() {
          HNtab.hide();
        });
    HNembed.show();
    HNembed.animate({right: embedPosition}, embedAnimationTime,easing);
      } else {
        HNembed.animate({right: embedPosition}, embedAnimationTime, easing, function() {
      HNembed.hide();
        });
    HNtab.show();
    HNtab.animate({right: tabPosition}, tabAnimationTime, easing);
      }
    }

    HNheader.click(togglePanel);
    HNtab.click(togglePanel);

    HNheader.append(HNtitle);

    HNembed.append(HNheader);
    HNembed.append(HNsite);
    HNembed.hide();

    $('body').append(HNtab);
    $('body').append(HNembed);

    doXHR({'action': 'get', 'url': HNurl}, function(response) {
      var doc = HNsite.get(0).contentDocument;
      response = response.replace(/<head>/, '<head><base target="_blank" href="'+HN_BASE+'"/>');
      doc.open();
      doc.write(response);
      doc.close();
    });
  }
  
  
});
function getTitle() {


var articleTitle = document.getElementsByTagName('title')[0].innerHTML;            
//window.alert(articleTitle);

//splits the title into individual words
var subTitle = articleTitle.split(" ");

//undesired words
var uselessWords = ["a", "an", "the", "to", "too", "also", "of", "but", "so" ];

//removes undesired words
for(i = 0; i < subTitle.length; i++)
{
  //weeds out duplicates
  for(k = 0; k < subTitle.length; k++)
  {
    if(subTitle[i] == subTitle[k] && i != k)
    {
      subTitle[i] = " ";
    }
  }
  
  if(subTitle[i] != " ")
  {
    for(k = 0; k < uselessWords.length; k++)
    {
      if(subTitle[i] == uselessWords[k])
      {
        subTitle[i] = " ";
      }
    }
  }
}




var filteredTitle = new Array();

for(i = 0; i < subTitle.length; i++)
{
  if(subTitle[i] != " ")
  {
    filteredTitle.push(subTitle[i]);
  }
}


var trueTitle = " ";

for(i = 0; i < filteredTitle.length; i++)
{
  trueTitle = trueTitle.concat(filteredTitle[i]);
  trueTitle = trueTitle.concat(" ");
}
return trueTitle;



}