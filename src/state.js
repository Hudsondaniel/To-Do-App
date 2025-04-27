// Centralized state management for the To-Do app

const STORAGE_KEY = 'todoAppState';

// Initial state structure
let state = {
  projects: [],
  activeProjectId: null,
};

// Listeners for state changes
const listeners = [];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state = JSON.parse(saved);
  }
}

function subscribe(listener) {
  listeners.push(listener);
}

function notify() {
  saveState();
  listeners.forEach(fn => fn(state));
}

// Project operations
function addProject(name) {
  const newProject = {
    id: Date.now(),
    name,
    tasks: [],
  };
  state.projects.push(newProject);
  state.activeProjectId = newProject.id;
  notify();
}

function deleteProject(id) {
  state.projects = state.projects.filter(p => p.id !== id);
  if (state.activeProjectId === id) {
    state.activeProjectId = state.projects[0]?.id || null;
  }
  notify();
}

function renameProject(id, newName) {
  const project = state.projects.find(p => p.id === id);
  if (project) {
    project.name = newName;
    notify();
  }
}

function setActiveProject(id) {
  state.activeProjectId = id;
  notify();
}

// Task operations
function addTask(projectId, name) {
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    project.tasks.push({
      id: Date.now(),
      name,
      completed: false,
      notes: [],
    });
    notify();
  }
}

function deleteTask(projectId, taskId) {
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    project.tasks = project.tasks.filter(t => t.id !== taskId);
    notify();
  }
}

function toggleTaskComplete(projectId, taskId) {
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      notify();
    }
  }
}

function editTask(projectId, taskId, newName) {
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === taskId);
    if (task) {
      task.name = newName;
      notify();
    }
  }
}

// Notes operations
function addNote(projectId, taskId, noteText) {
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === taskId);
    if (task) {
      task.notes.push({
        text: noteText,
        timestamp: new Date().toISOString(),
      });
      notify();
    }
  }
}

function deleteNote(projectId, taskId, noteIndex) {
  const project = state.projects.find(p => p.id === projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === taskId);
    if (task) {
      task.notes.splice(noteIndex, 1);
      notify();
    }
  }
}

// Load state on module import
loadState();

export {
  state,
  subscribe,
  addProject,
  deleteProject,
  renameProject,
  setActiveProject,
  addTask,
  deleteTask,
  toggleTaskComplete,
  editTask,
  addNote,
  deleteNote,
}; 