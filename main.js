prediction = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
})

camera = document.getElementById("camera")

Webcam.attach('#camera')

function snapCam(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capImage" src="'+data_uri+'"/>'
    })
}

console.log("ml5 version is " , ml5.version)

myModel = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/APHLwRFE6/model.json" , modelLoaded)

function modelLoaded(){
    console.log("Model is loaded!")
}

function speaking(){
    var synth = window.speechSynthesis
    speak_data = "My Prediction Is " + prediction
    var utter = new SpeechSynthesisUtterance(speak_data) // SpeechSynthesisUtterance = Converting
    synth.speak(utter)
}

function check(){
    img = document.getElementById("capImage")
    myModel.classify(img, getResults)
}

function getResults(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        document.getElementById("gesture").innerHTML = results[0].label
        prediction = results[0].label
        speaking()
        if(results[0].label == "Cheese"){
            document.getElementById("emoji").innerHTML = "&#9996;"
        }
        else if(results[0].label == "One"){
            document.getElementById("emoji").innerHTML = "&#9757;"
        }
        else{
            document.getElementById("emoji").innerHTML = "&#9994;"
        }
    }
}