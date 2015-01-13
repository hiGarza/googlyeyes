var mousePos = {};
var mouseEye = new eye(ctx, 0, 0);

var spawnedEye = {};
var eyeSpawned = false;
var eyes = [];
var eyesIT = Iterator(eyes);

function initAnimation(){
	animationStarted = true;
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
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.drawImage(img, (canvas.width - img.width) / 2, (canvas.height - img.height) / 2, img.width, img.height);
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