//Thats messy asf
async function initBetterBrime() {
    if (!localStorage.BBcDesign) {
        localStorage.BBcDesign = 'true'
    };
    if (!localStorage.BBrBackground) {
        localStorage.BBrBackground = 'true'
    };
    if (!localStorage.BBlChat) {
        localStorage.BBlChat = 'true'
    };
    const site = document.querySelector('#cb-container')
    var statusBB = false
    var userData;

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
        let emotesList = ['EZ'];
        let badgeList = ['xanax']
        emotesStyle();

        if (localStorage.BBcDesign === 'true') {
            loadDesign();
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

        function loadDesign() {
            var css = document.createElement('style');
            css.type = 'text/css';

            css.appendChild(document.createTextNode(`
			body.dark-layout{
                background-color: var(--bg-darked) !important;
            }
            input[type="text"]#message{
                background-color: var(--bg-darked) !important;
            }
            .dark-layout .header-navbar {
                background-color: var(--bg-second-dark) !important;
            }
            .dark-layout .main-menu {
                background-color: var(--bg-second-dark) !important;
            }
            .dark-layout .main-menu-content .navigation-main {
                background-color: var(--bg-second-dark) !important;
            }
            .chat__column {
                background: var(--bg-second-dark) !important;
            }
            .dark-layout .dropdown-menu {
                background-color: var(--bg-second-dark) !important;
            }
            .main-menu .navbar-header .navbar-brand .brand-text {
                color: #ffffff !important;
            }
            .card[data-v-10e4e594], .dark-layout .card {
                background-color: var(--bg-second-dark) !important;
            }
            .dark-layout .modal .modal-body, .dark-layout .modal .modal-content, .dark-layout .modal .modal-footer {
                background-color: var(--bg-second-dark) !important;
            }
            .dark-layout .modal .modal-header, .dark-layout .modal .modal-header[class*=bg-] {
                background-color: var(--bg-second-accent-dark) !important;
            }
            [dir] .border-primary, .border-primary {
                border: 0 !important;
            }`));

            document.getElementsByTagName("head")[0].appendChild(css);

            logging('site.design', ' Custom design enabled.')
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
        fetch('https://api.4uss.cyou/aktor/emotes.php')
            .then(response => response.json())
            .then(data => emotesList = data)
            .then(logging('chat.emotes', ' Loaded data about emojis..'));
        fetch('https://api.4uss.cyou/aktor/badges.php')
            .then(response => response.json())
            .then(data => badgeList = data)
            .then(logging('chat.badges', ' Loaded data about badges..'));

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

        function makeObserver(target) {
            logging('core', ' Started observing chat.')
            const config = {
                childList: true
            }

            let observer2 = null
            const callback2 = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        //console.log('childList 2')
                        mutation.addedNodes.forEach(node => {
                            Array.from(node.querySelectorAll("span[style='font-size: 13px;']")).forEach(img => {
                                for (var i = 0; i < emotesList.length; i++) {
                                    var imgurID = emotesList[i].split('#');
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` 
                                    <div class="emoteInfo">
                                        <img alt="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">
                                        <span class="tooltiptext" style="text-align:center;">
                                            <img src="https://i.imgur.com/${imgurID[1]}.png"/><br/>
                                            <h2>${imgurID[0]}</h2>
                                            <img src="chrome-extension://enllbhcjgidenbenoifmjlkncigppooi/assets/icons/32.png">
                                        </span>
                                    </div> `);
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
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` <img alt="${imgurID[1]}" class="chatBadge" style="height: 1.20em; vertical-align: middle;" src="https://static.4uss.cyou/project_4ussEmote/badges/${imgurID[1]}.png"> <strong style="color:#${imgurID[2]}">${imgurID[0]}: </strong>`);
                                }
                            })
                        })
                    }
                }
            };
            observer2 = new MutationObserver(callback2)

            const callback = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        //console.log('childList 1')
                        mutation.addedNodes.forEach(node => {
                            Array.from(node.querySelectorAll("span[style='font-size: 13px;']")).forEach(img => {
                                for (var i = 0; i < emotesList.length; i++) {
                                    var imgurID = emotesList[i].split('#');
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` 
                                    <div class="emoteInfo">
                                        <img alt="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">

                                        <span class="tooltiptext" style="text-align:center;">
                                            <img src="https://i.imgur.com/${imgurID[1]}.png"/><br/>
                                            <h2>${imgurID[0]}</h2>
                                            <img src="chrome-extension://enllbhcjgidenbenoifmjlkncigppooi/assets/icons/32.png">
                                        </span>
                                    </div> `);
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
                                    img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), ` <img alt="${imgurID[1]}" class="chatBadge" style="height: 1.20em; vertical-align: middle;" src="https://static.4uss.cyou/project_4ussEmote/badges/${imgurID[1]}.png"> <strong style="color:#${imgurID[2]}">${imgurID[0]}: </strong>`);
                                }
                            })
                        })
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
                    var element = document.createElement("h2");
                    element.className = 'emoji-picker__category-name';
                    element.appendChild(document.createTextNode('BetterBrime Global'));
                    document.querySelector('.emoji-picker__emojis').appendChild(element);
                    //
                    var element = document.createElement("div");
                    element.className = 'emoji-picker__container';
                    element.id = '4ussEmotes-list';
                    document.querySelector('.emoji-picker__emojis').appendChild(element);

                    emotesList.map((item, i) => addToEmotes(item));

                    makedE = true
                    logging('site.emotepicker', ' Loaded emote picker.')

                    
                    let btn = document.createElement("div");
                    btn.setAttribute("id", "bb-pin-container");
                    document.querySelector('.chat__column').appendChild(btn);
                    document.querySelector('.chat__column').insertBefore(btn, document.querySelector('.chat__column').childNodes[0]);
                    logging('chat.highlight', ' Enabled.')
                }
            } else {
                logging('core', "Can't find default emote picker.")
                makedE = false
            }
        }, 1000)

        function addToEmotes(name) {
            var imgurID = name.split('#');
            let btn = document.createElement("button");
            btn.innerHTML = `<img class="emoji-picker__custom-emoji" src="https://i.imgur.com/${imgurID[1]}.png">`;
            btn.className = "emoji-picker__emoji";
            btn.title = imgurID[0];
            btn.style.opacity = "1";
            btn.onclick = function() {
                document.querySelector('.emoji-picker__wrapper').style.display = 'none';
                document.querySelector('#chat-form #message').value = document.querySelector('#chat-form #message').value + ' ' + imgurID[0];
                document.querySelector('#chat-form #message').select();
                document.querySelector('#chat-form #message').focus();
            };
            document.getElementById('4ussEmotes-list').appendChild(btn);
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
                            inp.value = this.getElementsByTagName("input")[0].value;
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

        var element = document.createElement("ul");
        element.className = 'navigation navigation-main betterbrime-settings';
        element.innerHTML = `<li class="navigation-header text-truncate"><span>BetterBrime Settings</span><img src="chrome-extension://enllbhcjgidenbenoifmjlkncigppooi/assets/icons/128.png" class="feather-more-horizontal"></li>`
        document.querySelector('.main-menu-content').appendChild(element);
        addSettings('cDesign', 'Custom Design', 'fas fa-fill', 'normal')
        addSettings('rBackground', 'Highlight message', 'fas fa-quote-right', 'normal')
        addSettings('lChat', 'Chat lines', 'fas fa-grip-lines', 'normal')
        addSettings('upload', 'Upload emote', 'fas fa-cloud', 'url', 'https://brime.4uss.cyou/upload')

        function addSettings(id, name, fa, type, url) {
            let btn = document.createElement("li");
            if(type === 'url'){
                btn.innerHTML = `<a class="d-flex align-items-center" href="${url}" target="_blank"><i class="${fa}"></i> <span class="menu-title text-truncate normalMenu">${name}</span></a>`;
            }else{
                if (localStorage.getItem(`BB${id}`) === 'true') {
                    btn.innerHTML = `<a class="d-flex align-items-center"><i class="${fa}"></i> <span class="menu-title text-truncate normalMenu">${name}</span>&nbsp;<input id="${id}" type="checkbox" name="${id}" checked> </a>`;
                } else {
                    btn.innerHTML = `<a class="d-flex align-items-center"><i class="${fa}"></i> <span class="menu-title text-truncate normalMenu">${name}</span>&nbsp;<input id="${id}" type="checkbox" name="${id}"> </a>`;
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
            btn.className = "nav-item";
            document.querySelector('.betterbrime-settings').appendChild(btn);
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
    }

    function logging(w, m) {
        console.log(`%cBetterBrime [%c${w}%c]:%c ${m}`, 'color:#d2ffa8; font-weight:bold', '', 'color:#d2ffa8; font-weight:bold', '')
    }
}
initBetterBrime();