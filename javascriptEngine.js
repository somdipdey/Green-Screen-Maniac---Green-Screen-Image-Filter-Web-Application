// for 1st color picker
function runScript(e) {
    if (e.keyCode == 13) {
        doColor();
    }
}

function doColor() {
  var canvas = document.getElementById("canvas1");
  var picker = document.getElementById("colorPick");
  var color = picker.value;
  canvas.style.backgroundColor = color;
}

// for 2nd color picker
function runScript2(e) {
    if (e.keyCode == 13) {
        doColor2();
    }
}

function doColor2() {
  var canvas = document.getElementById("canvas2");
  var picker = document.getElementById("colorPick2");
  var color = picker.value;
  canvas.style.backgroundColor = color;
}

// Upload functions
function upload1()
{
  image1 = null;
  var canvas = document.getElementById("canvas1");
  var fileInput = document.getElementById("fInput1");
  image1 = new SimpleImage(fileInput);
  image1.drawTo(canvas);
}

function upload2()
{
  image2 = null;
  var canvas = document.getElementById("canvas2");
  var fileInput = document.getElementById("fInput2");
  image2 = new SimpleImage(fileInput);
  image2.drawTo(canvas);
}

//Global variables
var image1 = null;
var image2 = null;

//Gray Scale
function grayScale(id){
  if(id == "gray1")
    {
      for(var pixel of image1.values())
        {
          var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
          pixel.setRed(avg);
          pixel.setGreen(avg);
          pixel.setBlue(avg);
        }
      var canvas = document.getElementById("canvas1");
      image1.drawTo(canvas);
      alert("Process complete");
    }
  else if(id == "gray2")
    {
      for(var pixel of image2.values())
        {
          var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
          pixel.setRed(avg);
          pixel.setGreen(avg);
          pixel.setBlue(avg);
        }
      var canvas = document.getElementById("canvas2");
      image2.drawTo(canvas);
      alert("Process complete");
    }
}

function greenScreen() {
  if (image1 == null || !image1.complete())
    {
      alert("Green screen foreground image is not loaded yet");
      return;
    }
  else if (image2 == null || !image2.complete())
           {
             alert("Background image is not loaded yet");
             return;
           }
  
  clearCanvases();
  replaceGreenScreen();
}

function replaceGreenScreen(){
  var output = new SimpleImage(image1.getWidth(), image1.getHeight());
  for(var pixel of image1.values())
    {
      var x = pixel.getX();
      var y = pixel.getY();
      if(pixel.getGreen() === 255 && pixel.getRed() === 0 && pixel.getBlue() === 0)
        {
          var image2Pixel = image2.getPixel(x, y);
          output.setPixel(x, y, image2Pixel);
        }
        else
          {
            output.setPixel(x, y, pixel);
          }
    }
  
  var canvas1 = document.getElementById("canvas1");
  output.drawTo(canvas1);
  alert('Process complete');
}

function clearCanvases()
{
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  
  c = document.getElementById("canvas2");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
}

function whiteCanvas(image){
  for(var pixel of image.values())
    {
      pixel.setRed(255);
      pixel.setGreen(255);
      pixel.setBlue(255);
    }
  return image;
}
