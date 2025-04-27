import { createProject, renderProjects, handleOutsideClick, hidePopup, projects } from "../createNewPro/newProject";
import addIcon from '../../public/Assets/Icons/Add-Icon.svg'
import bellIcon from '../../public/Assets/Icons/Bell-icon.svg'
import notesIcon from '../../public/Assets/Icons/notes-icon.svg'
import tagIcon from '../../public/Assets/Icons/Tag-icon.svg'


const taskList = document.querySelector(".task-list")
const taskInnerList = document.querySelector("#task-details");

function renderTasks(projectId){
    const project = projects.find(p => p.id === projectId);
    if(!project) 
    {
        console.log("Project not found");
        return;
    }
    taskList.innerHTML = `
    <div class="task-container">
        <h2 class = "project-name">${project.name}</h2>
        <ul class="tasks">
            ${project.tasks.map(task => `
                <li class="unique-Task" id="task-${task.id}">
                    <input type="radio" name="radio-button" class="task-radio" data-task-id="${task.id}">
                    <span>
                        <div class="task-name">${task.name}</div>
                    </span>
                </li>`).join('')}
        </ul>
        <div class = "input-button">
            <button class="add-task"><img src="${addIcon}" alt="Add Task"></button>
            <input type="text" id="taskInput" placeholder="Add a new task">
        </div>
    </div>
`;

    const addTaskButton = taskList.querySelector('.add-task');
    const taskInput = taskList.querySelector('#taskInput');

    addTaskButton.addEventListener('click', () => {
        const taskName = taskInput.value;
        if (taskName.trim()) {
            project.tasks.push(
                {name: taskName,
                id: project.tasks.length + 1,
                description: [],
                });
            renderTasks(projectId); // Re-render tasks
        }
    });
    
    //Function to add a unique container for task details
    project.tasks.forEach(task =>{
        const taskElement = document.querySelector(`#task-${task.id}`);
        taskElement.addEventListener('click', () =>{
            taskInnerList.innerHTML =`
                <div class="task-inner-div">
                    <div class="inner-title"><h1>${task.name}</h1></div>
                    <div class="icons-tasks">
                        <div class="inner-icons"><img class="inner-img1" src="${bellIcon}" alt=""><h4 class="inner-task">Remind me</h4></div>
                        <div class="inner-icons"><img class="inner-img2" src="${notesIcon}" alt=""><h4 class="inner-task">Personal</h4></div>
                        <div class="inner-icons"><img class="inner-img3" src="${tagIcon}" alt=""><h4 class="inner-task">Tags</h4></div>
                    </div>
                    <div class="inner-notes">
                        <h2 class="notes-title">Notes</h2>
                        ${task.description.map(desc => `
                        <div>${desc.notes} - ${desc.timestamp}</div>
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
            
        const additionalNotesInput = document.getElementById('additionalNotesInput');
        const addNotesButton = document.getElementById('addNotesButton');

        addNotesButton.addEventListener('click', () => {
            const newNote = additionalNotesInput.value.trim();
            if (newNote) {
                task.description.push({
                    notes: newNote,
                    timestamp: new Date().toISOString()
                });
                // Re-render the task details with the updated notes
                renderTasks(projectId);
            }
            console.log(task.description[0]);
        });
        });
    });

    //Function to delete a task
    const taskRadios = document.querySelectorAll('.task-radio');
    taskRadios.forEach(radio => {
        radio.addEventListener('click', (e) => {
            const taskId = e.target.getAttribute('data-task-id');
            project.tasks = project.tasks.filter(task => task.id != taskId);
            renderTasks(projectId); // Re-render tasks
        });
    });

    
}
export { renderTasks };
