'use strict'

var gImgFilter

const STORAGE_KEY_IMGS = 'uploadedDB'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['angry'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'angry'] },
    { id: 6, url: 'img/6.jpg', keywords: [] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby'] },
    { id: 8, url: 'img/8.jpg', keywords: [] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/11.jpg', keywords: [] },
    { id: 12, url: 'img/12.jpg', keywords: [] },
    { id: 13, url: 'img/13.jpg', keywords: [] },
    { id: 14, url: 'img/14.jpg', keywords: [] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'img/17.jpg', keywords: [] },
    { id: 18, url: 'img/18.jpg', keywords: [] },
    { id: 19, url: 'img/19.jpg', keywords: ['angry'] },
    { id: 20, url: 'img/20.jpg', keywords: [] },
    { id: 21, url: 'img/21.jpg', keywords: [] },
    { id: 22, url: 'img/22.jpg', keywords: ['funny'] },
    { id: 23, url: 'img/23.jpg', keywords: [] },
    { id: 24, url: 'img/24.jpg', keywords: ['dog'] },
    { id: 25, url: 'img/25.jpg', keywords: ['happy'] }
]

var gKeyWords = [
    {
        word: 'funny',
        times: 14
    },
    {
        word: 'cat',
        times: 10
    },
    {
        word: 'baby',
        times: 9
    },
    {
        word: 'angry',
        times: 15
    },
    {
        word: 'dog',
        times: 20
    }
]

function getImgs() {
    if (loadFromStorage(STORAGE_KEY_IMGS)) {
        gImgs = loadFromStorage(STORAGE_KEY_IMGS)
    }
    if (!gImgFilter || gImgFilter === 'All') return gImgs
    let imgs = gImgs.filter(gImg => gImg.keywords.includes(gImgFilter))

    return imgs
}

function filterBy(value) {
    gImgFilter = value
}

function addToGImgs(imgSrc) {
    // const img = img
    // gUploadedImgs.push(img)
    // const uploadedImgs =structuredClone(gUploadedImgs)
    gImgs.unshift({ id: gImgs.length + 1, url: imgSrc, keywords: [] })
    saveToStorage(STORAGE_KEY_IMGS, gImgs)
}

// function getUploadedImgs(){
//     return loadFromStorage(STORAGE_KEY_IMGS)
// }

// function getUploadedImg(idx){
//     console.log(idx)

//     const uploadedImgs = loadFromStorage(STORAGE_KEY_IMGS)
//     return uploadedImgs[idx]
// }

function growFilterKeyWord(idx) {
    gKeyWords[idx].times++
    filterBy(gKeyWords[idx].word)
}

function getKeyWords() {
    return gKeyWords
}
