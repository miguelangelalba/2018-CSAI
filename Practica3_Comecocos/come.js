
function makeGameArea(){
    /* ------------ Start Pre-Build Walls  ------------ */
		this.buildWalls = function() {
			if (this.ghostMode === 0) game.wallColor = "Blue";
			else game.wallColor = "Red";
			canvas_walls = document.createElement('canvas');
			canvas_walls.width = game.canvas.width;
			canvas_walls.height = game.canvas.height;
			context_walls = canvas_walls.getContext("2d");

			context_walls.fillStyle = game.wallColor;
			context_walls.strokeStyle = game.wallColor;

			//horizontal outer
			buildWall(context_walls,0,0,18,1);
			buildWall(context_walls,0,12,18,1);

			// vertical outer
			buildWall(context_walls,0,0,1,6);
			buildWall(context_walls,0,7,1,6);
			buildWall(context_walls,17,0,1,6);
			buildWall(context_walls,17,7,1,6);

			// ghost base
			buildWall(context_walls,7,4,1,1);
			buildWall(context_walls,6,5,1,2);
			buildWall(context_walls,10,4,1,1);
			buildWall(context_walls,11,5,1,2);
			buildWall(context_walls,6,6,6,1);

			// ghost base door
			context_walls.fillRect(8*2*pacman.radius,pacman.radius/2+4*2*pacman.radius+5, 4*pacman.radius, 1);

			// single blocks
			buildWall(context_walls,4,0,1,2);
			buildWall(context_walls,13,0,1,2);

			buildWall(context_walls,2,2,1,2);
			buildWall(context_walls,6,2,2,1);
			buildWall(context_walls,15,2,1,2);
			buildWall(context_walls,10,2,2,1);

			buildWall(context_walls,2,3,2,1);
			buildWall(context_walls,14,3,2,1);
			buildWall(context_walls,5,3,1,1);
			buildWall(context_walls,12,3,1,1);
			buildWall(context_walls,3,3,1,3);
			buildWall(context_walls,14,3,1,3);

			buildWall(context_walls,3,4,1,1);
			buildWall(context_walls,14,4,1,1);

			buildWall(context_walls,0,5,2,1);
			buildWall(context_walls,3,5,2,1);
			buildWall(context_walls,16,5,2,1);
			buildWall(context_walls,13,5,2,1);

			buildWall(context_walls,0,7,2,2);
			buildWall(context_walls,16,7,2,2);
			buildWall(context_walls,3,7,2,2);
			buildWall(context_walls,13,7,2,2);

			buildWall(context_walls,4,8,2,2);
			buildWall(context_walls,12,8,2,2);
			buildWall(context_walls,5,8,3,1);
			buildWall(context_walls,10,8,3,1);

			buildWall(context_walls,2,10,1,1);
			buildWall(context_walls,15,10,1,1);
			buildWall(context_walls,7,10,4,1);
			buildWall(context_walls,4,11,2,2);
			buildWall(context_walls,12,11,2,2);
			/* ------------ End Pre-Build Walls  ------------ */
		};

}

function pinta(canvas,ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
     ctx.moveTo(0,0);
    ctx.lineTo(100,200);
    ctx.lineTo(150,120);
     ctx.closePath();
    ctx.fill();
    ctx.restore();
};

function startGame(){
    //makeGameArea ()
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    pinta(canvas,ctx);


}
