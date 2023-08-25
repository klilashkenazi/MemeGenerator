var gImg

function renderGallery() {
    let imgs = getImgs()
    let strHTML = imgs.map(img => `
    <div class="img-container"><img src="${img.url}" class="img-${img.id}" onclick="onImgSelect(${img.id})"></div>`).join('')
    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = strHTML
}

function onImgSelect(elImgId) {
    showEditor()
    setImg(elImgId)
    renderMeme()
    // gImg=null
}

function showGallery() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved-memes')
    elSaved.style.display = 'none'
    elEditor.style.display = 'none'
    elGallery.style.display = 'block'
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elSaved = document.querySelector('.saved-memes')
    let strHTML = savedMemes.map((savedMeme, idx) => `
    <img src="${savedMeme.imgContent}" alt="" onclick="onEditSavedMeme(${idx})">
    <button onclick="onDeleteSavedMeme(${idx})">Delete</button>`).join('')
    elSaved.innerHTML = strHTML

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
    console.log(gImgs.length+1)
    addToGImgs(img.src)
    renderGallery()
    // showEditor()
    // renderMeme()

}


// var gKeyWords = ['funny', 'cat']

// function renderKeyWords() {
//     const elKeyWords = document.querySelector('.key-words')
//     const strHTML = gKeyWords.map((keyWord, idx) => `
//     <span class="key-word key-word-${idx}" onclick="growKeyWord(${idx})">${keyWord}</span>`).join('')
//     elKeyWords.innerHTML = strHTML
// }

// function growKeyWord(idx) {
//     console.log('hi', idx)
//     const elKeyWord = document.querySelector(`.key-word-${idx}`)
//     elKeyWord.style.fontSize++
//     console.log(elKeyWord.style.fontSize)

//     renderKeyWords()
// }
