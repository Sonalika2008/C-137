status1="";
video="";
objects = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
    console.log("hello");
}

function setup(){
    canvas =  createCanvas(500 , 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 500, 380);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are : "+objects.length;
            fill("white");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent + "%", objects[i].x , objects[i].y);
            noFill();
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded")
    status1 = true;
    video.loop()
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
