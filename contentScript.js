console.log('contentScript.js');
chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
    const dialogs = document.querySelectorAll('div[role="dialog"]');
    let dialog = null;
    dialogs.forEach(_dialog => {
        if(_dialog.offsetWidth > 0) {
            dialog = _dialog;
        };
    })

    const imagesElm = dialog.querySelectorAll('img[referrerpolicy="origin-when-cross-origin"]');
    if (imagesElm.length > 0) {
        const imagesSrc = [];
        imagesElm.forEach((image) => {
            const srcAtt = image.getAttribute('src');
            if(!imagesSrc.includes(srcAtt)) 
            imagesSrc.push(srcAtt)
        });
        imagesSrc.forEach(imageSrc => {
            downloadImage(imageSrc, getName(imageSrc));
        })
        sendRes({ response: 'Downloaded' });
    }
});

const getName = (src) => {
    const srcSub = src.split('/');
    const name = srcSub[srcSub.length - 1].split('?');
    return name[0];
};

const downloadImage = async (src, name) => {
    const image = await fetch(src);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
