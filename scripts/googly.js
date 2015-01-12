var canvas = document.getElementById("googlyCanvas");
var ctx = canvas.getContext('2d');
var img = new Image();

ctx.font = '30pt Helvetica';
ctx.textAlign = 'center';
ctx.fillStyle = '#BBBBBB';
ctx.fillText('Drag an image here...', canvas.width/2, canvas.height/2);

var dropZone = document.getElementById('googlyCanvas');
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleFileSelect);

var mousePos = {};
var mouseEye = new eye(ctx, 100,100);

var spawnedEye = {};
var eyeSpawned = false;
var eyes = [];
var eyesIT = Iterator(eyes);

function loadImage(src){
	if(!src.type.match(/image.*/)){
		console.log("The dropped file is not an image: ", src.type);
		return;
	}
	var reader = new FileReader();
	reader.onload = function(e){
		img.onload = function(){
			canvas.className = "";
			initAnimation();
		};
		img.src = e.target.result;
	};
	reader.readAsDataURL(src);
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  loadImage(evt.dataTransfer.files[0]);
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function initAnimation(){
	canvas.addEventListener('mousemove', handleMouseMove);
	canvas.addEventListener('mousedown', handleMouseDown);
	canvas.addEventListener('mouseup', handleMouseUp);
  setInterval(animationLoop, 50);
}

function animationLoop(){
	update();
	draw();
}

function update(){
	if(eyeSpawned){
		spawnedEye.increaseSize();
	}
	for(var i=0;i< eyes.length;i++){
		eyes[i].update(mousePos);
	}
	
}

function draw(){
	ctx.drawImage(img, 0, 0, 1024, 1024 * img.height / img.width);
	for(var i=0;i< eyes.length;i++){
		eyes[i].draw();
	}
	if(eyeSpawned){
		spawnedEye.draw();
	}
	else{
		mouseEye.draw();
	}
}

function handleMouseMove(evt){
  mousePos = getMousePos(canvas, evt);
  mouseEye.updateCords(mousePos.x, mousePos.y);
}

function handleMouseDown(evt){
	if(!eyeSpawned){
		eyeSpawned = true;
		spawnedEye = new eye(ctx, mousePos.x, mousePos.y);
	}
}

function handleMouseUp(evt){
	eyes.push(spawnedEye);
	eyeSpawned = false;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
  	x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
