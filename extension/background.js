chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (!(currentTab && currentTab.url.includes("squaredle.app"))) {
        return;
    }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function () {
          (function () {
            var b = '';
            document.querySelectorAll('#board div.letter>div>div').forEach(x => (b = b + x.textContent));
            window.open('https://squaredle-solver.pages.dev/?board=' + b, '_blank');
          })();
        },
      });
    });
  });