export{}

var id = null;
function electronSimulation() {
    let elem = document.querySelector(".electron") as HTMLCanvasElement
    let x = 0;
    let y = 0;
    id = setInterval(frame, 10);
    function frame() {
        x++;
        y += 2;
        elem.style.top = x + 'px';
        elem.style.left = x + 'px';
    }
}