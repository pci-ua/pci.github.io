const liste_fichier = [
	'classic_sample.txt',
	'anonymous_sample.txt',
];

let e;
window.addEventListener( 'load', async () => {
	let loc = document.querySelector('main');
	for(let fichier of liste_fichier) {
		let data = (await fetch( `./data/${fichier}` ).then( response => {e=response;return response.text()} )).split('\n');
		let title = data.shift();
		let content = data.join('\n');
		loc.innerHTML += `<div> <h4>${title}</h4> <p>${content}</p> <span><!--date to do--></span></div>`;
	}
});
