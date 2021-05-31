var backImage,backgr;
var player, player_running;
var ground,ground_img;
var gameOverImg,bananaImg;
var stoneImg, gameOver;
var banana,obstacle;
var WIN = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var bananasGroup,obstaclesGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  gameOverImg = loadImage("gameOver.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  cry = loadImage("mn.jpg");
  applei = loadImage("apple2.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  //making groups for bananas and obstacles
    obstaclesGroup = createGroup();
    bananasGroup = createGroup();
  
  

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.9;
  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY)
  {
    gameOver.visible = false;
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  bananas();
  obstacles();

    if(keyDown("space") ) {
      player.velocityY = -17;
    }
    if(keyDown("UP_ARROW") ) {
      player.velocityY = -17;
    }
    if(player.isTouching(bananasGroup))
      {
        bananasGroup.destroyEach();
        score = score +1;
        
        if(score===1||score===2||score===3||score===4||score===5)
        {
          player.scale = player.scale + 0.02;
        
        }
      }
      if(obstaclesGroup.isTouching(player)&&gameState===PLAY)
    {
        gameState = END;
       player.addImage(cry);
        gameOver.visible = true;
        player.velocityY =  0;
        backgr.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananasGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1);
     }
     /*if (score === 20) {
       gameState = WIN ;
       textSize(60);
       fill("red");
       text("YOU WON THE GAME !!!!!!!!!", 250,70);
     }*/
  }
    
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(ground);
   
    player.setCollider("circle",-2,2,100);
    
  

  drawSprites();
  textSize(30);
  fill("red");
  text("CLICK THE SPACE KEY OR UP ARROW KEY TO JUMP THE MONKEY",250,50);

  stroke("red");
      textSize(30);
      fill("red")
      text("SCORE : "+score,250,90);

  //creating reqired functions    
  function bananas()
  {
     if(frameCount % 60===0)
     {
      banana = createSprite(250,300);
      banana.addAnimation("banana",bananaImg);
      banana.velocityX = -(5 + 3* score/100)
      banana.y = Math.round(random(120,200));
      banana.scale = 0.06;
      banana.lifetime = 100;
      bananasGroup.add(banana);
      
      }
   } 
   function apples()
  {
     if(frameCount % 80===0)
     {
      apple = createSprite(250,300);
      apple.addImage(applei);
      apple.velocityX = -(5 + 3* score/100)
      apple.y = Math.round(random(120,200));
      apple.scale = 0.06;
      apple.lifetime = 100;
      bananasGroup.add(apple);
      
      }
   } 
   function obstacles()
  {
   if(frameCount % 90===0)
   {
     obstacle = createSprite(250,350);
     obstacle.addAnimation("obstacle", stoneImg);
     obstacle.velocityX = -(5 + 3* score/100);
     obstacle.scale = 0.2; 
     obstacle.lifetime = 400;
     obstaclesGroup.add(obstacle);
   } 
  } 
}