var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["09c269ae-9cf9-463a-8df3-937dbe4874c8","3c133587-3f9f-47d6-a5be-0285adbe4bc3","0ddc379f-512a-455a-95e5-cd02c0e4306c","0d8a406e-f017-4b53-b806-a52cc2dfeaff","551bdf51-3725-4461-8df2-96fd0ed71d4a"],"propsByKey":{"09c269ae-9cf9-463a-8df3-937dbe4874c8":{"name":"animation 1","sourceUrl":null,"frameSize":{"x":338,"y":243},"frameCount":1,"looping":true,"frameDelay":12,"version":"sBYi988W3I7QUnHSkyC2tMDlbRXs1hfD","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":338,"y":243},"rootRelativePath":"assets/09c269ae-9cf9-463a-8df3-937dbe4874c8.png"},"3c133587-3f9f-47d6-a5be-0285adbe4bc3":{"name":"ani","sourceUrl":"assets/api/v1/animation-library/gamelab/zrh9fKR_85SGEPTiZYS44Q0Hv.r7yAzL/category_fantasy/rpgcharacter_04.png","frameSize":{"x":338,"y":243},"frameCount":1,"looping":true,"frameDelay":2,"version":"zrh9fKR_85SGEPTiZYS44Q0Hv.r7yAzL","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":338,"y":243},"rootRelativePath":"assets/api/v1/animation-library/gamelab/zrh9fKR_85SGEPTiZYS44Q0Hv.r7yAzL/category_fantasy/rpgcharacter_04.png"},"0ddc379f-512a-455a-95e5-cd02c0e4306c":{"name":"monster_02_1","sourceUrl":null,"frameSize":{"x":326,"y":391},"frameCount":2,"looping":true,"frameDelay":12,"version":"HYoZz7spY.EP0v2FHElHZT71O7yD_Sg9","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":652,"y":391},"rootRelativePath":"assets/0ddc379f-512a-455a-95e5-cd02c0e4306c.png"},"0d8a406e-f017-4b53-b806-a52cc2dfeaff":{"name":"Monster 1","sourceUrl":null,"frameSize":{"x":196,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"zaoiUNWBu7EkZImjPOkyl6LE5tkxYJCo","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":196,"y":400},"rootRelativePath":"assets/0d8a406e-f017-4b53-b806-a52cc2dfeaff.png"},"551bdf51-3725-4461-8df2-96fd0ed71d4a":{"name":"Monster 2","sourceUrl":null,"frameSize":{"x":248,"y":368},"frameCount":1,"looping":true,"frameDelay":12,"version":"g3.GJO99aBEaBGp32LsIVKVMJWo966O2","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":248,"y":368},"rootRelativePath":"assets/551bdf51-3725-4461-8df2-96fd0ed71d4a.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----


var PLAY = 1;
var END = 0;
var BEFORE = 2;

var gameState = 2;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

var back1 , back1Img;


var up, upImg;
var bg , bgImg;
var getReady , getReadyImg;
var loading = 0;
var load;

var loading0 , loading1 , loading2, loading3, loading4,loading5;


function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("gro.png");
  
  cloudImage = loadImage("cloud.gif");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.gif");
  restartImg = loadImage("restart.gif");

  back1Img = loadImage("back1.jpg");
  
  
  upImg =loadImage("up.gif");

  bgImg= loadImage("bg.png");

  getReadyImg = loadImage("getReady.gif");

  loading0 = loadImage("loading0.png");
  loading1 = loadImage("loading1.png");
  loading2 = loadImage("loading2.png");
  loading3 = loadImage("loading3.png");
  loading4 = loadImage("loading4.png");
  loading5 = loadImage("loading5.png");
  

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  back1 = createSprite(windowWidth/2,windowHeight/2);
  back1.addImage(back1Img);
  back1.scale = 0.25;
  back1.velocityX = -(6 + 3*score/100);
  back1.x = back1.width/8;
  
  trex = createSprite(windowWidth/2-250,windowHeight-50,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.6;
  
  ground = createSprite(200,windowHeight-40,600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /25;
  ground.velocityX = -(6 + 3*score/100);
   ground.scale = 0.09;
   
  
  gameOver = createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth/2,windowHeight/2+80);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.4;
  restart.scale = 0.15;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(windowWidth/2-250,windowHeight-40,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
 

   

  up = createSprite(windowWidth-70,windowHeight-85);
  up.addImage(upImg);
  up.scale  = 0.06;

  bg  = createSprite(windowWidth/2,windowHeight/2);
  bg.addImage(bgImg);

  load = createSprite(windowWidth/2,windowHeight-60);
  load.addImage(loading0);

  //  camera.zoom  = camera.zoom -0.10;
  getReady = createSprite(windowWidth/2,windowHeight/2);
  getReady.addImage(getReadyImg);
  

}

function draw() {
  //trex.debug = true;
  background("white");
  
  //  console.log(gameState);

  if(gameState === BEFORE){

   
   bg.scale = 1.2;

   
   
   loading = loading+1;
  
   
   
   if(loading===30){
     
    load.addImage(loading1);
  }
  if(loading===50){
     
    load.addImage(loading2);
  }
  if(loading===60){
    
    load.addImage(loading3);
  }
  if(loading===70){ 
    load.addImage(loading4);
  }
  if(loading===90){
    
    load.addImage(loading5);


  }
  if(loading===95){
    gameState  = PLAY;
  }



  }
 
  
  if (gameState===PLAY){

    bg.destroy();
    getReady.destroy();
    load.destroy();

    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    back1.velocityX = -(6 + 3*score/100);
   
    camera.on();
    camera.isActive();
   
   camera.y = displayHeight/10;
  
    camera.y = trex.y/1.5;
  
    trex.velocityY = trex.velocityY + 1.2
  
    if (ground.x < 0 ){

      ground.x = ground.width/25;
          
    }

    if(mousePressedOver(up) && trex.y >= windowHeight-170) {

      trex.velocityY = -12;

    }

    if(keyDown(UP_ARROW) && trex.y >= windowHeight-170) {

      trex.velocityY = -12;

    }

    if (back1.x < 500 ){
      
      back1.x = back1.width/8;
      
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }


  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    back1.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }

    if(keyDown("space")) {
      reset();
    }

   
    
  }
  
  
  drawSprites();
 
  if(gameState===PLAY){
  fill("white");
  stroke("black");
  strokeWeight(6);
  textSize(20);
  textFont("ARIAL BLACK")
  text("Score: "+ score, windowWidth-140,windowHeight/2-100);
  


  textSize(20);
   textFont("ARIAL BLACK");
  text("TODAY'S HIGHEST SCORE : " + localStorage["HighestScore"],windowWidth-370,windowHeight/2-50);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(windowWidth-100,120,40,10);
    cloud.y = Math.round(random(windowHeight-150,windowHeight-450));
    cloud.addImage(cloudImage);
    cloud.scale = 0.26;
    cloud.velocityX = -(8 + 3*score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,windowHeight-70,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
