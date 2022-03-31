
/* ROADTO */
document
	.getElementById('road_to')
	.onclick = () => {
		console.log('est')
		let a = document.createElement('a');
		a.target = '_blank';
		a.href = `https://www.google.com/maps/dir//${laParenthese.lat},${laParenthese.lng}/`;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

/* GMAP */
const laParenthese = { lat: 47.4790845, lng :-0.600385 };	
const GPSpos = new google.maps.LatLng(laParenthese.lat,laParenthese.lng);
const opt = {
	zoom : 18,
	center : GPSpos,
	mapTypeId : google.maps.MapTypeId.TERRAIN,
	disableDefaultUI : false
};
const carte = new google.maps.Map(
	document.getElementById("map_canvas"),
	opt
); 
const marker = new google.maps.Marker({
	position: laParenthese,
	map: carte,
});
