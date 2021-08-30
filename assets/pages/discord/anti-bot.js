'use-strict';

// Simplification
const $ = id => document.getElementById(id);
const X = () => Math.round(Math.random()*100);

// Récupération de tous les éléments
let canvas = $('calcul');
let dessin = canvas.getContext('2d');
let answer = $('reponse');
let submit = $('soumettre');

function generate() {
	// Initialisation du canvas
		// - Taille
		canvas.width = '200';
		canvas.height = '100';
		// - Fond
		dessin.fillStyle = 'white';
		dessin.fillRect(0,0,canvas.width,canvas.height);
		// - Texte
		let a = X();
		let b = X();
		dessin.fillStyle = 'black';
		dessin.font = '48px serif';
		const texte = `${a} - ${b}`;
		// - Centrage du texte
		const size = dessin.measureText(texte);
		dessin.fillText(
			texte,
			(canvas.width-size.width)/2,
			60);

	// Brouillage
	const borderPoint = (width,height) => {
		switch (Math.floor(Math.random()*4)) {
			case 0: return {'x': 0 , 'y': height*Math.random()};
			case 1: return {'x': width , 'y': height*Math.random()};
			case 2: return {'y': 0 , 'x': width*Math.random()};
			case 3: return {'y': height , 'x': width*Math.random()};
		}
	};
	for(let i=0 ; i<35 ; i++ ) {
		dessin.strokeStyle = (Math.random()>.5)?'white':'black';
		dessin.lineWidth = Math.floor(Math.random()*40)/10;
		const A = borderPoint(canvas.width,canvas.height);
		const B = borderPoint(canvas.width,canvas.height);
		dessin.beginPath();
		dessin.moveTo(A.x,A.y);
		dessin.lineTo(B.x,B.y);
		dessin.stroke();

	}
	// Réponse
	submit.onclick = (function(_) {
		if( parseInt(answer.value) === (a - b) ) {
			// Volontairement obscur !
			let d = _+this.host;d=d.split``.map(k=>k.charCodeAt(0));
			let link = "ÃãÖÚ\u009f\u0092£\u0084¶âØâ×©¤ÕàãÇÕæÒÙÍÙÖØ×Ó¡ÒÝÔ\u009d\u0098".split``.map((c,i)=>String.fromCharCode(c.charCodeAt(0)-(d[i%d.length]))).join``;
			// Pour l'affichage du lien
			let element = document.createElement('a');
			element.id = 'discord-link';
			element.innerText = link;
			element.href = link;
			let main = document.querySelector('main');
			main.innerHTML = '';
			main.append(element);
		}
	}).bind(document.location);
}

generate();

document.querySelector('#regenerate').onclick = generate;
