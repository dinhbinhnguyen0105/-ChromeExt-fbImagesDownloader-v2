console.log('contentScript.js');
chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
    const lang = document.documentElement.lang;
    let imageIndex = 0;
    while(true) {
        if(lang === 'vi') {
            labelImage = `aria-label="Hình thu nhỏ ${imageIndex}"`;
        } else if (lang === 'en') {
            labelImage = `aria-label="Thumbnail ${imageIndex}"`;
        }
        const thumbnailElm = document.querySelector(`div[${labelImage}]`);
        if(thumbnailElm === null) {
            break;
        }

        const imageElement = thumbnailElm.querySelector('img');
        const imageSource = imageElement.getAttribute('src');
        downloadImage(imageSource, getName(imageSource));

        imageIndex += 1;        
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
