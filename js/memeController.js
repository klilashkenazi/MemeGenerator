'use strict'

function renderMeme() {
    // resizeCanvas()
    const meme = getMeme()

    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.map((memeLine, idx) => {
        drawText(memeLine.txt, memeLine.color, memeLine.size, memeLine.x, memeLine.y)
        const textWidth = gCtx.measureText(memeLine.txt).width
        onSetLineWidth(textWidth,idx)
        if (idx===meme.selectedLineIdx) frameLine(memeLine.x - (textWidth + 10) / 2, memeLine.y - 25, textWidth + 10,memeLine.size+30)
    })
    }   
}

function onSetLineWidth(width,idx){
setLineWidth(width,idx)
}


function drawText(text, color, size, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color
    gCtx.fillStyle = 'black'
    gCtx.font = size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    
}

function frameLine(x, y, width,height) {
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    //  gCtx.fillRect(x, y, 390, 50);   
    gCtx.strokeRect(x, y, width, height);
}
function changeText(value) {
    console.log(value)
    setLineTxt(value)
    renderMeme()
}

function onSubmit(ev) {
    ev.preventDefault()
}
// function coverCanvasWithImg(elImg) {
//     console.log(gElCanvas)
//     gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
// }


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onSetColor(value) {
    console.log(value)
    setColor(value)
    renderMeme()
}

function onChangeFont(step) {
    setFontSize(step)
    renderMeme()
}


function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onClickLine(ev){
    const { offsetX, offsetY} = ev
    if (isLineClicked(offsetX, offsetY)) renderMeme()
    // const textWidth = gCtx.measureText(line.txt).width

 
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     // Changing the canvas dimension clears the canvas
//     gElCanvas.width = elContainer.clientWidth - 2
// }



function showEditor(){
    const elEditor = document.querySelector('.editor')
    const elGallery= document.querySelector('.gallery')
    elEditor.style.display = 'flex'
    elGallery.style.display = 'none'
}