chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (typeof chrome.pageAction !== 'undefined') {
        chrome.pageAction.show(sender.tab.id);
      }
      sendResponse();
    });
