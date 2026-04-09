document.addEventListener('DOMContentLoaded', () => {
    const msgBtn = document.getElementById('msg-trigger');
    const line = document.getElementById('line');
    const msgPage = document.getElementById('page-msg');

    if (msgBtn) {
        msgBtn.addEventListener('click', function() {
            // 1. 隐藏触发按钮
            this.classList.add('hidden');

            // 2. 显示分隔符和内容页面
            if (line) line.classList.remove('hidden');
            if (msgPage) msgPage.classList.remove('hidden');

            // 3. 执行平滑滚动
            // 注意：此时 line 已经移除了 hidden，浏览器能正确计算 offsetTop
            window.scrollTo({
                top: line.offsetTop,
                behavior: 'smooth'
            });
        });
    }
});