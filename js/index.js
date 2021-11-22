var Wheel = /** @class */ (function () {
    function Wheel() {
        var _this = this;
        var _a, _b, _c, _d;
        this.sections = [
            { color: '#3244a8', value: '1' },
            { color: '#3244a8', value: '2' },
            { color: '#3244a8', value: '3' },
            { color: '#3244a8', value: '4' },
            { color: '#3244a8', value: '5' },
            { color: '#3244a8', value: '6' },
            { color: '#3244a8', value: '8' },
            { color: '#3244a8', value: '9' },
            { color: '#3244a8', value: '0' }
        ];
        this.canvas = document.querySelector('canvas');
        this.ctx = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        this.width = (_c = (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.canvas.width) !== null && _c !== void 0 ? _c : 300;
        this.rad = this.width / 2;
        this.start = document.querySelector("button");
        this.friction = 0.995;
        this.angVel = 0;
        this.tau = 2 * Math.PI;
        this.arc = this.tau / ((_d = this.sections) === null || _d === void 0 ? void 0 : _d.length);
        this.ang = 0;
        this.sectionCount = this.sections.length;
        this.rand = function (m, M) { return Math.random() * (M - m) + m; };
        this.getIndex = function () { return Math.floor(_this.sectionCount - _this.ang / _this.tau * _this.sectionCount) % _this.sectionCount; };
        this.drawSection = function (section, i) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            _this.ang = _this.arc * i;
            (_a = _this.ctx) === null || _a === void 0 ? void 0 : _a.save();
            (_b = _this.ctx) === null || _b === void 0 ? void 0 : _b.beginPath();
            if (_this.ctx != null)
                _this.ctx.fillStyle = section.color;
            (_c = _this.ctx) === null || _c === void 0 ? void 0 : _c.moveTo(_this.rad, _this.rad);
            (_d = _this.ctx) === null || _d === void 0 ? void 0 : _d.arc(_this.rad, _this.rad, _this.rad, _this.ang, _this.ang + _this.arc);
            (_e = _this.ctx) === null || _e === void 0 ? void 0 : _e.lineTo(_this.rad, _this.rad);
            (_f = _this.ctx) === null || _f === void 0 ? void 0 : _f.fill;
            (_g = _this.ctx) === null || _g === void 0 ? void 0 : _g.translate(_this.rad, _this.rad);
            (_h = _this.ctx) === null || _h === void 0 ? void 0 : _h.rotate(_this.ang + _this.arc / 2);
            if (_this.ctx != null) {
                _this.ctx.textAlign = "right";
                _this.ctx.fillStyle = "fff";
                _this.ctx.font = "bold 1.5rem sans-serif";
            }
            (_j = _this.ctx) === null || _j === void 0 ? void 0 : _j.fillText(section.value, _this.rad - 10, 10);
            (_k = _this.ctx) === null || _k === void 0 ? void 0 : _k.restore();
        };
        this.rotate = function () {
            var section = _this.sections[_this.getIndex()];
            if (_this.ctx != null)
                _this.ctx.canvas.style.transform = "rotate(" + (_this.ang - Math.PI / 2) + ")";
            if (_this.start != null) {
                _this.start.textContent = !_this.angVel ? "Test" : section.value;
                _this.start.style.background = section.color;
            }
        };
        this.frame = function () {
            var section = _this.sections[_this.getIndex()];
            if (!_this.angVel)
                return;
            _this.angVel *= _this.friction;
            if (_this.angVel < 0.002)
                _this.angVel = 0;
            _this.ang += _this.angVel;
            _this.ang %= _this.tau;
            if (_this.angVel <= 0.000) {
                alert("Resultaat: " + section.value);
            }
            _this.rotate();
        };
        this.engine = function () {
            _this.frame();
            requestAnimationFrame(_this.engine);
        };
        this.sections.forEach(this.drawSection);
        this.rotate();
        this.engine();
        if (this.start != null) {
            this.start.onclick = function () {
                if (!_this.angVel)
                    _this.angVel = _this.rand(0.25, 0.35);
            };
        }
    }
    return Wheel;
}());
var start = document.querySelector("button");
if (start != null) {
    start.onclick = function () {
        new Wheel();
    };
}
