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



function showGallery(){
    const elEditor = document.querySelector('.editor')
    const elGallery= document.querySelector('.gallery')
    elEditor.style.display = 'none'
    elGallery.style.display = 'block'
}