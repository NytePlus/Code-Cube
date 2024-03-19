let sourceNode;
const list = document.querySelector("#projectsContainer");

// 当拖拽开始的时候
list.ondragstart = (e) => {
    console.log("当前拖动的节点：");
    console.log(e.target);
    e.target.classList.add("moving");
    sourceNode = e.target;
};

// 当拖拽进入某个节点时候
list.ondragenter = (e) => {
    if (e.target === list || e.target === sourceNode) {
        return;
    }
    console.log("拖拽到节点：");
    console.log(e.target.parentNode);
    // Array.from ES6：将类数组对象 转成真正的数组  就可以使用数组自带的方法indexOf了
    const children = Array.from(list.children);
    const sourceIndex = children.indexOf(sourceNode);
    const targetIndex = children.indexOf(e.target.parentNode);
    // insertBefore 插入的节点如果在list中存在，那么则会删除，再插入新的位置
    if (sourceIndex < targetIndex) {
        // 拖拽节点下标小于目标节点的下标
        // 在目标节点的下一个元素之前插入拖拽的节点
        list.insertBefore(sourceNode, e.target.parentNode.nextElementSibling);
    } else {
        // 拖拽节点下标大于目标节点的下标
        // 在目标节点之前插入拖拽的节点
        list.insertBefore(sourceNode, e.target.parentNode);
    }
};

// 当前拖拽节点拖拽结束
list.ondragend = (e) => {
    e.target.classList.remove('moving');
}