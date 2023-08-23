'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
}

function setImg(elImgId) {
    gMeme.selectedImgId = elImgId
}

function setColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
    console.log(gMeme)
}

function setFontSize(step) {
    gMeme.lines[gMeme.selectedLineIdx].size += step
}

function addLine() {
    gMeme.lines.push({ txt: 'Text', size: 20, color: 'white' })
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++

    }
}
