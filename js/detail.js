
function subClose()
{
	$(".con2 .subcon").css("display","none");
	$(".con3 .subcon").css("display","none");
	$(".con4 .subcon").css("display","none");
	$(".con5 .subcon").css("display","none");
	$(".con2 .subtitle").css("display","block");
	$(".con3 .subtitle").css("display","block");
	$(".con4 .subtitle").css("display","block");
	$(".con5 .subtitle").css("display","block");
}

gsap.to($(".detail"),{duration:0,y:$(window).height()});	
//gsap.to($(".detail"),{duration:.3,y:0});	
//$("body").scrollTop(0);

 $('.test').click(function() {
	console.log($(this).data("file"));
	loadDetailData($(this).data("file"));
 });

function loadDetailData(id)
{
	console.log('./data/'+id+'.html');
	$(".detail").load("data/"+id+".html",function()
	{
		console.log('complete');
		setDetailBTN();
		//resizeF();
	});
	
}
var sliders = [];
var ebooks = [];
function setDetailBTN()
{
	gsap.to($(".detail"),{duration:.3,y:0});	
	$(".detail .closeBTN").click(function()
	{
		subClose();
		gsap.to($(".detail"),{duration:.3,y:$(window).height()});
		setTimeout(function()
		{
			$(".detail").html("");	
			//$(".detail").css("height","0px");	
		},300);
	});
	$(".con").each(function(index, item){
		this._subcon = $(this).find(".subcon")[0];
		this._subtitle = $(this).find(".subtitle")[0];
		this._btnClose = $(this).find(".btn-close")[0];
		let THIS = this;
		console.log(this._subtitle);
		$(this._subtitle).click(function()
		{
			$(THIS._subcon).css("display","block");
			$(THIS._subtitle).css("display","none");
		});
		$(this._btnClose).click(function()
		{
			$(THIS._subtitle).css("display","block");
			$(THIS._subcon).css("display","none");
		});
	});
	
	for(var item in sliders)
	{
		item = null;
	}
	sliders = [];
	$(".detail .img-slide").each(function(index, item){
		var slider = new SlideImgs(item);
		sliders.push(slider);
	});
	for(var item in ebooks)
	{
		item = null;
	}
	ebooks = [];
	$(".detail .e-book").each(function(index, item){
		var ebook = new Ebook(item);
		ebooks.push(ebook);
	});
	var footer = $('<div class="footer"><p>22212 인천광역시 미추홀구 인하로100 인하공업전문대학 TEL.032 870-2114<br/>COPYRIGHT© INHA TECHNICAL COLLEGE. ALL RIGHTS RESERVED</p></div>');
	$(".detail").append(footer);
	/*
	$(".detail").load("data/"+id+".html",function()
	{
		console.log('complete');
		setDetailBTN();
		//resizeF();
	});
	*/
}

class SlideImgs
{
    constructor(slideEl)
    {
		let THIS = this;
        this._imgsA = $(slideEl).find(".img");
		this._imgs = $(slideEl).find(".imgs")[0];
		
		var w = $(window).width();
		this.slideW = 1170;
		if(w<1170)
		{
			this.slideW = w*.9; 
		}
		this._imgsA.each(function(index, item){
			$(item).css("width",THIS.slideW);
		});
		$(this._imgs).css("width",this.slideW*this._imgsA.length);
		this._btnLeft = $(slideEl).find(".slide-btn-left")[0];
		this._btnRight = $(slideEl).find(".slide-btn-right")[0];

		this.moving = false;
		this.currentIdx = 0;
		
		$(this._btnLeft).bind('click',function(event){
			if(THIS.moving == false)
			{
				event.preventDefault();
				console.log("_btnLeft");
				THIS.goLeft();
			}
        });
		$(this._btnRight).bind('click',function(event){
            if(THIS.moving == false)
			{
				event.preventDefault();
				console.log("_btnRight");
				THIS.goRight();
			}
        });
	}
	goLeft()
	{
		if(this.currentIdx-1>=0)
		{
			this.moving = true;
			let THIS = this;
			this.currentIdx--;
			gsap.to(this._imgs,{duration:.3, x:-(this.currentIdx)*this.slideW, ease: Power2.out, onComplete: function(){
				THIS.moving = false;
			}});
		}
	}
	goRight()
	{
		if(this.currentIdx+1<this._imgsA.length)
		{
			this.moving = true;
			let THIS = this;
			this.currentIdx++;
			gsap.to(this._imgs,{duration:.3, x:-(this.currentIdx)*this.slideW, ease: Power2.out, onComplete: function(){
				THIS.moving = false;
			}});
		}
	}
}

var ebookInside = $('<div class="ebookInside"><img src="img/detail/bookcenter.png" width="138" height="827" border="0" alt=""></div>');
class Ebook
{
    constructor(ebookEl)
    {
		let THIS = this;
        this._imgsA = $(ebookEl).find(".img");
		this._imgs = $(ebookEl).find(".imgs")[0];
		
		var w = $(window).width();
		this.slideW = 1170;
		if(w<1170)
		{
			this.slideW = w*.9; 
		}
		$(ebookEl).css("height",this.slideW*.7);
		this._imgsA.each(function(index, item){
			//let imgT = ebookInside.clone();
			//$(item).append(imgT);
			$(item).css("width",THIS.slideW);
		});
		
		$(this._imgs).css("width",this.slideW*this._imgsA.length);
		this._btnLeft = $(ebookEl).find(".e-book-btn-left")[0];
		this._btnRight = $(ebookEl).find(".e-book-btn-right")[0];

		this.moving = false;
		this.currentIdx = 0;
		
		$(this._btnLeft).bind('click',function(event){
			if(THIS.moving == false)
			{
				event.preventDefault();
				console.log("_btnLeft");
				THIS.goLeft();
			}
        });
		$(this._btnRight).bind('click',function(event){
            if(THIS.moving == false)
			{
				event.preventDefault();
				console.log("_btnRight");
				THIS.goRight();
			}
        });
	}
	goLeft()
	{
		if(this.currentIdx-1>=0)
		{
			this.moving = true;
			let THIS = this;
			this.currentIdx--;
			gsap.to(this._imgs,{duration:.3, x:-(this.currentIdx)*this.slideW, ease: Power2.out, onComplete: function(){
				THIS.moving = false;
			}});
		}
	}
	goRight()
	{
		if(this.currentIdx+1<this._imgsA.length)
		{
			this.moving = true;
			let THIS = this;
			this.currentIdx++;
			gsap.to(this._imgs,{duration:.3, x:-(this.currentIdx)*this.slideW, ease: Power2.out, onComplete: function(){
				THIS.moving = false;
			}});
		}
	}
}