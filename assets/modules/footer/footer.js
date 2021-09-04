window.addEventListener( 'load' , async () => {
  let element = document.createElement('footer');
  let content = await fetch(`/assets/modules/footer/footer.html`).then( reponse => reponse.text() );
  element.innerHTML = content;
  // footer always stick to the bottom
  const stickBottom = (function() {
	this.style.position = '';
	  if( document.body.clientHeight  < window.screen.height ) {
  	this.style.position = 'absolute';
  	this.style.bottom = 0;
	}
  }).bind(element);
  document.body.appendChild(element);
  stickBottom();
  window.addEventListener( 'resize' , stickBottom );
  document.addEventListener( 'resize' , stickBottom );
});
