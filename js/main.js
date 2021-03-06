
function makeBTN(layer,n)
{
	layer.on("mouseover", function (e) {
		$(this).css("opacity",n);
    });
	layer.on("mouseout", function (e) {
		$(this).css("opacity",0);
    });
}

$(document).ready(function() {
//---------------document ready
makeBTN($(".main .main1_cover"),1);
$(".main .main1_cover").click(function()
{
	$(".main1").css("display","block");	
	$(".main").css("display","none");		
});
makeBTN($(".main1 .main1_btn1"),1);
$(".main1 .main1_btn1").click(function()
{
	gsap.to($(".linc"),{duration:.5,top:0});	
	//$(".main1 .main1_close_btn").click();
});
makeBTN($(".main1 .main1_btn2"),1);
$(".main1 .main1_btn2").click(function()
{
	$(".list").css("display","block");	
	$(".main1 .main1_close_btn").click();
});
makeBTN($(".main1 .main1_close_btn"),.2);
$(".main1 .main1_close_btn").click(function()
{
	$(".main").css("display","block");	
	$(".main1").css("display","none");		
});
$(".list .list_main_btn").click(function()
{
	$(".main").css("display","block");	
	$(".list").css("display","none");		
});
$(".linc .list_main_btn").click(function()
{
	$(".main1 .main1_close_btn").click();
	gsap.to($(".linc"),{duration:.3,top:$(window).height()});		
});
$(".linc .linc_close_btn").click(function()
{
	gsap.to($(".linc"),{duration:.3,top:$(window).height()});		
});
for(var i = 2 ; i < 15 ; i++)
{
	var t = Math.floor(i/6)*331 + 720;
	var l = i%6 * 245 + 240;
	$(".list .list_btn"+i).css("top",t+"px");
	$(".list .list_btn"+i).css("left",l+"px");
}
$(".list .btn").click(function()
{
	gsap.to($(".detail"),{duration:.5,top:0});	
});

var $dragging = null,points={},movePoints={};
$(".main .bg").css("left",($(window).width()-1920)/2+"px");
$(".main .bg").css("top","0px");
$(".main1").css("left",($(window).width()-1920)/2+"px");
/*
$(".list").css("left",($(window).width()-1920)/2+"px");
$(".linc").css("left",($(window).width()-1920)/2+"px");
$(".detail").css("left",($(window).width()-1920)/2+"px");*/
$(document.body).on("mousemove", function(e) {
	e.preventDefault();
	if ($dragging) {
		$dragging.offset({
			top: e.pageY-points.y+movePoints.y,
			left: e.pageX-points.x+movePoints.x
		});
	}
});
/*
$(document.body).on("mousedown", ".main .bg", function (e) {
	$dragging = $(e.target);
	points = {x:e.clientX,y:e.clientY};
	console.log(e.clientX,e.clientY);
});
*/
$(".main .bg").on("mousedown",  function (e) {
	e.preventDefault();
	$dragging = $(this);
	points = {x:e.clientX,y:e.clientY};
	console.log($dragging,e.clientX,e.clientY);
});
$(document.body).on("mouseup", function (e) {
	if(!$dragging) return; 
	movePoints = {x:$dragging.offset().left,y:$dragging.offset().top};
	console.log(movePoints.x,movePoints.y);
	$dragging = null;
});

resizeF();

//loadDetailData("l1t1");
//---------------document ready
});
$(window).resize(function(){
	resizeF();
});
function resizeF()
{
	var w = $(window).width();
	if(w<1920 && w>1024)
	{
		//$(".detail-header").css("width",$(window).width());
		//$(".detail-header").css("left",(1920-$(window).width())/2+"px");
		//$(".detail").css("left",(1920-$(window).width())/2+"px");
	}
}
