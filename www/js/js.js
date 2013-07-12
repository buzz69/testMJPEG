	var snapshotUrl='http://lonsdale.dyndns.org:1080/snapshot.cgi?user=admin&pwd=lezennes';
	
	$( document ).bind( "mobileinit", function() {  
		// Make your jQuery Mobile framework configuration changes here!  
		$.mobile.allowCrossDomainPages = true;
	});

	$( '#viewPage' ).live( 'pageshow',function(event){
		$('#viewImg').attr('src',snapshotUrl);
		//$('#viewImg').attr('width',$(window).width()+'px');
		motion();
	});
	
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