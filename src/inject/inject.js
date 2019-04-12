const extension = () => {
  const star = '<svg xmlns="http://www.w3.org/2000/svg" class="star" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47 55"><defs><style>.a{clip-path:url(#b);}.b{fill:none;}.c,.d{stroke:none;}.d{fill:blue;}</style><clipPath id="b"><rect width="47" height="55"/></clipPath></defs><g id="a" class="a"><g class="b" transform="translate(-30.603 -40.421)"><path class="c" d="M30.6,54.609h46.98L53.748,95.155Z"/><path class="d" d="M 35.76966857910156 57.609375 L 53.78603363037109 89.17063140869141 L 72.33926391601563 57.609375 L 35.76966857910156 57.609375 M 30.602783203125 54.609375 L 77.582763671875 54.609375 L 53.7479248046875 95.15528869628906 L 30.602783203125 54.609375 Z"/></g><g class="b" transform="translate(-62.438 39.884) rotate(-60)"><path class="c" d="M30.6,54.609h46.98L53.748,95.228Z"/><path class="d" d="M 35.76509094238281 57.60936737060547 L 53.78605270385742 89.23533630371094 L 72.34402465820313 57.60936737060547 L 35.76509094238281 57.60936737060547 M 30.602783203125 54.60936737060547 L 77.582763671875 54.60936737060547 L 53.7479248046875 95.22802734375 L 30.602783203125 54.60936737060547 Z"/></g></g></svg>';
  const telAvivIds = [];
  const flaggotCount = document.createElement('span');
  let showThemToggle = true;

  const getParentNodeByClassName = (node, name) => {
    if (node === null || node.className.indexOf('moshe') !== -1) {
      return null;
    }
    if (typeof node.className !== 'undefined' && node.className.indexOf(name) !== -1) {
      return node;
    } else {
      return getParentNodeByClassName(node.parentNode, name);
    }
  };

  const hidePost = (postContainer) => {
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

  const concentrateThem = (nameBlock) => {
    if (nameBlock !== null) {
      const postId = nameBlock.getElementsByClassName('postNum')[0].lastElementChild.text;
      if (telAvivIds.indexOf(postId) === -1) {
        telAvivIds.push(postId);
      }
    }
  };

  const getMemeFlags = () => {
    const flags = document.getElementsByClassName('countryFlag');

    for (let i=(telAvivIds.length*2); i<flags.length; i++) {
      const flag = flags[i];
      if (flag.src.indexOf('troll') !== -1) {
        hidePost(getParentNodeByClassName(flag, 'postContainer'));
        concentrateThem(flag.parentNode.parentNode);
        flag.parentNode.innerHTML += star;
      }
      flaggotCount.innerHTML = telAvivIds.length;
    }

    const schemers = document.getElementsByClassName('flag-il');
    for (let i=0; i<schemers.length; i++) {
      schemers[i].parentNode.innerHTML += star.replace('star', 'star half');
    }
  };

  const mutationCallback = (list, observer) => {
    getMemeFlags();
  };

  const onShowThem = (e) => {
    const them = document.getElementsByClassName('moshe');
    const showThemLinks = document.getElementsByClassName('showThem');
    if (showThemToggle) {
      for (let i=0; i<them.length; i++) {
        them[i].className = them[i].className.replace(' post-hidden', '');
      }
      for (let i=0; i<showThemLinks.length; i++) {
        showThemLinks[i].innerHTML = 'Hide Shills';
      }
      showThemToggle = false;
    } else {
      for (let i=0; i<them.length; i++) {
        them[i].className += ' post-hidden';
      }
      for (let i=0; i<showThemLinks.length; i++) {
        showThemLinks[i].innerHTML = 'Unhide Shills';
      }
      showThemToggle = true;
    }
  };

  const onBringToTop = (e) => {
    const them = document.getElementsByClassName('moshe');
    const firstPost = document.getElementsByClassName('replyContainer')[0];
    const fpParent = firstPost.parentNode;
    for (let i=0; i<them.length; i++) {
      fpParent.insertBefore(them[i], firstPost);
    }
    if (showThemToggle) {
      onShowThem();
    }
  };

  const onQuoteThem = (e) => {
    togglePostFormLink.firstElementChild.click();
    const body = postForm.getElementsByTagName('textarea')[0];
    let quoteStr = '';
    for (let i=0; i<telAvivIds.length; i++) {
      quoteStr += '>>' + telAvivIds[i] + '\n';
    }
    body.value = quoteStr;
    body.focus();
  };

  const addNavLinks = (navLinkSection, iteration) => {
    const showThem = document.createElement('a');
    const bringToTop = document.createElement('a');
    const quoteThem = document.createElement('a');

    showThem.setAttribute('href', 'javascript:void(0)');
    showThem.setAttribute('id', 'showThem_' + iteration);
    showThem.className = 'showThem';
    bringToTop.setAttribute('href', 'javascript:void(0)');
    bringToTop.setAttribute('id', 'bringToTop_' + iteration);
    quoteThem.setAttribute('href', '#');
    quoteThem.setAttribute('id', 'quoteThem_' + iteration);
    showThem.innerHTML = 'Unhide Shills';
    bringToTop.innerHTML = 'Bring Shills to Top';
    quoteThem.innerHTML = 'Quote Them';

    navLinkSection.innerHTML += '[';
    navLinkSection.appendChild(showThem);
    navLinkSection.innerHTML += ' (';
    navLinkSection.appendChild(flaggotCount);
    navLinkSection.innerHTML += ')] [';
    navLinkSection.appendChild(bringToTop);
    navLinkSection.innerHTML += '] [';
    navLinkSection.appendChild(quoteThem);
    navLinkSection.innerHTML += ']';

    document.getElementById('showThem_' + iteration)
        .addEventListener('click', onShowThem);
    document.getElementById('bringToTop_' + iteration)
        .addEventListener('click', onBringToTop);
    document.getElementById('quoteThem_' + iteration)
        .addEventListener('click', onQuoteThem);
  };

  const main = () => {
    getMemeFlags();
    const navLinkSections = document.getElementsByClassName('navLinks');
    for (let i=0; i<navLinkSections.length; i++) {
      addNavLinks(navLinkSections[i], i);
    }
    const observer = new MutationObserver(mutationCallback);
    observer.observe(
        document.getElementsByClassName('thread')[0],
        {attributes: false, childList: true, subtree: false}
    );
  };
  main();
};

if (typeof InstallTrigger !== 'undefined') {
  extension();
} else {
  chrome.extension.sendMessage({}, extension);
}
