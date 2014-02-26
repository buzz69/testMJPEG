	var flux='http://lonsdale.dyndns.org:1080/snapshot.cgi?user=admin&pwd=lezennes';
	var ctx=null;
	var motionInterval=1000;	//délai d'affichage entre les images de la caméra
	
	$( document ).bind( "mobileinit", function() {  
		// Make your jQuery Mobile framework configuration changes here!  
		$.mobile.allowCrossDomainPages = true;
	});

	$( '#viewPage' ).live( 'pageshow',function(event){
		//navigator.notification.alert("Start motion");
		$('#infos').append("Page loaded<br>");
		ctx = document.getElementById('viewImg').getContext('2d');
		$('#infos').append("Canva registred<br>");
		$('#infos').append("Start motion: "+flux+"<br>");
		motion();
	});
	
	/*
	function motion(){
		randomNum=Date.now();
		tmpUrl=snapshotUrl+'&time='+randomNum;
		tmpIMG=new Image();
		tmpIMG.src=tmpUrl;
		tmpIMG.onload = function(){
			$('#viewImg').attr('src',tmpUrl);
			//setTimeout("motion()",500);
			motion();
		}
	}
	*/
	function motion(){
			randomNum=Date.now();
			tmpUrl=flux+'&time='+randomNum;
			tmpIMG=new Image();
			tmpIMG.src=tmpUrl;
			tmpIMG.onload= function(){
				//$('#infos').append("Picture loaded !<br>");
					//ratio=this.width/this.height;
					//largeur=Math.ceil(window.innerWidth-(window.innerWidth/10));	//largeur ecran -10%
					//hauteur=Math.ceil(largeur/ratio);
					//$('#viewImg').attr('width',largeur);
					//$('#viewImg').attr('height',hauteur);
					//$('#infos').append("Drawing canva<br>");
					ctx.drawImage(tmpIMG, 0, 0, this.width, this.height, 0, 0, 320, 240);
					setTimeout("motion()",motionInterval);
			};
			tmpIMG.onerror=function(){
				$('#infos').append("Picture load failed !<br>");
				motion();
			};
	}