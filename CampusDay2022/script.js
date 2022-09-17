/* Return the position on a bezier curve at the point t ( contains between 0 and 1 ) */
function bezierAtT(t,xa,ya,xb,yb,xc,yc,xd,yd) {
	return [
	((1-t)**3)*xa + ((1-t)**2)*xb*t*3 + 3*(1-t)*(t**2)*xc + (t**3)*xd
	 ,
	 ((1-t)**3)*ya + ((1-t)**2)*yb*t*3 + 3*(1-t)*(t**2)*yc + (t**3)*yd
	]
}

/* Sub part for petal draw */
function subPlant(k,ctx,x,y,am,as,bm,bs,e) {
	ctx.bezierCurveTo( 
					

		x + Math.cos(Math.PI*2*k/5)*am + Math.cos( (Math.PI/2) + Math.PI*2*k/5 )*as
		,
		y + Math.sin(Math.PI*2*k/5)*am + Math.sin( (Math.PI/2) + Math.PI*2*k/5 )*as
	
	

	,

		x + Math.cos(Math.PI*2*k/5)*bm + Math.cos( (Math.PI/2) + Math.PI*2*k/5 )*bs
		,
		y + Math.sin(Math.PI*2*k/5)*bm + Math.sin( (Math.PI/2) + Math.PI*2*k/5 )*bs
	
	,


		x+Math.cos(Math.PI*2*k/5)*e
		,
		y+Math.sin(Math.PI*2*k/5)*e
	);
}

/* Draw a petal on `ctx` at `x`,`y` with proportion `am`,`as`,`bm`,`bs`,`e` and `k` as orientation */
function petal(k,ctx,x,y,am,as,bm,bs,e) {
	ctx.beginPath();
	ctx.moveTo( x , y );
	subPlant(k,ctx,x,y,am,as,bm,bs,e);
	ctx.moveTo( x , y );
	subPlant(k,ctx,x,y,am,-as,bm,-bs,e);
	ctx.stroke();
	ctx.fill();
}
/* Draw a ear of wheat on `ctx` at `x`,`y` with proportion `am`,`as`,`bm`,`bsa`,`bsb`,`e` and `k` as orientation */
function earOfWheat(k,ctx,x,y,am,as,bm,bsa,bsb,e) {
	ctx.beginPath();
	ctx.moveTo( x , y );
	subPlant(k,ctx,x,y,am,as,bm,bsa,e);
	ctx.moveTo( x , y );
	subPlant(k,ctx,x,y,am,-as,bm,bsb,e);
	ctx.stroke();
	ctx.fill();
}

/* Handle DOM */
const canvas = document.querySelector('canvas');
const dessin = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

/* Config */
const COUNT = 15;
const PROPORTION_FLOWER_WHEAT = 0.7;
const ANIM_SPEED = 0.02;
const BRANCH_MIN_HEIGHT = canvas.height * 0.2 ;
const BRANCH_RAND_HEIGHT = canvas.height * 0.6 ;

const COLOR_BRANCH = '#207024';
const COLOR_MAIN = '#202470';
const COLOR_SECOND = '#8285b5';

/* Generate initial state */
let groundPos = [... new Array(COUNT)].map( () => Math.random() * canvas.width )
let branchHeight = [... new Array(COUNT)].map( () => (Math.random() * BRANCH_RAND_HEIGHT  ) + BRANCH_MIN_HEIGHT )
let windOfset = [... new Array(COUNT)].map( () => [Math.random(),Math.random(),Math.random()] )

/* Initialize counter */
let FRAME = 0;


function draw() {

	// Next frame
	FRAME+= ANIM_SPEED;

	// Clear
	dessin.clearRect(0,0,canvas.width,canvas.height)

	// Branch
	dessin.strokeStyle = COLOR_BRANCH;
	dessin.beginPath();
	for(let i=0 ; i<COUNT ; i++) {
		dessin.moveTo( groundPos[i] , canvas.height )
		dessin.bezierCurveTo( 
			groundPos[i] + 80*Math.sin(FRAME+windOfset[i][0]), canvas.height - 1*branchHeight[i]/3,
			groundPos[i] + 80*Math.cos(FRAME+windOfset[i][1]), canvas.height - 2*branchHeight[i]/3,
			groundPos[i] + 80*Math.cos(FRAME+windOfset[i][2]), canvas.height - 3*branchHeight[i]/3)
	}
	dessin.stroke();
	dessin.closePath();

	// Top part
	dessin.strokeStyle = '#ffffff'
	for(let i=0 ; i<COUNT ; i++) {
		const x =  groundPos[i] + 80*Math.cos(FRAME+windOfset[i][2]);
		const y =  canvas.height - 3*branchHeight[i]/3;
		if( i < COUNT * PROPORTION_FLOWER_WHEAT ) {
			// Flower case 
			for(let k=0;k<5;k++) {
				// petal part
				dessin.fillStyle = (i%2)?COLOR_MAIN:COLOR_SECOND;
				petal( k , dessin , x , y , 25 , 10 , 35 , 10 , 50 );
				// sepal part
				dessin.fillStyle = (i%2)?COLOR_SECOND:COLOR_MAIN;
				petal( k+0.5 , dessin , x , y , 12 , 7 , 18 , 7 , 30 );
			}
		} else {
			// Wheat part
			let AnchorPoint = [
			groundPos[i]									 , canvas.height - 0*branchHeight[i]/3,
			groundPos[i] + 80*Math.sin(FRAME+windOfset[i][0]), canvas.height - 1*branchHeight[i]/3,
			groundPos[i] + 80*Math.cos(FRAME+windOfset[i][1]), canvas.height - 2*branchHeight[i]/3,
			groundPos[i] + 80*Math.cos(FRAME+windOfset[i][2]), canvas.height - 3*branchHeight[i]/3
			]

			for(let t=0.5   ; t<1 ; t+=0.08*(1 - (branchHeight[i]/canvas.height))**0.2) {
				dessin.fillStyle = (i%2)?COLOR_MAIN:COLOR_SECOND;
				// Left side
				let [xt,yt] = bezierAtT(t,...AnchorPoint);
				k=4.2+Math.cos(FRAME+windOfset[i][2])/3.5;
				earOfWheat( k , dessin , xt , yt , 7.5 , 15 , 22.5 , 15 , 4 , 35 );
				// Right side
				[xt,yt] = bezierAtT(t+0.02,...AnchorPoint);
				k=3.2+Math.cos(FRAME+windOfset[i][2])**2/20;
				earOfWheat( k , dessin , xt , yt , 7.5 , 15 , 22.5 , 15 , 4 , 35 );
			}
		}
	}

	window.requestAnimationFrame( draw )
}
draw()
