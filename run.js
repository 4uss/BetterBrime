(function betterBrime() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = chrome.extension.getURL('betterbrime.min.js');
    script.setAttribute('bb-name', 'ex-13-21-83');
    script.setAttribute('betterbrime-css', chrome.extension.getURL('betterbrime.css'));
    script.setAttribute('betterbrime-fonts', chrome.extension.getURL('assets/fonts/fontawesome-all.min.css'))
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    head.appendChild(script);
})()