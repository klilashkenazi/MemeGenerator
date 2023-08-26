'use strict'

const STORAGE_KEY = 'memesDB'
var gSavedMemes = []

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: [
        {
            txt: 'Write something',
            size: 30,
            font: 'Impact',
            width: 207,
            color: 'white',
            x: 200,
            y: 50,
            isDrag: false
        }
    ]
}

function changeGmeme(savedMemeIdx) {
    const savedMemes = loadFromStorage(STORAGE_KEY)
    const meme = savedMemes[savedMemeIdx].meme
    gMeme=structuredClone(meme)

}

function getMeme() {
    return gMeme
}

function setImg(elImgId) {
    gMeme.selectedImgId = elImgId
}


function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
}

function setColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function setFontSize(step) {
    gMeme.lines[gMeme.selectedLineIdx].size += step
}

function addLine(text = 'Text') {
    gMeme.lines.push({ txt: text, size: 30, font: 'Impact', width: 20, color: 'white', x: 200, y: 200, alignment: 'center', isDrag: false })
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function setLineWidth(width, idx) {
    gMeme.lines[idx].width = width
}

function isLineClicked(x, y) {

    const clickedLineIdx = gMeme.lines.findIndex(line => {
        return x <= line.x + (line.width + 10) / 2 && x >= line.x - (line.width + 10) / 2
            && y <= line.y + (line.size + 30) / 2 && y >= line.y - (line.size + 30) / 2
    })
    gMeme.selectedLineIdx = clickedLineIdx
    return (clickedLineIdx >= 0)
}

function setLineDrag(isDrag) {
    if (gMeme.selectedLineIdx < 0) return
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy

}
function changeFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}

function setAlignment(value) {
    console.log(value)
    if (value === 'center') gMeme.lines[gMeme.selectedLineIdx].x=200
    if (value === 'left') gMeme.lines[gMeme.selectedLineIdx].x=250
    if (value === 'right') gMeme.lines[gMeme.selectedLineIdx].x=150
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function saveMeme(imgContent) {
   const meme =structuredClone(gMeme)
    gSavedMemes.push({ meme, imgContent })
    saveToStorage(STORAGE_KEY, gSavedMemes)
    // console.log(localStorage)
    console.log(gSavedMemes)
}

function deleteSavedMeme(savedMemeIdx) {
    gSavedMemes.splice(savedMemeIdx, 1)
    saveToStorage(STORAGE_KEY, gSavedMemes)
    // console.log(localStorage)

}

function getSavedMemes() {
    // console.log(localStorage)
    // const savedMemes = gSavedMemes
    const savedMemes = loadFromStorage(STORAGE_KEY)
    // console.log(savedMeme)

    //    if (!savedMeme || !savedMeme.length) return 
    return savedMemes
}

function randomMeme() {
    const randImgIdx = getRandomIntInclusive(0, gImgs.length - 1)
    gMeme.selectedImgId = randImgIdx
    gMeme.lines=[]
    addLine()
    gMeme.lines[0].txt = 'That moment when'
}

