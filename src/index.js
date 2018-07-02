let listCount = 0

document.addEventListener('DOMContentLoaded', () => {
  const listDiv = document.getElementById("app-content");

  const createListBtn = document.getElementById('create-list-form')
  createListBtn.addEventListener('submit', createNewList)

  const listsDiv = document.getElementById('lists')
  listsDiv.addEventListener('click', deleteList)

  function createNewList(event) {
    event.preventDefault()
    const newListTitle = document.getElementById('new-list-title').value
    const newList = new List(newListTitle)
    const listsDiv = document.getElementById('lists')
    const listHTML = `<div id="${newListTitle}">
      <h2>${newListTitle}
        <button data-title="${newListTitle}" class="delete-list">
          X
        </button>
      </h2>
      <ul>
      </ul>
    </div>`
    listsDiv.innerHTML += listHTML
    if (listCount++ === 0) {
      showNewTaskForm()
      const taskFormDiv = document.getElementById('create-task-form')
      taskFormDiv.addEventListener('submit', createNewTask)
    }
    addListOptionToForm(newListTitle)
  }

  function addListOptionToForm(listTitle) {
    const listOptions = document.getElementById('parent-list')

    listOptions.innerHTML += `
      <option value="${listTitle}">${listTitle}</option>`
  }

  function createNewTask(event) {
    event.preventDefault()
    const parentList = document.getElementById('parent-list')
    const listTitle = parentList[parentList.selectedIndex].value

    const newTaskDescription = document.getElementById('new-task-description').value
    let newTaskPriority = document.getElementById('new-task-priority').value

    if (newTaskPriority === "") {
      newTaskPriority = 'low'
    }

    const ulElement = document.querySelector(`#${listTitle} ul`)
    newTaskElement = document.createElement('li')
    newTaskElement.id = newTaskDescription
    newTaskElement.innerHTML = `  Task: ${newTaskDescription}
      <button data-list-title="${listTitle}" data-task-name="${newTaskDescription}" class="delete-task">
          X
      </button>
      <br>
      Priority: ${newTaskPriority}`
      ulElement.append(newTaskElement)

  }

  function deleteList(event) {
    if (event.target.className === "delete-list") {
      const elementToDelete = document.getElementById(event.target.dataset.title)
      elementToDelete.remove()
      if (--listCount === 0) {
        const inputForm = document.getElementById('create-task-form')
        inputForm.remove()
      }
    }
    else if (event.target.className === "delete-task") {
      const elementToDelete = document.getElementById(event.target.dataset.taskName)
      elementToDelete.remove()
    }
  }

  function showNewTaskForm() {
      const taskFormHTML = `
          <label for="parent-list">Select List:</label>
          <select id="parent-list">
          </select>

          <label for="new-task-description">Task description:</label>
          <input required type="text" id="new-task-description" placeholder="description">

          <label for="new-task-priority">Priority level:</label>
          <input type="text" id="new-task-priority" placeholder="priority">
          <input type="submit" value="Create New Task">`

    const appContent = document.getElementById('app-content')
    const formElement = document.createElement('form')
    formElement.id = "create-task-form"
    formElement.innerHTML = taskFormHTML
    appContent.append(formElement)

  }

  const app = new TaskLister();
});
