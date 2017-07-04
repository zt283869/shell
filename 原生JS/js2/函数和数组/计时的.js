
var timer;
function zant(){
	clearInterval(timer);
}

function mybegin(){
var mSeconds = 0;
var seconds = 0;
var minutes = 0;
	clearInterval(timer);
	timer = setInterval(function(){
		mSeconds++;
		if(mSeconds>=100){
			mSeconds = 0;
			seconds++;
			if(seconds>=10){
				seconds = 0;
				minutes++;
			}
		}
	with(document){
		getElementById("text1").value=mSeconds;
		getElementById("text2").value=seconds;
		getElementById("text3").value=minutes;
	}
	},10)
	
}

