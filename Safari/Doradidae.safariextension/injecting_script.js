function $ (elem) {
    return document.getElementById(elem)
}
function addMenu () {
    if (!$('doradidae-menu')) {
        var menu = document.createElement('div');
        menu.id = 'doradidae-menu';
        menu.setAttribute('contentEditable','false');
        menu.innerHTML = '<a href="http://www.qq.com"><img src="'
                        + safari.extension.baseURI + 'icon-256.png" '
                        + 'style=\"top: 16px; left:'
                        + (window.innerWidth / 2 - 32) + 'px;'
                        + '\"></img></a>';
        document.body.appendChild(menu);
    }
}
function removeMenu (e) {
    document.body.removeChild($('doradidae-menu'));
    document.designMode = 'off';
    e.preventDefault();
}


function handleMessage(msg) {
    if (msg.name == 'cmClick' && msg.message == 'on') {
        document.designMode = 'on';
        addMenu();
        $('doradidae-menu').addEventListener('click', removeMenu, false)
    } else {
        alert('error')
    }
}

safari.self.addEventListener('message', handleMessage, false);
//safari.self.addEventListener("message", respondToMessage, false);
//safari.application.browserWindows[n].tabs[n].page.dispatchMessage(name, data)
//safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(msgName, data)