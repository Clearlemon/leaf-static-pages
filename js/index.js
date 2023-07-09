// 获取目标元素
var targetDiv = document.querySelector('.leaf-navtop_bigbackground');

// 监听滚动事件
window.addEventListener('scroll', function () {
    // 获取元素距离页面顶部的高度
    var divOffsetTop = targetDiv.offsetTop;

    // 获取滚动距离
    var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;

    // 判断滚动距离是否超过60像素
    if (scrollDistance > divOffsetTop + 60) {
        // 修改 class 属性为 leaf_nav_alooftop
        targetDiv.className = 'leaf_nav_alooftop';
    } else {
        // 恢复原来的 class 属性
        targetDiv.className = 'leaf-navtop_bigbackground';
    }
});
//添加文章分类的class标签元素
//第一种文章样式
function showDiv(element) {
    element.classList.add('show');
}

function hideDiv(element) {
    element.classList.remove('show');
}
//获取所有的卡片元素
const cards = document.querySelectorAll('.leaf_home_article_container .leaf_home_article_card');
//添加展开和不展开事件监听
cards.forEach(card => {
    card.addEventListener('mouseover', expandCard);
    card.addEventListener('mouseout', collapseCard);
});

//对应分类显示
function expandCard(event) {
    const card = event.currentTarget;
    card.classList.add('expand');
}

//对应分类消失
function collapseCard(event) {
    const card = event.currentTarget;
    card.classList.remove('expand');
}

let left = document.querySelector(".leaf-button-left")
let right = document.querySelector(".leaf-button-right")
let m = document.querySelectorAll(".m")
let images = document.querySelector(".leaf_slide_ul_all")
// 我们先设置一个index用来计算和控制图片的位置，再设置一个time作为定时器
let index = 0
let time// 在这里我们先创建一个position为复用函数，作用就是结合index来定义当前图片的位置的
function position() {
    images.style.left = (index * -100) + "%"
}
// 然后我们创建一个复用函数add为加函数，如果当前图片的位置值index大于等于当前图片数量的话，
// 就说明超出了计算范围，所以得清零，如若不然index就加一
function add() {
    if (index >= m.length - 1) {
        index = 0
    } else {
        index++
    }
}
// 反之desc为减函数，如果当前图片的位置值index小于1了，那么他的值就反弹到最顶端，也就是轮播图的最后面，如若不然index就减一
function desc() {
    if (index < 1) {
        index = m.length - 1
    } else {
        index--
    }
}
// 创建一个timer来当做复用时间的函数，，每隔3秒钟index就加一，然后加入增加add函数和desc函数来判断一下，再加入定位函数
function timer() {
    time = setInterval(() => {
        index++
        desc()
        add()
        position()
    }, 3000)
}
// 接下来我们设置一下按钮，left为左边的按钮，因为点击时图片会反方向倒退，所以我们套入desc减函数进去，顺便定位一下
// 点击的时候我们必须先把定时器给停掉再重新执行一遍，不然会在你点击下一张图片时，定时器倒计时一到也跟着生效，这样子就会连跳两张图片了
left.addEventListener("click", () => {
    desc()
    position()
    clearInterval(time)
    timer()
})
// 右边的按钮和左边也是差不多
right.addEventListener("click", () => {
    add()
    position()
    clearInterval(time)
    timer()
})
// 在弄好左右两个按钮的时候，我们还需要生效下面的小图片按钮，
// 首先我们先遍历一遍，然后获取当前点击的那个小图片按钮的值并赋值给index，这样子就可以随之跳转
for (let i = 0; i < m.length; i++) {
    m[i].addEventListener("click", () => {
        index = i;
        position();
        clearInterval(time)
        timer()
    })
}
// 最后的最后我们将定时器开起来，这样子图片就可以自动轮播啦
// timer()

