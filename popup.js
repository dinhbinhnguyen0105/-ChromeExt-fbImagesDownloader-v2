console.log('popup.js');

const btn = document.querySelector('.btn');

document.addEventListener('DOMContentLoaded', () => {
    btn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ status: 'activated' }, function (response) {
            console.log(`message from background: ${JSON.stringify(response)}`);
        });
    });
});
