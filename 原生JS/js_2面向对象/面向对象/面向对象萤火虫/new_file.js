"user styict";
function $(sre){
		return document.getElementsByClassName(sre);
	}
		function fireflies(json){
			this.width = json.width;
			this.height = json.height;
			this.imgr = json.imgr;
			this.imgnum = json.imgnum;
			this.speed = json.speed;
			this.init();
			
		}
		fireflies.prototype.init = function(){
			for(let i=0;i<this.imgnum;i++){
				let Img = document.createElement("img");
					Img.src = this.imgr;
					Img.className = "moveImg";
					Img.style.cssText = "width:"+this.width+"px; height:"+this.height+"px; position:absolute;";
					document.body.appendChild(Img);
			}
			this.move();
			
		}

		fireflies.prototype.move = function(){
			let that = this;		
			(onmousemove = function(eve){				
				let e = eve||window.event;	
				let clientLeft = e.clientX;
				let clientTop= e.clientY;
				$("moveImg")[0].style.left = clientLeft+"px";
				$("moveImg")[0].style.top = clientTop+"px";
			})();
			setInterval(function(){
				let Imglength = $("moveImg");
				for(let i=Imglength.length-1;i>0;i--){
					Imglength[i].style.left = Imglength[i-1].style.left;
					Imglength[i].style.top = Imglength[i-1].style.top;
				}
			},this.speed);
		}