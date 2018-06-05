(function () {
		    var html = document.documentElement;
		
		    function onWindowResize() {
		        html.style.fontSize = html.getBoundingClientRect().width /10 + 'px';
		    }
		
		    window.addEventListener('resize', onWindowResize);
		    onWindowResize();
		})();
