$(document).trigger("pageshow")
document.addEventListener('contextmenu', function(e){e.preventDefault();});

$(".bg").css("width",($(".frameset").offset().left + 1420) + "px");
$( window ).resize( function() {
  $(".bg").css("width",($(".frameset").offset().left + 1420) + "px");
});
$(".homeBtn").click(function()
{
	location.reload();
});
$(".btn-cover").mouseover(function()
{
	if($(this).data("idx") != currentChapter) $(this).css("opacity",.3);
});
$(".btn-cover").mouseout(function()
{
	if($(this).data("idx") != currentChapter) $(this).css("opacity",0);
});
$(".btn-cover").click(function()
{
	$(this).css("opacity",0);
	setCurrentChapter($(this).data("idx"));
	FullscreenConfirm();
});

$(".btn").mouseover(function()
{
	$(this).css("opacity",.8);
});
$(".btn").mouseout(function()
{
	$(this).css("opacity",1);
});
$(".btn").mousedown(function()
{
	$(this).css("opacity",.5);
});
$(".btn").mouseup(function()
{
	$(this).css("opacity",.8);
});
$(".tip-btn").click(function()
{
	resetTip();
	$(".popup_tip").css("display","block");
});
$(".btn-tip-close").click(function()
{
	$(".popup_tip").css("display","none");
});
$(".downbtn").each( function(index, item) 
{
	$(this).click(function()
	{
		var href = $(this).children().get(0).click();
	});
});
$(".btn-popup-close").click(closePopup);
$(".plus-btn").click(openPopup);
$(".arrow-l").click(prevPage);
$(".arrow-r").click(nextPage);
$(".popup-bg").click(closePopup);

let currentChapter = 0, currentPage = 0;
let page1BtnSet = [[0,1,1],[1,1,1],[1,1,1],[1,1,1],[1,0,2],[1,0,2],[1,0,2],[1,0,3],[1,0,3],[1,0,3]];//[plus,tip,title]
let page2BtnSet = [[0,1,4],[1,1,4],[1,1,4],[1,1,5],[1,0,5],[1,1,6],[1,0,6],[1,0,7],[1,0,7],[1,0,8]];
let page3BtnSet = [[0,1,9],[1,1,9],[1,1,10],[1,1,11],[1,1,11],[1,1,12],[1,1,12],[1,1,13],[1,0,13]];
let page4BtnSet = [[0,1,14],[1,1,14],[1,1,14],[1,1,15],[1,0,15]];
let page5BtnSet = [[0,0,16],[1,0,16],[1,0,16],[1,0,17],[1,0,18],[1,0,19],[1,0,20],[1,0,20],[1,0,20],[1,0,20],[1,0,20]];
let page6BtnSet = [[0,0,0]];
let pageBtnSet = [[],page1BtnSet,page2BtnSet,page3BtnSet,page4BtnSet,page5BtnSet];
let pageFunc = {}, pageData = {};
let i = 1, currentTime = 0;
let pn1 = 0 , pn2 = 1;
let chepterStartPageA = [0,6,26,46,64,74,0];

