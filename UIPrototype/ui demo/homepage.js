//储存所有自建项目的数组
const projectsData = [
  {
    name: "示例项目1",
    access: "public",
    description: "Description: This is an example.",
    labels: "frontend, javascript"
  },

  {
    name: "示例项目2",
    access: "private",
    description: "High-quality QR Code generator library in Java, Rust, C++.",
    labels: "c++, java"
  },
  {
    name: "示例项目3",
    access: "public",
    description: "ChatGPT Desktop Application (Mac, Windows and Linux)",
    labels: "chatgpt, python, machine-learning"
  },
  {
    name: "示例项目4",
    access: "private",
    description: "Repository to track the progress in Natural Language Processing (NLP), including the datasets and the current state-of-the-art.",
    labels: "nlp, deep-learning"
  },
  {
    name: "示例项目5",
    access: "public",
    description: "A professional front-end template for building fast, robust, and adaptable web apps or sites.",
    labels: "html5, css3"
  },
  {
    name: "示例项目6",
    access: "private",
    description: "Algorithms and Data Structures implemented in JavaScript for beginners, following best practices.",
    labels: "javascript"
  },
  {
    name: "示例项目7",
    access: "private",
    description: "Large single page application with 45 pages built on vue.",
    labels: "vue, javascript"
  },
  {
    name: "示例项目8",
    access: "public",
    description: "The library for web and native user interfaces.",
    labels: "react, javascript"
  },
  {
    name: "示例项目9",
    access: "public",
    description: "The Go programming language",
    labels: "go"
  },
  {
    name: "示例项目10",
    access: "public",
    description: "The official repo for the design of the C# programming language",
    labels: "csharp"
  },
  {
    name: "示例项目11",
    access: "public",
    description: "Docker Official Image packaging for PHP",
    labels: "php"
  },
  {
    name: "示例项目12",
    access: "public",
    description: "C client library for etcd with full features support",
    labels: "c"
  },
  {
    name: "示例项目13",
    access: "public",
    description: "This is an example",
    labels: "c, csharp"
  },
  {
    name: "示例项目14",
    access: "private",
    description: "This is an example.",
    labels: "java"
  },
  {
    name: "示例项目15",
    access: "private",
    description: "This is an example.",
    labels: "node.js"
  },
  {
    name: "示例项目16",
    access: "private",
    description: "This is an example.",
    labels: "shell"
  },
  {
    name: "示例项目17",
    access: "public",
    description: "This is an example.",
    labels: "python"
  },
];

var modal = document.getElementById("myModal");

// 获取打开模态框的按钮
var btn = document.getElementById("addProject");

// 获取关闭模态的 <span> 元素
var span = document.getElementsByClassName("close")[0];

var menu = document.getElementById("menu");

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
  const projectDescription = document.getElementById('description').value;
  const projectLabels = document.getElementById('labelInput').value; // 获取标签

  // 使用这些数据创建新的项目方块
  createProject(projectName, projectAccess, projectDescription, projectLabels);

  // 可选：清空表单以便下一次输入
  modal.style.display = "none";
  this.reset();
});

function createProject(name, access, description, labelString) {
  const projectsContainer = document.getElementById('projectsContainer');
  const addProjectButton = document.getElementById('addProject');
  const projectElement = document.createElement('div');
  projectElement.setAttribute('draggable', true); // 使项目可拖拽
  projectElement.classList.add('grid', 'relative', 'project', 'text-center', 'w-full', 'aspect-square', 'bg-gray-100', 'hover:shadow-md', 'rounded-lg');

  const labels = labelString.split(',').map(label => label.trim());
  const labelsHtml = labels.map(label => `<span class="blueLabel">${label}</span>`).join('');
  projectElement.innerHTML = `
    <p>${name}</p>
    <p>${access}</p>
    <p>${labelsHtml}</p>
    <div class="project-content" hidden>
      <h3 class="project-name">${name} ${access}</p>
      <p>${labelsHtml}</p>  
      <p class="project-description">${description}</p>
      <button class="project-create">添加文件</button>
    </div>
  `
    ;
  projectsContainer.insertBefore(projectElement, addProjectButton);
}

projectsData.forEach(project => {
  createProject(project.name, project.access, project.description, project.labels);
});

/*拖拽模块*/

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

/*头像＆个人模块*/

document.getElementById('avatarContainer').addEventListener('click', function () {
  // 点击头像切换菜单显示状态
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
});

document.getElementById('changeAvatar').addEventListener('click', function () {
  // 触发更换头像
  document.getElementById('avatarUpload').click();
});

document.getElementById('avatarUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // 更新头像图片
      const avatarContainer = document.getElementById('avatarContainer');
      avatarContainer.style.backgroundImage = `url('${e.target.result}')`;
      avatarContainer.style.backgroundSize = 'cover'; // 确保图片铺满容器
      avatarContainer.style.backgroundPosition = 'center'; // 图片居中
      const menu = document.getElementById('menu');
      menu.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

// 这里添加编辑个人信息的逻辑
document.getElementById('editProfile').addEventListener('click', function () {
  // 显示编辑个人信息的界面 To be continued
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
});

/*搜索模块*/
document.getElementById('searchBox').addEventListener('click', function (event) {
  event.stopPropagation(); // 阻止事件冒泡到document
  const dropdown = document.getElementById('dropdown');
  dropdown.style.display = 'block';
});

document.addEventListener('click', function () {
  const dropdown = document.getElementById('dropdown');
  dropdown.style.display = 'none';
});

// 防止在下拉菜单内点击时关闭下拉菜单
document.getElementById('dropdown').addEventListener('click', function (event) {
  event.stopPropagation();
});

/*Debug 控制台*/
const grid = document.getElementById('projectsContainer');
const children = grid.children;
const childrenOrder = [];
for (let i = 0; i < children.length; i++) {
  // 将子元素的顺序（或者其他标识符）添加到数组中
  childrenOrder.push(i + 1); // 或使用其他标识符，如子元素的id或文本内容等
}

console.log(childrenOrder); // 输出基于CSS order属性的排序后的顺序
