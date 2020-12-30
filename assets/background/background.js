class Color {
	constructor(r,g,b,a) {
		//Vérification existence et type
		if( (r === undefined) || (g === undefined) || (b === undefined) ) throw "Error in Color constructor,Color constructor must have at least 3 parameters";
		if( typeof r != 'number' ) throw `Error in Color constructor, first paramater must be a number but an ${typeof r} as been given instead`;
		if( typeof g != 'number' ) throw `Error in Color constructor, second paramater must be a number but an ${typeof g} as been given instead`;
		if( typeof b != 'number' ) throw `Error in Color constructor, third paramater must be a number but an ${typeof b} as been given instead`;
		if( typeof a != 'number' && a !== undefined) throw `Error in Color constructor, fourth paramater must be an number if it as been given, but an ${typeof r} as been found instead`;
		
		//Affectation
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = (a)?a:null; // alpha | transparence
	}
	
	toString(format='rgb') {
		format=format.toLowerCase();
		switch(format) {
			case 'rgb':
			case 'rgba':
			case 'rvb':
			case 'rvba':
				if(this.a)
					return `rgba(${this.r},${this.g},${this.b},${this.a})`;
				else
					return `rgb(${this.r},${this.g},${this.b})`;
			case 'h':
			case 'hex':
			case 'hexa':
			case 'hexadecimal':
				const formatage = (decimal) => {hex = decimal.toString(16); while(hex.length<2)hex='0'+hex; return hex; }
				if(this.a)
					return '#'+formatage(this.r)+formatage(this.g)+formatage(this.b)+formatage(Math.floor(this.a*256));
				else
					return '#'+formatage(this.r)+formatage(this.g)+formatage(this.b);
			default:
				throw "Error in Color.toString(), the format given hasn't been recognized";
		}
			
	}
}

const ball_color = new Color(255,255,255);
   R = 2,
   balls = [],
   alpha_f = 0.03,
   alpha_phase = 0,
    
// Line
   link_line_width = 0.8,
   dis_limit = 260,
   add_mouse_point = true,
   mouse_in = false,
   mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: 'mouse'
   };

// Random speed
function getRandomSpeed(pos){
    var  min = -1,
       max = 1;
    switch(pos){
        case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
            break;
        case 'right':
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
            break;
        case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
            break;
        case 'left':
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max){
    return Math.random()*(max - min) + min;
}
// Random Ball
function getRandomBall(){
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch(pos){
        case 'top':
            return {
                x: randomSidePos(Background.canvas.width),
                y: -R,
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'right':
            return {
                x: Background.canvas.width + R,
                y: randomSidePos(Background.canvas.height),
                vx: getRandomSpeed('right')[0],
                vy: getRandomSpeed('right')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos(Background.canvas.width),
                y: Background.canvas.height + R,
                vx: getRandomSpeed('bottom')[0],
                vy: getRandomSpeed('bottom')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos(Background.canvas.height),
                vx: getRandomSpeed('left')[0],
                vy: getRandomSpeed('left')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
    }
}
function randomSidePos(length){
    return Math.ceil(Math.random() * length);
}

// Draw Ball
function renderBalls(){
    Array.prototype.forEach.call(balls, function(b){
       if(!b.hasOwnProperty('type')){
           Background.ctx.fillStyle = ball_color.toString();
           Background.ctx.beginPath();
           Background.ctx.arc(b.x, b.y, R, 0, Math.PI*2, true);
           Background.ctx.closePath();
           Background.ctx.fill();
       }
    });
}

// Update balls
function updateBalls(){
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b){
        b.x += b.vx;
        b.y += b.vy;
        
        if(b.x > -(50) && b.x < (Background.canvas.width+50) && b.y > -(50) && b.y < (Background.canvas.height+50)){
           new_balls.push(b);
        }
        
        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
    });
    
    balls = new_balls.slice(0);
}

// loop alpha
function loopAlphaInf(){
    
}

// Draw lines
function renderLines(){
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
           
           fraction = getDisOf(balls[i], balls[j]) / dis_limit;
            
           if(fraction < 1){
               alpha = (1 - fraction).toString();

               Background.ctx.strokeStyle = 'rgba(150,150,150,'+alpha+')';
               Background.ctx.lineWidth = link_line_width;
               
               Background.ctx.beginPath();
               Background.ctx.moveTo(balls[i].x, balls[i].y);
               Background.ctx.lineTo(balls[j].x, balls[j].y);
               Background.ctx.stroke();
               Background.ctx.closePath();
           }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2){
    var  delta_x = Math.abs(b1.x - b2.x),
       delta_y = Math.abs(b1.y - b2.y);
    
    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
}

// add balls if there a little balls
function addBallIfy(){
    if(balls.length < 20){
        balls.push(getRandomBall());
    }
}

// Render
function render(){
    Background.ctx.clearRect(0, 0, Background.canvas.width, Background.canvas.height);
    
    renderBalls();
    
    renderLines();
    
    updateBalls();
    
    addBallIfy();
    
    window.requestAnimationFrame(render);
}

// Init Balls
function initBalls(num){
    for(var i = 1; i <= num; i++){
        balls.push({
            x: randomSidePos(Background.canvas.width),
            y: randomSidePos(Background.canvas.height),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}
// Init Canvas
function initCanvas(){
    Background.canvas.setAttribute('width', window.innerWidth);
    Background.canvas.setAttribute('height', window.innerHeight);
}

window.addEventListener('resize', function(e){
    initCanvas();
    
});

function goMovie(){
    initCanvas();
    initBalls(30);
    window.requestAnimationFrame(render);
}

// Mouse effect

let Background = {};

window.addEventListener( 'load' , () => {
	Background.canvas = document.createElement('canvas');
	Background.canvas.id = 'background';
   	Background.ctx = Background.canvas.getContext('2d');
	
	document.body.prepend(Background.canvas);
	initCanvas();
	mouse_in = true;
	
	document.body.addEventListener('mouseenter', function(){
    	mouse_in = true;
    	balls.push(mouse_ball);
	});
	
	document.body.addEventListener('mouseleave', function(){
    	mouse_in = false;
    	var new_balls = [];
    	Array.prototype.forEach.call(balls, function(b){
        	if(!b.hasOwnProperty('type')){
            	new_balls.push(b);
        	}
    	});
    	balls = new_balls.slice(0);
	});
	
	document.body.addEventListener('mousemove', function(e){
    	var e = e || window.event;
    	mouse_ball.x = e.clientX;
    	mouse_ball.y = e.clientY;
	});

	goMovie();
	

});



