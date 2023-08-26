'use strict'

let gElCanvas
let gCtx

function onInit() {
    const lang = savedLang()
    onSetLang(lang)
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    renderGallery()
    // window.addEventListener('resize', resizeCanvas)
}