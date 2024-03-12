const projectsData = [
  { name: "示例项目", access: "public" }

];

var modal = document.getElementById("myModal");

// 获取打开模态框的按钮
var btn = document.getElementById("addProject");

// 获取关闭模态的 <span> 元素
var span = document.getElementsByClassName("close")[0];

// 当用户点击按钮时，打开模态
btn.onclick = function () {
  modal.style.display = "block";
}

// 当用户点击 <span> (x) 时，关闭模态
span.onclick = function () {
  modal.style.display = "none";
}

// 当用户点击模态之外的任何地方时，关闭它
window.onclick = function (event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

document.getElementById('newProjectForm').addEventListener('submit', function (e) {
  e.preventDefault(); // 阻止表单的默认提交行为

  // 获取用户输入的数据
  const projectName = document.getElementById('projectName').value;
  const projectAccess = document.getElementById('projectAccess').value;

  // 使用这些数据创建新的项目方块
  createProject(projectName, projectAccess);

  // 可选：清空表单以便下一次输入
  this.reset();
});

function createProject(name, access) {
  const projectsContainer = document.getElementById('projectsContainer');
  const addProjectButton = document.getElementById('addProject');
  const projectElement = document.createElement('div');
  projectElement.setAttribute('draggable', true); // 使项目可拖拽
  projectElement.classList.add('grid', 'project', 'text-center', 'w-full' ,'aspect-square', 'bg-gray-100', 'hover:shadow-md', 'rounded-lg');
  projectElement.innerHTML = `
    <p>${name}</p>
    <p>${access === 'private' ? '私有' : '公开'}</p>
  `;
  
  projectsContainer.insertBefore(projectElement, addProjectButton);
}

projectsData.forEach(project => {
  createProject(project.name, project.access);
});

//拖拽模块

let draggedItem = null;

document.addEventListener('dragstart', e => {
if (e.target.classList.contains('project')) {
  draggedItem = e.target;
  e.target.style.opacity = 0.5;
}
});

document.addEventListener('dragend', e => {
if (e.target.classList.contains('project')) {
  e.target.style.opacity = "";
}
});

document.addEventListener('dragover', e => {
e.preventDefault(); // 需要阻止默认行为以允许放置
});

document.addEventListener('drop', e => {
e.preventDefault(); // 阻止默认行为
const projectsContainer = document.getElementById('projectsContainer');
const afterElement = getDragAfterElement(projectsContainer, e.clientY);
if (draggedItem && afterElement !== draggedItem) {
  projectsContainer.insertBefore(draggedItem, afterElement);
}
draggedItem = null; // 重置拖拽项目
});

function getDragAfterElement(container, y) {
const draggableElements = [...container.querySelectorAll('.project:not(.dragging)')];

return draggableElements.reduce((closest, child) => {
  const box = child.getBoundingClientRect();
  const offset = y - box.top - box.height / 2;
  if (offset < 0 && offset > closest.offset) {
    return { offset: offset, element: child };
  } else {
    return closest;
  }
}, { offset: Number.NEGATIVE_INFINITY }).element;
}

/*
const container = document.getElementById('projectsContainer');
let dragggedItem = null;
let draggingCardOrder = null;
let draggingCardPosition = null;

container.addEventListener("dragstart", (event) => {
dragggedItem = event.target;
});

container.addEventListener("dragover", (event) => {
draggingCardOrder = Array.from(container.querySelectorAll('.project'));
});
*/

//头像
document.getElementById('avatarContainer').addEventListener('click', function() {
document.getElementById('avatarUpload').click(); // 模拟点击文件上传输入
});

document.getElementById('avatarUpload').addEventListener('change', function(e) {
const file = e.target.files[0];
if (file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const avatarContainer = document.getElementById('avatarContainer');
    avatarContainer.style.backgroundImage = `url('${e.target.result}')`;
    avatarContainer.style.backgroundSize = 'cover'; // 确保图片铺满容器
    avatarContainer.style.backgroundPosition = 'center'; // 图片居中
  };
  reader.readAsDataURL(file);
}
});
