function renderGallery() {
    let imgs = getImgs()
    let strHTML = imgs.map(img => `
    <img src="${img.url}" class="img-${img.id}" onclick="onImgSelect(${img.id})">`).join('')
    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = strHTML
}

{/* <img src="meme-imgs (square)/1.jpg" onclick="onSelectImg(this)"> */ }

function onImgSelect(elImgId) {
    showEditor()
    setImg(elImgId)
    renderMeme()
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
    console.log(savedMemes[0].meme)
    const elSaved = document.querySelector('.saved-memes')
    let strHTML = savedMemes.map((savedMeme, idx) => `
    <img src="${savedMeme.imgContent}" alt="" onclick="onEditSavedMeme(${idx})">`).join('')
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