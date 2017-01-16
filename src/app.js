require('./app.scss');

let util = require('./util');

let defaults = {
    decimal: 2
};

class Jkeyboard {
    constructor(options) {
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = Object.assign({}, defaults, options);
        }

        if (!this.options.el || typeof this.options.el !== 'string') {
            console.error('el参数必须要填而且必须为字符串类型');
            return;
        }

        if (typeof this.options.decimal !== 'number') {
            console.error('decimal参数必须为数字类型');
            return;
        }

        this.el = document.getElementById(this.options.el);
        this.el.setAttribute('readonly', 'true');
        this.render();
        this.bind();
    }

    render() {
        this.container = document.createElement('ul');
        let tpl = `
            <li class="jkeyboard-key" data-code="1">1</li> <li class="jkeyboard-key" data-code="2">2</li> <li class="jkeyboard-key" data-code="3">3</li> <li class="jkeyboard-key" data-code="4">4</li> <li class="jkeyboard-key" data-code="5">5</li> <li class="jkeyboard-key" data-code="6">6</li> <li class="jkeyboard-key" data-code="7">7</li> <li class="jkeyboard-key" data-code="8">8</li> <li class="jkeyboard-key" data-code="9">9</li> <li class="jkeyboard-key jkeyboard-dot" data-code=".">.</li> <li class="jkeyboard-key" data-code="0">0</li> <li class="jkeyboard-key jkeyboard-del" data-code="-1">删除</li>
        `;

        this.container.className = 'jkeyboard';
        this.container.innerHTML = tpl;
        document.body.append(this.container);
    }

    bind() {
        let timer = null;
        let targetEl = this.el;
        const touchduration = 500;
        let delBtn = this.container.getElementsByClassName('jkeyboard-del')[0];

        targetEl.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.jkeyboard').forEach((item) => {
                item.classList.remove('in');
            });
            this.container.classList.add('in');
        }, false);

        targetEl.addEventListener('focus', (e) => {
            e.stopPropagation();
            targetEl.blur();
        }, false);

        document.addEventListener('touchstart', () => {
            this.container.classList.remove('in');
        }, false);

        // 长按删除操作
        delBtn.addEventListener('touchstart', () => {
            timer = setTimeout(() => {
                targetEl.value = '';
            }, touchduration);
        }, false);

        delBtn.addEventListener('touchend', () => {
            if (timer) {
                clearTimeout(timer);
            }
        }, false);

        this.container.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            let target = e.target;
            let code = target.dataset.code === '-1' ? '' : target.dataset.code;
            let value = targetEl.value + code;
            let regex = new RegExp('^([1-9]+|0)(\\.[\\d]{0,' + this.options.decimal + '})?$');

            if (target.nodeName.toUpperCase() !== 'LI') {
                return;
            }

            if (!regex.test(value) && value) {
                return;
            }

            if (target.dataset.code === '-1') {
                targetEl.value = value.substring(0, value.length - 1);
                return;
            }

            if (util.isFunction(this.options.callback)) {
                this.options.callback(value);
            }

            targetEl.value = value;
        }, false);
    }
}

module.exports = Jkeyboard;