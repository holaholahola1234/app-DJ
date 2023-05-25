leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;

scoreLeftWrist=0;
scoreRightWrist=0
musica="";
function preload(){
    musica=loadSound("music.mp3");

}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video= createCapture (VIDEO)
video.hide();
poseNet=ml5.poseNet(video,modelloaded);
poseNet.on("pose",gotPoses)
}

function modelloaded(){
    console.log("Funciono bien")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("puntaje mano izquierda ="+scoreLeftWrist)
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("muñeca izquierda x= "+leftWristx+"muñeca izquierda  y= "+leftWristy)
        scoreRightWrist=results[0].pose.keypoints[10].score;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("muñeca derecha x= "+rightWristx+"muñeca derecha  y= "+rightWristy)

    }
}



function draw(){
    background(255);
    image(video,0,0,600,500);
    fill("#ff0000")
    if(scoreRightWrist>0.2){

    
        circle(rightWristx, rightWristy,40)
    if(rightWristy>0 && rightWristy<=100){
        document.getElementById("velocidad").innerHTML="velocidad = 0.5";
        musica.rate(0.5);
    }
    else if(rightWristy>100 && rightWristy<=200){
        document.getElementById("velocidad").innerHTML="velocidad=1"
        musica.rate(1);
    }
    else if(rightWristy>200 && rightWristy<=300){
        musica.rate(1.5);
        document.getElementById("velocidad").innerHTML="velocidad=1.5"
    }
    else if(rightWristy>300 && rightWristy<=400){
        musica.rate(2);
        document.getElementById("velocidad").innerHTML="velocidad=2"
    }
    else if(rightWristy>400 && rightWristy<=500){
        musica.rate(2.5);
        document.getElementById("velocidad").innerHTML="velocidad=2.5"}
    }
    if(scoreLeftWrist >0.2){

        circle(leftWristx,leftWristy,40);
        leftWristynum=Number(leftWristy)
     remove_Decimal=floor(leftWristynum);
        volumenX=remove_Decimal/600
     document.getElementById("volumen").innerHTML="volumen = "+volumenX;
     musica.setVolume(volumenX)

    }
}
function Comenzar(){
    musica.play();

}
