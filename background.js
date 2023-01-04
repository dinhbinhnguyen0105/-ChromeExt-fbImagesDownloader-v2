('use strict');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.status === 'activated') {
        sendResponse({ result: 'any response from background' });

        chrome.tabs.query({ active: true }).then(sendMessageToTabs).catch(onError);
    } else {
        sendResponse({ result: 'error', message: `Invalid 'cmd'` });
    }
    return true;
});

function onError(error) {
    console.error(`Error: ${error}`);
}

function sendMessageToTabs(tab) {
    chrome.tabs.sendMessage(tab[0].id, {
        tab : tab[0]
    })
        .then((response) => {
            console.log('Message from the content script:');
            console.log(response.response);
        })
        .catch(onError);
}
