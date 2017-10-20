// Returns true if site is trusted, otherwise false

function isTrusted(url) {
  return new Promise((res, rej) => {
    chrome.storage.sync.get(url, (items) => {
      if(items[url]) {
        res(true)
      } else {
        rej(false)
      }
    })
  })
}

// Destroy audible, inactive, distrusted tabs

function muteTab(tab){
  isTrusted(tab["url"])
    .then(() => {
      chrome.tabs.update(tab["id"], {"muted": false})
    })
    .catch(() => {
      if(tab["audible"] && !tab["highlighted"]) {
        chrome.tabs.update(tab["id"], {"muted": true})
      } else {
        chrome.tabs.update(tab["id"], {"muted": false})
      }
    })
}

// Other tab starts playing sound

chrome.tabs.onUpdated.addListener((id, info, tab) => {
  muteTab(tab)
})

// User changes tab, mute other tabs

chrome.tabs.onHighlightChanged.addListener((info) => {
  chrome.tabs.query({"audible": true}, (tabs) => {
    for(tab of tabs) {
      muteTab(tab)
    }
  })
})
