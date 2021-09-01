/*!
 * BetterBrime
 * https://betterbri.me/
 * 
 * Developer Console
 * https://dev.betterbri.me/
 */
if (!localStorage.BBcDesign) {localStorage.BBcDesign = 'true'};
if (!localStorage.BBrBackground) {localStorage.BBrBackground = 'true'};
if (!localStorage.BBlChat) {localStorage.BBlChat = 'false'};
if (!localStorage.BBdeletedM) {localStorage.BBdeletedM = 'false'};
if (!localStorage.BBTimestamps) {localStorage.BBTimestamps = 'false'};
if (!localStorage.BBLightMode) {localStorage.BBLightMode = 'false'};
if (!localStorage.BBFullScreen) {localStorage.BBFullScreen = 'false'};
if (!localStorage.BBTimestampstype) {localStorage.BBTimestampstype = 'vod'};
if (!localStorage.fullScreenPlusJSon) {localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": "70", "backgroundColor": "#18181b", "backgroundColorBox": "#18181b", "fontSize": "13"})};
if (!localStorage.getItem(`BBFullScreen-size`)) {let tmpobj = {w: 357,h: 518};localStorage.setItem(`BBFullScreen-size`, JSON.stringify(tmpobj));}
if (!localStorage.getItem(`BBFullScreen-location`)) {let tmpobj = {x: 0,y: 0};localStorage.setItem(`BBFullScreen-location`, JSON.stringify(tmpobj));}

const site = document.querySelector('.footer')
const chatContainerEmbed = document.querySelector('.grecaptcha-badge');
var statusBB = false
var userData;
var currentUrl = window.location.href;
var splitcurrentUrl = currentUrl.split('/');

setInterval(() => {
    if (site) {
        if (!statusBB || !site.hasAttribute('betterbrime-loaded')) {
            console.log("%c0", `
                    line-height: 105px;
                    background-image: url("https://cdn.betterbri.me/betterbrime_full_white.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-color: #141414;
                    border-radius: 15px;
                    margin-left: calc((50% - 150px) - 1ch);
                    padding-left: 150px;
                    color: transparent;
                    padding-right: 150px;
            `);
            statusBB = true
            if (document.querySelector('p[class="user-name font-weight-bolder mb-0"]')) {
                userData = document.querySelector('p[class="user-name font-weight-bolder mb-0"]').innerText;
            }
            betterBrime();

            if(site) site.setAttribute('betterbrime-loaded', '1')
            else if(document.querySelector('.grecaptcha-badge')) site.setAttribute('betterbrime-loaded', '1')
        }
    }else if(chatContainerEmbed){
        if (!statusBB || !chatContainerEmbed.hasAttribute('betterbrime-loaded')) {

            console.log("%c0", `
                    line-height: 105px;
                    background-image: url("https://cdn.betterbri.me/betterbrime_full_white.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-color: #141414;
                    border-radius: 15px;
                    margin-left: calc((50% - 150px) - 1ch);
                    padding-left: 150px;
                    color: transparent;
                    padding-right: 150px;
            `);
            statusBB = true
            if (document.querySelector('p[class="user-name font-weight-bolder mb-0"]')) {
                userData = document.querySelector('p[class="user-name font-weight-bolder mb-0"]').innerText;
            }
            betterBrime();
            chatContainerEmbed.setAttribute('betterbrime-loaded', '1')
        }
    } else {
        logging('core', "Can't load extension.")
        statusBB = false
    }
}, 1000)

async function betterBrime() {

    let chatExist = false;
    let playerexist = false;
    let emotesList;
    let badgeList;
    let channelList;
    const loadofexTime = gimmeTime();


    $("head").append(`<link rel='stylesheet' href='${document.querySelector('script[bb-name="ex-13-21-83"]').getAttribute("betterbrime-css")}' type='text/css'>`)
    $("head").append(`<link rel='stylesheet' href='${document.querySelector('script[bb-name="ex-13-21-83"]').getAttribute("betterbrime-fonts")}' type='text/css'>`)
/*--------------------------------------------------------------------------------------------
                            BetterBrime FullScreen Settings CSS
---------------------------------------------------------------------------------------------*/
if ( window !== window.parent && localStorage.BBFullScreen === 'true') 
			{
				var css2 = document.createElement('style');
				css2.type = 'text/css';
				css2.appendChild(document.createTextNode(`
				.column.chat__column{
					background: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}!important;
					background-color: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}!important;
				}
                .bb-fullscreen-box{
                    background: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox}!important;
					background-color: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox}!important;
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
					background: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox}!important;
					background-color: ${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox}!important;
                    opacity: .${JSON.parse(localStorage.fullScreenPlusJSon).opacity}!important;
				}`));
				var head2 = document.getElementsByTagName("head")[0]
				if (!head2) return;
				head2.appendChild(css2);
			}

/*--------------------------------------------------------------------------------------------
                                    BetterBrime Data
---------------------------------------------------------------------------------------------*/
    fetch('https://api-staging.betterbri.me/global/emotes')
        .then(response => response.json())
        .then(data => emotesList = data)
        .then(logging('chat.emotes', 'Loaded emote set: Global Emotes'));
    fetch('https://api-staging.betterbri.me/global/badges')
        .then(response => response.json())
        .then(data => badgeList = data)
        .then(logging('chat.badges', 'Loaded badges and assigned them to users.'));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            channelList = JSON.parse(this.responseText).emotes;
            logging('chat.emotes', 'Loaded emote set: Channel: '+splitcurrentUrl[3])
        }else{
            channelList = "false" 
        }
    };
    xhttp.open("GET", "https://api-staging.betterbri.me/user/channel/"+splitcurrentUrl[3], true);
    xhttp.send();
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
        .messages div.wrapper:nth-child(odd) {
            background-color: #101013;
            border-radius: 7px;
        }
        .chatLine {
            border-radius: 7px;
            background-color: #080809;
        }
        .BetterBrime-Light .messages div.wrapper:nth-child(odd) {
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
setInterval(() => {
    const target = document.querySelector('.messages')

    if (target) {
        if (!chatExist || !target.hasAttribute('data-maked-observer')) {
            makeObserver(target)
            observeEmoji()
            chatExist = true;

            let btn = document.createElement("div");
            btn.setAttribute("id", "bb-pin-container");
            document.querySelector('.chat__column').appendChild(btn);
            document.querySelector('.chat__column').insertBefore(btn, document.querySelector('.chat__column').childNodes[0]);
            
            target.setAttribute('data-maked-observer', '1')
        }
    } else {
        //logging('chat', "Could not find chat element.")
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
            if (!document.getElementById('4ussEmotes-list')) {

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

            }
        } else {
            //logging('core', "Can't find default emote picker.")
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
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        Array.from(node.querySelectorAll(".message span[class='m__content'] span a")).forEach(img => {
                            if(img.href.endsWith('.jpg') === true || img.href.endsWith('.png') === true || img.href.endsWith('.gif') === true || img.href.endsWith('.svg') === true || img.href.endsWith('.jpeg') === true){
                                img.innerHTML = img.href.replace(new RegExp('^(https?:\\/\\/)?'+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+'(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i'),
                                    `<div class="emoteInfo">
                                        ${img.href}
                                        <span class="tooltiptext p-1" style="text-align:center;left: 0;">
                                            <img src="${img.href}" class="img-fluid"/><br/>
                                            <br/><small style="color:#03dac6;">Image Preview</small>
                                        </span>
                                    </div> `);
                            }
                        })
                        Array.from(node.querySelectorAll(".message span[class='m__content'] span")).forEach(img => {
                            for (var i = 0; i < emotesList.length; i++) {
                                img.innerHTML = img.innerHTML.replace(new RegExp(emotesList[i].code + '( |$)', 'g'), ` 
                                <div class="emoteInfo">
                                    <img alt="${emotesList[i].code}" src="https://i.imgur.com/${emotesList[i].id}.png">
                                    <span class="tooltiptext p-1" style="text-align:center;">
                                        <img src="https://i.imgur.com/${emotesList[i].id}.png"/><br/>
                                        <h4>${emotesList[i].code}</h4>
                                        <img src="https://cdn.betterbri.me/icons/16.png">
                                        <small style="color:#03dac6;">Global</small>
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
                                            <img src="https://cdn.betterbri.me/icons/16.png">
                                            <small style="color:#03dac6;">Channel</small>
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
                        Array.from(node.querySelectorAll(".message span[class='m__username']")).forEach(img => {
                            for (var i = 0; i < badgeList.length; i++) {
                                if(badgeList[i].badges === ''){
                                    img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i].nickname + '( |$)', 'g'), `<strong style="color:#${badgeList[i].color}">${badgeList[i].nickname}: </strong>`);
                                }else{
                                    img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i].nickname + '( |$)', 'g'), ` 
                                    <img alt="${badgeList[i].badges}" title="${badgeList[i].badge_name}" class="chatBadge" bb-type="tooltip-here" style="height: 1.20em; vertical-align: middle;" src="https://cdn.betterbri.me/badges/${badgeList[i].badges}.png"> 
                                    <strong style="color:#${badgeList[i].color}">${badgeList[i].nickname}: </strong>`);
                                }
                            }
                        })
                        /*Array.from(node.querySelectorAll("span[style='margin-left: -3px;']")).forEach(img => {
                            if(localStorage.BBTimestamps === 'true' && splitcurrentUrl[4] !== 'chat'){
                                if(localStorage.BBTimestampstype === 'vod'){
                                    if(document.querySelector('div[aria-label="Current time"]').innerText === '00:00') return;

                                    img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<strong class="timestamp">${document.querySelector('div[aria-label="Current time"]').innerText}</strong> ${img.innerHTML}`);
                                }else if(localStorage.BBTimestampstype === 'local'){
                                    if(gimmeTime() === loadofexTime) return;

                                    img.innerHTML = img.innerHTML.replace(new RegExp(img.innerHTML +'( |$)', 'g'), `<strong class="timestamp">${gimmeTime()}</strong> ${img.innerHTML}`);
                                }
                            }
                        })*/
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

    async function observeEmoji() {
        const config = {
            childList: true
        }
        const callback2 = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        Array.from(node.querySelectorAll('div.emoji-picker__wrapper div.emoji-picker.light div.emoji-picker__content div.emoji-picker__emoji-area div.emoji-picker__emojis')).forEach(img => {
                        
                            const timeEmojiPicker = Date.now();
                            if(img.querySelector('[bb-element]')) return;
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    channelList = JSON.parse(this.responseText).emotes;

                                    if(JSON.parse(this.responseText).emotes !== 'false'){

                                        var elementXD = document.createElement("h2");
                                        elementXD.className = 'emoji-picker__category-name';
                                        elementXD.appendChild(document.createTextNode('Channel Emotes'));
                                        img.appendChild(elementXD);
                                        //
                                        var element = document.createElement("div");
                                        element.className = 'emoji-picker__container';
                                        element.id = 'betterEmotes-list-'+timeEmojiPicker;
                                        element.setAttribute('bb-element', ' ')
                                        img.appendChild(element);
                        
                                        JSON.parse(JSON.parse(this.responseText).emotes).map((item, i) => {
                                            let btn = document.createElement("button");
                                            btn.innerHTML = `<img class="emoji-picker__custom-emoji" src="https://i.imgur.com/${item.imgur_id}.png">`;
                                            btn.className = "emoji-picker__emoji";
                                            btn.title = item.name;
                                            btn.style.opacity = "1";
                                            btn.onclick = function() {
                                                let el = document.querySelector(".chat__input");
                                                el.value = document.querySelector(".chat__input").value.trim() + " ".concat(item.name);
                                                el.dispatchEvent(new Event('input'));
                                                document.querySelector('.emoji-picker__wrapper').style.display = "none";
                                                document.querySelector(".chat__input").focus()
                                            };
                                            btn.onmouseover = function() {
                                                previewEmote(item.imgur_id, item.name)
                                            };
                                            btn.onmouseout = function() {
                                                previewClean()
                                            };
                                            document.getElementById('betterEmotes-list-'+timeEmojiPicker).appendChild(btn);
                                        });
                                    }
                                    logging('chat.emotes', 'Loaded emote set: Channel: '+window.location.href.split('/')[3])
                                }else{
                                    channelList = "false" 
                                }
                            };
                            xhttp.open("GET", "https://api-staging.betterbri.me/user/channel/"+window.location.href.split('/')[3], true);
                            xhttp.send();
                            fetch('https://api-staging.betterbri.me/global/emotes')
                                .then(response => response.json())
                                .then(data => emotesList = data)
                                .then(logging('chat.emotes', 'Loaded emote set: Global Emotes'));
                            fetch('https://api-staging.betterbri.me/global/badges')
                                .then(response => response.json())
                                .then(data => badgeList = data)
                                .then(logging('chat.badges', 'Loaded badges and assigned them to users.'));
            
                            var elementZX = document.createElement("h2");
                            elementZX.className = 'emoji-picker__category-name';
                            elementZX.appendChild(document.createTextNode('BetterBrime Global'));
                            img.appendChild(elementZX);
                            //
                            var elementYU = document.createElement("div");
                            elementYU.className = 'emoji-picker__container';
                            elementYU.setAttribute('bb-element', ' ')
                            elementYU.id = '4ussEmotes-list-'+timeEmojiPicker;
                            img.appendChild(elementYU);
            
                            emotesList.map((item, i) => {
                                let btn = document.createElement("button");
                                btn.innerHTML = `<img class="emoji-picker__custom-emoji" src="https://i.imgur.com/${item.id}.png">`;
                                btn.className = "emoji-picker__emoji";
                                btn.title = item.code;
                                btn.style.opacity = "1";
                                btn.onclick = function() {
                                    let el = document.querySelector(".chat__input");
                                    el.value = document.querySelector(".chat__input").value.trim() + " ".concat(item.code);
                                    el.dispatchEvent(new Event('input'));
                                    document.querySelector('.emoji-picker__wrapper').style.display = "none";
                                    document.querySelector(".chat__input").focus()
                                };
                                btn.onmouseover = function() {
                                    previewEmote(item.id, item.code)
                                };
                                btn.onmouseout = function() {
                                    previewClean()
                                };
                                document.getElementById('4ussEmotes-list-'+timeEmojiPicker).appendChild(btn);
                            });
                            logging('chat.emotepicker', 'Generated emoji picker.')
                        })
                    })
                }
            }
        }
        const observer2 = new MutationObserver(callback2)
        observer2.observe(document.body, config)
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
                let el = document.querySelector(".chat__input");
                el.value = document.querySelector(".chat__input").value.trim() + " ".concat(name.name);
                el.dispatchEvent(new Event('input'));
                document.querySelector('.emoji-picker__wrapper').style.display = "none";
                document.querySelector(".chat__input").focus()
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
                let el = document.querySelector(".chat__input");
                el.value = document.querySelector(".chat__input").value.trim() + " ".concat(name.code);
                el.dispatchEvent(new Event('input'));
                document.querySelector('.emoji-picker__wrapper').style.display = "none";
                document.querySelector(".chat__input").focus()
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

    if(!document.querySelector('#bb-settings') && splitcurrentUrl[4] != 'chat'){
        let settingsBB = document.createElement("li");
        settingsBB.setAttribute("id", "bb-settings");
		settingsBB.style.borderBottom = '1px solid #3b4253';
        settingsBB.className = 'presentation';
        settingsBB.innerHTML = `<a class="dropdown-item d-flex align-items-center" role="menuitem" target="_self"><img src="https://cdn.betterbri.me/icons/16-dark.png" class="mr-50 feather feather-bar-chart-2"/> <span>BetterBrime</span></a>`;
        settingsBB.onclick = function() {
            document.querySelector('#bb-settings-container').style.display = 'block';
            document.querySelector('#app').style.filter = 'blur(8px)';
        };
        document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').appendChild(settingsBB);
        document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').insertBefore(settingsBB, document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').childNodes[0]);

    //Backups settings
    document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] a[role="button"]').addEventListener("click", function(e) {
        if(!document.getElementById('bb-settings')){
            let settingsBB = document.createElement("li");
            settingsBB.setAttribute("id", "bb-settings");
			settingsBB.style.borderBottom = '1px solid #3b4253';
            settingsBB.className = 'presentation';
            settingsBB.innerHTML = `<a class="dropdown-item d-flex align-items-center" role="menuitem" target="_self"><img src="https://cdn.betterbri.me/icons/16-dark.png" class="mr-50 feather feather-bar-chart-2"/> <span>BetterBrime</span></a>`;
            settingsBB.onclick = function() {
                document.querySelector('#bb-settings-container').style.display = 'block';
                document.querySelector('#app').style.filter = 'blur(8px)';
            };
            document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').appendChild(settingsBB);
            document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').insertBefore(settingsBB, document.querySelector('li[class="nav-item b-nav-dropdown dropdown dropdown-user"] ul').childNodes[0]);
            logging('recover', 'Generated settings button.')
        }
    });
    }
    //Settings Body
    var settingsBG = document.createElement("div");
    settingsBG.innerHTML = `
	<div id="header">
    <span id="logo"><img height="32px" src="https://cdn.betterbri.me/icons/128.png"></span>
    <ul class="nav">
      <li id="im-bb-settings-nav">
	  	<a onclick="document.getElementById('bb-settings-here').style.display = 'block';document.getElementById('bbFullScreenPlus').style.display = 'none';document.getElementById('bbChangelog').style.display = 'none';document.getElementById('bbSupporters').style.display = 'none';">Settings</a>
	  </li>
      <li id="im-bb-changelog-nav">
	  	<a onclick="document.getElementById('bb-settings-here').style.display = 'none';document.getElementById('bbChangelog').style.display = 'block';document.getElementById('bbFullScreenPlus').style.display = 'none';document.getElementById('bbSupporters').style.display = 'none';">Changelog</a>
	  </li>
	  <li id="im-bb-FullScreenPlus-nav">
	  	<a onclick="document.getElementById('bb-settings-here').style.display = 'none';document.getElementById('bbChangelog').style.display = 'none';document.getElementById('bbFullScreenPlus').style.display = 'block';document.getElementById('bbSupporters').style.display = 'none';">Fullscreen Plus</a>
	  </li>
	  <li id="im-bb-supporters-nav">
	  	<a onclick="document.getElementById('bb-settings-here').style.display = 'none';document.getElementById('bbChangelog').style.display = 'none';document.getElementById('bbFullScreenPlus').style.display = 'none';document.getElementById('bbSupporters').style.display = 'block';">Supporters</a>
	  </li>
    </ul>
    <span id="close"></span>
  	</div>
	<div id="bb-settings-here" class="options-list">

	</div>
	<div id="bbChangelog" style="">
    <h1>Changelog</h1>
		<div class="bttv-changelog-releases">
            <h2>Version 1.23 (September 01, 2021)</h2>
  			<p>- BetterBrime is now working with new version of Brime<br/>- As always fixed some bugs<br/>
              <strong>Version 1.23.1 (September 02, 2021)</strong>
            <ul>
            <li>Fullscreen Plus is back</li>
            <li>Split Chat is back</li>
            <li>New design: mention, reply, new messages, buttons on top message, profile preview, link preview</li>
            </ul></p>

            <h2>Version 1.22 (August 18, 2021)</h2>
  			<p>- Now you don't need refresh page for emoji picker and emotes<br/>- Full API UPDATE to version 3 <a href="https://dev.betterbri.me/">https://dev.betterbri.me/</a></p>

            <h2>Version 1.21 (July 26, 2021)</h2>
  			<p>- Fullscreen Plus Separate backgrounds <ul><li>Change Background of chat</li><li>Change Background of fullscreen box</li></ul><br/>- Automatic update emotes every 10 minutes<br/>- Updated logo inside settings</br>- Fixed issue with duplicated settings buttons</br>- Tutorial how to link account <a href="https://youtu.be/DjMZzxcHOIc" target="_blank">YouTube</a></p>

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
	<div id="bbSupporters" style="">
    <h1>Supporters</h1>
		<div class="bttv-changelog-releases" id="bb-supporters-here">
              <ul>
              </ul>
		</div>
  	</div>
	<div id="footer">
    <span>BetterBrime © 2021</span>
    <span style="float:right;">
      <a href="https://ko-fi.com/betterbrime" target="_blank" style="color:#ffa6e0;">Buy Ko-fi</a> | 
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
	PPbackgroundColorChat()
    PPbackgroundColorBoxChat()
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
			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": "70", "backgroundColor": "#18181b", "fontSize": "13", "backgroundColorBox": "#18181b"});

		document.querySelector(`#bb-fullscreen-plus-iframe`).style.left = '0px';
		document.querySelector(`#bb-fullscreen-plus-iframe`).style.top = '0px';
	
		document.querySelector(`#bb-fullscreen-plus-iframe`).style.width = '357px';
		document.querySelector(`#bb-fullscreen-plus-iframe`).style.height = '518px';
	};
	document.querySelector('.reset-button').appendChild(createRestButton);
    
    fetch('https://api-staging.betterbri.me/global/supporters')
    .then(response => response.json())
    .then(data => data.map((item, i) => BBSupporters(item.nickname)))
    .then(logging('get.supporters', 'Loaded supporters set'));
	

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

	function PPbackgroundColorBoxChat(){
		let btn = document.createElement("div");
		btn.className = 'option';
        btn.innerHTML = `
			<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Box Background Color</span>
			<span class="description"> — Change color of background box which chat is inside.</span>
			<div class="bb-switch">
				<input class="form-control" type="text" value="${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox}" style="height: 2rem;background-color: #161616;"></input>
			</div>`;
        btn.addEventListener("change", function(e) {
			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": JSON.parse(localStorage.fullScreenPlusJSon).opacity, "backgroundColor": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor, "backgroundColorBox": this.querySelector('input[type="text"]').value, "fontSize": JSON.parse(localStorage.fullScreenPlusJSon).fontSize});
        });
        document.querySelector('#bbFullScreenPlus').appendChild(btn);
		document.querySelector('#bbFullScreenPlus').insertBefore(btn, document.querySelector('#bbFullScreenPlus').childNodes[0]);
	}

    function PPbackgroundColorChat(){
		let btn = document.createElement("div");
		btn.className = 'option';
        btn.innerHTML = `
			<span style="font-weight:bold;font-size:14px;color:#D3D3D3;">Chat Background Color</span>
			<span class="description"> — Change color of chat background.</span>
			<div class="bb-switch">
				<input class="form-control" type="text" value="${JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor}" style="height: 2rem;background-color: #161616;"></input>
			</div>`;
        btn.addEventListener("change", function(e) {
			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": JSON.parse(localStorage.fullScreenPlusJSon).opacity, "backgroundColor": this.querySelector('input[type="text"]').value, "backgroundColorBox": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox, "fontSize": JSON.parse(localStorage.fullScreenPlusJSon).fontSize});
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

			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": JSON.parse(localStorage.fullScreenPlusJSon).opacity, "backgroundColor": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor, "backgroundColorBox": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox, "fontSize": this.querySelector('input[type="number"]').value});
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
			
			localStorage.fullScreenPlusJSon = JSON.stringify({"opacity": this.querySelector('input[type="range"]').value, "backgroundColor": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColor, "backgroundColorBox": JSON.parse(localStorage.fullScreenPlusJSon).backgroundColorBox, "fontSize": JSON.parse(localStorage.fullScreenPlusJSon).fontSize});
        });
        document.querySelector('#bbFullScreenPlus').appendChild(btn);
		document.querySelector('#bbFullScreenPlus').insertBefore(btn, document.querySelector('#bbFullScreenPlus').childNodes[0]);
	}
    function BBSupporters(n){
        let beCoool = document.createElement("li");
		beCoool.innerHTML = `<a href="https://betterbri.me/profile/${n}" target="_blank">${n}</a>`;
        document.querySelector('#bb-supporters-here ul').appendChild(beCoool);
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
				<h3>Fullscreen Plus #${window.location.href.split('/')[3]}</h3>
			</div>
			<div class="body">
				<iframe src="https://brime.tv/${window.location.href.split('/')[3]}/chat" frameborder="0" scrolling="no" style="height: 100%;"></iframe>
			</div>`;
			settingsBG.setAttribute("id", "bb-fullscreen-plus-iframe");
			settingsBG.className = 'bb-fullscreen-box text-center';
			document.querySelector('.plyr__video-wrapper').appendChild(settingsBG);
			document.querySelector('.plyr__video-wrapper').insertBefore(settingsBG, document.querySelector('.plyr__video-wrapper').childNodes[0]);
		
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

/*--------------------------------------------------------------------------------------------
                                    BetterBrime Update Data
---------------------------------------------------------------------------------------------*/
    setInterval(() => {

    fetch('https://api-staging.betterbri.me/global/emotes')
        .then(response => response.json())
        .then(data => emotesList = data)
        .then(logging('chat.emotes', 'Loaded emote set: Global Emotes'));
    fetch('https://api-staging.betterbri.me/global/badges')
        .then(response => response.json())
        .then(data => badgeList = data)
        .then(logging('chat.badges', 'Loaded badges and assigned them to users.'));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            channelList = JSON.parse(this.responseText).emotes;
            logging('update.emotes', 'Loaded emote set: Channel: '+window.location.href.split('/')[3])
        }else{
            channelList = "false" 
        }
    };
    xhttp.open("GET", "https://api-staging.betterbri.me/user/channel/"+window.location.href.split('/')[3], true);
    xhttp.send();

    }, 10 * 60 * 1000);

}

function logging(w, m) {
    console.log(`%cBetterBrime [%c${w}%c]:%c ${m}`, 'color:#03dac6; font-weight:bold', '', 'color:#03dac6; font-weight:bold', '')
}