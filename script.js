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
    // 初始执行计算
    fillLine();

    // 优化点 3：调整窗口大小时使用防抖
    window.addEventListener("resize", debounce(fillLine, 100));

    const msgBtn = document.getElementById('msg-trigger');
    const line = document.getElementById('line');
    const msgPage = document.getElementById('page-msg');

    if (msgBtn) {
        msgBtn.addEventListener('click', function() {
            this.classList.add('hidden'); 

            if (line) line.classList.remove('hidden');
            if (msgPage) msgPage.classList.remove('hidden');

            // 再次触发计算，防止隐藏状态下 innerWidth 获取不准
            fillLine();

            window.scrollTo({
                top: line.offsetTop,
                behavior: 'smooth'
            });
        });
    }
});