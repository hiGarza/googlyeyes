var canvas = document.getElementById("googlyCanvas");
var ctx = canvas.getContext('2d');

var img = new Image();

var animationStarted = false;
var dropZone = document.getElementById('googlyCanvas');
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleFileSelect);

function showInstructions(){
	ctx.font = '30pt Helvetica';
	ctx.textAlign = 'center';
	ctx.fillStyle = '#BBBBBB';
	ctx.fillText('Drag an image here...', canvas.width/2, canvas.height/2);
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;

  if(!animationStarted){
  	showInstructions();
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  loadImage(evt.dataTransfer.files[0]);
}

function loadImage(src){
	if(!src.type.match(/image.*/)){
		return;
	}
	var reader = new FileReader();
	reader.onload = function(e){
		img.onload = function(){
			canvas.className = "";
			scaleSize(canvas.width, canvas.height, img.width, img.height);
			initAnimation();
		};
		img.src = e.target.result;
	};
	reader.readAsDataURL(src);
}

function scaleSize(maxW, maxH, width, height){
  var ratio = height / width;
  if(width >= maxW && ratio <= 1){
      width = maxW;
      height = width * ratio;
  } else if(height >= maxH){
      height = maxH;
      width = height / ratio;
  }
  img.width = width;
  img.height = height
}