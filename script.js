function fillLine() {
    const line = document.getElementById("line");

    // 创建一个临时 span 测量 "=" 宽度
    const temp = document.createElement("span");
    temp.innerText = "=";
    temp.style.visibility = "hidden";
    temp.style.position = "absolute";
    temp.style.fontFamily = "monospace";
    document.body.appendChild(temp);

    const charWidth = temp.offsetWidth;
    document.body.removeChild(temp);

    const count = Math.ceil(window.innerWidth / charWidth);
    line.innerText = "=".repeat(count);
}

// 初始执行
fillLine();

// 窗口变化时重新计算（响应式）
window.addEventListener("resize", fillLine);