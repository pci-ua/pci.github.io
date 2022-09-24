
let target = document.querySelector('main');
for(let i=1 ; i<=17 ; i++) {
	let tag = document.createElement('img');
	tag.src = `https://pci.leria-etud.univ-angers.fr/photo-soiree-gaming/low-res/${i}.jpg`;
	tag.onclick = (event) => {
		let a = document.createElement('a');
		a.href = event.target.src.replace('low-res','high-res');
		a.target = '_blank';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	tag.loading = 'lazy';
	tag.id = `img-${i}`;
	target.appendChild(tag);
}
