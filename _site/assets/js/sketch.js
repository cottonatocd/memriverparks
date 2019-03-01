//loading all letters
var M, E, P, H, I, S, R, V, A, K, space;
var letters = [];
var scalingFactor = 0.07;
var letterSpace = 35 * scalingFactor;

function preload() {
  M = loadImage('assets/js/letters/M.svg');
  E = loadImage('assets/js/letters/E.svg');
  P = loadImage('assets/js/letters/P.svg');
  H = loadImage('assets/js/letters/H.svg');
  I = loadImage('assets/js/letters/I.svg');
  S = loadImage('assets/js/letters/S.svg');
  R = loadImage('assets/js/letters/R.svg');
  V = loadImage('assets/js/letters/V.svg');
  A = loadImage('assets/js/letters/A.svg');
  K = loadImage('assets/js/letters/K.svg');
  space = loadImage('assets/js/letters/space.svg');
}

var x = [],
  y = [],
  segNum = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(20);
  stroke(0,100);
  
  letters.push(M,E,M,P,H,I,S,space,R,I,V,E,R,space,P,A,R,K,S);
  reverse(letters);

  for (var i = 0; i < letters.length; i++) {
    x[i] = 0;
    y[i] = 0;
  }
}

function draw() {
  background('white');
  dragSegment(0, mouseX, mouseY);
  for( var i=0; i<x.length-1; i++) {
    dragSegment(i+1, x[i], y[i]);
    // console.log(letters[i]);
  }
  
}

function dragSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * (letters[i].width*scalingFactor + letterSpace);
  y[i] = yin - sin(angle) *  (letters[i].width*scalingFactor + letterSpace);
  segment(x[i], y[i], angle, letters[i]);
}

function segment(x, y, a, imageName) {
  push();
  translate(x, y);
  scale(scalingFactor, scalingFactor);
  rotate(a);
  // line(0, 0, imageName.width, 0);
  image(imageName, 0, 0);
  pop();
}

function reverse (array) {
  var i = 0,
      n = array.length,
      middle = Math.floor(n / 2),
      temp = null;

  for (; i < middle; i += 1) {
     temp = array[i];
     array[i] = array[n - 1 - i];
     array[n - 1 - i] = temp;
  }
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


