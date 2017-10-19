// Destroy audible, inactive tabs

chrome.tabs.query({"audible": true}, (result) => {
  console.log(result)

})