function resetTip()
{
	$("#tip-img").attr("src", "images/chapter"+(currentChapter)+"/tip_"+(currentPage*2+chepterStartPageA[currentChapter])+".png");
}
function nextPage()
{
	currentPage++;
	if(pageBtnSet[currentChapter].length == currentPage) 
	{	
		currentPage = 0;
		$(".btn-cover").get(currentChapter).click();
		return false;
	}
	if(currentPage >= 1) 
	{
		setBGcolor(false);
		$(".first-page").css("display","none");
		$(".contents").css("display","block");
		$(".history").css("display","block");
	}
	setPageBtns();
}
function prevPage()
{
	currentPage--;
	if(currentPage < 1)
	{
		setBGcolor(true);
		$(".first-page").css("display","block");
		$(".contents").css("display","none");
		$(".history").css("display","none");

		if (pageBtnSet[currentChapter][currentPage][1]) $(".first-page .tip-btn").css("display","block");
		else  $(".first-page .tip-btn").css("display","none");
	}
	else setPageBtns();
}
function setChapter6()
{
	setBGcolor(false);
	$(".first-page").css("display","none");
	$(".contents").css("display","none");
	$(".history").css("display","none");
	//$(".btns").css("display","none");
	$(".chapter6").css("display","block");

}
function setPageBtns()
{
	$(".btns .arrow-l").css("display","block");
	$(".btns .arrow-r").css("display","block");
	let isTip = "none",isPlus = "none";
	if (pageBtnSet[currentChapter][currentPage][0]) isPlus = "block";
	if (pageBtnSet[currentChapter][currentPage][1]) isTip = "block";
	$(".btns .tip-btn").css("display",isTip);
	$(".btns .plus-btn").css("display",isPlus);
	//if(pageBtnSet[currentChapter].length == currentPage+1) $(".btns .arrow-r").css("display","none");
	setPagingNumber();
}
function setPagingNumber()
{
	pn1 = currentPage*2+chepterStartPageA[currentChapter] , pn2 = currentPage*2+chepterStartPageA[currentChapter]+1;
	clearPage();
	setPage();

	if (pn1 < 10) pn1 = "00"+pn1;
	else if (pn1 < 100) pn1 = "0"+pn1;
	if (pn2 < 10) pn2 = "00"+pn2;
	else if (pn2 < 100) pn2 = "0"+pn2;
	$(".paging").text(pn1+" | "+pn2);
}
function setPage()
{
	$("#p1").attr("src", "images/chapter"+(currentChapter)+"/p"+pn1+".jpg");
	$("#p2").attr("src", "images/chapter"+(currentChapter)+"/p"+pn2+".jpg");
	if(pageFunc["func_"+(currentChapter)+"_"+pn1]) pageFunc["func_"+(currentChapter)+"_"+pn1]();
	if(pageFunc["func_"+(currentChapter)+"_"+pn2]) pageFunc["func_"+(currentChapter)+"_"+pn2]();

	if(pn2 == 39)
	{
		$(".btnsBg-r").css("background-color","#e1eed0");
		$(".contentsBg-r").css("background-color","#e1eed0");
	}
	else if(pn1 == 76 || pn1 == 78 || pn1 == 80 || pn1 == 82 || pn1 == 84)
	{
		$(".btnsBg-r").css("background-color","#eeecf7");
		$(".contentsBg-r").css("background-color","#eeecf7");
		$(".btnsBg-l").css("background-color","#eeecf7");
		$(".contentsBg-l").css("background-color","#eeecf7");
	}
	else
	{
		$(".btnsBg-r").css("background-color","#FFFFFF");
		$(".contentsBg-r").css("background-color","#FFFFFF");
		$(".btnsBg-l").css("background-color","#FFFFFF");
		$(".contentsBg-l").css("background-color","#FFFFFF");
	}
	console.log(pageBtnSet[currentChapter][currentPage][2]);
	$("#chapterTitle").attr("src", "images/hasira/title_"+(pageBtnSet[currentChapter][currentPage][2])+".jpg");	
}
function setCurrentChapter(n)
{
	currentChapter = n;
	$("#naviImg").attr("src", "images/chapter"+(currentChapter)+"/navi.png");	
	$("#firstPage").attr("src", "images/chapter"+(currentChapter)+"/p1.png");
	
	$("#arrow_l_w").attr("src", "images/chapter"+(currentChapter)+"/arrow_l_w.png");
	$("#arrow_r_w").attr("src", "images/chapter"+(currentChapter)+"/arrow_r_w.png");
	$("#tip_w").attr("src", "images/chapter"+(currentChapter)+"/tip_w.png");
	$("#plus_w").attr("src", "images/chapter"+(currentChapter)+"/plus_w.png");

	$(".paging").css("color",bgColorA[currentChapter]);
	clearPage();
	setBGcolor(true);

	if(currentChapter == 6) setChapter6();
	else 
	{
		currentPage = 1;
		prevPage();
	}	
}
function closePopup()
{
	if (player && player.getCurrentTime) currentTime = player.getCurrentTime();
	$(".popup").css("display","none");
	$('.left-page').prepend($('.page1'));
	$('.right-page').prepend($('.page2'));
}
function openPopup()
{
	if (player && player.getCurrentTime) currentTime = player.getCurrentTime();
	$('.popup-left-page').prepend($('.page1'));
	$('.popup-right-page').prepend($('.page2'));
	$(".popup").css("display","block");
}
let bgColorA = ["#FFFFFF","#00a0de","#6fba2c","#f08000","#d85c9b","#4d4a9b","#b2b2b2"];
function setBGcolor(b)
{
	$(".bg1").css("background-color",bgColorA[currentChapter]);
	if(b) $(".bg").css("background-color",bgColorA[currentChapter]);
	else $(".bg").css("background-color","#FFFFFF");
}
//----------------------------------------------------- 유툽영상관련
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	onYouTube('j4o3knOX-Yk',240,415);
}
function onYouTube(vid,w,h) {
	if (player) delete player;
	player = new YT.Player('player', {
		height: w,
		width: h,
		videoId: vid,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
	//player.playVideo();
}

function onPlayerReady(event) {
	if (currentTime) 
	{
		event.target.playVideo();
		player.seekTo(currentTime, true);
	}
	else player.playVideo();

}

var done = false;
function onPlayerStateChange(event) {
	/*
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
	*/
}
function stopVideo() {
	player.stopVideo();
}

//-----------------------------------------------------
function clearPage()
{
	$(".effect1").empty();
	$(".effect2").empty();
	$(".mov-f").css("display","none");
	$('.mov').remove();
	if(player && player.clearVideo) player.clearVideo();
}
function makeMovie(p,vid,x,y,w,h,img)
{
	currentTime = 0;
	let movF_Clone = $(".mov-f:first").clone();
	let mov_cover_left = movF_Clone.children('.mov-cover-left');
	let mov_cover_right = movF_Clone.children('.mov-cover-right');
	if(img)
	{
		mov_cover_left.css("width",w/2);
		mov_cover_right.css("width",w/2);
		mov_cover_left.css("height",h);
		mov_cover_right.css("height",h);
		mov_cover_left.css("left",0);
		mov_cover_right.css("left",w/2 - 1);
		mov_cover_right.data("left",w/2 - 1);
		mov_cover_left.css("display","block");
		mov_cover_right.css("display","block");

		mov_cover_left.click(movieClick);
		mov_cover_right.click(movieClick);
		
		mov_cover_left.children('img').attr("src","images/"+img);
		mov_cover_right.children('img').attr("src","images/"+img);
		mov_cover_left.children('img').css("width",w);
		mov_cover_right.children('img').css("width",w);
		mov_cover_left.children('img').css("height",h);
		mov_cover_right.children('img').css("height",h);
		mov_cover_right.children('img').css("margin-left",w/-2);
	}
	else
	{
		mov_cover_left.css("display","none");
		mov_cover_right.css("display","none");
	}
	p.prepend(movF_Clone);
	movF_Clone.css("top",y+"px");
	movF_Clone.css("left",x+"px");
	movF_Clone.css("width",w+"px");
	movF_Clone.css("height",h+"px");

	movF_Clone.css("display","block");
	movF_Clone.data("vid", vid);
	movF_Clone.data("w", w);
	movF_Clone.data("h", h);
}
function movieClick(e)
{
	//$('.mov-f .mov-cover-left').css("display","none");
	//$('.mov-f .mov-cover-right').css("display","none");
	currentTime = 0;
	let movF_Clone = $(this).parent();
	let mov_cover_left = movF_Clone.children('.mov-cover-left');
	let mov_cover_right = movF_Clone.children('.mov-cover-right');

	$(".mov-f .mov-cover-left").css("left",0);
	$(".mov-f .mov-cover-right").each( function() 
	{
		$(this).css("left", $(this).data("left"));
	});

	if($('.mov'))$('.mov').remove();
	var mov = $('<div id="player" class="mov"/>');
	movF_Clone.prepend(mov);
	mov.css("width",movF_Clone.data("w")+"px");
	mov.css("height",movF_Clone.data("h")+"px");
	
	onYouTube(movF_Clone.data("vid"),movF_Clone.data("w"),movF_Clone.data("h"));
	mov_cover_left.animate({
		left:-300
	},"slow");
	mov_cover_right.animate({
		left:600
	},"slow");
}
function makeTextBox(p,x,y,w,h,c)
{
	var ta = $('<textarea class="textBox" style="position: absolute;left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px;"></textarea>');
	if(c)
	{
		ta.css("background-color",c);
		ta.css("border","1px solid #888");
	}
	p.append(ta);
}
function makeToggleBtn(obj)
{
	obj.data("isClick", "false");
	obj.mouseover(function()
	{
		$(this).css("opacity",.3);
	});
	obj.mouseout(function()
	{
		if ($(this).data("isClick") == true) $(this).css("opacity",.5);	
		else $(this).css("opacity",0);
	});
	obj.click(function()
	{
		if ($(this).data("isClick") == true)
		{
			$(this).css("opacity",0);
			$(this).data("isClick", "false");		
		}else
		{
			$(this).css("opacity",.5);
			$(this).data("isClick", true);
		}
	});
}
function makeSelNum(obj,n,w)
{
	if (!n) n = 5;
	if (!w) w = 52;
	obj.on("click", function(e)
	{
		var cell = $(this).data("cell");
		var tx = getMousePos($(this),e).x;
		var tn = w/n;
		tx = Math.floor(tx / tn) * tn;
		cell.css("left",tx+"px");
	});
}
function getMousePos(obj, e) 
{
	return {
		x: (e.clientX - obj.offset().left),
		y: (e.clientY - obj.offset().top)
	};
}
function FullscreenConfirm()
{
	var result;
	if($(window).width()>=1920 && $(window).height()>=1080) result = false;
	else
	{
		result = window.confirm('1920 X 1080 해상도에 최적화 되어 있습니다. \n전체화면으로 이용하시겠습니까? \n전체화면으로 변경되지 않는 경우 F11을 눌러주세요.'); 
	}
	if(result) { 
		openFullscreen();
		$(".cover").css("display","none");
		return false;
	} 
	else $(".cover").css("display","none");

}
function openFullscreen() {
   if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
      (!document.msFullScreenElement && !document.mozFullScreenElement && !document.webkitFullScreenElement)) {  // current working methods
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }
}
//----------------------------------------------------- 각 페이지들 기능
//--------------------------------- chapter1 --------------------
pageFunc["func_1_8"] = function()
{
	makeMovie($(".effect1"),"j4o3knOX-Yk",225,354,480,270,"chapter1/movieCover_6.png");
	makeTextBox($(".effect1"),242,815,460,80);
}
pageFunc["func_1_9"] = function()
{
	var toggleBox = $('<div class="toggleBtn" data-isClick="false"/>');
	for(var i = 0 ; i < 48; i++)
	{
		let clone = toggleBox.clone();
		makeToggleBtn(clone);
		clone.data("idx", i);
		clone.css("left",(i%4 * 153 + 117)+"px");
		clone.css("top",(Math.floor(i/4)*55.3+133)+"px");
		clone.css("width","140px");
		clone.css("height","41px");
		
		$(".effect2").prepend(clone);
	}
}
pageFunc["func_1_11"] = function()
{
	makeMovie($(".effect2"),"oonqZ5NttGs",310,218,352,207,"chapter1/movieCover_9.png");
	makeTextBox($(".effect2"),305,530,410,110);
	makeTextBox($(".effect2"),305,705,410,110);
}
pageFunc["func_1_12"] = function()
{
	var toggleCir = $('<div class="toggleCir" data-isClick="false"/>');
	for(var i = 0 ; i < 30; i++)
	{
		let clone = toggleCir.clone();
		makeToggleBtn(clone);
		clone.data("idx", i);
		clone.css("left",(i%3 * 205 + 112)+"px");
		clone.css("top",(Math.floor(i/3)*24.3+251)+"px");
		clone.css("width","14px");
		clone.css("height","14px");
		
		$(".effect1").prepend(clone);
	}
	for(var i = 0 ; i < 30; i++)
	{
		let clone = toggleCir.clone();
		makeToggleBtn(clone);
		clone.data("idx", i);
		clone.css("left",(i%3 * 205 + 112)+"px");
		clone.css("top",(Math.floor(i/3)*24.3+657)+"px");
		clone.css("width","14px");
		clone.css("height","14px");
		
		$(".effect1").prepend(clone);
	}
}
pageFunc["func_1_13"] = function()
{
	var selectNum5 = $('<div class="selectNum5"></div>');
	var selCell = $('<div class="selCell"></div>');
	for(var i = 0 ; i < 30; i++)
	{
		let clone = selectNum5.clone();
		let cell = selCell.clone();
		clone.prepend(cell);
		clone.data("cell", cell);
		clone.css("left",(i%3 * 204 + 226)+"px");
		clone.css("top",(Math.floor(i/3)*24.3+251)+"px");
		clone.css("width","52px");
		clone.css("height","20px");
		
		makeSelNum(clone,5);
		$(".effect2").prepend(clone);
	}
	for(var i = 0 ; i < 30; i++)
	{
		let clone = selectNum5.clone();
		let cell = selCell.clone();
		clone.prepend(cell);
		clone.data("cell", cell);
		clone.css("left",(i%3 * 204 + 226)+"px");
		clone.css("top",(Math.floor(i/3)*24.3+657)+"px");
		clone.css("width","52px");
		clone.css("height","20px");
		
		makeSelNum(clone,5);
		$(".effect2").prepend(clone);
	}
}
pageFunc["func_1_15"] = function()
{
	makeMovie($(".effect2"),"a07U2DO0PMA",308,336,352,207,"chapter1/movieCover_13.png");
	makeTextBox($(".effect2"),292,615,432,90);
	makeTextBox($(".effect2"),292,795,432,90);
}
pageFunc["func_1_17"] = function()
{
	var selectNum5 = $('<div class="selectNum5"></div>');
	var selCell = $('<div class="selCell"></div>');
	for(var i = 0 ; i < 40; i++)
	{
		let clone = selectNum5.clone();
		let cell = selCell.clone();
		clone.prepend(cell);
		clone.data("cell", cell);
		clone.css("left",(i%2 * 214 + 450)+"px");
		clone.css("top",(Math.floor(i/2)*29.3+190)+"px");
		clone.css("width","52px");
		clone.css("height","20px");
		
		makeSelNum(clone,4);
		$(".effect2").prepend(clone);
	}
}
pageFunc["func_1_18_ie"] = function()
{
	var octaCanvas = $('<canvas class="canvas" style="position:absolute;top:115px;" height="530" width="530"></canvas>');
	octaCanvas.css("left","122px");
	octaCanvas.css("top","182px");
	$(".effect1").prepend(octaCanvas);
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');
	var shape1,shape2,shape3,shape4,shape5,shape6,shape7,shape8;

	var pointsA = [[265,265],[265,265],[265,265],[265,265],[265,265],[265,265],[265,265],[265,265]];

	$(".effect1").append( $('<svg style="position:absolute;top:182px;left:122px;opacity:0;border:1px solid #F00" height="530" width="530"><path id="a" d="M265 265 L265 0 L155 0 L78 78 L265 265 Z" fill="green" stroke="black"/><path id="b" d="M265 265 L265 0 L375 0 L452 78 L265 265 Z" fill="green" stroke="black"/><path id="c" d="M265 265 L452 78 L530 155 L530 265 L265 265 Z" fill="green" stroke="black"/><path id="d" d="M265 265 L530 265 L530 375 L453 453 L265 265 Z" fill="green" stroke="black"/><path id="e" d="M265 265 L453 453 L375 530 L265 530 L265 265 Z" fill="green" stroke="black"/><path id="f" d="M265 265 L265 530 L155 530 L78 453 L265 265 Z" fill="green" stroke="black"/><path id="g" d="M265 265 L78 453 L0 375 L0 265 L265 265 Z" fill="green" stroke="black"/><path id="h" d="M265 265 L0 265 L0 155 L78 78 L265 265 Z" fill="green" stroke="black"/></svg>'));

	$("#a").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[0] = [((115*y)/265)+155, y];
		drawShape();
	});
	$("#b").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[1] = [(115-(115*y)/265)+265, y];
		drawShape();
	});
	$("#c").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[2] = [x,265-(115*(x-265))/265];
		drawShape();
	});
	$("#d").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[3] = [x,265+(115*(x-265))/265];
		drawShape();
	});
	$("#e").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[4] = [(150+(115*y)/265), y];
		drawShape();
	});
	$("#f").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[5] = [(115-(115*y)/265)+265, y];
		drawShape();
	});
	$("#g").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[6] = [x,265+((115*(265-x)))/265];
		drawShape();
	});
	$("#h").click(function(e) 
	{
		var x = e.offsetX, y =  e.offsetY;
		pointsA[7] = [x,155+(115*(x))/265];
		drawShape();
	});
	function drawShape()
	{
		ctx.clearRect(0,0,530,530);
		ctx.fillStyle = "rgba(255, 165, 0, .5)";
		ctx.beginPath();
		for(var i = 0 ; i < pointsA.length ; i++)
		{
			if (i == 0) ctx.moveTo(pointsA[i][0], pointsA[i][1]);
			else ctx.lineTo(pointsA[i][0], pointsA[i][1]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		for(var i = 0 ; i < pointsA.length ; i++)
		{
			ctx.beginPath();
			ctx.arc(pointsA[i][0], pointsA[i][1], 5, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
		}
	}
}
pageFunc["func_1_18"] = function()
{
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) )
	{
		pageFunc["func_1_18_ie"]();
		return false;
	}
	var octaCanvas = $('<canvas class="canvas" style="position:absolute;top:115px;" height="530" width="530"></canvas>');
	octaCanvas.css("left","122px");
	octaCanvas.css("top","182px");
	$(".effect1").prepend(octaCanvas);
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');
	var shape1,shape2,shape3,shape4,shape5,shape6,shape7,shape8;
	function drawStdShape()
	{
		ctx.strokeStyle = "rgba(0, 0, 0, 0)";
		shape1 = new Path2D();
		shape1.moveTo(265, 265);
		shape1.lineTo(265, 0);
		shape1.lineTo(155, 0);
		shape1.lineTo(78, 78);
		shape1.lineTo(265, 265);
		ctx.stroke(shape1);
		shape2 = new Path2D();
		shape2.moveTo(265, 265);
		shape2.lineTo(265, 0);
		shape2.lineTo(375, 0);
		shape2.lineTo(452, 78);
		shape2.lineTo(265, 265);
		ctx.stroke(shape2);
		shape3 = new Path2D();
		shape3.moveTo(265, 265);
		shape3.lineTo(452, 78);
		shape3.lineTo(530, 155);
		shape3.lineTo(530, 265);
		shape3.lineTo(265, 265);
		ctx.stroke(shape3);
		shape4 = new Path2D();
		shape4.moveTo(265, 265);
		shape4.lineTo(530, 265);
		shape4.lineTo(530, 375);
		shape4.lineTo(453, 453); 
		shape4.lineTo(265, 265);	
		ctx.stroke(shape4);
		shape5 = new Path2D();
		shape5.moveTo(265, 265);
		shape5.lineTo(453, 453);
		shape5.lineTo(375, 530);
		shape5.lineTo(265, 530); 
		shape5.lineTo(265, 265);	
		ctx.stroke(shape5);
		shape6 = new Path2D();
		shape6.moveTo(265, 265);
		shape6.lineTo(265, 530);
		shape6.lineTo(155, 530);
		shape6.lineTo(78, 453); 
		shape6.lineTo(265, 265);	
		ctx.stroke(shape6);
		shape7 = new Path2D();
		shape7.moveTo(265, 265);
		shape7.lineTo(78, 453);
		shape7.lineTo(0, 375);
		shape7.lineTo(0, 265); 
		shape7.lineTo(265, 265);	
		ctx.stroke(shape7);
		shape8 = new Path2D();
		shape8.moveTo(265, 265);
		shape8.lineTo(0, 265);
		shape8.lineTo(0, 155);
		shape8.lineTo(78, 78); 
		shape8.lineTo(265, 265);	
		ctx.stroke(shape8);
	}
	var pointsA = [[265,265],[265,265],[265,265],[265,265],[265,265],[265,265],[265,265],[265,265]];
	function drawShape()
	{
		ctx.clearRect(0,0,530,530);
		drawStdShape();
		ctx.fillStyle = "rgba(255, 165, 0, .5)";
		ctx.beginPath();
		for(var i = 0 ; i < pointsA.length ; i++)
		{
			if (i == 0) ctx.moveTo(pointsA[i][0], pointsA[i][1]);
			else ctx.lineTo(pointsA[i][0], pointsA[i][1]);
		}
		ctx.closePath();
		ctx.fill();
		
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		for(var i = 0 ; i < pointsA.length ; i++)
		{
			ctx.beginPath();
			ctx.arc(pointsA[i][0], pointsA[i][1], 5, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
		}
	}
	canvas.onmousedown = function(event) {
		var mousePos = getMousePos(canvas, event);
		var x = mousePos.x, y =  mousePos.y;
		var shape = null;
		if(ctx.isPointInPath(shape1, x,  y)) 
			pointsA[0] = [((115*mousePos.y)/265)+155, mousePos.y];
		if(ctx.isPointInPath(shape2, x,  y))
			pointsA[1] = [(115-(115*mousePos.y)/265)+265, mousePos.y];
		if(ctx.isPointInPath(shape3, x,  y))
			pointsA[2] = [mousePos.x,265-(115*(mousePos.x-265))/265];
		if(ctx.isPointInPath(shape4, x,  y))
			pointsA[3] = [mousePos.x,265+(115*(mousePos.x-265))/265];
		if(ctx.isPointInPath(shape5, x,  y)) 
			pointsA[4] = [(150+(115*mousePos.y)/265), mousePos.y];
		if(ctx.isPointInPath(shape6, x,  y))
			pointsA[5] = [(115-(115*mousePos.y)/265)+265, mousePos.y];
		if(ctx.isPointInPath(shape7, x,  y))
			pointsA[6] = [mousePos.x,265+((115*(265-mousePos.x)))/265];
		if(ctx.isPointInPath(shape8, x,  y))
			pointsA[7] = [mousePos.x,155+(115*(mousePos.x))/265];

		drawShape();
	}
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		var n = 1;
		if($(".canvas").parent().parent().parent().attr('class')==$(".left-page").attr('class')) n = 1.133;
		return {
			x: (evt.clientX - rect.left)*n,
			y: (evt.clientY - rect.top)*n
		};
	}
	drawStdShape();
}
pageFunc["func_1_20"] = function()
{
	makeMovie($(".effect1"),"5GOEDWGn_v0",225,234,480,270,"chapter1/movieCover_18.png");
	makeTextBox($(".effect1"),242,702,460,80);
	makeTextBox($(".effect1"),242,878,460,80);
}
//--------------------------------- chapter2 --------------------
pageFunc["func_2_28"] = function()
{
	makeMovie($(".effect1"),"kADNSTIslRI",225,324,480,270,"chapter2/movieCover_28.png");
	makeTextBox($(".effect1"),242,762,460,70);
	makeTextBox($(".effect1"),242,900,460,80);
}
pageFunc["func_2_29"] = function()
{
	makeTextBox($(".effect2"),416,422,290,30,"#e1eed0");
	makeTextBox($(".effect2"),366,470,340,70,"#e1eed0");
}
pageFunc["func_2_33"] = function()
{
	var selectV = $('<div class="selectV"></div>');
	var selCell = $('<div class="selCellV">V</div>');
	for(var i = 0 ; i < 21; i++)
	{
		let clone = selectV.clone();
		let cell = selCell.clone();
		clone.prepend(cell);
		clone.data("cell", cell);
		clone.css("left",(580)+"px");
		clone.css("top",(34.5*i+127)+"px");
		clone.css("width","140px");
		clone.css("height","30px");
		
		makeSelNum(clone,3,130);
		$(".effect2").prepend(clone);
	}
}
pageFunc["func_2_36"] = function()
{
	makeMovie($(".effect1"),"DwW_gqrYj9o",225,352,480,270,"chapter2/movieCover_36.png");
	makeTextBox($(".effect1"),242,800,460,80);
}
pageFunc["func_2_37"] = function()
{
	makeMovie($(".effect2"),"P28DFNSwtwE",310,309,352,207,"chapter2/movieCover_37.png");
}
pageFunc["func_2_39"] = function()
{
	var linkBox1 = $('<div class="link-btn" style="top:338px; left:100px;"><a href="http://www.career.go.kr" target="_blank"></a></div>');
	var linkBox2 = $('<div class="link-btn" style="top:338px; left:314px;"><a href="http://www.academyinfo.go.kr" target="_blank"></a></div>');
	var linkBox3 = $('<div class="link-btn" style="top:338px; left:525px;"><a href="http://www.adiga.kr" target="_blank"></a></div>');
	var linkBox4 = $('<div class="link-btn" style="top:680px; left:100px;"><a href="http://www.work.go.kr" target="_blank"></a></div>');
	var linkBox5 = $('<div class="link-btn" style="top:680px; left:314px;"><a href="http://www.crezone.net" target="_blank"></a></div>');
	var linkBox6 = $('<div class="link-btn" style="top:680px; left:525px;"><a href="http://www.q-net.or.kr" target="_blank"></a></div>');

	$(".effect2").prepend(linkBox1);
	$(".effect2").prepend(linkBox2);
	$(".effect2").prepend(linkBox3);
	$(".effect2").prepend(linkBox4);
	$(".effect2").prepend(linkBox5);
	$(".effect2").prepend(linkBox6);

	linkBox1.click(function(){var href = $(this).children().get(0).click();});
	linkBox2.click(function(){var href = $(this).children().get(0).click();});
	linkBox3.click(function(){var href = $(this).children().get(0).click();});
	linkBox4.click(function(){var href = $(this).children().get(0).click();});
	linkBox5.click(function(){var href = $(this).children().get(0).click();});
	linkBox6.click(function(){var href = $(this).children().get(0).click();});
}
pageFunc["func_2_40"] = function()
{
	var linkBox1 = $('<div class="link-btn" style="top:220px; left:215px; width:500px; height:360px;"><a href="https://www.ncs.go.kr" target="_blank"></a></div>');
	$(".effect1").prepend(linkBox1);
	linkBox1.click(function(){var href = $(this).children().get(0).click();});
}
pageFunc["func_2_41"] = function()
{
	var toggleBox = $('<div class="toggleBtn" data-isClick="false"/>');
	for(var i = 0 ; i < 10; i++)
	{
		let clone = toggleBox.clone();
		makeToggleBtn(clone);
		clone.data("idx", i);
		clone.css("left",(117)+"px");
		clone.css("top",(i*42+209)+"px");
		clone.css("width","109px");
		clone.css("height","30px");
		
		$(".effect2").prepend(clone);
	}
	for(var i = 0 ; i < 48; i++)
	{
		let clone = toggleBox.clone();
		makeToggleBtn(clone);
		clone.data("idx", i);
		clone.css("left",(i%4 * 121 + 249)+"px");
		clone.css("top",(Math.floor(i/4)*42+209)+"px");
		clone.css("width","109px");
		clone.css("height","30px");
		
		$(".effect2").prepend(clone);
	}
}
pageFunc["func_2_42"] = function()
{
	var selectV = $('<div class="selectV"></div>');
	var selCell = $('<div class="selCellV">V</div>');
	for(var i = 9 ; i > -1; i--)
	{
		let clone = selectV.clone();
		let cell = selCell.clone();
		clone.prepend(cell);
		clone.data("cell", cell);
		clone.css("left",(475)+"px");
		clone.css("top",(29*i+157)+"px");
		clone.css("width","230px");
		clone.css("height","25px");
		cell.css("width","80px");
		
		makeSelNum(clone,3,200);
		$(".effect1").prepend(clone);
	}
}
pageFunc["func_2_44"] = function()
{
	for(var i = 0 ; i < 8; i++)
	{
		makeTextBox($(".effect1"),436, 45*i+577 ,250,28,"#e1eed0");
	}
}
//--------------------------------- chapter3 --------------------
pageFunc["func_3_48"] = function()
{
	makeMovie($(".effect1"),"inUSqBrUQls",225,310,480,270,"chapter3/movieCover_48.png");
}
pageFunc["func_3_49"] = function()
{
	var selectImg1 = $('<div class="dreamImg selectImg"><img src="images/chapter3/dreamMap1.png" style="border-radius:0px;width:100%; height:100%;" id="dm1" alt="갖고싶은것"></div>');
	var selectImg2 = $('<div class="dreamImg selectImg"><img src="images/chapter3/dreamMap2.png" style="border-radius:0px;width:100%; height:100%;" id="dm2" alt="가보고싶은것"></div>');
	var selectImg3 = $('<div class="dreamImg selectImg"><img src="images/chapter3/dreamMap3.png" style="border-radius:0px;width:100%; height:100%;" id="dm3" alt="되싶은것"></div>');
	var selectImg4 = $('<div class="dreamImg selectImg"><img src="images/chapter3/dreamMap4.png" style="border-radius:0px;width:100%; height:100%;" id="dm4" alt="하고싶은것"></div>');
	var dreamImg = $('<div class="dreamImg"><img src="images/chapter3/dreamMap.png" style="border-radius:0px;width:100%; height:100%;" alt=""></div>');

	selectImg1.css("left",(295)+"px");
	selectImg1.css("top",(325)+"px");
	selectImg2.css("left",(507)+"px");
	selectImg2.css("top",(325)+"px");
	selectImg3.css("left",(295)+"px");
	selectImg3.css("top",(468)+"px");
	selectImg4.css("left",(507)+"px");
	selectImg4.css("top",(468)+"px");
	dreamImg.css("left",(453)+"px");
	dreamImg.css("top",(420)+"px");
	$(".effect2").prepend(dreamImg);
	$(".effect2").prepend(selectImg1);
	$(".effect2").prepend(selectImg2);
	$(".effect2").prepend(selectImg3);
	$(".effect2").prepend(selectImg4);
	
	var radioBtns = [selectImg1,selectImg2,selectImg3,selectImg4];
	for(var i = 0; i < radioBtns.length;i ++)
	{
		radioBtns[i].click(function()
		{
			for(var mm in radioBtns)
			{
				radioBtns[mm].css("opacity",0);

			}
			$(this).css("opacity",1);
		});
	}

}
pageFunc["func_3_56"] = function()
{
	makeTextBox($(".effect1"),248,672,450,65);
	makeTextBox($(".effect1"),248,800,450,65);
	makeTextBox($(".effect1"),248,925,450,65);
}
pageFunc["func_3_60"] = function()
{
	makeTextBox($(".effect1"),248,785,217,209,"#fce1c4");
	makeTextBox($(".effect1"),481,785,217,209,"#fce1c4");
}
pageFunc["func_3_61"] = function()
{
	makeTextBox($(".effect2"),407,672,198,28,"#FFF");
	makeTextBox($(".effect2"),407,723,198,30,"#FFF");
}
//--------------------------------- chapter4 --------------------
pageFunc["func_4_67"] = function()
{
	var selectV = $('<div class="selectV"></div>');
	var selCell = $('<div class="selCellV">V</div>');
	for(var i = 0 ; i < 30; i++)
	{
		let clone = selectV.clone();
		let cell = selCell.clone();
		clone.prepend(cell);
		clone.data("cell", cell);
		clone.css("left",(625)+"px");
		clone.css("top",(24.8*i+115)+"px");
		clone.css("width","90px");
		clone.css("height","22px");
		
		makeSelNum(clone,2,90);
		$(".effect2").prepend(clone);
	}
}
pageFunc["func_4_69"] = function()
{
	makeTextBox($(".effect2"),295,127,423,233,"#f6dbea");
	makeTextBox($(".effect2"),295,400,423,233,"#f6dbea");
	makeTextBox($(".effect2"),295,672,423,233,"#f6dbea");
}
pageFunc["func_4_73"] = function()
{
	makeTextBox($(".effect2"),308,170,389,81,"#FFF");
	makeTextBox($(".effect2"),308,287,389,81,"#FFF");
	makeTextBox($(".effect2"),308,406,389,81,"#FFF");
	makeTextBox($(".effect2"),308,525,389,81,"#FFF");
	makeTextBox($(".effect2"),308,643,389,81,"#FFF");
	makeTextBox($(".effect2"),308,762,389,81,"#FFF");
	makeTextBox($(".effect2"),308,881,389,81,"#FFF");
}
//--------------------------------- chapter5 --------------------
pageFunc["func_5_81"] = function()
{
	makeMovie($(".effect2"),"G0JVYG04RXk",117,359,480,270,"chapter5/movieCover_82.png");
}
//-----------------------------------------------------
