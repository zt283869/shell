		var span1 = document.getElementById("1span");
			var span2 = document.getElementById("2span");
			var bjian1 = document.getElementById("1bjian");
			var txt1 = document.getElementById("1txt");
			var bjia1 = document.getElementById("1bjia");
			var bjian2 = document.getElementById("2bjian");
			var txt2 = document.getElementById("2txt");
			var bjia2 = document.getElementById("2bjia");
			var sp1price = document.getElementById("sp1price");
			var sp2price = document.getElementById("sp2price");
			var comf = document.getElementById("comf");
		//失去焦点
		txt1.onblur = function(){
			if(txt1.value>=200){
				txt1.value=199;
				bjia1.disabled = true;
				bjia1.style.cursor="not-allowed";
				
			}
			savecookie("jg1",txt1.value,10);
			var num = getCookie("jg1");
			sp1price.innerHTML = span1.innerHTML*num;
			comf.innerHTML = (sp2price.innerHTML)*1+(sp1price.innerHTML)*1;
		}
		//失去焦点
		txt2.onblur = function(){
			if(txt2.value>=200){
				txt2.value=199;
				bjia2.disabled = true;
				bjia2.style.cursor="not-allowed";
				
			}
			savecookie("jg2",txt2.value,10);
			var num = getCookie("jg2");
			sp2price.innerHTML = span2.innerHTML*num;
			comf.innerHTML = (sp2price.innerHTML)*1+(sp1price.innerHTML)*1;
			
		}
		//加
	bjia1.onclick = function(){
				var n = parseInt(txt1.value);
				if(n>0&&n<199){
					txt1.value=n+1;
					bjian1.disabled = false;
					bjian1.style.cursor="pointer";
					if(txt1.value==199){
						bjia1.disabled = true;
						bjia1.style.cursor="not-allowed";
					}
				}else{
						bjia1.disabled = true;
						bjia1.style.cursor="not-allowed";
				}
				savecookie("jg1",txt1.value,10);
				var num = getCookie("jg1");

				sp1price.innerHTML = span1.innerHTML*num;
				comf.innerHTML = (sp2price.innerHTML)*1+(sp1price.innerHTML)*1;
			}
	
	
	bjia2.onclick = function(){
				var n = parseInt(txt2.value);
				if(n>0&&n<=199){
					txt2.value=n+1;
					bjian2.disabled = false;
					bjian2.style.cursor="pointer";
					if(txt2.value==199){
						bjia2.disabled = true;
						bjia2.style.cursor="not-allowed";
					}
				}else{
						bjia2.disabled = true;
						bjia2.style.cursor="not-allowed";
				}
				savecookie("jg2",txt2.value,10);
				var num = getCookie("jg2");

				sp2price.innerHTML = span2.innerHTML*num;
				comf.innerHTML = (sp2price.innerHTML)*1+(sp1price.innerHTML)*1;
			}
	
	//减
	
	bjian1.onclick = function(){
				var n = parseInt(txt1.value);
				if(n>1&&n<=199){
					txt1.value = n-1;
					bjia1.disabled = false;
					bjia1.style.cursor = "pointer";
					if(txt1.value==1){
						bjian1.disabled = true;
						bjian1.style.cursor = "not-allowed";
					}
				}else{
						bjian1.disabled = true;
						bjian1.style.cursor = "not-allowed";
				}
				console.log(txt1.vlaue);
				savecookie("jg1",txt1.value,10);
				var num = getCookie("jg1");

				sp1price.innerHTML = span1.innerHTML*num;
				comf.innerHTML = (sp2price.innerHTML)*1+(sp1price.innerHTML)*1;
			}
	//减
	bjian2.onclick = function(){
				var n = parseInt(txt2.value);
				if(n>1&&n<200){
					txt2.value = n-1;
					bjia2.disabled = false;
					bjia2.style.cursor = "pointer";
					if(txt2.value==1){
						bjian2.disabled = true;
						bjian2.style.cursor = "not-allowed";
					}
				}else{
						bjian2.disabled = true;
						bjian2.style.cursor = "not-allowed";
				}
//				console.log(txt2.vlaue);
				savecookie("jg2",txt2.value,10)
				var num = getCookie("jg2");

				sp2price.innerHTML = span2.innerHTML*num;
				comf.innerHTML = (sp2price.innerHTML)*1+(sp1price.innerHTML)*1;
			}
	
		//合计金额
		
			
		
		
