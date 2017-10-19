// Destroy audible, inactive tabs

chrome.tabs.onUpdated.addListener((id, info, tab) => {
  if(info["audible"] === true) {
    console.log(tab)
    chrome.tabs.update(id, {"muted": true})
  }
})
