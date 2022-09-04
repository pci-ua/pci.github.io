// Config
const targetList = ['member','thread','os','kernel']
const particlesConfigPath = 'assets/conf/particlesjs-config.json'
const hoverSpeedFactor = 4;

// Global vars
var canvasLoaded = 0;

function loaded() {
	console.log(`${++canvasLoaded} animations loaded out of ${targetList.length}`)
	if( canvasLoaded == targetList.length ) {

		// Custom interaction

		for(let animation of window.pJSDom ) {
			animation.pJS.canvas.el.addEventListener( 'mouseenter' , (function () { this.pJS.particles.move.speed /= hoverSpeedFactor; } ).bind( animation ) );
			animation.pJS.canvas.el.addEventListener( 'mouseleave' , (function () { this.pJS.particles.move.speed *= hoverSpeedFactor; } ).bind( animation ) );
		}

	}

}

// Load animation
for(let target of targetList ) particlesJS.load( target ,  particlesConfigPath , loaded )


document.querySelector('#sub button').onclick = () => {
	alert( 'Envoyer un mail à contact@projetcohesion.info \n\n ou \n\nContactez un Kernel via discord (discord.projetcohesion.info) ')
}