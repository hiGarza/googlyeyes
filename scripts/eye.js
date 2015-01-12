function eye(context, x, y){
	this.cxt = context;
	this.x = x;
	this.y = y;
	this.radius = 2;

	this.bX = x;
	this.bY = y;
	this.bRadius = this.radius/2;

	this.update = function(mousePos){
		var distance = getDistance(this.x, this.y, mousePos.x, mousePos.y);
		if(distance < this.radius - this.bRadius){
			this.bX = mousePos.x;
			this.bY = mousePos.y;
		}
		else{
			this.bX = lerp(this.x, mousePos.x, distance/(this.radius - this.bRadius));
			this.bY = lerp(this.y, mousePos.y, distance/(this.radius - this.bRadius));
		}
	};

	this.updateCords = function(x, y){
		this.x = x;
		this.y = y;

		this.bX = x;
		this.bY = y;
	};

	this.increaseSize = function(){
		this.radius += 2;
		this.bRadius = this.radius/2;
	};

	this.draw = function(){
		this.cxt.beginPath();
    this.cxt.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.cxt.fillStyle = 'white';
    this.cxt.fill();
    this.cxt.closePath();

    this.cxt.beginPath();
    this.cxt.arc(this.bX, this.bY, this.bRadius, 0, 2 * Math.PI, false);
    this.cxt.fillStyle = 'black';
    this.cxt.fill();
    this.cxt.closePath();
	};
}

function getDistance(x1, y1, x2, y2){
	var a = x1 - x2;
	var b = y1 - y2;
	return Math.sqrt(a*a + b*b);
}

function lerp(a, b, f)
{
	return a + (b - a) / f;
}