//图片预加载功能
window.addEventListener('DOMContentLoaded', function () {
    //获取图片的属性
    var thumbnails = document.querySelectorAll('.leaf_images_are_preloaded');

    thumbnails.forEach(function (thumbnail) {
        var originalSrc = thumbnail.getAttribute('data-original');
        var tempSrc = thumbnail.getAttribute('src');

        // 创建一个新的 Image 对象
        var img = new Image();

        // 设置加载完成的回调函数
        img.onload = function () {
            // 替换原始的 src 属性
            thumbnail.setAttribute('src', originalSrc);
        };

        // 设置加载失败的回调函数
        img.onerror = function () {
            // 如果加载失败，保留原始的 src 属性
            thumbnail.setAttribute('src', tempSrc);
        };

        // 设置 Image 对象的 src 属性为 data-original 的值
        img.src = originalSrc;
    });
});

const carousel = document.querySelector(".leaf_slider_article_flex");
const firstImg = carousel.querySelector("img");
const arrowImgs = document.querySelectorAll(".leaf_slider_article_swipe");

let isDragStart = false;
let prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14;

arrowImgs.forEach(img => {
    img.addEventListener("click", () => {
        const direction = img.classList.contains("leaf_slider_article_swipe_left") ? -1 : 1;
        carousel.scrollBy({
            left: direction * firstImgWidth,
            behavior: "smooth"
        });
    });
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();

    const containerRect = carousel.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;
    const mouseX = e.clientX;

    if (mouseX < containerLeft || mouseX > containerRight) {
        dragStop();
        return;
    }

    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
};


const dragStop = () => {
    isDragStart = false;
};

const stopOnMouseLeave = (e) => {
    const containerRect = carousel.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;
    const mouseX = e.clientX;

    if (mouseX < containerLeft || mouseX > containerRight) {
        dragStop();
    }
};

carousel.addEventListener("mouseleave", stopOnMouseLeave);
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);

