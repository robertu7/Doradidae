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
  })
}



chrome.contextMenus.onClicked.addListener(toContent_Script);
