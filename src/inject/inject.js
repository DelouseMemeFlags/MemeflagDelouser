chrome.extension.sendMessage({}, function(response) {
	const star = '<svg xmlns="http://www.w3.org/2000/svg" class="star" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47 55"><defs><style>.a{clip-path:url(#b);}.b{fill:none;}.c,.d{stroke:none;}.d{fill:blue;}</style><clipPath id="b"><rect width="47" height="55"/></clipPath></defs><g id="a" class="a"><g class="b" transform="translate(-30.603 -40.421)"><path class="c" d="M30.6,54.609h46.98L53.748,95.155Z"/><path class="d" d="M 35.76966857910156 57.609375 L 53.78603363037109 89.17063140869141 L 72.33926391601563 57.609375 L 35.76966857910156 57.609375 M 30.602783203125 54.609375 L 77.582763671875 54.609375 L 53.7479248046875 95.15528869628906 L 30.602783203125 54.609375 Z"/></g><g class="b" transform="translate(-62.438 39.884) rotate(-60)"><path class="c" d="M30.6,54.609h46.98L53.748,95.228Z"/><path class="d" d="M 35.76509094238281 57.60936737060547 L 53.78605270385742 89.23533630371094 L 72.34402465820313 57.60936737060547 L 35.76509094238281 57.60936737060547 M 30.602783203125 54.60936737060547 L 77.582763671875 54.60936737060547 L 53.7479248046875 95.22802734375 L 30.602783203125 54.60936737060547 Z"/></g></g></svg>';
	let getParentNodeByClassName = (node, name) => {
		if (node === null) {
			return null;
		} else if (typeof node.className !== 'undefined' && node.className.indexOf(name) !== -1 && node.className.indexOf('moshe') === -1) {
			return node;
		} else {
			return getParentNodeByClassName(node.parentNode, name);
		}
	};


	let hidePost = (postContainer) => {
		if (postContainer !== null) {
			if (postContainer.className.indexOf('opContainer') !== -1) {
				if (window.location.href.indexOf('thread') === -1) {
					postContainer.parentNode.className = 'post-hidden';
				}
			} else {
				postContainer.className += ' moshe post-hidden';
			}
		}
	}

	let readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		let flags = document.getElementsByClassName('countryFlag');
		for (let i=0; i<flags.length; i++) {
			let flag = flags[i];
			if (flag.src.indexOf('troll') !== -1) {
				hidePost(getParentNodeByClassName(flag, 'postContainer'));
				flag.parentNode.innerHTML += star;
			}
		}

	}
	}, 10);
});