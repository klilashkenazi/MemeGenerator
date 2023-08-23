'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write something',
            size: 20,
            width: 207,
            color: 'white',
            x: 200,
            y: 50
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
    gMeme.lines.push({ txt: 'Text', size: 20, color: 'white', x: 200, y: 300 })
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
        return x <= line.x+ (line.width+10) / 2 && x>=line.x-(line.width+10)/2
        && y<=line.y+(line.size+30)/2 && y>= line.y-(line.size+30)/2
    })    
    gMeme.selectedLineIdx=clickedLineIdx
    return (clickedLineIdx>=0)
}



// function onMouseMove(ev) {
//     const { offsetX, offsetY, clientX, clientY } = ev
//     // console.log('offsetX, offsetY:', offsetX, offsetY)
//     // console.log(' clientX, clientY:', clientX, clientY)
//     // console.log('gStars:', gStars)


//     const clickedStar = gStars.find(star => {
//         return offsetX >= star.x && offsetX <= star.x + BAR_WIDTH
//             && offsetY >= star.y && offsetY <= star.y + star.rate
//     })
//     // console.log('clickedStar:', clickedStar)
//     if (clickedStar) {
//         openModal(clickedStar.name, clickedStar.rate, clientX, clientY)
//     } else {
//         closeModal()
//     }
// }