var extension = function() {
	var star = '<svg xmlns="http://www.w3.org/2000/svg" class="star" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47 55"><defs><style>.a{clip-path:url(#b);}.b{fill:none;}.c,.d{stroke:none;}.d{fill:blue;}</style><clipPath id="b"><rect width="47" height="55"/></clipPath></defs><g id="a" class="a"><g class="b" transform="translate(-30.603 -40.421)"><path class="c" d="M30.6,54.609h46.98L53.748,95.155Z"/><path class="d" d="M 35.76966857910156 57.609375 L 53.78603363037109 89.17063140869141 L 72.33926391601563 57.609375 L 35.76966857910156 57.609375 M 30.602783203125 54.609375 L 77.582763671875 54.609375 L 53.7479248046875 95.15528869628906 L 30.602783203125 54.609375 Z"/></g><g class="b" transform="translate(-62.438 39.884) rotate(-60)"><path class="c" d="M30.6,54.609h46.98L53.748,95.228Z"/><path class="d" d="M 35.76509094238281 57.60936737060547 L 53.78605270385742 89.23533630371094 L 72.34402465820313 57.60936737060547 L 35.76509094238281 57.60936737060547 M 30.602783203125 54.60936737060547 L 77.582763671875 54.60936737060547 L 53.7479248046875 95.22802734375 L 30.602783203125 54.60936737060547 Z"/></g></g></svg>';
	var telAvivIds = [];
	var telAvivUIds = [];
	var flaggotCount = document.createElement('span');
	var showThemToggle = true;
	
	var getParentNodeByClassName = function(node, name) {
		if (node === null || node.className.indexOf('moshe') !== -1)
			return null;
		if (typeof node.className !== 'undefined' 
		    && node.className.indexOf(name) !== -1) {
			return node;
		} else {
			return getParentNodeByClassName(node.parentNode, name);
		}
	};

	var hidePost = function(postContainer) {
		if (postContainer !== null) {
			if (postContainer.className.indexOf('opContainer') !== -1) {
				if (window.location.href.indexOf('thread') === -1) {
					postContainer.parentNode.className += ' post-hidden';
				}
			} else {
				postContainer.className += ' moshe post-hidden';
			}
		}
	};

	var concentrateThem = function(nameBlock) {
		if (nameBlock !== null) {
			var postId = nameBlock.getElementsByClassName('postNum')[0].lastElementChild.text;
			var userId = nameBlock.getElementsByClassName('posteruid')[0].className.replace('posteruid id_', '');
			if (telAvivIds.indexOf(postId) === -1) {
				telAvivIds.push(postId);
			}
			if (telAvivUIds.indexOf(userId) === -1) {
				telAvivUIds.push(userId);
			}
		}
	};

	var getMemeFlags = function() {
		var flags = document.getElementsByClassName('countryFlag');
		
		for (var i=(telAvivIds.length*2); i<flags.length; i++) {
			var flag = flags[i];
			if (flag.src.indexOf('troll') !== -1) {
				hidePost(getParentNodeByClassName(flag, 'postContainer'));
				concentrateThem(flag.parentNode.parentNode);
				flag.parentNode.innerHTML += star;
			}
			flaggotCount.innerHTML = ' / <span data-tip="shill posts" class="ts-ips shillCnt">' + telAvivIds.length + '</span> '+
			                         '/ <span data-tip="unique shills" class="ts-ips shillCnt">' + telAvivUIds.length + '</span>';
		}

		var schemers = document.getElementsByClassName('flag-il');
		for (var i=0; i<schemers.length; i++) {
			schemers[i].parentNode.innerHTML += star.replace('star', 'star half');
		}
	};

	var getMemeQuoteLinks = function() {
		var allQuoteLinks = document.getElementsByClassName('quotelink');
		for (var i=0; i<allQuoteLinks.length; i++) {
			if (telAvivIds.indexOf(allQuoteLinks[i].innerText.substring(2)) !== -1) {
				allQuoteLinks[i].innerHTML += ' (✡️)';
			}
		}
	}

	var mutationCallback = function(list, observer) {
		getMemeFlags();
	};

	var onShowThem = function(e) {
		var them = document.getElementsByClassName('moshe');
		var showThemLinks = document.getElementsByClassName('showThem');
		if (showThemToggle) {
			for (var i=0; i<them.length; i++) {
				them[i].className = them[i].className.replace(' post-hidden', '');
			}
			for (var i=0; i<showThemLinks.length; i++) {
				
				showThemLinks[i].innerHTML = 'Hide Shills';
			}
			showThemToggle = false;
		} else {
			for (var i=0; i<them.length; i++) {
				them[i].className += ' post-hidden';
			}
			for (var i=0; i<showThemLinks.length; i++) {
				showThemLinks[i].innerHTML = 'Unhide Shills';
			}
			showThemToggle = true;
		}
	};

	var onBringToTop = function(e) {
		var them = document.getElementsByClassName('moshe');
		var firstPost = document.getElementsByClassName('replyContainer')[0];
		var fpParent = firstPost.parentNode;
		for (var i=0; i<them.length; i++) {
			fpParent.insertBefore(them[i], firstPost);
		}
		if (showThemToggle) {
			onShowThem();
		}
	};

	var onQuoteThem = function(e) {
		togglePostFormLink.firstElementChild.click();
		var body = postForm.getElementsByTagName('textarea')[0];
		var quoteStr = '';
		for (var i=0; i<telAvivIds.length; i++) {
			quoteStr += '>>' + telAvivIds[i] + '\n';
		}
		body.value = quoteStr;
		body.focus();
	};

	var addNavLinks = function(navLinkSection, iteration) {
		console.log(navLinkSection);
		if (typeof navLinkSection.appendChild !== 'function') {
			navLinkSection = navLinkSection.parentNode;
		}

		var showThem = document.createElement('a');
		var bringToTop = document.createElement('a');
		var quoteThem = document.createElement('a');
		
		
		showThem.setAttribute('href', 'javascript:void(0)');
		showThem.setAttribute('id', 'showThem_' + iteration);
		showThem.className = 'showThem';
		bringToTop.setAttribute('href', 'javascript:void(0)');
		bringToTop.setAttribute('id', 'bringToTop_' + iteration);
		quoteThem.setAttribute('href', '#')
		quoteThem.setAttribute('id', 'quoteThem_' + iteration);
		showThem.innerHTML = 'Unhide Shills';
		bringToTop.innerHTML = 'Bring Shills to Top';
		quoteThem.innerHTML = 'Quote Them';
		

		navLinkSection.appendChild(flaggotCount);
		navLinkSection.innerHTML += '  &nbsp; [';
		navLinkSection.appendChild(showThem);
		navLinkSection.innerHTML += '] [';
		navLinkSection.appendChild(bringToTop);
		navLinkSection.innerHTML += '] [';
		navLinkSection.appendChild(quoteThem);
		navLinkSection.innerHTML += ']';

		document.getElementById('showThem_' + iteration)
			.addEventListener('click', onShowThem)
		document.getElementById('bringToTop_' + iteration)
			.addEventListener('click', onBringToTop)
		document.getElementById('quoteThem_' + iteration)
			.addEventListener('click', onQuoteThem)

	};

	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			getMemeFlags();
			getMemeQuoteLinks();
			var navLinkSections = document.getElementsByClassName('thread-stats');
			
			for (var i=0; i<navLinkSections.length; i++) {
				addNavLinks(navLinkSections[i], i);
			}
			var observer = new MutationObserver(mutationCallback);
			observer.observe(
				document.getElementsByClassName('thread')[0], 
				{ attributes: false, childList: true, subtree: false }
			);
		}
	}, 300);
}
if (typeof InstallTrigger !== 'undefined') {
	extension();
} else {
	chrome.extension.sendMessage({}, extension);
}