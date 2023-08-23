function renderGallery(){
    let imgs= getImgs()
    let strHTML = imgs.map(img=> `
    <img src="${img.url}" class="img-${img.id}" onclick="onImgSelect(${img.id})">`).join('')
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML=strHTML
}

{/* <img src="meme-imgs (square)/1.jpg" onclick="onSelectImg(this)"> */}

function onImgSelect(elImgId){
setImg(elImgId)
renderMeme()
}