//粒子时钟的JS部分
(function () {

    var digit =
        [
            [
                [0, 0, 1, 1, 1, 0, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 0, 1, 1, 0],
                [0, 0, 1, 1, 1, 0, 0]
            ],//0
            [
                [0, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [1, 1, 1, 1, 1, 1, 1]
            ],//1
            [
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1]
            ],//2
            [
                [1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//3
            [
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [1, 1, 0, 0, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 1, 1]
            ],//4
            [
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//5
            [
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0],
                [1, 1, 0, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//6
            [
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0]
            ],//7
            [
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 1, 1, 0]
            ],//8
            [
                [0, 1, 1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [0, 1, 1, 1, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 0, 0]
            ],//9
            [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]//:
        ];

    var canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        var cxt = canvas.getContext('2d');
        //声明canvas的宽高
        var H = 100, W = 700;
        canvas.height = H;
        canvas.width = W;
        cxt.fillStyle = '#f00';
        cxt.fillRect(10, 10, 50, 50);

        //存储时间数据
        var data = [];
        //存储运动的小球
        var balls = [];
        //设置粒子半径
        var R = canvas.height / 20 - 1;
        (function () {
            var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
            //存储时间数字，由十位小时、个位小时、冒号、十位分钟、个位分钟、冒号、十位秒钟、个位秒钟这7个数字组成
            data.push(temp[1], temp[2], 10, temp[3], temp[4], 10, temp[5], temp[6]);
        })();

        /*生成点阵数字*/
        function renderDigit(index, num) {
            for (var i = 0; i < digit[num].length; i++) {
                for (var j = 0; j < digit[num][i].length; j++) {
                    if (digit[num][i][j] == 1) {
                        cxt.beginPath();
                        //cxt.fillStyle = '#f00';/*红色数字*/
                        //cxt.fillStyle = '#fff';/*白色数字*/
                        cxt.fillStyle = '#FAF0BB';/*代码黄数字*/
                        cxt.arc(14 * (R + 2) * index + j * 2 * (R + 1) + (R + 1), i * 2 * (R + 1) + (R + 1), R, 0, 2 * Math.PI);
                        cxt.closePath();
                        cxt.fill();
                    }
                }
            }
        }

        /*更新时钟*/
        function updateDigitTime() {
            var changeNumArray = [];
            var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
            var NewData = [];
            NewData.push(temp[1], temp[2], 10, temp[3], temp[4], 10, temp[5], temp[6]);
            for (var i = data.length - 1; i >= 0; i--) {
                //时间发生变化
                if (NewData[i] !== data[i]) {
                    //将变化的数字值和在data数组中的索引存储在changeNumArray数组中
                    changeNumArray.push(i + '_' + (Number(data[i]) + 1) % 10);
                }
            }
            //增加小球
            for (var i = 0; i < changeNumArray.length; i++) {
                addBalls.apply(this, changeNumArray[i].split('_'));
            }
            data = NewData.concat();
        }

        /*更新小球状态*/
        function updateBalls() {
            for (var i = 0; i < balls.length; i++) {
                balls[i].stepY += balls[i].disY;
                balls[i].x += balls[i].stepX;
                balls[i].y += balls[i].stepY;
                if (balls[i].x > W + R || balls[i].y > H + R) {
                    balls.splice(i, 1);
                    i--;
                }
            }
        }

        /*增加要运动的小球*/
        function addBalls(index, num) {
            var numArray = [1, 2, 3];
            var colorArray = ["#3BE", "#09C", "#A6C", "#93C", "#9C0", "#690", "#FB3", "#F80", "#F44", "#C00"];
            for (var i = 0; i < digit[num].length; i++) {
                for (var j = 0; j < digit[num][i].length; j++) {
                    if (digit[num][i][j] == 1) {
                        var ball = {
                            x: 14 * (R + 2) * index + j * 2 * (R + 1) + (R + 1),
                            y: i * 2 * (R + 1) + (R + 1),
                            stepX: Math.floor(Math.random() * 4 - 2),
                            stepY: -2 * numArray[Math.floor(Math.random() * numArray.length)],
                            color: colorArray[Math.floor(Math.random() * colorArray.length)],
                            disY: 1
                        };
                        balls.push(ball);
                    }
                }
            }
        }

        /*渲染*/
        function render() {
            //重置画布宽度，达到清空画布的效果
            canvas.height = 100;
            //渲染时钟
            for (var i = 0; i < data.length; i++) {
                renderDigit(i, data[i]);
            }
            //渲染小球
            for (var i = 0; i < balls.length; i++) {
                cxt.beginPath();
                cxt.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI);
                cxt.fillStyle = balls[i].color;
                cxt.closePath();
                cxt.fill();
            }
        }

        clearInterval(oTimer);
        var oTimer = setInterval(function () {
            //更新时钟
            updateDigitTime();
            //更新小球状态
            updateBalls();
            //渲染
            render();
        }, 50);
    }

})();
//3D标签代码
/*
* 3d标签云
* 功能：鼠标移入标签，当前标签静止放大
* 说明：
* */
var leafSpans = document.querySelectorAll('.leaf_link_tag');
for (var i = 0; i < leafSpans.length; i++) {
    var randomColor = getRandomColor(); // 获取随机颜色
    leafSpans[i].style.backgroundColor = randomColor;
    leafSpans[i].style.opacity = getRandomOpacity(); // 获取随机透明度
}

// 生成随机颜色的函数
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 生成随机透明度的函数
function getRandomOpacity() {
    return (Math.random() * (0.9 - 0.5) + 0.5).toFixed(2);
}

window.tagcloud = (function (win, doc) { // ns
    // 判断对象
    function isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    // 构造函数
    function TagCloud(options) {
        var self = this;

        self.config = TagCloud._getConfig(options);
        self.box = self.config.element;   //组件元素
        self.fontsize = self.config.fontsize; //平均字体大小
        self.radius = self.config.radius; //滚动半径
        self.depth = 2 * self.radius;   //滚动深度
        self.size = 2 * self.radius;    //随鼠标滚动变速作用区域

        self.mspeed = TagCloud._getMsSpeed(self.config.mspeed);
        self.ispeed = TagCloud._getIsSpeed(self.config.ispeed);
        self.items = self._getItems();

        self.direction = self.config.direction;   //初始滚动方向
        self.keep = self.config.keep; //鼠标移出后是否保持之前滚动

        //初始化
        self.active = false;   //是否为激活状态
        self.lasta = 1;
        self.lastb = 1;
        self.mouseX0 = self.ispeed * Math.sin(self.direction * Math.PI / 180);    //鼠标与滚动圆心x轴初始距离
        self.mouseY0 = -self.ispeed * Math.cos(self.direction * Math.PI / 180);   //鼠标与滚动圆心y轴初始距离
        self.mouseX = self.mouseX0;   //鼠标与滚动圆心x轴距离
        self.mouseY = self.mouseY0;   //鼠标与滚动圆心y轴距离
        self.index = -1;

        //鼠标移入
        TagCloud._on(self.box, 'mouseover', function () {
            self.active = true;
        });
        //鼠标移出
        TagCloud._on(self.box, 'mouseout', function () {
            self.active = false;
        });

        //鼠标在内移动
        TagCloud._on(self.keep ? win : self.box, 'mousemove', function (ev) {
            var oEvent = win.event || ev;
            var boxPosition = self.box.getBoundingClientRect();
            self.mouseX = (oEvent.clientX - (boxPosition.left + self.box.offsetWidth / 2)) / 5;
            self.mouseY = (oEvent.clientY - (boxPosition.top + self.box.offsetHeight / 2)) / 5;
        });

        for (var j = 0, len = self.items.length; j < len; j++) {
            self.items[j].element.index = j;

            //鼠标移出子元素,当前元素静止放大
            self.items[j].element.onmouseover = function () {
                self.index = this.index;
            };

            //鼠标移出子元素,当前元素继续滚动
            self.items[j].element.onmouseout = function () {
                self.index = -1;
            };
        }

        //定时更新
        TagCloud.boxs.push(self.box);
        self.update(self);    //初始更新
        self.box.style.visibility = "visible";
        self.box.style.position = "relative";
        self.box.style.minHeight = 1.2 * self.size + "px";
        self.box.style.minWidth = 2.5 * self.size + "px";
        for (var j = 0, len = self.items.length; j < len; j++) {
            self.items[j].element.style.position = "absolute";
            self.items[j].element.style.zIndex = j + 1;
        }
        self.up = setInterval(function () {
            self.update(self);
        }, 30);
    }

    //实例
    TagCloud.boxs = []; //实例元素数组
    // 静态方法们
    TagCloud._set = function (element) {
        if (TagCloud.boxs.indexOf(element) == -1) {//ie8不支持数组的indexOf方法
            return true;
        }
    };

    //添加数组IndexOf方法
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this && this[from] === elt)
                    return from;
            }
            return -1;
        };
    }


    TagCloud._getConfig = function (config) {
        var defaultConfig = {   //默认值
            fontsize: 16,       //基本字体大小, 单位px
            radius: 60,         //滚动半径, 单位px
            mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
            ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
            direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
            keep: true          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
        };

        if (isObject(config)) {
            for (var i in config) {
                if (config.hasOwnProperty(i)) {//hasOwnProperty()用来判断一个属性是定义在对象本身而不是继承自原型链
                    defaultConfig[i] = config[i]; //用户配置
                }
            }
        }

        return defaultConfig;// 配置 Merge
    };
    TagCloud._getMsSpeed = function (mspeed) {    //滚动最大速度
        var speedMap = {
            slow: 1.5,
            normal: 3,
            fast: 5
        };
        return speedMap[mspeed] || 3;
    };
    TagCloud._getIsSpeed = function (ispeed) {    //滚动初速度
        var speedMap = {
            slow: 10,
            normal: 25,
            fast: 50
        };
        return speedMap[ispeed] || 25;
    };
    TagCloud._getSc = function (a, b) {
        var l = Math.PI / 180;
        //数组顺序0,1,2,3表示asin,acos,bsin,bcos
        return [
            Math.sin(a * l),
            Math.cos(a * l),
            Math.sin(b * l),
            Math.cos(b * l)
        ];
    };

    TagCloud._on = function (ele, eve, handler, cap) {
        if (ele.addEventListener) {
            ele.addEventListener(eve, handler, cap);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + eve, handler);
        } else {
            ele['on' + eve] = handler;
        }
    };

    // 原型方法
    TagCloud.prototype = {
        constructor: TagCloud, // 反向引用构造器

        update: function () {
            var self = this, a, b;

            if (!self.active && !self.keep) {
                self.mouseX = Math.abs(self.mouseX - self.mouseX0) < 1 ? self.mouseX0 : (self.mouseX + self.mouseX0) / 2;   //重置鼠标与滚动圆心x轴距离
                self.mouseY = Math.abs(self.mouseY - self.mouseY0) < 1 ? self.mouseY0 : (self.mouseY + self.mouseY0) / 2;   //重置鼠标与滚动圆心y轴距离
            }

            a = -(Math.min(Math.max(-self.mouseY, -self.size), self.size) / self.radius) * self.mspeed;
            b = (Math.min(Math.max(-self.mouseX, -self.size), self.size) / self.radius) * self.mspeed;

            if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) { return; }

            self.lasta = a;
            self.lastb = b;

            var sc = TagCloud._getSc(a, b);

            for (var j = 0, len = self.items.length; j < len; j++) {

                var rx1 = self.items[j].x,
                    ry1 = self.items[j].y * sc[1] + self.items[j].z * (-sc[0]),
                    rz1 = self.items[j].y * sc[0] + self.items[j].z * sc[1];

                var rx2 = rx1 * sc[3] + rz1 * sc[2],
                    ry2 = ry1,
                    rz2 = rz1 * sc[3] - rx1 * sc[2];

                if (self.index == j) {

                    self.items[j].scale = 1; //取值范围0.6 ~ 3
                    self.items[j].fontsize = 16;
                    self.items[j].alpha = 1;
                    self.items[j].element.style.zIndex = 99;
                } else {
                    var per = self.depth / (self.depth + rz2);
                    self.items[j].x = rx2;
                    self.items[j].y = ry2;
                    self.items[j].z = rz2;

                    self.items[j].scale = per; //取值范围0.6 ~ 3
                    self.items[j].fontsize = Math.ceil(per * 2) + self.fontsize - 6;
                    self.items[j].alpha = 1.5 * per - 0.5;
                    self.items[j].element.style.zIndex = Math.ceil(per * 10 - 5);
                }
                self.items[j].element.style.fontSize = self.items[j].fontsize + "px";
                self.items[j].element.style.left = self.items[j].x + (self.box.offsetWidth - self.items[j].offsetWidth) / 2 + "px";
                self.items[j].element.style.top = self.items[j].y + (self.box.offsetHeight - self.items[j].offsetHeight) / 2 + "px";
                self.items[j].element.style.filter = "alpha(opacity=" + 100 * self.items[j].alpha + ")";
                self.items[j].element.style.opacity = self.items[j].alpha;
            }
        },

        _getItems: function () {
            var self = this,
                items = [],
                element = self.box.children, // children 全部是Element
                length = element.length,
                item;

            for (var i = 0; i < length; i++) {
                item = {};
                item.angle = {};
                item.angle.phi = Math.acos(-1 + (2 * i + 1) / length);
                item.angle.theta = Math.sqrt((length + 1) * Math.PI) * item.angle.phi;
                item.element = element[i];
                item.offsetWidth = item.element.offsetWidth;
                item.offsetHeight = item.element.offsetHeight;
                item.x = self.radius * 1.5 * Math.cos(item.angle.theta) * Math.sin(item.angle.phi);
                item.y = self.radius * 1.5 * Math.sin(item.angle.theta) * Math.sin(item.angle.phi);
                item.z = self.radius * 1.5 * Math.cos(item.angle.phi);
                item.element.style.left = item.x + (self.box.offsetWidth - item.offsetWidth) / 2 + "px";
                item.element.style.top = item.y + (self.box.offsetHeight - item.offsetHeight) / 2 + "px";
                items.push(item);
            }

            return items;   //单元素数组
        }



    };

    if (!doc.querySelectorAll) {//ie7不支持querySelectorAll，所以要重新定义
        doc.querySelectorAll = function (selectors) {
            var style = doc.createElement('style'), elements = [], element;
            doc.documentElement.firstChild.appendChild(style);
            doc._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (doc._qsa.length) {
                element = doc._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            doc._qsa = null;
            return elements;
        };
    }

    return function (options) { // factory
        options = options || {}; // 短路语法
        var selector = options.selector || '.tagcloud', //默认选择class为tagcloud的元素
            elements = doc.querySelectorAll(selector),
            instance = [];
        for (var index = 0, len = elements.length; index < len; index++) {
            options.element = elements[index];
            if (!!TagCloud._set(options.element)) {
                instance.push(new TagCloud(options));
            }
        }
        return instance;
    };

})(window, document);
//
