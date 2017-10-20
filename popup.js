// Save site with given url

function saveSite(url) {
  if(!url) {
    createMessage("Invalid site name.")
    return
  }

  let newObj = {}
  newObj[url] = url

  chrome.storage.sync.set(newObj, () => {
    createMessage(`Added ${url}`)
  })

  updateList()
}

// Output a message beneath site list

function createMessage(str) {
  const message = document.querySelector('#message')

  message.innerHTML = str
}

// Update list of trusted sites

function updateList() {
  const list = document.querySelector('#site-list')
  list.innerHTML = ''

  chrome.storage.sync.get(null, (items) => {
    for(item in items) {
      // anchor button
      let xBtn = document.createElement("A")
      let xClass = document.createAttribute("class")
      xClass.value = "fa fa-times"
      let xHref = document.createAttribute("href")
      xHref.value = ""
      xBtn.setAttributeNode(xClass)
      xBtn.setAttributeNode(xHref)

      // list item
      let liNode = document.createElement("LI")
      let textnode = document.createTextNode(item)
      liNode.appendChild(xBtn)
      liNode.appendChild(textnode)

      list.appendChild(liNode)
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#add-btn")
  const input = document.querySelector("#site-input")

  const addCurrentBtn = document.querySelector('#add-current-btn')

  updateList()

  addBtn.addEventListener("click", () => {
    saveSite(input.value)
  })

  addCurrentBtn.addEventListener("click", () => {
    chrome.tabs.query({"highlighted": true, "currentWindow": true},(tabs) => {
      let {url} = tabs[0]
      saveSite(url)
    })
  })
})
