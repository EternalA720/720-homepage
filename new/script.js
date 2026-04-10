document.addEventListener('DOMContentLoaded', () => {
    const guestbookSection = document.querySelector('.page--guestbook');
    const openBtn = document.getElementById('open-guestbook'); // 请确保按钮ID匹配

    if (openBtn && guestbookSection) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 切换激活类名
            guestbookSection.classList.add('is-active');

            // 可选：如果希望点击后自动跳转到留言板位置
            guestbookSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    }
});