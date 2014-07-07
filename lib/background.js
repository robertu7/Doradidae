var messages_before = chrome.i18n.getMessage("menuTitle_before");


chrome.contextMenus.create({
  "id" : "menu",
  "type" : "normal",
  "title" : messages_before,
  "contexts" : ["all"]
});


function toContent_Script (info,tab) {
  chrome.tabs.query({active: true,currentWindow:true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id,'on');
  });
}

var id = 1;
function screenShot(){
	chrome.tabs.captureVisibleTab(null, function(imgdata) {
	  var imgsrc = imgdata,
	  	  viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++);

	  chrome.tabs.create({url: viewTabUrl}, function(tab){

		var views = chrome.extension.getViews();
		
		for (var i = 0; i < views.length; i++) {
			var view = views[i];
			console.log('view : ' + view);
			if (view.location.href == viewTabUrl) {
				view.setScreenshotUrl(imgsrc)
				break;
			}
		}
	  })
	});
}

chrome.contextMenus.onClicked.addListener(toContent_Script);
chrome.runtime.onMessage.addListener(function (m) {
	if (m == 'shot') {
		screenShot()
	}
})