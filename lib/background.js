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

//v0.2.2 : 新增截取可视部分页面
var id = 1;
function screenShot(){
  chrome.tabs.captureVisibleTab(null, function(img) {
    var screenshotUrl = img;
    var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)

    chrome.tabs.create({url: viewTabUrl}, function(tab) {
      var targetId = tab.id;

      var addSnapshotImageToTab_Win = function(tabId, changedProps) {
        if (tabId != targetId || changedProps.status != "complete"){
          return;
        }
        chrome.tabs.onUpdated.removeListener(addSnapshotImageToTab_Win);

        var views = chrome.extension.getViews();
        for (var i = 0; i < views.length; i++) {
          var view = views[i];
          if (view.location.href == viewTabUrl) {
            view.setScreenshotUrl(screenshotUrl);
            break;
          }
        }
      };

      var addSnapshotImageToTab_Mac = function(){
        var views = chrome.extension.getViews();
        for (var i = 0; i < views.length; i++) {
          var view = views[i];
          if (view.location.href == viewTabUrl) {
            view.setScreenshotUrl(screenshotUrl);
            break;
          }
        }        
      }
      
      //v0.2.3 : 修复 OS X 上截屏问题 
      if (/Mac/.test(navigator.userAgent)) {
        addSnapshotImageToTab_Mac();
      } else {
        chrome.tabs.onUpdated.addListener(addSnapshotImageToTab_Win);
      }

    });
  });

}

chrome.contextMenus.onClicked.addListener(toContent_Script);
chrome.runtime.onMessage.addListener(function (m) {
	if (m == 'shot') {
		screenShot()
	}
})