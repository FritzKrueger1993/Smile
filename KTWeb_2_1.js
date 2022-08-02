let count = 2;
let player = [];
let ml;
let running = false;
let img;
let control = [];
let hmap = [];
let volume = [];
let volumeDestination = [];
let panning = [];
let panningDestination = [];
let x;
let y;
let compSize = 5;

function preload() {
  soundFormats('mp3', 'ogg');
  img = loadImage('img.png');
  for (let i = 0; i < count; i++) {
    hmap[i] = loadImage('Map'+i+'.png');
    player[i] = loadSound('Sound'+i+'.ogg');
    volume[i] = 0;
    panning[i] = 0;
  }
}


function setup() {
  background(0,0,0,255);
  cursor('crosshair');
  frameRate(60);
  createCanvas(windowWidth-compSize, windowHeight-compSize);
  background(0, 0, 0, 255);
  x = width/2 - img.width/2;
  y = height/2 - img.height/2;
}
for (let i = 0; i < count; i++) {
  //DRAW MAPS
  image(hmap[i], x, y);
}

function draw() {

  if (running == true) {

    //------------------- MAINPROGRAM - START//

    for (let i = 0; i < count; i++) {

      // READ MAPS
      control[i] = hmap[i].get(mouseX-x, mouseY-y);

      // LOOP SOUNDS
      if (player[i].isPlaying()) {
      } else {
        player[i].loop();
      }

      // CONTROL VOLUME
      //volume[i] = pow(red(control[i])/255, 2);
      volumeDestination[i] = pow(red(control[i])/255, 2);
      volume[i] = lerp(volume[i], volumeDestination[i], 0.2);
      player[i].setVolume(volume[i]);

      // CONTROL PAN
      panningDestination[i] = map(green(control[i]), 0, 255, -1, 1);
      panning[i] = lerp(panning[i], panningDestination[i], 0.2);
      player[i].pan(panning[i]);
    }

    background(0, 0, 0, 255);
    image(img, x, y);

    /* // DEBUG
    fill(255, 255, 255, 255);
    text(frameRate(), 400, 700);
    for (let i = 0; i < count; i++) {
      textSize(30);
      fill(255, 0, 255, 255);
      text(control[i], 30 + 300 * i, 200);
    }
    */
  }
  //------------------- MAINPROGRAM - END //

  else {
    background(0, 0, 0, 255);
    textSize(30);
    fill(255);
    text('Click!', width/2 -50 + compSize , height/2 +20 + compSize)
  }
}

function mousePressed() {
  running = true;
}

function windowResized() {
  resizeCanvas(windowWidth-compSize, windowHeight-compSize);
  x = width/2 - img.width/2;
  y = height/2 - img.height/2;
  for (let i = 0; i < count; i++) {
    image(hmap[i], x, y);
  }
}
