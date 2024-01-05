class TaskManager {
  constructor() {
    this.tasks = this.getTasksFromLocalStorage() || [];
    this.form = document.querySelector(".form__container");
    this.tasksList = document.querySelector(".tasks__list");
    this.attachFormSubmitListener();
    this.renderTasks();
  }

  attachFormSubmitListener() {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      this.handleFormSubmit();
    });
  }

  handleFormSubmit() {
    const inputTitle = document.querySelector("#input_title");
    const selectPriority = document.querySelector(".form__input--priority");
    const newTitle = inputTitle.value.trim();
    const newPriority = selectPriority.value;

    if (newTitle && newPriority) {
      const newTask = { title: newTitle, type: newPriority };
      this.tasks.push(newTask);
      this.resetForm(inputTitle, selectPriority);
      this.saveTasksToLocalStorage();
      this.renderTasks();
    }
  }

  resetForm(titleInput, prioritySelect) {
    titleInput.value = "";
    prioritySelect.value = "";
  }

  renderTasks() {
    this.clearTasksList();
    this.tasks.forEach(task => {
      const taskItem = this.createTaskElement(task);
      this.tasksList.appendChild(taskItem);
    });
  }

  createTaskElement(task) {
    const createLi = document.createElement("li");
    const createDiv = document.createElement("div");
    const createSpan = document.createElement("span");
    const createP = document.createElement("p");
    const createButton = document.createElement("button");

    createP.textContent = task.title;
    createLi.appendChild(createDiv);
    createDiv.appendChild(createSpan);
    createDiv.appendChild(createP);
    createLi.appendChild(createButton);

    createLi.classList.add("task__item");
    createDiv.classList.add("task-info__container");
    createSpan.classList.add("task-type");
    createButton.classList.add("task__button--remove-task");

    this.assignPriorityClass(createSpan, task.type.toLowerCase());
    createButton.addEventListener("click", () => {
      this.deleteTask(task);
    });

    return createLi;
  }

  assignPriorityClass(element, priority) {
    const priorityClasses = {
      urgente: "span-urgent",
      importante: "span-important",
      normal: "span-normal"
    };

    element.classList.add(priorityClasses[priority]);
  }

  deleteTask(taskToDelete) {
    const taskIndex = this.tasks.indexOf(taskToDelete);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.saveTasksToLocalStorage();
      this.renderTasks();
    }
  }

  clearTasksList() {
    while (this.tasksList.firstChild) {
      this.tasksList.removeChild(this.tasksList.firstChild);
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('@TASK', JSON.stringify(this.tasks));
  }

  getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('@TASK');
    return tasks ? JSON.parse(tasks) : [];
  }
}

const taskManager = new TaskManager();
