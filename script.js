'use strict';

//* ---- Select DOM elements ----
const newTodoTitle = document.querySelector('#new-todo-title');
const newTodoText = document.querySelector('#new-todo-text');
const buttonAddTodo = document.querySelector('#add-todo');
const buttonCancelNewTodo = document.querySelector('#cancel-new-todo');
const todoList = document.querySelector('#todo-list');

//* ---- Functions ----
// Clear the input Fields
const clearInputs = () => {
  newTodoTitle.value = '';
  newTodoText.value = '';
};

// Add a new todo
const addTodo = () => {
  const todoTitle = newTodoTitle.value.trim();
  const todoText = newTodoText.value.trim();

  //Check if the todo text is not empty (description is optional)
  if (todoTitle !== '') {
    // Create a new li item element
    const li = document.createElement('li');

    // Set the HTML content for the new todo
    li.innerHTML = `<h3>${todoTitle}</h3>
    <p>${todoText}</p>
    <button>
      <span class="material-symbols-outlined"> done </span>
    </button>
    <button>
      <span class="material-symbols-outlined"> edit </span>
    </button>
    <button>
      <span class="material-symbols-outlined"> delete </span>
    </button>`;

    // Add the li element to the ul
    todoList.appendChild(li);

    // Clear the input fields
    clearInputs();
  } else {
    alert('Task must not be empty');
  }
};

// Delete todo
const deleteTodo = target => {
  // Get the parent li and remove it
  const li = target.closest('li');
  li && li.remove();
};

// Check as done
const checkAsDone = target => {
  const li = target.closest('li');
  // Toggle the 'done' class to apply or remove the style
  li && li.classList.toggle('done');
  // Switch the icon
  if (target.textContent.trim() === 'done') {
    target.textContent = 'undo';
  } else {
    target.textContent = 'done';
  }
};

// Edit todo
const editTodo = target => {
  const li = target.closest('li');
  if (!li) return;

  // Select the task's title and details
  const titleElement = li.querySelector('h3');
  const detailsElement = li.querySelector('p');

  // Create input fields with the current values
  const titleInput = document.createElement('input');
  titleInput.value = titleElement.textContent.trim();
  const detailsInput = document.createElement('textArea');
  detailsInput.value = detailsElement.textContent.trim();

  // Replace the title and details with the input fields
  titleElement.replaceWith(titleInput);
  detailsElement.replaceWith(detailsInput);

  // Add a save button
  const saveButton = document.createElement('button');
  saveButton.innerHTML =
    '<span class="material-symbols-outlined"> save </span>';
  li.appendChild(saveButton);

  // Hide the done/undo and edit buttons
  // Select the task buttons
  const buttons = li.querySelectorAll('button');
  // Hide the first two buttons (done/undo and edit)
  buttons[0].classList.add('hidden');
  buttons[1].classList.add('hidden');

  // Add an event listener to the save button
  saveButton.addEventListener('click', () => {
    // Update the title and details with the new values
    titleElement.textContent = titleInput.value;
    detailsElement.textContent = detailsInput.value;

    // Replace the input fields with the updated title and details elements
    // It works because the replaceWith method don't delete the replaced element
    titleInput.replaceWith(titleElement);
    detailsInput.replaceWith(detailsElement);

    // Remove the save button and show the hidden ones
    saveButton.remove();
    buttons[0].classList.remove('hidden');
    buttons[1].classList.remove('hidden');
  });
};

//* ---- Event Listeners ----
// Add a new todo button
buttonAddTodo.addEventListener('click', addTodo);

// Cancel new todo event
buttonCancelNewTodo.addEventListener('click', clearInputs);

// Todo ul event listener -> check, edit and delete
todoList.addEventListener('click', function (event) {
  // The target property represents the clicked element
  const target = event.target;

  // Check if wich button was clicked
  if (
    target.tagName === 'SPAN' &&
    target.textContent.trim().toLowerCase() === 'delete'
  ) {
    // Delete the parent li
    deleteTodo(target);
  } else if (
    (target.tagName === 'SPAN' &&
      target.textContent.trim().toLowerCase() === 'done') ||
    target.textContent.trim().toLowerCase() === 'undo'
  ) {
    // Apply/remove the done CSS class
    checkAsDone(target);
  } else if (
    target.tagName === 'SPAN' &&
    target.textContent.trim().toLowerCase() === 'edit'
  ) {
    // Edit the task
    editTodo(target);
  }
});
