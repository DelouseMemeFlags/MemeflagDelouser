const extension = () => {
  const starSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="star" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47 55"><defs><style>.a{clip-path:url(#b);}.b{fill:none;}.c,.d{stroke:none;}.d{fill:blue;}</style><clipPath id="b"><rect width="47" height="55"/></clipPath></defs><g id="a" class="a"><g class="b" transform="translate(-30.603 -40.421)"><path class="c" d="M30.6,54.609h46.98L53.748,95.155Z"/><path class="d" d="M 35.76966857910156 57.609375 L 53.78603363037109 89.17063140869141 L 72.33926391601563 57.609375 L 35.76966857910156 57.609375 M 30.602783203125 54.609375 L 77.582763671875 54.609375 L 53.7479248046875 95.15528869628906 L 30.602783203125 54.609375 Z"/></g><g class="b" transform="translate(-62.438 39.884) rotate(-60)"><path class="c" d="M30.6,54.609h46.98L53.748,95.228Z"/><path class="d" d="M 35.76509094238281 57.60936737060547 L 53.78605270385742 89.23533630371094 L 72.34402465820313 57.60936737060547 L 35.76509094238281 57.60936737060547 M 30.602783203125 54.60936737060547 L 77.582763671875 54.60936737060547 L 53.7479248046875 95.22802734375 L 30.602783203125 54.60936737060547 Z"/></g></g></svg>';
  const memeFlagCount = document.createElement('span');
  let memeFlagIDs = [];
  let showThemToggle = true;

  /**
   * Returns the closest parent node matching class name.
   * @param {Node} node DOM Node.
   * @param {Number} name Class name
   * @return {?Node} The parent node or null.
   */
  const getParentNodeByClassName = (node, name) => {
    if (!node || !name) {
      return null;
    }
    if (node.classList.contains('moshe')) {
      return null;
    }
    if (node.classList.contains(name)) {
      return node;
    } else {
      return getParentNodeByClassName(node.parentNode, name);
    }
  };

  /**
   * Hides posts
   * @param {Node} postContainer DOM Node.
   */
  const hidePost = (postContainer) => {
    if (postContainer) {
      if (postContainer.classList.contains('opContainer')) {
        if (window.location.href.includes('thread')) {
          postContainer.parentNode.classList.add('post-hidden');
        }
      } else {
        postContainer.classList.add('moshe', 'post-hidden');
      }
    }
  };

  /**
   * Returns the ID number of a post
   * @param {Node} nameBlock DOM Node.
   * @return {string} The post ID.
   */
  const getPostID = (nameBlock) => {
    if (nameBlock) {
      return nameBlock.getElementsByClassName('postNum')[0].lastElementChild.text;
    }
  };

  const getMemeFlags = () => {
    // find meme flags
    const flags = document.getElementsByClassName('countryFlag');
    // all .countryFlag tags are meme flags, regular flags are just .flag
    for (let i = 0; i < flags.length; i++) {
      const flag = flags[i];
      // add the post id number to memeFlagIDs array
      const postID = getPostID(flag.parentNode.parentNode);
      if (postID) memeFlagIDs.push(postID);
      // hide the post
      hidePost(getParentNodeByClassName(flag, 'postContainer'));
      // set the new flag image
      flag.parentNode.innerHTML += starSVG;
    }

    // find il country code flags
    const ilFlags = document.getElementsByClassName('flag-il');
    for (let i = 0; i < ilFlags.length; i++) {
      ilFlags[i].parentNode.innerHTML += starSVG.replace('star', 'star half');
    }

    // update meme flag count
    memeFlagIDs = [...new Set(memeFlagIDs)];  // remove duplicate IDs
    memeFlagCount.innerHTML = memeFlagIDs.length;
  };

  /**
   * Called when new threads are detected
   */
  const mutationCallback = () => {
    getMemeFlags();
  };

  /**
   * Hide / Unhide shills
   */
  const onShowThem = () => {
    // toggle post-hidden class
    const them = document.getElementsByClassName('moshe');
    for (let i=0; i<them.length; i++) {
      them[i].classList.toggle('post-hidden');
    }
    // amend link label
    const showThemLinks = document.getElementsByClassName('showThem');
    let label = 'Unhide Shills';
    if (showThemToggle) label = 'Hide Shills';
    for (let i=0; i<showThemLinks.length; i++) {
      showThemLinks[i].innerHTML = label;
    }
    // toggle state
    showThemToggle = !showThemToggle;
  };

  /**
   * Bring shill posts to top
   */
  const onBringToTop = () => {
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

  const onQuoteThem = () => {
    // toggle the reply form
    const togglePostFormLink = document.getElementById('togglePostFormLink');
    togglePostFormLink.firstElementChild.click();
    // construct quote string
    let quoteStr = '';
    for (let i=0; i<memeFlagIDs.length; i++) {
      quoteStr += '>>' + memeFlagIDs[i] + '\n';
    }
    // add quote to comment box
    const postForm = document.getElementById('postForm');
    const body = postForm.getElementsByTagName('textarea')[0];
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
    navLinkSection.appendChild(memeFlagCount);
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
    // add nav links
    const navLinkSections = document.getElementsByClassName('navLinks');
    for (let i=0; i<navLinkSections.length; i++) {
      addNavLinks(navLinkSections[i], i);
    }
    // watch for new threads
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
