import './style.css';
import '../src/TaskManager/taskStyle.css'
import '../src/createNewPro/newProjectStyle.css'
import bgImg from '../public/Assets/BG-Img2.jpg'
import { createProject } from '../src/createNewPro/newProject.js';

document.body.style.backgroundImage = `url(${bgImg})`;

createProject();

