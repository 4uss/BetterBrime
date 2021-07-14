/*!
 * BetterBrime
 * https://betterbri.me/
 *
 */
if (!localStorage.BBcDesign) {localStorage.BBcDesign = 'true'};
if (!localStorage.BBrBackground) {localStorage.BBrBackground = 'true'};
if (!localStorage.BBlChat) {localStorage.BBlChat = 'false'};
if (!localStorage.BBdeletedM) {localStorage.BBdeletedM = 'false'};
if (!localStorage.BBTimestamps) {localStorage.BBTimestamps = 'false'};
if (!localStorage.BBLightMode) {localStorage.BBLightMode = 'false'};
if (!localStorage.BBFullScreen) {localStorage.BBFullScreen = 'false'};
if (!localStorage.BBTimestampstype) {localStorage.BBTimestampstype = 'vod'};
if (!localStorage.fullScreenPlusJSon) {localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": "70", "backgroundColor": "#18181b", "fontSize": "13"})};
if (!localStorage.getItem(`BBFullScreen-size`)) {
    let tmpobj = {w: 357,h: 518};
    localStorage.setItem(`BBFullScreen-size`, JSON.stringify(tmpobj));
}
if (!localStorage.getItem(`BBFullScreen-location`)) {
    let tmpobj = {x: 0,y: 0};
    localStorage.setItem(`BBFullScreen-location`, JSON.stringify(tmpobj));
}

const site = document.querySelector('#cb-container')
var statusBB = false
var userData;
var currentUrl = window.location.href;
var splitcurrentUrl = currentUrl.split('/');

setInterval(() => {
    if (site) {
        if (!statusBB || !site.hasAttribute('betterbrime-loaded')) {
            logging('core', 'Welcome in BetterBrime ' + chrome.runtime.getManifest().version);
            statusBB = true
            if (document.querySelector('p[class="user-name font-weight-bolder mb-0"]')) {
                userData = document.querySelector('p[class="user-name font-weight-bolder mb-0"]').innerText;
            }
            betterBrime();
            site.setAttribute('betterbrime-loaded', '1')
        }
    } else {
        logging('core', "Can't load extension.")
        statusBB = false
    }
}, 1000)

function betterBrime() {

    let chatExist = false;
    let emojiExist = false;
    let playerexist = false;
    let emotesList;
    let badgeList;
    let channelList;
    const loadofexTime = gimmeTime();

/*--------------------------------------------------------------------------------------------
                                    BetterBrime Icons
---------------------------------------------------------------------------------------------*/
    var style = document.createElement("link")
    style.setAttribute("rel", "stylesheet")
    style.setAttribute("type", "text/css")
    style.setAttribute("href", chrome.extension.getURL('assets/fonts/fontawesome-all.min.css?v=' + chrome.runtime.getManifest().version))
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    head.appendChild(style);
/*--------------------------------------------------------------------------------------------
                                    BetterBrime CSS
---------------------------------------------------------------------------------------------*/
//init
cssBetterBrime();

    function cssBetterBrime() {
        var style = document.createElement("link")
        style.setAttribute("rel", "stylesheet")
        style.setAttribute("type", "text/css")
        style.setAttribute("href", chrome.extension.getURL('brimelive.css?v=' + chrome.runtime.getManifest().version))
        var head = document.getElementsByTagName('head')[0];
        if (!head) return;
        head.appendChild(style);
        logging('site.css', 'Loaded custom BetterBrime css.')
    }
/*--------------------------------------------------------------------------------------------
                            BetterBrime FullScreen Settings CSS
---------------------------------------------------------------------------------------------*/
if ( window !== window.parent && localStorage.BBFullScreen === 'true') 
			{
				var css2 = document.createElement('style');
				css2.type = 'text/css';
				css2.appendChild(document.createTextNode(`
				.column.chat__column, .bb-fullscreen-box{
					background: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}!important;
					background-color: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}!important;
				}
				.chatLine * {
					font-size: ${JSON.parse(localStorage.fullScreenPlusJSon).fontSize}px!important;
				}
				.bb-fullscreen-box{
					opacity: .${JSON.parse(localStorage.fullScreenPlusJSon).opacity}!important;
				}`));
				var head2 = document.getElementsByTagName("head")[0]
				if (!head2) return;
				head2.appendChild(css2);
			}else{
				var css2 = document.createElement('style');
				css2.type = 'text/css';
				css2.appendChild(document.createTextNode(`
				.bb-fullscreen-box{
					background: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}!important;
					background-color: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}!important;
				}
				.bb-fullscreen-box{
					opacity: .${JSON.parse(localStorage.fullScreenPlusJSon).opacity}!important;
				}`));
				var head2 = document.getElementsByTagName("head")[0]
				if (!head2) return;
				head2.appendChild(css2);
			}

/*--------------------------------------------------------------------------------------------
                                    BetterBrime Data
---------------------------------------------------------------------------------------------*/
    fetch('https://api.betterbri.me/v2/brime/global/emotes')
        .then(response => response.json())
        .then(data => emotesList = data)
        .then(logging('chat.emotes', 'Loaded emote set: Global Emotes'));
    fetch('https://api.betterbri.me/v2/brime/badges')
        .then(response => response.json())
        .then(data => badgeList = data)
        .then(logging('chat.badges', 'Loaded badges and assigned them to users.'));
    fetch(`https://api.betterbri.me/v2/user/channel?nickname=${splitcurrentUrl[3].toLowerCase()}`)
        .then(response => response.json())
        .then(function(data) {
            if(data.emotes === 'null' || data.emotes === null || data.emotes === ''){
                channelList = data.emotes
            }else{
                channelList = data.emotes.replace(/&quot;/g,'"')
            }
        })
        .then(logging('chat.emotes', 'Loaded emote set: Channel: '+splitcurrentUrl[3]));
/*--------------------------------------------------------------------------------------------
                                    BetterBrime Design
---------------------------------------------------------------------------------------------*/
    if (localStorage.BBcDesign === 'true') {
        document.body.classList.add("BetterBrime-Design");
        logging('site.design', 'Loaded custom BetterBrime-dark design.')
    }
    if (localStorage.BBLightMode === 'true') {
        document.body.classList.add("BetterBrime-Light");
        logging('site.design', 'Loaded custom BetterBrime-light design.')
    }

    //Chat-lines
    if (localStorage.BBlChat === 'true') {
        var css = document.createElement('style');
        css.type = 'text/css';

        css.appendChild(document.createTextNode(`
        li.chatLine:nth-child(odd) {
            background-color: #101013;
            border-radius: 7px;
        }
        .chatLine {
            border-radius: 7px;
            background-color: #080809;
        }
        .BetterBrime-Light li.chatLine:nth-child(odd) {
            background-color: #c7c7c7;
            border-radius: 7px;
        }
        .BetterBrime-Light .chatLine {
            border-radius: 7px;
            background-color: #dadada;
        }`));

        document.getElementsByTagName("head")[0].appendChild(css);
    }
/*--------------------------------------------------------------------------------------------
                                    BetterBrime Intervals
---------------------------------------------------------------------------------------------*/
    //Chat Observe
    setInterval(() => {
        const target = document.querySelector('#chat-thread')

        if (target) {
            if (!chatExist || !target.hasAttribute('data-maked-observer')) {
                makeObserver(target)
                chatExist = true
                target.setAttribute('data-maked-observer', '1')
            }
        } else {
            logging('chat', "Could not find chat element.")
            chatExist = false
        }
    }, 1000)
    //Player
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
				if(splitcurrentUrl[3] === 'clips'){

				}else{
					document.querySelector('#player .plyr .plyr__controls').appendChild(refresh);
					document.querySelector('#player .plyr .plyr__controls').insertBefore(refresh, document.querySelector('#player .plyr .plyr__controls').childNodes[6]);
				}

				if(localStorage.BBFullScreen === 'true'){
					betterFullScreenPlus()
				}

                document.querySelector('button[data-plyr="fullscreen"]').addEventListener("click", function(e) {
                    if(localStorage.BBFullScreen === 'true'){

						if(document.querySelector('#bb-fullscreen-plus-iframe iframe').src === `https://beta.brimelive.com/${splitcurrentUrl[3]}/chat`){
							
						}else{
							document.querySelector('#bb-fullscreen-plus-iframe iframe').src = `https://beta.brimelive.com/${splitcurrentUrl[3]}/chat`;
						}

                        if(document.fullscreenElement === null){
                            document.getElementById('bb-fullscreen-plus-iframe').style.display = 'block';
                        }else{
                            document.getElementById('bb-fullscreen-plus-iframe').style.display = 'none';
                        }
                    }
                });
                document.body.addEventListener("keydown", function(e) {
                    if (e.keyCode === 27) {
                        if(document.fullscreenElement === null){
                            document.getElementById('bb-fullscreen-plus-iframe').style.display = 'none';
                        }else{
                            document.getElementById('bb-fullscreen-plus-iframe').style.display = 'none';
                        }
                    }
                });
            }
        } else {
            playerexist = false
        }
    }, 1000)
    //Emoji
    setInterval(() => {
        const target = document.querySelector('.emoji-picker__wrapper');
        if (target) {
            if (!emojiExist) {

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
    
                    JSON.parse(channelList).map((item, i) => addToEmotes(item, 'betterEmotes-list', 'channel'));
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

                emotesList.map((item, i) => addToEmotes(item, '4ussEmotes-list', 'global'));

                emojiExist = true
                logging('chat.emotepicker', 'Generated emoji picker.')

                
                let btn = document.createElement("div");
                btn.setAttribute("id", "bb-pin-container");
                document.querySelector('.chat__column').appendChild(btn);
                document.querySelector('.chat__column').insertBefore(btn, document.querySelector('.chat__column').childNodes[0]);

                if(localStorage.BBcDesign === 'true'){
                    document.querySelector('.emoji-picker').style.backgroundColor = 'var(--bg-darked)';
                    document.querySelector('.emoji-picker').style.border = '0';
                    document.querySelector('.emoji-picker__search').style.backgroundColor = 'var(--bg-second-dark)';
                    document.querySelector('.emoji-picker__search').style.border = '0';
                    document.querySelector('.emoji-picker__search').style.color = '#7d8285';
                }

				let settingsBB2 = document.createElement("button");
                settingsBB2.setAttribute("id", "bb-settings");
                settingsBB2.className = 'btn btn-outline-primary';
                settingsBB2.style.padding = '10px';
                settingsBB2.innerHTML = `<img src="${chrome.extension.getURL('/assets/icons/16-purple.png?v=' + chrome.runtime.getManifest().version)}" class="feather-more-horizontal">`;
                settingsBB2.type = 'button';
                settingsBB2.onclick = function() {
                    document.querySelector('#bb-settings-container').style.display = 'block';
                    document.querySelector('#app').style.filter = 'blur(8px)';
                };
                document.querySelector('.input-group-append').appendChild(settingsBB2);
            }
        } else {
            logging('core', "Can't find default emote picker.")
            emojiExist = false
        }
    }, 1000)
