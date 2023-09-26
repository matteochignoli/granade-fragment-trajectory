var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
const rapportoPx = 30; //zoom
var larghezza = canvas.width/rapportoPx;
var altezza = canvas.height/rapportoPx;

function point(x1, y1, can){
    can.strokeRect(x1,y1,0.1,0.1);
}

function assiCart(x1,y1,can){
    can.lineTo(0,y1);
    can.lineTo(x1+x1,y1);
    can.lineTo(x1,y1);
    can.lineTo(x1,0);
    can.lineTo(x1,y1+y1);
    can.moveTo(rapportoPx,y1-3);
    for(var i=1;i<larghezza;i++){
        can.lineTo(i*rapportoPx,y1+3);
        can.moveTo(i*rapportoPx+rapportoPx,y1-3);
    }
    can.moveTo(x1-3,rapportoPx);
    for(var i=1;i<larghezza;i++){
        can.lineTo(x1+3,i*rapportoPx);
        can.moveTo(x1-3,i*rapportoPx+rapportoPx);
    }
    can.moveTo(x1,y1);
}

function Sx(t, v, a){
    var Vx=v*Math.cos(a*Math.PI/180);
    return Vx*t;
}

function Sy(t, v, a){
    var Vy= v*Math.sin(a*Math.PI/180);
    return Vy*t-(0.5*9.81*t*t);
}

function draw(){

    context.strokeStyle = "black";

    var xCentro=larghezza/2;
    var yCentro=altezza/2;
    assiCart(xCentro*rapportoPx,yCentro*rapportoPx,context);
    var sy=0;
    var v1=8;
    var t1=0.01;
    var a1=1;
    while(a1<=180){
        while(sy>=0){
            var x = xCentro+Sx(t1,v1,a1);
            sy = Sy(t1,v1,a1);
            var y = yCentro-sy;
            var xCanv = rapportoPx*x;
            var yCanv = rapportoPx*y;
            point(xCanv,yCanv,context);
            t1=t1+0.01;
        }
        t1=0.01;
        sy=0;
        a1=a1+2;
    }

    context.strokeStyle = "black";
}

context.beginPath();
draw();
context.stroke();
context.closePath();