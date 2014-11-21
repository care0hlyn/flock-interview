$(document).ready(init);

var jsonData,
	diamondSpaceX = 26,
	diamondSpaceY = 32,
	diamonds = [{x:5,y:0},{x:5,y:2},{x:5,y:4},{x:4,y:1},{x:6,y:1},{x:4,y:3},{x:6,y:3},{x:4,y:5},{x:6,y:5},{x:3,y:2},{x:7,y:2},{x:3,y:4},{x:7,y:4},{x:3,y:6},{x:7,y:6},{x:2,y:3},{x:8,y:3},{x:2,y:5},{x:8,y:5},{x:2,y:7},{x:8,y:7},{x:1,y:4},{x:9,y:4},{x:1,y:6},{x:9,y:6},{x:0,y:5},{x:10,y:5}];

function init(){

	$.ajax({
	  dataType: "text",
	  url: 'json/data.json',
	  success: jsonLoaded
	});
}

function jsonLoaded(data){

	//this strips out line returns so that multiline strings in the JSON will parse correctly
	data = data.replace(/(\r\n|\n|\r)/gm,"");
	data = data.replace(/\t/g, '');

	jsonData = $.parseJSON(String(data));

	landing_createLogo();

	// then gather formation
	setTimeout(landing_gatherDiamondFormation, 200);

	// glow logo
	setTimeout(function(){
		document.getElementById('flockLogo').className = 'glow';
	}, 1475);

	// expload formation
	setTimeout(landing_exploadDiamondFormation, 2500);

	// finally, hide logo and call ready function
	setTimeout(function(){
		document.getElementById('flockLogo').style.display = 'none';
		main_ready(jsonData);
	}, 4000);
}


//this function assemble the flock logo
function landing_createLogo(){
	var objArr = [],
		numDiamonds = diamonds.length,
		flockLogo = document.getElementById('flockLogo'),
		coverElem = document.createElement('div');

	diamonds.reverse();

	while(numDiamonds--){
		var diamondPos = diamonds[numDiamonds],
			newDiamond = landing_createDiamond();

		flockLogo.appendChild(newDiamond);
		newDiamond.style.opacity = 0;

		objArr.unshift({elem: newDiamond, destLeft:(diamondPos.x*diamondSpaceX)+'px', destTop:(diamondPos.y*diamondSpaceY)+'px', transDelay: (numDiamonds*10)});
	}

	flockLogo.style.width = ((diamondSpaceX*10)+35)+'px';
	flockLogo.style.marginLeft = Math.round(((diamondSpaceX*10)+35)/-2)+'px';
	flockLogo.style.height = ((diamondSpaceY*7)+43)+'px';
	flockLogo.style.marginTop = Math.round(((diamondSpaceY*7)+43)/-2)+'px';

	coverElem.className = 'cover';
	flockLogo.className = 'glow';
	flockLogo.appendChild(coverElem);

	diamonds = objArr;

}

//this function sets all diamonds to the final positions
function landing_gatherDiamondFormation(){
	var numDiamonds = diamonds.length;

	landing_updateDiamondTransitions(false);

	setTimeout(function(){document.getElementById('flockLogo').className = ''}, 200);

	while(numDiamonds--){
		var newDiamondObj = diamonds[numDiamonds],
			newDiamondElem = newDiamondObj.elem;

		newDiamondElem.style.left = newDiamondObj.destLeft;
		newDiamondElem.style.top = newDiamondObj.destTop;
		newDiamondElem.style.opacity = 1;
	}
	setTimeout(function(){landing_updateDiamondTransitions(true)}, 300);
}

//this function scatters the diamonds
function landing_exploadDiamondFormation(){
	var numDiamonds = diamonds.length;

	landing_updateDiamondTransitions(false);

//	setTimeout(function(){document.getElementById('flockLogo').className = 'glow'}, 100);
	document.getElementById('flockLogo').className = 'glow';

	while(numDiamonds--){
		var newDiamondObj = diamonds[numDiamonds],
			newDiamondElem = newDiamondObj.elem;

		newDiamondElem.style.left = ((.5-Math.random())*1000)+'px';
		newDiamondElem.style.top = ((.5-Math.random())*1000)+'px';
		newDiamondElem.style.opacity = 0;
	}

}

//this function switches transition duration and delay settings for the diamonds
function landing_updateDiamondTransitions(isResting){
	var numDiamonds = diamonds.length;

	while(numDiamonds--){
		var newDiamondObj = diamonds[numDiamonds],
			newDiamondElem = newDiamondObj.elem,
			transTime = (isResting)?300:800;
			transDelay = (isResting)?newDiamondObj.transDelay:newDiamondObj.transDelay*2,
			transEase = (isResting)?"cubic-bezier(0.42, 0, 0.58, 1)":"cubic-bezier(0.770, 0.000, 0.175, 1.000)";

		newDiamondElem.style['-webkit-transition-timing-function'] = newDiamondElem.style.transitionTimingFunction = transEase;
		newDiamondElem.style['-webkit-transition-duration'] = newDiamondElem.style.transitionDuration = transTime+'ms';
		newDiamondElem.style['-webkit-transition-delay'] = newDiamondElem.style.transitionDelay = transDelay+'ms';
	}
}

//this function creates and returns individual diamonds
function landing_createDiamond(delayTime){
	var diamondElem = document.createElement('div'),
		frontFace = document.createElement('div'),
		backFace = document.createElement('div');

	diamondElem.className = 'diamond';
	frontFace.className = 'front';
	backFace.className = 'back';

	//random start positions
	diamondElem.style.left = ((.5-Math.random())*1000)+'px';
	diamondElem.style.top = ((.5-Math.random())*1000)+'px';

	diamondElem.appendChild(frontFace);
	diamondElem.appendChild(backFace);

	return diamondElem;
}
