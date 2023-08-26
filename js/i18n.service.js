'use strict'

const STORAGE_KEY_LANG = 'langDB'

const gTrans = {
    gallery: {
        en: 'Gallery',
        he: 'גלריה'
    },
    'saved-memes': {
        en: 'Saved memes',
        he: 'ממים שמורים'
    },
    'coose-a-photo': {
        en: 'Choose a photo',
        he: 'בחר תמונה'
    },
    flexible: {
        en: 'I\'m flexible',
        he: 'אני גמיש'
    },
    upload: {
        en: 'Or Upload one',
        he: 'או העלה אחת'
    },
    download: {
        en: 'Download',
        he: 'הורד'
    },
    'facebook-share': {
        en: 'Share on Facebook',
        he: 'שתף בפייסבוק'
    },
    'save-meme': {
        en: 'Save meme',
        he: 'שמור מם'
    },
    all: {
        en: 'All',
        he: 'הכל'
    },
    baby: {
        en: 'baby',
        he: 'תינוקות'
    },
    angry: {
        en: 'angry',
        he: 'כועס'
    },
    dog: {
        en: 'dog',
        he: 'כלבים'
    },
    funny: {
        en: 'funny',
        he: 'מצחיק'
    },
    cat: {
        en: 'cat',
        he: 'חתולים'
    },
    delete: {
        en: 'Delete',
        he:'מחק'
    }
}

var gCurrLang 

function getTrans(transKey) {
    // console.log('transKey:', transKey) // 'sure'
    // get from gTrans
    const transMap = gTrans[transKey] // {'en':,'es:','he':}
    // if key is unknown return 'UNKNOWN'
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    // If translation not found - use english
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    // get the data-trans and use getTrans to replace the innerText
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        // console.log('el:', el)
        const transKey = el.dataset.trans
        // console.log('transKey:', transKey)
        const transTxt = getTrans(transKey)
        // console.log('transTxt:', transTxt)
        // support placeholder 
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function setLang(lang) {
    gCurrLang = lang
    saveToStorage(STORAGE_KEY_LANG,lang)
}

function savedLang(){
    if (!loadFromStorage(STORAGE_KEY_LANG) || !loadFromStorage(STORAGE_KEY_LANG).length){
        return 'en'
    }else{
        return loadFromStorage(STORAGE_KEY_LANG)
    }
}