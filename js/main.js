let input = document.querySelector(".to-do-app form input");
let add_btn = document.querySelector(".to-do-app form button");
let tasksList = document.querySelector(".tasks-list");
let emptyEle = document.querySelector(".to-do-app .tasks-list .empty");
// let deleteBtn = document.querySelector(".tasks-list .task span.delete_btn");
let tasksCount = document.querySelector(".to-do-app .stats div span.count");
let completedCount = document.querySelector(" .stats div span.completed");

let arrayOfTasks = [];

add_btn.onclick = function (e) {
  e.preventDefault();
  let taskName = input.value;
  // create task
  taskName
    ? !arrayOfTasks.includes(taskName)
      ? createTask(taskName)
      : alert("repeated value")
    : alert("empty value");
  // add this value to array
  arrayOfTasks.push(taskName);
  // increase tasks count
  tasksCount.innerHTML = arrayOfTasks.length;
  // remove empty message
  toggleEmpty();
  // clear input value
  clearInput();
  // auto focus input
  inpFocus();
};

document.addEventListener("click", function (e) {
  if (e.target.className === "fa-solid fa-trash") {
    // remove task
    e.target.parentElement.parentElement.parentElement.remove();
    // get task value
    let taskName =
      e.target.parentElement.parentElement.previousSibling.innerText;
    // remove task from array
    arrayOfTasks = arrayOfTasks.filter((ele) => {
      return ele !== taskName;
    });
    // decrease tasks count
    tasksCount.innerHTML = arrayOfTasks.length;
    // triger toggleEmpty function
    toggleEmpty();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.type === "checkbox") {
    if (e.target.checked) {
      completedCount.innerHTML = +completedCount.innerHTML + 1;
    } else {
      completedCount.innerHTML = +completedCount.innerHTML - 1;
    }
  }
});

function inpFocus() {
  input.focus();
}

function clearInput() {
  input.value = "";
}

function createTask(taskName) {
  // create task div
  let task = document.createElement("div");
  task.className = "task";

  // create label and checkbox
  let label = document.createElement("label");
  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  label.appendChild(check);
  label.append(taskName);

  // create controls div
  let controls = document.createElement("div");
  controls.className = "controls";

  // edit button
  let edit_btn = document.createElement("span");
  edit_btn.className = "edit_btn";

  let edit_icon = document.createElement("i");
  edit_icon.className = "fa-solid fa-pen-to-square";

  edit_btn.appendChild(edit_icon);
  controls.appendChild(edit_btn);

  // delete button
  let delete_btn = document.createElement("span");
  delete_btn.className = "delete_btn";

  let delete_icon = document.createElement("i");
  delete_icon.className = "fa-solid fa-trash";

  delete_btn.appendChild(delete_icon);
  controls.appendChild(delete_btn);

  task.appendChild(label);
  task.appendChild(controls);
  tasksList.append(task);
}

function toggleEmpty() {
  if (arrayOfTasks.length) {
    emptyEle.style.display = "none";
  } else {
    emptyEle.style.display = "block";
  }
}
