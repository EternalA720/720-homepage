const el = document.getElementById('ascii-face');

// 严格对齐的帧数据
const frames = {
    open: [
        "  ###           ###  ",
        " ## ##         ## ## ",
        "##   ##       ##   ##",
        "                     ",
        "       #######       "
    ].join('\n'),

    half: [
        "  ###                ",
        " ## ##               ",
        "##   ##       #######",
        "                     ",
        "       #######       "
    ].join('\n'),

    squint: [
        "  ###                ",
        " ## ##               ",
        "##   ##        ##### ",
        "                     ",
        "       #######       "
    ].join('\n'),

    closed: [
        "  ###                ",
        " ## ##               ",
        "##   ##        ##### ",
        "                     ",
        "       #######       "
    ].join('\n')
};

// 动画序列
const sequence = [
    { frame: frames.open,   delay: 2500 },
    { frame: frames.half,   delay: 80   },
    { frame: frames.squint, delay: 60   },
    { frame: frames.closed, delay: 100  },
    { frame: frames.closed, delay: 100  },
    { frame: frames.squint, delay: 60   },
    { frame: frames.half,   delay: 80   }
];

let currentIndex = 0;

function play() {
    const current = sequence[currentIndex];
    el.textContent = current.frame;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % sequence.length;
        play();
    }, current.delay);
}

// 启动动画
play();