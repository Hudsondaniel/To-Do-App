import trashIcon from '../../public/Assets/Icons/delete-icon.svg'
import finishIcon from '../../public/Assets/Icons/check-icon.svg'
import { renderTasks } from '../TaskManager/taskManager';


const plusButton = document.querySelector(".plus-symbol");
const newProjectList = document.querySelector(".new-project");
const newList = document.querySelector(".my-lists");


let projects = []; // Array to store tasks

function createProject() {
    if (plusButton) {
        plusButton.addEventListener('click', function(e) {
            // Prevent the outside click handler from immediately triggering
            e.stopPropagation();

            newProjectList.innerHTML = `
                <div class="overlay active">
                    <div class="pop-up-content">
                        <input type="text" id="getInput" placeholder="Add A Project To The List">
                        <button class="continue">Continue</button>
                    </div>
                </div>`;

            // Add event listener for outside click
            setTimeout(() => {
                document.addEventListener('click', handleOutsideClick);
            }, 0);

            // Add event listener for the close button
            const closeMark = document.querySelector(".close-mark");
            if (closeMark) {
                closeMark.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent the outside click handler from triggering
                    hidePopup();
                });
            }

            // Add event listener for continue button
            const continueButton = document.querySelector(".continue");
            if (continueButton) {
                continueButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent the outside click handler from triggering
                    console.log("continue button clicked");
                    const getInput = document.getElementById('getInput');
                    const projectName = getInput.value;

                    // Create a new task object
                    const project = {
                        id: projects.length + 1, // Unique ID for the task
                        name: projectName,
                        tasks: []
                    };

                    // Add the new task to the tasks array
                    projects.push(project);

                    // Render the tasks list
                    renderProjects();

                    // Hide the popup after adding the task
                    hidePopup();
                });
            }
        });
    } else {
        console.log("Plus button not found");
    }
}

// Function to render tasks
function renderProjects() {
    newList.innerHTML = ''; // Clear the current list

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.innerHTML = `
            <div class="new-project-list">
                <div>${project.name}</div>
                <div class="icons">
                    <div class="task-complete"><img src=${finishIcon} alt=""></div>
                    <div class="trash"><img src=${trashIcon} alt=""></div>
                </div>
            </div>`;
        newList.appendChild(projectItem);

        projectItem.addEventListener('click', () => {
            renderTasks(project.id);
        });
    });

}

// Function to handle clicks outside the popup
function handleOutsideClick(event) {
    const clickedElement = event.target;
    const popup = document.querySelector('.overlay.active');

    // Check if the clicked element is not part of the popup
    if (popup && !clickedElement.closest('.pop-up-content')) {
        hidePopup();
    }
}

// Function to hide the popup
function hidePopup() {
    const popup = document.querySelector('.overlay.active');
    if (popup) {
        popup.classList.remove('active');
        popup.remove();
    }
    document.removeEventListener('click', handleOutsideClick); // Remove event listener after closing
    console.log("Popup hidden");
}

// Initialize the createProject function
createProject();

export { createProject, renderProjects, handleOutsideClick, hidePopup, projects };