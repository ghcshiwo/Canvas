/**
 * Created by guo on 16/10/13.
 */
var dom = document.getElementById('clock');			//canvas元素
var ctx = dom.getContext('2d');						//
var width = ctx.canvas.width;						//宽
var height = ctx.canvas.height;						//高
var r = width / 2;									//半径
var rem = width /200;								//基本单位

/**
 * [drawBackground 画背景]
 */
function drawBackground(){
	// 画背景圆
	ctx.save();
	ctx.translate(r,r);		
	ctx.beginPath();			
	ctx.lineWidth = 10 * rem;	
	ctx.arc(0,0,r-5*rem,0,2*Math.PI,false);		
	ctx.stroke();

	// arc 起始位置在三点钟方向，所以数组从3开始。
	//  开始画小时时间
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font =18 * rem + "px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	hourNumbers.forEach(function(number,i){
		var rad = 2*Math.PI/12 * i;
		var x = Math.cos(rad) * (r - 30 * rem);
		var y = Math.sin(rad) * (r - 30 * rem);
		ctx.fillText(number,x,y);
	})
	//画刻度，一长四短。
	for(var i=0;i<60;i++){
		var rad = 2*Math.PI/60 * i;
		var x = Math.cos(rad) * (r - 10 * rem);
		var y = Math.sin(rad) * (r - 10 * rem);
		
		var size;
		if(i%5 ==0){
			size = 8 * rem;
		}
		else{
			size = 4 * rem;
		}
		ctx.lineWidth = 1 * rem;
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x-Math.cos(rad) *size,y-Math.sin(rad) *size);
		ctx.stroke();
	}
}
/**
 * [drawHour 画时针]
 * @param     {[number]}    hour   [小时]
 * @param     {[number]}    minute [分钟]
 */
function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/12*hour;
	var mrad = 2*Math.PI/12/60*minute;
	ctx.rotate(rad+mrad);
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10 * rem);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}
/**
 * [drawMinute 画分针]
 * @param     {[number]}    minute [分钟]
 */
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10 * rem);
	ctx.lineTo(0,-r+30 * rem);
	ctx.stroke();
	ctx.restore();
}

/**
 * [drawSecond 画秒针]
 * @param     {[number]}    second [秒]
 */
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#c14543";
	var rad = 2*Math.PI/60*second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem,20 * rem);
	ctx.lineTo(2 * rem,20 * rem);
	ctx.lineTo(1,-r+18 * rem);
	ctx.lineTo(-1,-r+18 * rem);
	ctx.fill();
	ctx.restore();
}
/**
 * [drawDot 画点]
 */
function drawDot(){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#0f0";
	ctx.arc(0,0,5 * rem,0,2*Math.PI,false);
	ctx.fill();
	ctx.restore();
}
// 画表
function draw(){
	ctx.clearRect(0,0,width,height);	// 每次绘画签清除画布
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);