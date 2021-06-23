//Thats messy asf
async function initBetterBrime() {

if (!localStorage.BBcDesign) {
    localStorage.BBcDesign = 'true'
};
if (!localStorage.BBrBackground) {
    localStorage.BBrBackground = 'true'
};
if (!localStorage.BBlChat) {
    localStorage.BBlChat = 'false'
};
if (!localStorage.BBdeletedM) {
    localStorage.BBdeletedM = 'false'
};
if (!localStorage.BBTimestamps) {
    localStorage.BBTimestamps = 'false'
};
if (!localStorage.BBLightMode) {
    localStorage.BBLightMode = 'false'
};
const site = document.querySelector('#cb-container')
var statusBB = false
var userData;
var currentUrl = window.location.href;
var splitcurrentUrl = currentUrl.split('/');

setInterval(() => {
    if (site) {
        if (!statusBB || !site.hasAttribute('betterbrime-loaded')) {
            logging('core', ' Welcome in BetterBrime ' + chrome.runtime.getManifest().version);
            statusBB = true
            if (document.querySelector('p[class="user-name font-weight-bolder mb-0"]')) {
                userData = document.querySelector('p[class="user-name font-weight-bolder mb-0"]').innerText;
            }
            betterBrime();
            site.setAttribute('betterbrime-loaded', '1')
        }
    } else {
        logging('core', "Site not fully loaded.")
        statusBB = false
    }
}, 1000)

function betterBrime() {
    let maked = false
    let makedE = false
    let playerexist = false
    let emotesList = ['EZ'];
    let badgeList = ['xanax']
    let channelList = ['EZ'];

    //BetterBrime Data
    //BetterBrime Data
    //BetterBrime Data
    fetch('https://api.4uss.cyou/betterBrime/v1/brime/global/emotes.php')
        .then(response => response.json())
        .then(data => emotesList = data)
        .then(logging('chat.emotes', ' Loaded data about emojis..'));
    fetch('https://api.4uss.cyou/betterBrime/v1/brime/badges.php')
        .then(response => response.json())
        .then(data => badgeList = data)
        .then(logging('chat.badges', ' Loaded data about badges..'));
    fetch(`https://api.4uss.cyou/betterBrime/v1/user/channel?nickname=${splitcurrentUrl[3]}`)
        .then(response => response.json())
        .then(function(data) {
            if(data.emotes === 'null' || data.emotes === null || data.emotes === ''){
                channelList = data.emotes
            }else{
                channelList = data.emotes.replace(/&quot;/g,'"')
            }
        })
        .then(logging('chat.emotes', ' Loaded channel emotes'));

    //Functions
    //Functions
    //Functions
    emotesStyle();

    if (localStorage.BBcDesign === 'true') {
        document.body.classList.add("BetterBrime-Design");
        logging('site.design', ' Custom design enabled.')
    }
    if (localStorage.BBLightMode === 'true') {
        document.body.classList.add("BetterBrime-Light");
    }

    var style = document.createElement("script")
    style.setAttribute("src", "https://kit.fontawesome.com/35df7a3773.js")
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    head.appendChild(style);

    function emotesStyle() {
        var style = document.createElement("link")
        style.setAttribute("rel", "stylesheet")
        style.setAttribute("type", "text/css")
        style.setAttribute("href", chrome.extension.getURL('brimelive.css?v=' + chrome.runtime.getManifest().version))
        var head = document.getElementsByTagName('head')[0];
        if (!head) return;
        head.appendChild(style);
        logging('chat.design', ' Loaded emotes design.')
    }
    if (localStorage.BBlChat === 'true') {
        var css = document.createElement('style');
        css.type = 'text/css';

        css.appendChild(document.createTextNode(`
        li.chatLine:nth-child(odd) {
            background-color: var(--bg-chat-2);
        }
        .chatLine {
            background-color: var(--bg-chat);
        }`));

        document.getElementsByTagName("head")[0].appendChild(css);
    }
    setInterval(() => {
        const target = document.querySelector('#chat-thread')

        if (target) {
            if (!maked || !target.hasAttribute('data-maked-observer')) {
                makeObserver(target)
                autocomplete(document.getElementById("message"), emotesList);
                maked = true
                target.setAttribute('data-maked-observer', '1')
            }
        } else {
            //logging('core', "Can't find chat.")
            maked = false
        }
    }, 1000)

    setInterval(() => {
        const target = document.querySelector('.plyr__controls')

        if (target) {
            if (!playerexist || !target.hasAttribute('data-maked-observer')) {
                playerexist = true
                target.setAttribute('data-maked-observer', '1')

                let refresh = document.createElement("button");
                refresh.classList = 'plyr__controls__item plyr__control';
                refresh.type = 'button';
                refresh.innerHTML = `<i class="fas fa-redo"></i>`;
                refresh.addEventListener("click", function(e) {
                        document.getElementById('stream-video').src = document.getElementById('stream-video').src;
                        setTimeout(() => {
                            console.clear()
                            logging('core', 'Console cleared.')
                        }, 1000);
                });
                document.querySelector('#player .plyr .plyr__controls').appendChild(refresh);
                document.querySelector('#player .plyr .plyr__controls').insertBefore(refresh, document.querySelector('#player .plyr .plyr__controls').childNodes[6]);
            }
        } else {
            //logging('core', "Can't find chat.")
            playerexist = false
        }
    }, 1000)

    function makeObserver(target) {
        logging('core', ' Started observing chat.')
        const config = {
            childList: true
        }

        document.querySelector('.emoji-picker-trigger').addEventListener("click", function(e) {
            if(!document.getElementById('4ussEmotes-list')){
                var element = document.createElement("h2");
                element.className = 'emoji-picker__category-name';
                element.appendChild(document.createTextNode('BetterBrime Global'));
                document.querySelector('.emoji-picker__emojis').appendChild(element);
                //
                var element = document.createElement("div");
                element.className = 'emoji-picker__container';
                element.id = '4ussEmotes-list';
                document.querySelector('.emoji-picker__emojis').appendChild(element);

                emotesList.map((item, i) => addToEmotes(item, '4ussEmotes-list'));

                makedE = true
                logging('recover', ' Generated emoji picker.')
            }
            if(channelList != 'false'){
                if(!document.getElementById('betterEmotes-list')){
                    var element = document.createElement("h2");
                    element.className = 'emoji-picker__category-name';
                    element.appendChild(document.createTextNode('Channel Emotes'));
                    document.querySelector('.emoji-picker__emojis').appendChild(element);
                    //
                    var element = document.createElement("div");
                    element.className = 'emoji-picker__container';
                    element.id = 'betterEmotes-list';
                    document.querySelector('.emoji-picker__emojis').appendChild(element);
    
                    JSON.parse(channelList).map((item, i) => addToEmotes(item, 'betterEmotes-list'));
                }
            }
        });
        let observer2 = null
        const callback2 = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //console.log('childList 2')
                    mutation.addedNodes.forEach(node => {
                        Array.from(node.querySelectorAll('span[style="font-size: 13px;"] a')).forEach(img => {
                            console.log(img.innerHTML)
                            img.innerHTML = img.innerHTML.replace(/(https?:\/\/[^\s]+)/g, function(url) {
                                `<div class="emoteInfo">
                                    ${url}
                                    <span class="tooltiptext p-1" style="text-align:center;">
                                        <img src="${url}"/><br/>
                                        <br/><small style="color:#d2ffa8;">Image Preview</small>
                                    </span>
                                </div> `;
                            })
                        })
                        Array.from(node.querySelectorAll("span[style='font-size: 13px;']")).forEach(img => {
                            for (var i = 0; i < emotesList.length; i++) {
                                var imgurID = emotesList[i].split('#');
                                img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` 
                                <div class="emoteInfo">
                                    <img alt="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">
                                    <span class="tooltiptext p-1" style="text-align:center;">
                                        <img src="https://i.imgur.com/${imgurID[1]}.png"/><br/>
                                        <h4>${imgurID[0]}</h4>
                                        <img src="${chrome.extension.getURL('/assets/icons/32.png?v=' + chrome.runtime.getManifest().version)}">
                                        <br/><small style="color:#d2ffa8;">Global</small>
                                    </span>
                                </div> `);
                            }
                            if(channelList != 'false'){
                                for (var i = 0; i < channelList.length; i++) {
                                    var imgurID = channelList[i].split('#');
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` 
                                    <div class="emoteInfo">
                                        <img alt="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">
                                        <span class="tooltiptext p-1" style="text-align:center;">
                                            <img src="https://i.imgur.com/${imgurID[1]}.png"/><br/>
                                            <h4>${imgurID[0]}</h4>
                                            <img src="${chrome.extension.getURL('/assets/icons/32.png?v=' + chrome.runtime.getManifest().version)}">
                                            <br/><small style="color:#d2ffa8;">Channel</small>
                                        </span>
                                    </div> `);
                                }
                            }
                            if (img.innerHTML.includes(userData) && localStorage.BBrBackground === 'true') {
                                for (var i = 0; i < 1; i++) {
                                    img.style.backgroundColor = "rgba(255,0,0,.3)";
                                    img.style.borderRadius = "3px";
                                    img.innerHTML = img.innerHTML.replace(new RegExp(userData + '( |$)', 'g'), `<a href="https://beta.brimelive.com/${userData}" target="_blank" style="color: #fff;font-weight:bold">${userData}</a> `);
                                }
                            }
                        })
                        Array.from(node.querySelectorAll("a[style='font-size: 13px; color: inherit;']")).forEach(img => {
                            for (var i = 0; i < badgeList.length; i++) {
                                var imgurID = badgeList[i].split('#');
                                if(imgurID[1] === ''){
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), `<strong style="color:#${imgurID[2]}">${imgurID[0]}: </strong>`);
                                }else{
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` <img alt="${imgurID[1]}" class="chatBadge" style="height: 1.20em; vertical-align: middle;" src="https://static.4uss.cyou/project_4ussEmote/badges/${imgurID[1]}.png"> <strong style="color:#${imgurID[2]}">${imgurID[0]}: </strong>`);
                                }
                            }
                        })
                        Array.from(node.querySelectorAll('span[style="font-size: 13px;"] a')).forEach(img => {
                            console.log(img)
                        })
                        Array.from(node.querySelectorAll("span[style='margin-left: -3px;']")).forEach(img => {
                            if(document.querySelector('div[aria-label="Current time"]').innerText === '00:00') return;
                                if(localStorage.BBTimestamps === 'true' && splitcurrentUrl[4] !== 'chat'){
                                        img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<b class="timestamp">${document.querySelector('div[aria-label="Current time"]').innerText}</b> ${img.innerHTML}`);
                                }
                        })
                    })
                    if (localStorage.BBdeletedM === 'true') {
                    mutation.removedNodes.forEach(node => {
                        Array.from(node.querySelectorAll(`li span b`)).forEach(img => {
                            let btn = document.createElement("li");
                            btn.innerHTML = `<span style="color: #d2ffa8"> ${img.innerHTML} <br/><small style="color: #929292;font-weight: bold;">This is deleted message.</small></span>`;
                            btn.className = "chatLine";
                            btn.style.opacity = '0.6';
                            btn.style.backgroundColor = 'rgb(0 0 0)';
                            btn.style.marginBottom = '0';
                            btn.style.borderLeft = '5px solid white';
                            document.getElementById('chat-thread').appendChild(btn);
                        })
                        Array.from(node.querySelectorAll(`li span[style="font-size: 13px;"]`)).forEach(img => {
                            let btn = document.createElement("li");
                            btn.innerHTML = `<span style="font-size: 13px;"> <b style="cursor:pointer">Click to show</b></span>`;
                            btn.className = "chatLine";
                            btn.style.opacity = '0.6';
                            btn.style.backgroundColor = 'rgb(0 0 0)';
                            btn.style.borderLeft = '5px solid white';
                            btn.onclick = function() {
                                this.innerHTML = `<span style="font-size: 13px;">${img.innerHTML}</span>`;
                            };
                            document.getElementById('chat-thread').appendChild(btn);
                        })
                    })
                }
                }
            }
        };
        observer2 = new MutationObserver(callback2)

        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //console.log('childList 1')
                    mutation.addedNodes.forEach(node => {
                        Array.from(node.querySelectorAll('span[style="font-size: 13px;"] a')).forEach(img => {
                            if(img.href.endsWith('.jpg') === true || img.href.endsWith('.png') === true || img.href.endsWith('.gif') === true || img.href.endsWith('.svg') === true || img.href.endsWith('.jpeg') === true){
                                img.innerHTML = img.href.replace(new RegExp('^(https?:\\/\\/)?'+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+'(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i'),
                                    `<div class="emoteInfo">
                                        ${img.href}
                                        <span class="tooltiptext p-1" style="text-align:center;left: 0;">
                                            <img src="${img.href}" class="img-fluid"/><br/>
                                            <br/><small style="color:#d2ffa8;">Image Preview</small>
                                        </span>
                                    </div> `);
                            }
                        })
                        Array.from(node.querySelectorAll("span[style='font-size: 13px;']")).forEach(img => {
                            for (var i = 0; i < emotesList.length; i++) {
                                var imgurID = emotesList[i].split('#');
                                img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` 
                                <div class="emoteInfo">
                                    <img alt="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">

                                    <span class="tooltiptext p-1" style="text-align:center;">
                                        <img src="https://i.imgur.com/${imgurID[1]}.png"/><br/>
                                        <h4>${imgurID[0]}</h4>
                                        <img src="${chrome.extension.getURL('/assets/icons/32.png?v=' + chrome.runtime.getManifest().version)}">
                                        <br/><small style="color:#d2ffa8;">Global</small>
                                    </span>
                                </div> `);
                            }
                            if(channelList != 'false'){
                                var eeJson = JSON.parse(channelList);
                                for (var i = 0; i < eeJson.length; i++) {
                                    var imgurID = eeJson[i].split('#');
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` 
                                    <div class="emoteInfo">
                                        <img alt="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">
                                        <span class="tooltiptext p-1" style="text-align:center;">
                                            <img src="https://i.imgur.com/${imgurID[1]}.png"/><br/>
                                            <h4>${imgurID[0]}</h4>
                                            <img src="${chrome.extension.getURL('/assets/icons/32.png?v=' + chrome.runtime.getManifest().version)}">
                                            <br/><small style="color:#d2ffa8;">Channel</small>
                                        </span>
                                    </div> `);
                                }
                            }
                            if (img.innerHTML.includes(userData) && localStorage.BBrBackground === 'true') {
                                for (var i = 0; i < 1; i++) {
                                    createHightlight(img.innerText)
                                    img.style.backgroundColor = "rgba(255,0,0,.3)";
                                    img.style.borderRadius = "3px";
                                    img.innerHTML = img.innerHTML.replace(new RegExp(userData + '( |$)', 'g'), `<a href="https://beta.brimelive.com/${userData}" target="_blank" style="color: #fff;font-weight:bold">${userData}</a> `);
                                }
                            }
                        })
                        Array.from(node.querySelectorAll("a[style='font-size: 13px; color: inherit;']")).forEach(img => {
                            for (var i = 0; i < badgeList.length; i++) {
                                var imgurID = badgeList[i].split('#');
                                if(imgurID[1] === ''){
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), `<strong style="color:#${imgurID[2]}">${imgurID[0]}: </strong>`);
                                }else{
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` <img alt="${imgurID[1]}" class="chatBadge" style="height: 1.20em; vertical-align: middle;" src="https://static.4uss.cyou/project_4ussEmote/badges/${imgurID[1]}.png"> <strong style="color:#${imgurID[2]}">${imgurID[0]}: </strong>`);
                                }
                            }
                        })
                        Array.from(node.querySelectorAll("span[style='margin-left: -3px;']")).forEach(img => {
                            if(document.querySelector('div[aria-label="Current time"]').innerText === '00:00') return;

                                if(localStorage.BBTimestamps === 'true' && splitcurrentUrl[4] !== 'chat'){
                                        img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<b class="timestamp">${document.querySelector('div[aria-label="Current time"]').innerText}</b> ${img.innerHTML}`);
                                }
                        })
                    })
                    if (localStorage.BBdeletedM === 'true') {
                    mutation.removedNodes.forEach(node => {
                        Array.from(node.querySelectorAll(`li span b`)).forEach(img => {
                            let btn = document.createElement("li");
                            btn.innerHTML = `<span style="color: #d2ffa8"> ${img.innerHTML} <br/><small style="color: #929292;font-weight: bold;">This is deleted message.</small></span>`;
                            btn.className = "chatLine";
                            btn.style.opacity = '0.6';
                            btn.style.backgroundColor = 'rgb(0 0 0)';
                            btn.style.marginBottom = '0';
                            btn.style.borderLeft = '5px solid white';
                            document.getElementById('chat-thread').appendChild(btn);
                        })
                        Array.from(node.querySelectorAll(`li span[style="font-size: 13px;"]`)).forEach(img => {
                            let btn = document.createElement("li");
                            btn.innerHTML = `<span style="font-size: 13px;"> <b style="cursor:pointer">Click to show</b></span>`;
                            btn.className = "chatLine";
                            btn.style.opacity = '0.6';
                            btn.style.backgroundColor = 'rgb(0 0 0)';
                            btn.style.borderLeft = '5px solid white';
                            btn.onclick = function() {
                                this.innerHTML = `<span style="font-size: 13px;">${img.innerHTML}</span>`;
                            };
                            document.getElementById('chat-thread').appendChild(btn);
                        })
                    })
                }
                }
            }
        }
        const observer = new MutationObserver(callback)
        observer.observe(target, config)
    }
    setInterval(() => {
        const target = document.querySelector('.emoji-picker__emoji');
        if (target) {
            if (!makedE) {

                if(channelList != 'false'){

                    var element = document.createElement("h2");
                    element.className = 'emoji-picker__category-name';
                    element.appendChild(document.createTextNode('Channel Emotes'));
                    document.querySelector('.emoji-picker__emojis').appendChild(element);
                    //
                    var element = document.createElement("div");
                    element.className = 'emoji-picker__container';
                    element.id = 'betterEmotes-list';
                    document.querySelector('.emoji-picker__emojis').appendChild(element);
    
                    JSON.parse(channelList).map((item, i) => addToEmotes(item, 'betterEmotes-list'));
                }

                var element = document.createElement("h2");
                element.className = 'emoji-picker__category-name';
                element.appendChild(document.createTextNode('BetterBrime Global'));
                document.querySelector('.emoji-picker__emojis').appendChild(element);
                //
                var element = document.createElement("div");
                element.className = 'emoji-picker__container';
                element.id = '4ussEmotes-list';
                document.querySelector('.emoji-picker__emojis').appendChild(element);

                emotesList.map((item, i) => addToEmotes(item, '4ussEmotes-list'));

                makedE = true
                logging('site.emotepicker', ' Generated emoji picker.')

                
                let btn = document.createElement("div");
                btn.setAttribute("id", "bb-pin-container");
                document.querySelector('.chat__column').appendChild(btn);
                document.querySelector('.chat__column').insertBefore(btn, document.querySelector('.chat__column').childNodes[0]);
                logging('chat.highlight', ' Enabled.')

                if(localStorage.BBcDesign === 'true'){
                    document.querySelector('.emoji-picker').style.backgroundColor = 'var(--bg-darked)';
                    document.querySelector('.emoji-picker').style.border = '0';
                    document.querySelector('.emoji-picker__search').style.backgroundColor = 'var(--bg-second-dark)';
                    document.querySelector('.emoji-picker__search').style.border = '0';
                    document.querySelector('.emoji-picker__search').style.color = '#7d8285';
                }


                let settingsBB = document.createElement("button");
                settingsBB.setAttribute("id", "bb-settings");
                settingsBB.className = 'btn btn-outline-primary';
                settingsBB.style.padding = '10px';
                settingsBB.innerHTML = `<img src="${chrome.extension.getURL('/assets/icons/16.png?v=' + chrome.runtime.getManifest().version)}" class="feather-more-horizontal">`;
                settingsBB.type = 'button';
                settingsBB.onclick = function() {
                    document.querySelector('#bb-settings-container').style.display = 'block';
                    document.querySelector('#app').style.filter = 'blur(8px)';
                };
                document.querySelector('.input-group-append').appendChild(settingsBB);
                //logging('chat.highlight', ' Settings.')
            }
        } else {
            logging('core', "Can't find default emote picker.")
            makedE = false
        }
    }, 1000)
    function addToEmotes(name, where) {
        var imgurID = name.split('#');
        let btn = document.createElement("button");
        btn.innerHTML = `<img class="emoji-picker__custom-emoji" src="https://i.imgur.com/${imgurID[1]}.png">`;
        btn.className = "emoji-picker__emoji";
        btn.title = imgurID[0];
        btn.style.opacity = "1";
        btn.onclick = function() {
            document.querySelector('#chat-form #message').value = `${document.querySelector('#chat-form #message').value}${imgurID[0]} `;
            document.querySelector('#chat-form #message').focus();
        };
        btn.onmouseover = function() {
            previewEmote(imgurID[1], imgurID[0])
        };
        btn.onmouseout = function() {
            previewClean()
        };
        document.getElementById(where).appendChild(btn);
    }

    function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            document.querySelector('#chat-form').appendChild(a);

            document.getElementById('chat-form').insertBefore(a, document.getElementById('chat-form').childNodes[0]);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length).split('#')[0] + "</strong>";
                    b.innerHTML += arr[i].substr(val.length).split('#')[0];
                    b.innerHTML += ` <img src='https://i.imgur.com/${arr[i].split('#')[1]}.png' />`;
                    b.innerHTML += "<input type='hidden' value='" + arr[i].split('#')[0] + "'>";
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        document.querySelector('#chat-thread').focus();
                        inp.value = this.getElementsByTagName("input")[0].value + ' ';
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function(e) {
            closeAllLists(e.target);
        });
        logging('chat', ' Autocomplete system enabled.')
    }
    var settingsBG = document.createElement("div");
    settingsBG.className = 'loader h-100 row text-center';
    settingsBG.innerHTML = `<div class="settings-row p-5" id="bb-settings-here"><h1>BetterBrime Settings</h1></div>`;
    settingsBG.style.display = 'none';
    settingsBG.setAttribute("id", "bb-settings-container");
    document.body.appendChild(settingsBG);
    newSettings('cDesign', 'Custom Design', 'fas fa-fill', 'normal')
    newSettings('rBackground', 'Highlight message', 'fas fa-quote-right', 'normal')
    newSettings('lChat', 'Chat lines', 'fas fa-grip-lines', 'normal')
    newSettings('deletedM', 'Deleted Messages', 'far fa-trash-alt', 'normal')
    newSettings('Timestamps', 'Timestamps', 'far fa-clock', 'normal')
    newSettings('LightMode', 'Light Mode', 'fas fa-paint-roller', 'normal')
    newSettings('upload', 'Upload emote', 'fas fa-cloud', 'url', 'https://brime.4uss.cyou/upload')
    connectBetterBrime()
    var closeSettings = document.createElement("button");
    closeSettings.className = 'btn btn-outline-primary mt-2';
    closeSettings.innerText = `Close`;
    closeSettings.onclick = function() {
        document.querySelector('#bb-settings-container').style.display = 'none';
        document.querySelector('#app').style.filter = 'none';
    };
    document.getElementById('bb-settings-here').appendChild(closeSettings);

    function newSettings(id, name, fa, type, url) {
        let btn = document.createElement("span");
        if(type === 'url'){
            btn.innerHTML = `<a class="d-flex align-items-center" href="${url}" target="_blank"><i class="${fa} theme-color mr-1"></i> <b>${name}</b></a>`;
        }else{
            if (localStorage.getItem(`BB${id}`) === 'true') {
                btn.innerHTML = `<p class="d-flex align-items-center"><i class="${fa} theme-color mr-1"></i> <b>${name}</b>&nbsp;<input id="${id}" type="checkbox" name="${id}" checked> </p>`;
            } else {
                btn.innerHTML = `<p class="d-flex align-items-center"><i class="${fa} theme-color mr-1"></i> <b>${name}</b>&nbsp;<input id="${id}" type="checkbox" name="${id}"> </p>`;
            }
            btn.addEventListener("click", function(e) {
                if (localStorage.getItem(`BB${id}`) === 'true') {
                    localStorage.setItem(`BB${id}`, 'false');
                    document.getElementById(id).checked = false;
                } else {
                    localStorage.setItem(`BB${id}`, 'true');
                    document.getElementById(id).checked = true;
                }
            });
        }
        document.querySelector('#bb-settings-here').appendChild(btn);
    }

    //Temporary
    function connectBetterBrime(){
        let btn = document.createElement("span");
            btn.innerHTML = `<br/><button class="btn btn-outline-warning"><i class="fas fa-link theme-color mr-1"></i> <b>Link Brime with BetterBrime</b></button><br/>`;
            btn.addEventListener("click", function(e) {
                window.open(`https://brime.4uss.cyou/auth#${userData}#${localStorage.accessToken}`, '_blank');
            });
        btn.className = "nav-item";
        document.querySelector('#bb-settings-here').appendChild(btn);
    }
    function createHightlight(msg) {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        const tempid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let btn = document.createElement("div");
        btn.innerHTML = `
        <span class="time">${time}</span>
        <span class="message">${msg}</span>`;
        btn.setAttribute("id", "bb-pinned-highlight");
        btn.addEventListener("click", function(e) {
            this.remove()
        });
        document.querySelector('#bb-pin-container').appendChild(btn);
    }
    function previewEmote(img, name){
        let btn = document.createElement("img");
        btn.src = `https://i.imgur.com/${img}.png`;
        btn.classList = 'emoji-picker__custom-emoji'
        let btn2 = document.createElement("div");
        btn2.innerText = name;
        document.querySelector('.emoji-picker__preview-emoji').appendChild(btn)
        document.querySelector('.emoji-picker__preview-name').appendChild(btn2)
    }
    function previewClean(){
        document.querySelector('.emoji-picker__preview-emoji').innerHTML = '';
        document.querySelector('.emoji-picker__preview-name').innerHTML = '';
    }
}

function logging(w, m) {
    console.log(`%cBetterBrime [%c${w}%c]:%c ${m}`, 'color:#d2ffa8; font-weight:bold', '', 'color:#d2ffa8; font-weight:bold', '')
}
}
initBetterBrime();