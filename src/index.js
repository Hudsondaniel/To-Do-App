import './style.css';
import '../src/TaskManager/taskStyle.css'
import '../src/createNewPro/newProjectStyle.css'
import bgImg from '../public/Assets/BG-Img2.jpg'
import { subscribe, state } from './state.js';
import { renderProjectsUI } from './createNewPro/newProject.js';
import { renderTasksUI } from './TaskManager/taskManager.js';

document.body.style.backgroundImage = `url(${bgImg})`;

function renderApp() {
  renderProjectsUI(state);
  renderTasksUI(state);
}

subscribe(renderApp);
renderApp();

