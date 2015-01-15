var canvas = document.getElementById("googlyCanvas");
var ctx = canvas.getContext('2d');
var button = document.getElementById("button");
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

var img = new Image();

var animationStarted = false;
var dropZone = document.getElementById('googlyCanvas');
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleFileSelect);

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
}

function handleImage(e){
  var reader = new FileReader();
  reader.onload = function(event){
    img.src = event.target.result;
    img.onload = function(){
     imageUploaded();
    }
  }
  reader.readAsDataURL(e.target.files[0]);     
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
			imageUploaded();
		};
		img.src = e.target.result;
	};
	reader.readAsDataURL(src);
}

function imageUploaded(){
  canvas.className = "";
  scaleSize(canvas.width, canvas.height, img.width, img.height);
  initAnimation();
  button.style.display="none";
};

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