/*--------------------------------------------------------------------------------------------
                                    BetterBrime Observe
---------------------------------------------------------------------------------------------*/
    function makeObserver(target) {
        logging('core', 'Started observing chat.')
        const config = {
            childList: true
        }

		if(splitcurrentUrl[3] === 'videos'){
			return;
		}else{
        //Backups emotes picker
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

                emotesList.map((item, i) => addToEmotes(item, '4ussEmotes-list', 'global'));

                emojiExist = true
                logging('recover', 'Generated emoji picker.')
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
    
                    JSON.parse(channelList).map((item, i) => addToEmotes(item, 'betterEmotes-list', 'channel'));
                }
            }
        });
	}
        let observer2 = null
        const callback2 = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        Array.from(node.querySelectorAll('span[style="font-size: 13px;"] a')).forEach(img => {
                            img.innerHTML = img.innerHTML.replace(/(https?:\/\/[^\s]+)/g, function(url) {
                                `<div class="emoteInfo">
                                    ${url}
                                    <span class="tooltiptext p-1" style="text-align:center;">
                                        <img src="${url}"/><br/>
                                        <br/><small style="color:#0b67ff;">Image Preview</small>
                                    </span>
                                </div> `;
                            })
                        })
                        Array.from(node.querySelectorAll("span[style='font-size: 13px;']")).forEach(img => {
                            for (var i = 0; i < emotesList.length; i++) {
                                img.innerHTML = img.innerHTML.replace(new RegExp(emotesList[i].code + '( |$)', 'g'), ` 
                                <div class="emoteInfo">
                                    <img alt="${emotesList[i].code}" src="https://i.imgur.com/${emotesList[i].id}.png">
                                    <span class="tooltiptext p-1" style="text-align:center;">
                                        <img src="https://i.imgur.com/${emotesList[i].id}.png"/><br/>
                                        <h4>${emotesList[i].code}</h4>
                                        <img src="${chrome.extension.getURL('/assets/icons/16-blue.png')}">
                                        <small style="color:#0b67ff;">Global</small>
                                    </span>
                                </div> `);
                            }
                            if(channelList != 'false'){
                                dataEmote = JSON.parse(channelList)
                                for (var i = 0; i < dataEmote.length; i++) {
                                    img.innerHTML = img.innerHTML.replace(new RegExp(dataEmote[i].name + '( |$)', 'g'), ` 
                                    <div class="emoteInfo">
                                        <img alt="${dataEmote[i].name}" src="https://i.imgur.com/${dataEmote[i].imgur_id}.png">
                                        <span class="tooltiptext p-1" style="text-align:center;">
                                            <img src="https://i.imgur.com/${dataEmote[i].imgur_id}.png"/><br/>
                                            <h4>${dataEmote[i].name}</h4>
                                            <img src="${chrome.extension.getURL('/assets/icons/16-blue.png')}">
                                            <small style="color:#0b67ff;">Channel</small>
                                        </span>
                                    </div> `);
                                }
                            }
                            if (img.innerHTML.includes(userData) && localStorage.BBrBackground === 'true') {
                                for (var i = 0; i < 1; i++) {
                                    createHightlight(img.innerText)
                                }
                            }
                        })
                        Array.from(node.querySelectorAll("a[style='font-size: 13px; color: inherit;']")).forEach(img => {
                            for (var i = 0; i < badgeList.length; i++) {
                                if(badgeList[i].badge === ''){
                                    img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i].nickname + '( |$)', 'g'), `<strong style="color:#${badgeList[i].color}">${badgeList[i].nickname}: </strong>`);
                                }else{
                                    img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i].nickname + '( |$)', 'g'), ` <img alt="${badgeList[i].badge}" class="chatBadge" style="height: 1.20em; vertical-align: middle;" src="https://cdn.betterbri.me/badges/${badgeList[i].badge}.png"> <strong style="color:#${badgeList[i].color}">${badgeList[i].nickname}: </strong>`);
                                }
                            }
                        })
                        Array.from(node.querySelectorAll("span[style='margin-left: -3px;']")).forEach(img => {
                                if(localStorage.BBTimestamps === 'true' && splitcurrentUrl[4] !== 'chat'){
                                    if(localStorage.BBTimestampstype === 'vod'){
                                        if(document.querySelector('div[aria-label="Current time"]').innerText === '00:00') return;

                                        img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<strong class="timestamp">${document.querySelector('div[aria-label="Current time"]').innerText}</strong> ${img.innerHTML}`);
                                    }else if(localStorage.BBTimestampstype === 'local'){
                                        if(gimmeTime() === loadofexTime) return;
                                
                                        img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<strong class="timestamp">${gimmeTime()}</strong> ${img.innerHTML}`);
                                    }
                                }
                        })
                    })
                    if (localStorage.BBdeletedM === 'true') {
                    mutation.removedNodes.forEach(node => {
                        Array.from(node.querySelectorAll(`li span b`)).forEach(img => {
                            let btn = document.createElement("li");
                            if(localStorage.BBLightMode === 'true'){
                                btn.innerHTML = `<span style="color: #553bde"> ${img.innerHTML} <br/><small style="color: var(--font-color);font-weight: bold;">This is deleted message.</small></span>`;
                                btn.style.opacity = '0.6';
                                btn.style.backgroundColor = 'rgb(181 181 181)';
                                btn.style.marginBottom = '0';
                                btn.style.borderLeft = '5px solid red';
                            }else{
                                btn.innerHTML = `<span style="color: #553bde"> ${img.innerHTML} <br/><small style="color: #929292;font-weight: bold;">This is deleted message.</small></span>`;
                                btn.style.opacity = '0.6';
                                btn.style.backgroundColor = 'rgb(0 0 0)';
                                btn.style.marginBottom = '0';
                                btn.style.borderLeft = '5px solid white';
                            }
                            btn.className = "chatLine";
                            btn.style.borderRadius = "0px";
                            document.getElementById('chat-thread').appendChild(btn);
                        })
                        Array.from(node.querySelectorAll(`li span[style="font-size: 13px;"]`)).forEach(img => {
                            let btn = document.createElement("li");
                            if(localStorage.BBLightMode === 'true'){
                                btn.style.backgroundColor = 'rgb(181 181 181)';
                                btn.style.borderLeft = '5px solid red';
                            }else{
                                btn.style.backgroundColor = 'rgb(0 0 0)';
                                btn.style.borderLeft = '5px solid white';
                            }
                            btn.innerHTML = `<span style="font-size: 13px;"> <b style="cursor:pointer">Click to show</b></span>`;
                            btn.className = "chatLine";
                            btn.style.opacity = '0.6';
                            btn.style.borderRadius = "0px";
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
                    mutation.addedNodes.forEach(node => {
                        Array.from(node.querySelectorAll('span[style="font-size: 13px;"] a')).forEach(img => {
                            if(img.href.endsWith('.jpg') === true || img.href.endsWith('.png') === true || img.href.endsWith('.gif') === true || img.href.endsWith('.svg') === true || img.href.endsWith('.jpeg') === true){
                                img.innerHTML = img.href.replace(new RegExp('^(https?:\\/\\/)?'+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+'(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i'),
                                    `<div class="emoteInfo">
                                        ${img.href}
                                        <span class="tooltiptext p-1" style="text-align:center;left: 0;">
                                            <img src="${img.href}" class="img-fluid"/><br/>
                                            <br/><small style="color:#0b67ff;">Image Preview</small>
                                        </span>
                                    </div> `);
                            }
                        })
                        Array.from(node.querySelectorAll("span[style='font-size: 13px;']")).forEach(img => {
                            for (var i = 0; i < emotesList.length; i++) {
                                img.innerHTML = img.innerHTML.replace(new RegExp(emotesList[i].code + '( |$)', 'g'), ` 
                                <div class="emoteInfo">
                                    <img alt="${emotesList[i].code}" src="https://i.imgur.com/${emotesList[i].id}.png">
                                    <span class="tooltiptext p-1" style="text-align:center;">
                                        <img src="https://i.imgur.com/${emotesList[i].id}.png"/><br/>
                                        <h4>${emotesList[i].code}</h4>
                                        <img src="${chrome.extension.getURL('/assets/icons/16-blue.png')}">
                                        <small style="color:#0b67ff;">Global</small>
                                    </span>
                                </div> `);
                            }
                            if(channelList != 'false'){
                                dataEmote = JSON.parse(channelList)
                                for (var i = 0; i < dataEmote.length; i++) {
                                    img.innerHTML = img.innerHTML.replace(new RegExp(dataEmote[i].name + '( |$)', 'g'), ` 
                                    <div class="emoteInfo">
                                        <img alt="${dataEmote[i].name}" src="https://i.imgur.com/${dataEmote[i].imgur_id}.png">
                                        <span class="tooltiptext p-1" style="text-align:center;">
                                            <img src="https://i.imgur.com/${dataEmote[i].imgur_id}.png"/><br/>
                                            <h4>${dataEmote[i].name}</h4>
                                            <img src="${chrome.extension.getURL('/assets/icons/16-blue.png')}">
                                            <small style="color:#0b67ff;">Channel</small>
                                        </span>
                                    </div> `);
                                }
                            }
                            if (img.innerHTML.includes(userData) && localStorage.BBrBackground === 'true') {
                                for (var i = 0; i < 1; i++) {
                                    createHightlight(img.innerText)
                                }
                            }
                        })
                        Array.from(node.querySelectorAll("a[style='font-size: 13px; color: inherit;']")).forEach(img => {
                            for (var i = 0; i < badgeList.length; i++) {
                                if(badgeList[i].badge === ''){
                                    img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i].nickname + '( |$)', 'g'), `<strong style="color:#${badgeList[i].color}">${badgeList[i].nickname}: </strong>`);
                                }else{
                                    img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i].nickname + '( |$)', 'g'), ` <img alt="${badgeList[i].badge}" class="chatBadge" style="height: 1.20em; vertical-align: middle;" src="https://cdn.betterbri.me/badges/${badgeList[i].badge}.png"> <strong style="color:#${badgeList[i].color}">${badgeList[i].nickname}: </strong>`);
                                }
                            }
                        })
                        Array.from(node.querySelectorAll("span[style='margin-left: -3px;']")).forEach(img => {
                            if(localStorage.BBTimestamps === 'true' && splitcurrentUrl[4] !== 'chat'){
                                if(localStorage.BBTimestampstype === 'vod'){
                                    if(document.querySelector('div[aria-label="Current time"]').innerText === '00:00') return;

                                    img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<strong class="timestamp">${document.querySelector('div[aria-label="Current time"]').innerText}</strong> ${img.innerHTML}`);
                                }else if(localStorage.BBTimestampstype === 'local'){
                                    if(gimmeTime() === loadofexTime) return;

                                    img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<strong class="timestamp">${gimmeTime()}</strong> ${img.innerHTML}`);
                                }
                            }
                        })
                    })
                    if (localStorage.BBdeletedM === 'true') {
                        mutation.removedNodes.forEach(node => {
                            Array.from(node.querySelectorAll(`li span b`)).forEach(img => {
                                let btn = document.createElement("li");
                                if(localStorage.BBLightMode === 'true'){
                                    btn.innerHTML = `<span style="color: #553bde"> ${img.innerHTML} <br/><small style="color: var(--font-color);font-weight: bold;">This is deleted message.</small></span>`;
                                    btn.style.opacity = '0.6';
                                    btn.style.backgroundColor = 'rgb(181 181 181)';
                                    btn.style.marginBottom = '0';
                                    btn.style.borderLeft = '5px solid red';
                                }else{
                                    btn.innerHTML = `<span style="color: #553bde"> ${img.innerHTML} <br/><small style="color: #929292;font-weight: bold;">This is deleted message.</small></span>`;
                                    btn.style.opacity = '0.6';
                                    btn.style.backgroundColor = 'rgb(0 0 0)';
                                    btn.style.marginBottom = '0';
                                    btn.style.borderLeft = '5px solid white';
                                }
                                btn.className = "chatLine";
                                btn.style.borderRadius = "0px";
                                document.getElementById('chat-thread').appendChild(btn);
                            })
                            Array.from(node.querySelectorAll(`li span[style="font-size: 13px;"]`)).forEach(img => {
                                let btn = document.createElement("li");
                                if(localStorage.BBLightMode === 'true'){
                                    btn.style.backgroundColor = 'rgb(181 181 181)';
                                    btn.style.borderLeft = '5px solid red';
                                }else{
                                    btn.style.backgroundColor = 'rgb(0 0 0)';
                                    btn.style.borderLeft = '5px solid white';
                                }
                                btn.innerHTML = `<span style="font-size: 13px;"> <b style="cursor:pointer">Click to show</b></span>`;
                                btn.className = "chatLine";
                                btn.style.opacity = '0.6';
                                btn.style.borderRadius = "0px";
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
/*--------------------------------------------------------------------------------------------
                                    BetterBrime Emotes System
---------------------------------------------------------------------------------------------*/
    function addToEmotes(name, where, type) {
		if(type === 'channel'){
			let btn = document.createElement("button");
			btn.innerHTML = `<img class="emoji-picker__custom-emoji" src="https://i.imgur.com/${name.imgur_id}.png">`;
			btn.className = "emoji-picker__emoji";
			btn.title = name.name;
			btn.style.opacity = "1";
			btn.onclick = function() {
				document.querySelector('#chat-form #message').value = `${document.querySelector('#chat-form #message').value}${name.name} `;
				document.querySelector('#chat-form #message').focus();
			};
			btn.onmouseover = function() {
				previewEmote(name.imgur_id, name.name)
			};
			btn.onmouseout = function() {
				previewClean()
			};
			document.getElementById(where).appendChild(btn);
		}else if(type === 'global'){
			let btn = document.createElement("button");
			btn.innerHTML = `<img class="emoji-picker__custom-emoji" src="https://i.imgur.com/${name.id}.png">`;
			btn.className = "emoji-picker__emoji";
			btn.title = name.code;
			btn.style.opacity = "1";
			btn.onclick = function() {
				document.querySelector('#chat-form #message').value = `${document.querySelector('#chat-form #message').value}${name.code} `;
				document.querySelector('#chat-form #message').focus();
			};
			btn.onmouseover = function() {
				previewEmote(name.id, name.code)
			};
			btn.onmouseout = function() {
				previewClean()
			};
			document.getElementById(where).appendChild(btn);
		}
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
/*--------------------------------------------------------------------------------------------
                                    BetterBrime Settings
---------------------------------------------------------------------------------------------*/

    if(splitcurrentUrl[4] === 'chat'){
        return;
    }else{
        let settingsBB = document.createElement("li");
        settingsBB.setAttribute("id", "bb-settings");
		settingsBB.style.borderBottom = '1px solid #3b4253';
        settingsBB.className = 'presentation';
        settingsBB.innerHTML = `<a class="dropdown-item d-flex align-items-center" role="menuitem" target="_self"><img src="${chrome.extension.getURL('/assets/icons/16-dark.png')}" class="mr-50 feather feather-bar-chart-2"/> <span>BetterBrime</span></a>`;
        settingsBB.onclick = function() {
            document.querySelector('#bb-settings-container').style.display = 'block';
            document.querySelector('#app').style.filter = 'blur(8px)';
        };
        document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').appendChild(settingsBB);
        document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').insertBefore(settingsBB, document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').childNodes[0]);
    }

    //Backups settings
    document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] a[role="button"]').addEventListener("click", function(e) {
        if(!document.getElementById('bb-settings')){
            let settingsBB = document.createElement("li");
            settingsBB.setAttribute("id", "bb-settings");
			settingsBB.style.borderBottom = '1px solid #3b4253';
            settingsBB.className = 'presentation';
            settingsBB.innerHTML = `<a class="dropdown-item d-flex align-items-center" role="menuitem" target="_self"><img src="${chrome.extension.getURL('/assets/icons/16-dark.png')}" class="mr-50 feather feather-bar-chart-2"/> <span>BetterBrime</span></a>`;
            settingsBB.onclick = function() {
                document.querySelector('#bb-settings-container').style.display = 'block';
                document.querySelector('#app').style.filter = 'blur(8px)';
            };
            document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').appendChild(settingsBB);
            document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').insertBefore(settingsBB, document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').childNodes[0]);
            logging('recover', 'Generated settings button.')
        }
    });
    //Settings Body
    var settingsBG = document.createElement("div");
    settingsBG.innerHTML = `
	<div id="header">
    <span id="logo"><img height="32px" src="https://cdn.betterbri.me/badges/betterbrime.png"></span>
    <ul class="nav">
      <li id="im-bb-settings-nav">
	  	<a onclick="document.getElementById('bb-settings-here').style.display = 'block';document.getElementById('bbFullScreenPlus').style.display = 'none';document.getElementById('bbChangelog').style.display = 'none';">Settings</a>
	  </li>
      <li id="im-bb-changelog-nav">
	  	<a onclick="document.getElementById('bb-settings-here').style.display = 'none';document.getElementById('bbChangelog').style.display = 'block';document.getElementById('bbFullScreenPlus').style.display = 'none';">Changelog</a>
	  </li>
	  <li id="im-bb-FullScreenPlus-nav">
	  	<a onclick="document.getElementById('bb-settings-here').style.display = 'none';document.getElementById('bbChangelog').style.display = 'none';document.getElementById('bbFullScreenPlus').style.display = 'block';">Fullscreen Plus</a>
	  </li>
    </ul>
    <span id="close"></span>
  	</div>
	<div id="bb-settings-here" class="options-list">

	</div>
	<div id="bbChangelog" style="">
    <h1>Changelog</h1>
		<div class="bttv-changelog-releases">
        	<h2>Version 1.20 (July 13, 2021)</h2>
  			<p>- Channel emotes Api Updated<br/>- Added text-shadow to messages in Light Mode<br/>- Stream Titles are now black on Light Mode<br/>- Started minified javascript files</p>

		  	<h2>Version 1.19 (July 05, 2021)</h2>
  			<p>- Updated API to version v2</p>
			
  			<h2>Version 1.18.1 (July 04, 2021)</h2>
  			<p>- Fixed issue with not loading fullscreen plus settings inside iframe.<br/> - Enabled change color of background</p>

  			<h2>Version 1.18 (July 01, 2021)</h2>
  			<p>- New design of settings<br/> - New functions in Fullscreen Plus<br/> - as always, made some bug fixes and improvements.<br/> - Changelog inside settings</p>

		</div>
  	</div>
	<div id="bbFullScreenPlus" style="">

			<div class="reset-button">
				
			</div>
  	</div>
	<div id="footer">
    <span>BetterBrime © 2021</span>
    <span style="float:right;">
      <a href="https://twitter.com/betterbrime" target="_blank">Twitter</a> | 
      <a href="https://github.com/4uss/BetterBrime/issues" target="_blank">Bug Report</a>
    </span>
  	</div>`;
    settingsBG.style.display = 'none';
    settingsBG.setAttribute("id", "bb-settings-container");
    document.body.appendChild(settingsBG);

    //Settings List
    newSettings('cDesign', 'Custom Design', 'BetterBrime provides own version of dark mode.')
    newSettings('rBackground', 'Pin Highlighted messages', 'Pins your last ten highlighted messages above chat')
    newSettings('lChat', 'Split Chat', 'Alternates backgrounds between messages in chat to improve readability')
    newSettings('deletedM', 'Show Deleted Messages', 'Display deleted messages')
    timestampSettings()
    newSettings('LightMode', 'Light Mode', 'BetterBrime provides own light mode.')
    newSettings('FullScreen', 'Fullscreen Plus', 'Triggers fullscreen view of twitch stream with chat overlay')
    connectBetterBrime()
	PPbackgroundColorChat()
	PPfontSizeChat()
	PPopacityChat()
	var createRestButton = document.createElement("button");
	createRestButton.innerHTML = `Reset settings to default`;
	createRestButton.className = 'btn btn-primary m-2';
	createRestButton.type = 'button'
	createRestButton.onclick = function() {
			let tmpobj = {w: 357,h: 518};
			localStorage.setItem(`BBFullScreen-size`, JSON.stringify(tmpobj));
			let tmpobj1 = {x: 0,y: 0};
			localStorage.setItem(`BBFullScreen-location`, JSON.stringify(tmpobj1));
			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": "70", "backgroundColor": "#18181b", "fontSize": "13"});

		document.querySelector(`#bb-fullscreen-plus-iframe`).style.left = '0px';
		document.querySelector(`#bb-fullscreen-plus-iframe`).style.top = '0px';
	
		document.querySelector(`#bb-fullscreen-plus-iframe`).style.width = '357px';
		document.querySelector(`#bb-fullscreen-plus-iframe`).style.height = '518px';
	};
	document.querySelector('.reset-button').appendChild(createRestButton);
	

    //Refresh Button
    var refreshSettings = document.createElement("i");
    refreshSettings.className = 'fas fa-times';
    refreshSettings.onclick = function() {
        //window.location.reload(true);
		document.querySelector('#bb-settings-container').style.display = 'none';
        document.querySelector('#app').style.filter = 'none';
    };
    document.getElementById('close').appendChild(refreshSettings);

    //Settings Generator
    function newSettings(id, name, description) {

        let btn = document.createElement("div");
		btn.className = 'option';
        if (localStorage.getItem(`BB${id}`) === 'true') {
                btn.innerHTML = `
				<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">${name}</span>
				<span class="description"> — ${description}</span>
				<div class="bb-switch">
					<input id="${id}" type="checkbox" name="${id}" checked>
				</div>`;
        } else {
                btn.innerHTML = `
				<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">${name}</span>
				<span class="description"> — ${description}</span>
				<div class="bb-switch">
					<input id="${id}" type="checkbox" name="${id}">
				</div>`;
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
        document.querySelector('#bb-settings-here').appendChild(btn);
    }

    //Type of setting
    function timestampSettings() {

		let btn = document.createElement("div");
		btn.className = 'option';
        if (localStorage.getItem(`BBTimestamps`) === 'true') {
                btn.innerHTML = `
				<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Timestamps</span>
				<span class="description"> — Show time when message was sent.</span>
				<div class="bb-switch">
					<input id="Timestamps" type="checkbox" name="Timestamps" checked>
				</div>`;
        } else {
                btn.innerHTML = `
				<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Timestamps</span>
				<span class="description"> — Show time when message was sent.</span>
				<div class="bb-switch">
					<input id="Timestamps" type="checkbox" name="Timestamps">
				</div>`;
        }
        btn.addEventListener("click", function(e) {
            if (localStorage.getItem(`BBTimestamps`) === 'true') {
                localStorage.setItem(`BBTimestamps`, 'false');
                document.getElementById('Timestamps').checked = false;
            } else {
                localStorage.setItem(`BBTimestamps`, 'true');
                document.getElementById('Timestamps').checked = true;
            }
        });
        document.querySelector('#bb-settings-here').appendChild(btn);

        let beCoool = document.createElement("div");
		beCoool.className = 'option';
		beCoool.innerHTML = `
		<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Type of Timestamps</span>
		<span class="description"> — Choose which type of timestamps you want.</span>
		<div class="bb-switch" id="checkbox-here-timestamps">
			
		</div>`;
        document.querySelector('#bb-settings-here').appendChild(beCoool);

        var timeSettings = document.createElement("select");
        timeSettings.innerHTML = `<option value="vod"> VOD Time</option><option value="local">Local Time</option>`;
        timeSettings.setAttribute("id", "Timestampstype");
        timeSettings.style.backgroundColor = 'var(--bg-second-dark)';
        timeSettings.style.border = '0';
        timeSettings.style.borderRadius = '7px'
        timeSettings.onchange = function() {
            localStorage.BBTimestampstype = this.value;
        };
        document.getElementById('checkbox-here-timestamps').appendChild(timeSettings);
    }

    //Temporary Authorization
    function connectBetterBrime(){
        let btn = document.createElement("li");
			btn.className = 'connectBetterBrime'
            btn.innerHTML = `Link Brime with BetterBrime`;
            btn.addEventListener("click", function(e) {
                window.open(`https://betterbri.me/auth#${userData.toLowerCase()}#${localStorage.accessToken}`, '_blank');
            });
        document.querySelector('#bb-settings-container .nav').appendChild(btn);
    }

	function PPbackgroundColorChat(){
		let btn = document.createElement("div");
		btn.className = 'option';
        btn.innerHTML = `
			<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Background Color</span>
			<span class="description"> — Change color of chat background.</span>
			<div class="bb-switch">
				<input class="form-control" type="text" value="${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}" style="height: 2rem;background-color: #161616;"></input>
			</div>`;
        btn.addEventListener("change", function(e) {
			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": JSON.parse(localStorage.fullScreenPlusJSon).opacity, "backgroundColor": this.querySelector('input[type="text"]').value, "fontSize": JSON.parse(localStorage.fullScreenPlusJSon).fontSize});
        });
        document.querySelector('#bbFullScreenPlus').appendChild(btn);
		document.querySelector('#bbFullScreenPlus').insertBefore(btn, document.querySelector('#bbFullScreenPlus').childNodes[0]);
	}

	function PPfontSizeChat(){
		let btn = document.createElement("div");
		btn.className = 'option';
        btn.innerHTML = `
			<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Font Size</span>
			<span class="description"> — Change font size of chat messages.</span>
			<div class="bb-switch">
				<input class="form-control" type="number" min="10" max="24" value="${JSON.parse(localStorage.fullScreenPlusJSon).fontSize}" style="height: 2rem;background-color: #161616;"></input>
			</div>`;
        btn.addEventListener("change", function(e) {

			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": JSON.parse(localStorage.fullScreenPlusJSon).opacity, "backgroundColor": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor, "fontSize": this.querySelector('input[type="number"]').value});
        });
        document.querySelector('#bbFullScreenPlus').appendChild(btn);
		document.querySelector('#bbFullScreenPlus').insertBefore(btn, document.querySelector('#bbFullScreenPlus').childNodes[0]);
	}

	function PPopacityChat(){
		let btn = document.createElement("div");
		btn.className = 'option';
        btn.innerHTML = `
			<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Opacity</span>
			<span class="description"> — <b>${JSON.parse(localStorage.fullScreenPlusJSon).opacity}</b></span>
			<div class="bb-switch">
				<input class="form-control-range slider" type="range" step="1" min="10" max="99" value="${JSON.parse(localStorage.fullScreenPlusJSon).opacity}" style="height: 2rem;background-color: #161616;"></input>
			</div>`;
        btn.addEventListener("change", function(e) {
			document.querySelector('#bb-fullscreen-plus-iframe').style.opacity = `.${this.querySelector('input[type="range"]').value}!important`;
			document.querySelector('#bbFullScreenPlus .description b').innerText = this.querySelector('input[type="range"]').value;
			
			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": this.querySelector('input[type="range"]').value, "backgroundColor": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor, "fontSize": JSON.parse(localStorage.fullScreenPlusJSon).fontSize});
        });
        document.querySelector('#bbFullScreenPlus').appendChild(btn);
		document.querySelector('#bbFullScreenPlus').insertBefore(btn, document.querySelector('#bbFullScreenPlus').childNodes[0]);
	}
/*--------------------------------------------------------------------------------------------
                                    BetterBrime Extensions
---------------------------------------------------------------------------------------------*/
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
    function gimmeTime(){
		var d = new Date();

		var hour =  d.getHours();
		var minute =  d.getMinutes();
		var second =  d.getSeconds();
		
		if (hour.toString().length < 2) hour = '0' + hour;
		if (minute.toString().length < 2) minute = '0' + minute;
		if (second.toString().length < 2) second = '0' + second;
    
        return hour + ":" + minute;
    }
/*--------------------------------------------------------------------------------------------
                                    BetterBrime Fullscreen Plus
---------------------------------------------------------------------------------------------*/
function betterFullScreenPlus(){
	if(splitcurrentUrl[3] === 'clips'){
        return;
    }else{
			var settingsBG = document.createElement("div");
			settingsBG.innerHTML = `
			<div class="header">
				<h3>Fullscreen Plus #${splitcurrentUrl[3]}</h3>
			</div>
			<div class="body">
				<iframe src="https://beta.brimelive.com/${splitcurrentUrl[3]}/chat" frameborder="0" scrolling="no" style="height: 100%;"></iframe>
			</div>`;
			settingsBG.setAttribute("id", "bb-fullscreen-plus-iframe");
			settingsBG.className = 'bb-fullscreen-box text-center';
			document.querySelector('#player div').appendChild(settingsBG);
			document.querySelector('#player div').insertBefore(settingsBG, document.querySelector('#player div').childNodes[0]);
		
			var fullSettingsButton = document.createElement("i");
			fullSettingsButton.style.cursor = 'pointer';
			fullSettingsButton.style.zIndex = '90';
			fullSettingsButton.style.color = '#6057c5';
			fullSettingsButton.style.fontSize = '24px';
			fullSettingsButton.className = 'fas fa-cog ml-1';
			fullSettingsButton.onclick = function() {
				document.querySelector('#bb-settings-here').style.display = 'none';
				document.querySelector('#bbFullScreenPlus').style.display = 'block';
				document.querySelector('#bb-settings-container').style.display = 'block';
				document.querySelector('#app').style.filter = 'blur(8px)';
			};

			document.querySelector('#bb-fullscreen-plus-iframe .header h3').appendChild(fullSettingsButton);
			
			let position = JSON.parse(localStorage.getItem(`BBFullScreen-location`));
			let vsize = JSON.parse(localStorage.getItem(`BBFullScreen-size`));
		
			document.querySelector(`#bb-fullscreen-plus-iframe`).style.left = position.x+'px';
			document.querySelector(`#bb-fullscreen-plus-iframe`).style.top = position.y+'px';
		
			document.querySelector(`#bb-fullscreen-plus-iframe`).style.width = vsize.w+'px';
			document.querySelector(`#bb-fullscreen-plus-iframe`).style.height = vsize.h+'px';
		
			$(`#bb-fullscreen-plus-iframe`).draggable({
				stop: () => {
					let tmpobj = {
						x: parseInt(document.querySelector(`#bb-fullscreen-plus-iframe`).style.left),
						y: parseInt(document.querySelector(`#bb-fullscreen-plus-iframe`).style.top)
					}
		
					localStorage.setItem(`BBFullScreen-location`, JSON.stringify(tmpobj));
				}
			});
		
			$(`#bb-fullscreen-plus-iframe`).resizable({
				stop: () => {
					let tmpobj = {
						w: parseInt(document.querySelector(`#bb-fullscreen-plus-iframe`).style.width),
						h: parseInt(document.querySelector(`#bb-fullscreen-plus-iframe`).style.height)
					}
					localStorage.setItem(`BBFullScreen-size`, JSON.stringify(tmpobj));
				}
			});
	}
}
}

function logging(w, m) {
    console.log(`%cBetterBrime [%c${w}%c]:%c ${m}`, 'color:#0b67ff; font-weight:bold', '', 'color:#0b67ff; font-weight:bold', '')
}