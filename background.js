// Destroy audible, inactive tabs

function muteTab(tab){
  if(tab["audible"] && !tab["highlighted"]) {
    console.log(tab)
    chrome.tabs.update(tab["id"], {"muted": true})
  }
  else {
    chrome.tabs.update(tab["id"], {"muted": false})
  }
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
