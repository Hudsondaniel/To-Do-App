import {
  state,
  addTask,
  deleteTask,
  toggleTaskComplete,
  editTask,
  addNote,
  deleteNote
} from '../state.js';
import addIcon from '../../public/Assets/Icons/Add-Icon.svg'
import bellIcon from '../../public/Assets/Icons/Bell-icon.svg'
import notesIcon from '../../public/Assets/Icons/notes-icon.svg'
import tagIcon from '../../public/Assets/Icons/Tag-icon.svg'

const taskList = document.querySelector('.task-list');
const taskInnerList = document.querySelector('#task-details');

function renderTasksUI() {
  const project = state.projects.find(p => p.id === state.activeProjectId);
  if (!project) {
    taskList.innerHTML = '<div class="task-container">Select or create a project.</div>';
    taskInnerList.innerHTML = '';
    return;
  }
  taskList.innerHTML = `
    <div class="task-container">
      <h2 class="project-name">${project.name}</h2>
      <ul class="tasks">
        ${project.tasks.map(task => `
          <li class="unique-Task${task.completed ? ' completed' : ''}" id="task-${task.id}">
            <input type="checkbox" class="task-complete-checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <input class="task-name-input" value="${task.name}" data-task-id="${task.id}" />
            <button class="delete-task" data-task-id="${task.id}" title="Delete">🗑️</button>
          </li>
        `).join('')}
      </ul>
      <div class="input-button">
        <button class="add-task"><img src="${addIcon}" alt="Add Task"></button>
        <input type="text" id="taskInput" placeholder="Add a new task">
      </div>
    </div>
  `;

  // Add task
  const addTaskButton = taskList.querySelector('.add-task');
  const taskInput = taskList.querySelector('#taskInput');
  addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
      addTask(project.id, taskName);
      taskInput.value = '';
    }
  });

  // Complete, edit, delete task
  taskList.querySelectorAll('.task-complete-checkbox').forEach(cb => {
    cb.addEventListener('change', e => {
      toggleTaskComplete(project.id, Number(e.target.dataset.taskId));
    });
  });
  taskList.querySelectorAll('.delete-task').forEach(btn => {
    btn.addEventListener('click', e => {
      deleteTask(project.id, Number(e.target.dataset.taskId));
    });
  });
  taskList.querySelectorAll('.task-name-input').forEach(input => {
    input.addEventListener('change', e => {
      editTask(project.id, Number(e.target.dataset.taskId), e.target.value);
    });
  });

  // Show details for first task or selected
  if (project.tasks.length > 0) {
    renderTaskDetails(project, project.tasks[0].id);
  } else {
    taskInnerList.innerHTML = '';
  }
}

function renderTaskDetails(project, taskId) {
  const task = project.tasks.find(t => t.id === taskId);
  if (!task) return;
  taskInnerList.innerHTML = `
    <div class="task-inner-div">
      <div class="inner-title"><h1>${task.name}</h1></div>
      <div class="icons-tasks">
        <div class="inner-icons"><img class="inner-img1" src="${bellIcon}" alt=""><h4 class="inner-task">Remind me</h4></div>
        <div class="inner-icons"><img class="inner-img2" src="${notesIcon}" alt=""><h4 class="inner-task">Personal</h4></div>
        <div class="inner-icons"><img class="inner-img3" src="${tagIcon}" alt=""><h4 class="inner-task">Tags</h4></div>
      </div>
      <div class="inner-notes">
        <h2 class="notes-title">Notes</h2>
        ${task.notes.map((desc, i) => `
          <div>${desc.text} - ${desc.timestamp} <button class="delete-note" data-index="${i}">Delete</button></div>
        `).join('')}
        <div class="Notes">
          <input class="notes-box" type="text" id="additionalNotesInput" placeholder="Insert Your Notes">
          <button class="notes-button" id="addNotesButton">Add Notes</button>
        </div>
      </div>
      <div class="inner-attachments">
        <h2 class="heading-attachment">Attachments</h2>
        <div class="attachment-box">
          <div class="add-content-button"> Click here to add attachments </div>
        </div>
      </div>
    </div>
  `;
  // Add note
  const addNotesButton = document.getElementById('addNotesButton');
  const additionalNotesInput = document.getElementById('additionalNotesInput');
  addNotesButton.addEventListener('click', () => {
    const note = additionalNotesInput.value.trim();
    if (note) {
      addNote(project.id, task.id, note);
      additionalNotesInput.value = '';
    }
  });
  // Delete note
  taskInnerList.querySelectorAll('.delete-note').forEach(btn => {
    btn.addEventListener('click', e => {
      deleteNote(project.id, task.id, Number(e.target.dataset.index));
    });
  });
}

export { renderTasksUI };
