function renderGuestbook() {
    const containers = document.querySelectorAll('.comment-item');
    if (containers.length === 0) return;

    // 1. 测量单字符
    const tester = document.createElement('span');
    tester.style.cssText = "font-family: 'Cascadia Code', 'JetBrains Mono', monospace; font-size: 16px; visibility: hidden; position: absolute; white-space: pre;";
    tester.innerText = "A";
    document.body.appendChild(tester);
    const charW = tester.getBoundingClientRect().width;
    document.body.removeChild(tester);

    const charH = 20;
    const availableW = window.innerWidth - 40; // 40 为之前定义的页边距
    const charsPerLine = Math.floor(availableW / charW);
    const finalWidth = charsPerLine * charW;
    const contentWidthPx = (charsPerLine - 2) * charW;

    containers.forEach(container => {
        const idStr = container.getAttribute('data-id') || "";
        const dateStr = container.getAttribute('data-date') || "";
        const rawText = container.getAttribute('data-text') || "";

        container.style.width = finalWidth + "px";
        container.className = "char-ui-box comment-item";

        // 这里的结构：content-inner 里面套了 info-line 和 comment-text
        container.innerHTML = `
            <div class="row header"></div>
            <div class="middle">
                <div class="side left">|</div>
                <div class="content-inner" style="width: ${contentWidthPx}px">
                    <div class="info-line">
                        <div class="comment-id">${idStr}</div>
                        <div class="comment-date">${dateStr}</div>
                    </div>
                    <div class="comment-text">${rawText}</div>
                </div>
                <div class="side right">|</div>
            </div>
            <div class="row footer"></div>
        `;

        // 填充横向边框
        const borderLine = "+" + "-".repeat(charsPerLine - 2) + "+";
        container.querySelector('.header').innerText = borderLine;
        container.querySelector('.footer').innerText = borderLine;

        // 计算总高度并补齐竖线
        const contentEl = container.querySelector('.content-inner');
        const vCount = Math.ceil(contentEl.scrollHeight / charH);
        const vLineStr = Array(vCount).fill("|").join("\n");

        container.querySelector('.side.left').innerText = vLineStr;
        container.querySelector('.side.right').innerText = vLineStr;
    });
}

window.addEventListener('resize', renderGuestbook);
document.addEventListener('DOMContentLoaded', renderGuestbook);