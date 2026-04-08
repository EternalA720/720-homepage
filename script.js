// 优化点 1：使用防抖函数防止 resize 频率过高导致的性能抖动
function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

function fillLine() {
    const line = document.getElementById("line");
    if (!line) return; // 健壮性检查

    const temp = document.createElement("span");
    temp.innerText = "=";
    // 优化点 2：继承 line 的样式，确保测量准确
    temp.style.cssText = "visibility:hidden; position:absolute; font-family:monospace; font-size:inherit;";
    document.body.appendChild(temp);

    const charWidth = temp.offsetWidth;
    document.body.removeChild(temp);

    // 避免 charWidth 为 0 导致死循环
    if (charWidth > 0) {
        const count = Math.ceil(window.innerWidth / charWidth);
        line.innerText = "=".repeat(count);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const msgBtn = document.getElementById('msg-trigger');
    const line = document.getElementById('line');
    const msgPage = document.getElementById('page-msg');

    if (msgBtn) {
        msgBtn.addEventListener('click', function() {
            // 1. 隐藏按钮
            this.classList.add('hidden'); 

            // 2. 移除隐藏类（让元素进入文档流）
            if (line) line.classList.remove('hidden');
            if (msgPage) msgPage.classList.remove('hidden');

            // 3. 【关键步骤】移除 hidden 后，立即重新计算并填充等号
            // 此时元素已 display: block，fillLine 才能正确获取宽度并填充内容
            if (typeof fillLine === "function") {
                fillLine(); 
            }

            // 4. 执行滚动
            window.scrollTo({
                top: line.offsetTop,
                behavior: 'smooth'
            });
        });
    }
});