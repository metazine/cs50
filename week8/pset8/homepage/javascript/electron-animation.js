"use strict";
exports.__esModule = true;
var id = null;
function electronSimulation() {
    var elem = document.querySelector(".electron");
    var x = 0;
    var y = 0;
    id = setInterval(frame, 10);
    function frame() {
        x++;
        y += 2;
        elem.style.top = x + 'px';
        elem.style.left = x + 'px';
    }
}
