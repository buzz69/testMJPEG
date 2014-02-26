	var flux='http://lonsdale.dyndns.org:1080/snapshot.cgi?user=admin&pwd=lezennes';
	var ctx=null;
	var motionInterval=1000;	//délai d'affichage entre les images de la caméra
	
	$( document ).bind( "mobileinit", function() {  
		// Make your jQuery Mobile framework configuration changes here!  
		$.mobile.allowCrossDomainPages = true;
	});

	$( '#viewPage' ).live( 'pageshow',function(event){
		//$('#viewImg').attr('src',snapshotUrl);
		//$('#viewImg').attr('width',$(window).width()+'px');
		navigator.notification.alert("Start motion");
		ctx = document.getElementById('viewImg').getContext('2d');
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
			//console.log("load image: ("+flux+")");
			tmpIMG.onload= function(){
				//console.log("image loaded: ("+tmpIMG.src+")");
					ratio=this.width/this.height;
					largeur=Math.ceil(window.innerWidth-(window.innerWidth/10));	//largeur ecran -10%
					hauteur=Math.ceil(largeur/ratio);
					$('#viewImg').attr('width',largeur);
					$('#viewImg').attr('height',hauteur);
					//console.log('source: '+this.width+'x'+this.height+' - destination: '+largeur+'x'+hauteur);
					ctx.drawImage(tmpIMG, 0, 0, this.width, this.height, 0, 0, largeur, hauteur);
					setTimeout("motion()",motionInterval);
			};
			tmpIMG.onerror=function(){
				//console.log("load error: ("+tmpIMG.src+")");
				motion();
			};
	}