function saveSite(name) {
  if(!name) {
    createMessage("Invalid site name.")
    return
  }

  let newObj = {}
  newObj[name] = name

  chrome.storage.sync.set(newObj, () => {
    createMessage(`Added ${name}`)
  })

  updateList()
}

function createMessage(str) {
  const message = document.querySelector('#message')

  message.innerHTML = str
}

function updateList() {
  const list = document.querySelector('#site-list')
  list.innerHTML = ''

  chrome.storage.sync.get(null, (items) => {
    for(item in items) {
      let node = document.createElement("LI")
      let textnode = document.createTextNode(item)
      node.appendChild(textnode)
      list.appendChild(node)
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
