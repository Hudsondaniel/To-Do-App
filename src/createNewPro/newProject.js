import trashIcon from '../../public/Assets/Icons/delete-icon.svg'
import finishIcon from '../../public/Assets/Icons/check-icon.svg'
import {
  state,
  addProject,
  deleteProject,
  renameProject,
  setActiveProject
} from '../state.js';

const newList = document.querySelector('.my-lists');
const newProjectList = document.querySelector('.new-project');
const plusButton = document.querySelector('.plus-symbol');

function renderProjectsUI() {
  newList.innerHTML = '';
  state.projects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.innerHTML = `
      <div class="new-project-list${state.activeProjectId === project.id ? ' active' : ''}">
        <input class="project-name-input" value="${project.name}" data-id="${project.id}" />
        <div class="icons">
          <button class="select-project" data-id="${project.id}" title="Select">✔️</button>
          <button class="delete-project" data-id="${project.id}" title="Delete"><img src="${trashIcon}" alt="Delete"></button>
        </div>
      </div>
    `;
    newList.appendChild(projectItem);
  });

  // Add event listeners for select, delete, and rename
  newList.querySelectorAll('.select-project').forEach(btn => {
    btn.addEventListener('click', e => {
      setActiveProject(Number(e.target.dataset.id));
    });
  });
  newList.querySelectorAll('.delete-project').forEach(btn => {
    btn.addEventListener('click', e => {
      deleteProject(Number(e.target.dataset.id));
    });
  });
  newList.querySelectorAll('.project-name-input').forEach(input => {
    input.addEventListener('change', e => {
      renameProject(Number(e.target.dataset.id), e.target.value);
    });
  });
}

if (plusButton) {
  plusButton.addEventListener('click', function(e) {
    e.stopPropagation();
    newProjectList.innerHTML = `
      <div class="overlay active">
        <div class="pop-up-content">
          <input type="text" id="getInput" placeholder="Add A Project To The List">
          <button class="continue">Continue</button>
        </div>
      </div>`;
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);
    const continueButton = document.querySelector('.continue');
    if (continueButton) {
      continueButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const getInput = document.getElementById('getInput');
        const projectName = getInput.value.trim();
        if (projectName) {
          addProject(projectName);
        }
        hidePopup();
      });
    }
  });
}

function handleOutsideClick(event) {
  const clickedElement = event.target;
  const popup = document.querySelector('.overlay.active');
  if (popup && !clickedElement.closest('.pop-up-content')) {
    hidePopup();
  }
}

function hidePopup() {
  const popup = document.querySelector('.overlay.active');
  if (popup) {
    popup.classList.remove('active');
    popup.remove();
  }
  document.removeEventListener('click', handleOutsideClick);
}

export { renderProjectsUI };