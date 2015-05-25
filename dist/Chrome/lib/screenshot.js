function setScreenshotUrl(url) {
	document.getElementById('screenshot').src = url;
}
(function (){
    var sound = new Audio('./sound/iPhone_Camera_Click.ogg');
    sound.play()
})()