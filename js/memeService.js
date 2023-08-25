'use strict'

const STORAGE_KEY = 'memesDB'
var gMemes = []

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: [
        {
            txt: 'Write something',
            size: 20,
            font: 'Impact',
            width: 207,
            color: 'white',
            x: 200,
            y: 50,
            alignment: 'center',
            isDrag: false
        }
    ]
}

function changeGmeme(savedMemeIdx) {
    const savedMemes = loadFromStorage(STORAGE_KEY)
    console.log(savedMemes[savedMemeIdx].meme)
    gMeme = savedMemes[savedMemeIdx].meme
    
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

function addLine() {
    gMeme.lines.push({ txt: 'Text', size: 20, font: 'Impact', width: 20, color: 'white', x: 200, y: 300, alignment: 'center', isDrag: false })
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
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x +=dx
    gMeme.lines[gMeme.selectedLineIdx].y +=dy

}
function changeFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}

function setAlignment(value) {
    // const gMemeWidth =gMeme.lines[gMeme.selectedLineIdx].width
    gMeme.lines[gMeme.selectedLineIdx].alignment = value
    // gMeme.lines[gMeme.selectedLineIdx].x +=gMemeWidth/2
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function saveMeme(imgContent) {
    gMemes.push({ meme: gMeme, imgContent })
    saveToStorage(STORAGE_KEY, gMemes)
}

function deleteSavedMeme(savedMemeIdx) {
    gMemes.splice(savedMemeIdx, 1)
    saveToStorage(STORAGE_KEY, gMemes)
}

function getSavedMemes() {
    console.log(loadFromStorage(STORAGE_KEY))
    return loadFromStorage(STORAGE_KEY)
}

function randomMeme() {
    const randImgIdx = getRandomIntInclusive(0, gImgs.length - 1)
    gMeme.selectedImgId = randImgIdx
    gMeme.lines[0].txt = 'That moment when'
}

