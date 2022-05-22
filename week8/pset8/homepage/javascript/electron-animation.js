var id = null;
const HEIGHT = 400
const WIDTH = 400
function electronAnimation() {
    var elem = document.getElementById("electron");   
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        pos++; 
        elem.style.top =  HEIGHT/2 + Math.sin(pos/50) * 40 + 'px'; 
        elem.style.left = WIDTH/2 + Math.cos(pos/50) * 40 + 'px'; 
  }
}
