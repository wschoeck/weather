//Variable definieren und Default Werte setzen
//Mit echten Werten gefüllt werden diese in der Funktion gotWeather
let weatherdays=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let weathertest=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let weatherrain=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let weathertime=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let weathernow=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let weathersunrise=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let weatherdate=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let weatherlocation=[];
let key='d0ee7dc303a0426097b182706192301';
let d=120;

var heebo;

function preload() {
  heebo = loadFont('assets/Rubik-Regular.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);


    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q=Zürich&days=7';

/* https://api.apixu.com/v1/forecast.json?key=d0ee7dc303a0426097b182706192301&q=Zürich&days=7 */



  loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
  loadJSON(url, gotTest);
  loadJSON(url, gotRain);
  loadJSON(url, gotTime);
  loadJSON(url, gotNow);
  loadJSON(url, gotSunrise);
  loadJSON(url, gotDate);
  loadJSON(url, gotLocation);

  input = createInput();
  input.position(50, 50);

  input.class("inputfield");

  let button = createButton('GO');

  button.class("inputbutton");
  button.position(80, 50);
  button.position(280, 50);
  button.mousePressed(reloadJson);

}

function draw() {
  background(0);

  drawrain();

  drawtime();

  drawlocation();

  drawminmax();

  drawmoon();

  drawcloud();


}

/* drawminmax 7 Tage

function gotWeather(weather) {
  weatherdays=weather.forecast.forecastday;
  console.log(weatherdays);
}

*/

function gotLocation(daylocation) {
  weatherlocation=daylocation.location.name;
  console.log(daylocation);
}

function gotDate(daydate) {
  weatherdate=daydate.forecast.forecastday[0].date;
  console.log(daydate);
}

function gotSunrise(daysunrise) {
  weathersunrise=daysunrise.forecast.forecastday[1].astro.sunrise;
  console.log(daysunrise);
}

function gotNow(daynow) {
  weathernow=daynow.location.localtime;
  console.log(daynow);
}

function gotTime(daytime) {
  weathertime=daytime.forecast.forecastday[0].astro.sunset;
  console.log(daytime);
}


function gotWeather(weather) {
  weatherdays=weather.forecast.forecastday[0].day.uv;
  console.log(weatherdays);
}

function gotTest(test) {
  weathertest=test.current.cloud;
  console.log(weathertest);
}

function gotRain(rain) {
  weatherrain=rain.forecast.forecastday[0].day.totalprecip_mm;
  console.log(weatherrain);
}


function reloadJson() {



  let ort = input.value();

  let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+ort+'&days=7';

  /* console.log(url); */

  loadJSON(url,gotWeather);
  loadJSON(url,gotTest);
  loadJSON(url,gotRain);
  loadJSON(url,gotTime);
  loadJSON(url,gotNow);
  loadJSON(url,gotSunrise);
  loadJSON(url,gotDate);
  loadJSON(url,gotLocation);
}

/* drawminmax 7 Tage

function drawminmax() {

  let days=weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
  let angle=360/days;

  push();

  translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
  rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

      fill(255,222,0);
      noStroke();
      ellipse(0,0,90,90);

      stroke(150);
      noFill();

      //ellipse(0,0,d,d);
      //ellipse(0,0,d+100,d+100);

      for(let s=0;s<days;s++){

          let maxuv = weatherdays[s].day.uv;
          let yPos = map(maxuv, 0, 10, (d)/2, (d+200)/2);

          fill(220,0,220,100);

          strokeWeight(20);
          stroke(color(255,222,0));
          line(70, 0, yPos, 0);

          noStroke();

          rotate(angle);
}

  pop();

}

*/

/* function drawcloud() {

  let daystest=weathertest.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind



    translate(width/4, height/2);//wir verschieben das Koordinatensystem in die Mitte
    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

      for(let l=0;l<daystest;l++){

      let maxhumidity = weathertest[l].day.avghumidity;
      let colorhumidity = map(maxhumidity, 0, 100, 0, 200);

      fill(208,209,206);
      noStroke();
      ellipse(0,0,colorhumidity,colorhumidity);
      ellipse(0,-70,colorhumidity/1.5,colorhumidity/1.5);
      ellipse(0,70,colorhumidity/1.5,colorhumidity/1.5);

    } */

    function drawminmax() {

      let angle=360/18;

      push();

      translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
      rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen


      let weatherparse = Date.parse(weathernow);

      let datetime = weatherdate+" "+weathersunrise;
      let dateparse = Date.parse(datetime);

      let weatherdatetime = weatherdate+" "+weathertime;
      let weathertimeparse = Date.parse(weatherdatetime);

      if ((weatherparse < weathertimeparse) && (weatherparse > dateparse)){

        fill(255,222,0);
        noStroke();
        ellipse(0,0,90,90);

        stroke(150);
        noFill();

        //ellipse(0,0,d,d);
        //ellipse(0,0,d+100,d+100);

        let maxuv = weatherdays;
        let yPos = map(maxuv, 0, 10, (d)/2, (d+200)/2);

        if (maxuv > 0.1){

        for(let s=0;s<18;s++){

            fill(220,0,220,100);

            strokeWeight(10);
            stroke(color(255,222,0));
            line(60, 0, yPos, 0);

            noStroke();

            rotate(angle);

            }
          }
        }

        pop();

      };





    function drawcloud() {

        push();

        translate(width/2.4, height/1.9);//wir verschieben das Koordinatensystem in die Mitte
        rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen


          let maxhumidity = weathertest
          let colorhumidity = map(maxhumidity, 0, 100, 100, 160);

          if (maxhumidity > 20){

          fill(208,209,206);
          noStroke();
          ellipse(0,0,colorhumidity,colorhumidity);
          ellipse(0,-70,colorhumidity/1.5,colorhumidity/1.5);
          ellipse(0,70,colorhumidity/1.5,colorhumidity/1.5);

          }

          pop();


}



function drawrain() {

    push();

    translate(width/2.4, height/1.9);//wir verschieben das Koordinatensystem in die Mitte
    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen


      let maxrain = weatherrain
      let colorrain = map(maxrain, 0, 10, 0, 200);

      /*

      fill(208,209,206);
      noStroke();
      ellipse(-120,0,colorrain,colorrain);
      ellipse(-120,-70,colorrain,colorrain);
      ellipse(-120,70,colorrain,colorrain);

      */

      let colorrainline = map(maxrain, 0, 30, -100, -200);

      let weatherparse = Date.parse(weathernow);

      /* text("Parse "+weatherparse, 0,150); */

      let datetime = weatherdate+" "+weathersunrise;
      let dateparse = Date.parse(datetime);

      /* text("Parse "+dateparse, 0,100); */

      let weatherdatetime = weatherdate+" "+weathertime;
      let weathertimeparse = Date.parse(weatherdatetime);

      if ((maxrain > 1) && (weatherparse > dateparse) && (weatherparse > weathertimeparse)){

      background(80,80,80)};

      if (maxrain > 1){

      strokeWeight(8);
      stroke(color(208,209,206));
      line(-100, 0, colorrainline, 0);
      line(-100, -70, colorrainline, -70);
      line(-100, 70, colorrainline, 70);

      }

pop();

}

function drawtime() {

push();


    translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
    rotate(0); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

    let weatherparse = Date.parse(weathernow);

    /* text("Parse "+weatherparse, 0,150); */

    let datetime = weatherdate+" "+weathersunrise;
    let dateparse = Date.parse(datetime);

    /* text("Parse "+dateparse, 0,100); */

    let weatherdatetime = weatherdate+" "+weathertime;
    let weathertimeparse = Date.parse(weatherdatetime);

    /*

    text("Parse "+weathertimeparse, 0,125);

    text("Morgen ist Sonnenaufgang um "+datetime, 0,200);
    text("Sonnenuntergang ist am "+weathertime, 0,250);
    text("Es ist "+weathernow, 0,300);  */

    if ((weatherparse < weathertimeparse) && (weatherparse > dateparse)){

      background(0,146,255)};

      pop();



    }


function drawlocation() {

    push();

    translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
    rotate(0); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

      fill(255,255,255);
      textFont(heebo);
      textSize(50);
      text(weatherlocation, 0,-250);

      pop();

      }


function drawmoon() {

push();

translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
rotate(0); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

let weatherparse = Date.parse(weathernow);

let datetime = weatherdate+" "+weathersunrise;
let dateparse = Date.parse(datetime);

let weatherdatetime = weatherdate+" "+weathertime;
let weathertimeparse = Date.parse(weatherdatetime);

if ((dateparse > weatherparse) && (weathertimeparse > weatherparse)){

  fill(255,250,164);
  noStroke();
  ellipse(0,0,90,90);

}

  pop();

}
