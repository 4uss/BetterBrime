//if(!localStorage.customDesign){localStorage.customDesign = false;};
let maked = false
let makedE = false
let emotesList = ['EZ'];
let badgeList = ['xanax']

loadDesign();
function loadDesign(){
	//if(localStorage.customDesign === true) return;
		var style = document.createElement("link")
		style.setAttribute("rel", "stylesheet")
		style.setAttribute("type", "text/css")
		style.setAttribute("href", chrome.extension.getURL('brimelive.css?v='+chrome.runtime.getManifest().version))
		var head = document.getElementsByTagName('head')[0];
		if (!head) return;
		head.appendChild(style);
		logging('site.design', ' Loaded new design.')
}

fetch('https://api.4uss.cyou/aktor/emotes.php')
  .then(response => response.json())
  .then(data => emotesList = data)
  .then(logging('chat.emotes', ' Loaded data about emojis..'));
setInterval(() => {
	const target = document.querySelector('#chat-thread')
	
	if (target) {
		if (!maked || !target.hasAttribute('data-maked-observer')) {
			makeObserver(target)
			maked = true
			target.setAttribute('data-maked-observer', '1')
		}		
	} else {
		logging('core', "Can't find chat.")
		maked = false
	}
}, 1000)

function makeObserver(target) {
	logging('core', ' Started observing chat.')
	const config = { childList: true }

	let observer2 = null
	const callback2 = function(mutationsList, observer) {
	    for (let mutation of mutationsList) {
	        if (mutation.type === 'childList') {
	            //console.log('childList 2')
	            mutation.addedNodes.forEach(node => {
	                Array.from(node.querySelectorAll("span[style='font-size: 13px;']")).forEach(img => {
						for (var i = 0; i < emotesList.length; i++) {
							var imgurID = emotesList[i].split('#');
							img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), `<img alt="${imgurID[0]}" title="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">`);
						}
	                })
					Array.from(node.querySelectorAll("a[href='/xanax']")).forEach(img => {
						if(img.innerHTML === 'xanax'){
							for (var i = 0; i < badgeList.length; i++) {
								img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i] + '( |$)', 'g'), `<img alt="4uss Staff" title="4uss Staff" src="https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1?v=${chrome.runtime.getManifest().version}"> xanax`)
							}
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
							img.innerHTML = img.innerHTML.replace(new RegExp(imgurID[0] + '( |$)', 'g'), `<img alt="${imgurID[0]}" title="${imgurID[0]}" src="https://i.imgur.com/${imgurID[1]}.png">`);
						}
	                })
					Array.from(node.querySelectorAll("a[href='/xanax']")).forEach(img => {
						if(img.innerHTML === 'xanax'){
							for (var i = 0; i < badgeList.length; i++) {
								img.innerHTML = img.innerHTML.replace(new RegExp(badgeList[i] + '( |$)', 'g'), `<img alt="4uss Staff" title="4uss Staff" src="https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1?v=${chrome.runtime.getManifest().version}"> xanax`)
							}
						}
	                })
	            })
	        }
	    }
	}	
	const observer = new MutationObserver(callback)
	observer.observe(target, config)
}
function logging(w, m){
    console.log(`%c4ussEmotes [%c${w}%c]:%c ${m}`, 'color:#573b28; font-weight:bold', '', 'color:#573b28; font-weight:bold', '')
}
setInterval(() => {
	const target = document.querySelector('.emoji-picker__emoji');
	
	if (target) {
		if (!makedE) {
		var element = document.createElement("h2");
		element.className = 'emoji-picker__category-name';
		element.appendChild(document.createTextNode('4uss Emotes'));
		document.querySelector('.emoji-picker__emojis').appendChild(element);
		//
		var element = document.createElement("div");
		element.className = 'emoji-picker__container';
		element.id = '4ussEmotes-list';
		document.querySelector('.emoji-picker__emojis').appendChild(element);	

		emotesList.map((item, i) => addToEmotes(item));

		makedE = true
		logging('site.emotepicker', ' Loaded emote picker.')
		}
	} else {
		logging('core', "Can't find default emote picker.")
		makedE = false
	}
}, 1000)
function addToEmotes(name){
	var imgurID = name.split('#');
	let btn = document.createElement("button");
	btn.innerHTML = `<img class="emoji-picker__custom-emoji" src="https://i.imgur.com/${imgurID[1]}.png">`;
	btn.className = "emoji-picker__emoji";
	btn.title = imgurID[0];
	btn.style.opacity = "1";
	btn.onclick = function () {
		document.querySelector('.emoji-picker__wrapper').style.display = 'none';
		document.querySelector('#chat-form #message').value = document.querySelector('#chat-form #message').value+' '+imgurID[0];
		document.querySelector('#chat-form #message').select();
		document.querySelector('#chat-form #message').focus();
	};
	document.getElementById('4ussEmotes-list').appendChild(btn);
}