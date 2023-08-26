'use strict'
var gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function renderMeme() {
    // resizeCanvas()
    const meme = getMeme()
    // const elImg = new Image()
    let elImg
    // if (!gImg) 
    elImg = document.querySelector(`.img-${meme.selectedImgId}`)
    // else elImg=gImg

    // elImg.src = `img/${meme.selectedImgId}.jpg`

    // elImg.onload = () => {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.map((memeLine, idx) => {
        drawText(memeLine.txt, memeLine.color, memeLine.size, memeLine.font, memeLine.alignment, memeLine.x, memeLine.y)
        const textWidth = gCtx.measureText(memeLine.txt).width
        onSetLineWidth(textWidth, idx)
        if (idx === meme.selectedLineIdx) {
            frameLine(memeLine.x, memeLine.y, memeLine.width, memeLine.size, memeLine.alignment)
        }
    })
    // }


}

function onSetLineWidth(width, idx) {
    setLineWidth(width, idx)
}

function drawText(text, color, size, font, alignment, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = size + 'px ' + font
    gCtx.textAlign = alignment
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

}

function frameLine(x, y, width, height, alignment) {
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    if (alignment === 'center') gCtx.strokeRect(x - width / 2, y - height / 2, width, height)
    if (alignment === 'left') gCtx.strokeRect(x, y - height / 2, width, height)
    if (alignment === 'right') gCtx.strokeRect(x - width, y - height / 2, width, height)
}

function onClickText(ev){
    console.log(ev)
    ev.preventDefault()

}
function onChangeText(value) {
    console.log(value)
    setLineTxt(value)
    renderMeme()
}

// function onSubmit(ev) {
//     ev.preventDefault()
// }

function onSetColor(value) {
    console.log(value)
    setColor(value)
    renderMeme()
}

function onChangeFontSize(step) {
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

// function onClickLine(ev) {
//     const { offsetX, offsetY } = ev
//     if (isLineClicked(offsetX, offsetY)) renderMeme()

// }

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos.x, pos.y)){ 
        renderMeme()
        return
    }
    setLineDrag(true)
    gStartPos = pos
    renderMeme()
}

function onMove(ev) {

    const meme = getMeme()
    let isDrag = meme.lines[meme.selectedLineIdx].isDrag
    if (!isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
    document.body.style.cursor = 'move'

}

function onUp() {
    document.body.style.cursor = 'auto'

    setLineDrag(false)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        console.log('hi phone')
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     // Changing the canvas dimension clears the canvas
//     gElCanvas.width = elContainer.clientWidth - 2
// }


function onChangeFont(value) {
    changeFont(value)
    renderMeme()
}

function onSetAlignment(value) {
    setAlignment(value)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent

}

function onRandomMeme() {
    randomMeme()
    showEditor()
    renderMeme()
}

function onSaveMeme() {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    saveMeme(imgContent)
}

function onEditSavedMeme(savedMemeIdx) {
    changeGmeme(savedMemeIdx)
    showEditor()
    renderMeme()
}
function onDeleteSavedMeme(savedMemeIdx) {
    deleteSavedMeme(savedMemeIdx)
    renderSavedMemes()

}
function showEditor() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved-memes')
    elEditor.style.display = 'flex'
    elGallery.style.display = 'none'
    elSaved.style.display = 'none'
}


function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
