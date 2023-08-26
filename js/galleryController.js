
function renderGallery() {
    let imgs = getImgs()
    let strHTML = imgs.map(img => `
    <div class="img-container"><img src="${img.url}" class="img-${img.id}" onclick="onImgSelect(${img.id})"></div>`).join('')
    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = strHTML
    renderKeyWords()
    // renderUploadedImgs()
}

// function renderUploadedImgs(){
//     const uploadedImgs= getUploadedImgs()
//     console.log(uploadedImgs)
//     if (!uploadedImgs||!uploadedImgs.length) return
//     let strHTML = uploadedImgs.map((img,idx) => `
//     <div class=""><img src="${img}" class="" onclick="onUploadedImgSelect(${idx})">
//     <button>Delete</button></div>`).join('')
//     const elUploaded =document.querySelector('.uploaded-imgs')
//     elUploaded.innerHTML = strHTML
// }
// function onUploadedImgSelect(idx){
//     // to move to service
//     gMeme.isFromGallery=true
//     showEditor()
//     setImg(idx)
//     renderMeme()
// }

function onImgSelect(elImgId) {
    showEditor()
    setImg(elImgId)
    renderMeme()
}

function showGallery() {
    onFilterBy('All')
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved-memes')
    elSaved.style.display = 'none'
    elEditor.style.display = 'none'
    elGallery.style.display = 'block'
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    // if (!savedMemes) return
    const elSaved = document.querySelector('.saved-memes')
    let strHTML = savedMemes.map((savedMeme, idx) => `
    <div><img src="${savedMeme.imgContent}" alt="" onclick="onEditSavedMeme(${idx})">
    <button data-trans="delete" onclick="onDeleteSavedMeme(${idx})">Delete</button></div>`).join('')
    elSaved.innerHTML = strHTML
    doTrans()

}

function showSavedMemes() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved-memes')
    elEditor.style.display = 'none'
    elGallery.style.display = 'none'
    elSaved.style.display = 'flex'
    renderSavedMemes()
}


function onFilterBy(value) {
    filterBy(value)
    renderGallery()
}

//////////////////////////////////////////////
function onImgInput(ev) {
    loadImageFromInput(ev, saveImgToImgs)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function saveImgToImgs(img) {
    console.log(img.src)
    console.log(gImgs)
    addToGImgs(img.src)
    renderGallery()
    
    // showEditor()
    // renderMeme()
}

function renderKeyWords() {
    const keyWords = getKeyWords()
    const elKeyWords = document.querySelector('.key-words')
    const strHTML = keyWords.map((keyWord, idx) => `
    <span onclick="onKeyword(${idx})" data-trans="${keyWord.word}"  value="${keyWord.word}"
    class="key-word key-word${idx}" style="font-size: ${keyWord.times}px;">${keyWord.word}</span>`).join('')
    elKeyWords.innerHTML = strHTML
    doTrans()
}

function onKeyword(idx) {
    growFilterKeyWord(idx)
    renderGallery()
}


function onSetLang(lang) {
    const elLang=document.querySelector('.lang')
    elLang.value=lang
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderGallery()
    doTrans()  
}