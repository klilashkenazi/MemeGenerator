'use strict'

function renderMeme() {
    const meme = getMeme()
    const memeLines = meme.lines
    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        memeLines.map((memeLine, idx) => drawText(memeLine.txt, memeLine.color, memeLine.size, 200, 50 + idx * 250))

    }
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
    const textMetrics= gCtx.measureText(text)
    frameLine(x-(textMetrics.width+10)/2,y-25,textMetrics.width+10)

}

function frameLine(x, y,width) {
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    //  gCtx.fillRect(x, y, 390, 50);   
    gCtx.strokeRect(x, y, width, 50);
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
}