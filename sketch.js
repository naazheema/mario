var bg,mario,mImage,cImage;

var gImage,ground;

var restartImg,gameOverImg;     

var obstaclesGroup,brickGroup;
var obstacle;
var o1,o2,o3,o4;

var brick,brImg;
var dddbrick,ddbrick,dbrick;
var dddbrickGroup,ddbrickGroup,dbrickGroup;

var restart,gameOver;
var PLAY=1;
var END=0;
var gamestate=PLAY;

var score;

function preload()
{
  dieSound = loadSound("die.mp3");
   jumpSound = loadSound("jump.mp3");
  pointSound = loadSound("checkPoint.mp3");
  bgimage=loadImage("bg.png");
   mImage=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  cImage=loadAnimation("collided.png");
  gImage=loadImage("ground2.png");
   obstacleImage=loadAnimation("obstacle3.png","obstacle4.png","obstacle1.png","obstacle2.png");
  brImag=loadImage("brick.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
}
function setup()
{
  createCanvas(600,400);
  
  // adding back ground image
  bg= createSprite(300,200);
  bg.addImage(bgimage);
  
  // mario
  mario=createSprite(50,310,50,50);
  mario.addAnimation("running",mImage);
  mario.addAnimation("collided",cImage);
  
  mario.scale = 2;
  
  //moving ground
  ground=createSprite(50,373  ,50,50);
  ground.addImage(gImage);
  ground.x=ground.width/2;
  
  //restat image
  restart = createSprite(300,180,50,50);
  restart.addImage(restartImg);
  restart.scale=0.5
  
  //gameover image
  gameOver = createSprite(300,150,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
  //setting the collider
  mario.setCollider("circle",0,8,10);
  //mario.debug=true;
  
  score=0;
  
  // greate brick and obstacle group
  obstaclesGroup = createGroup();
  brickGroup = createGroup();
}

function draw()
{
  background("white");
  ground.velocityX=-(4 + 3* score/100);
  
  if(gamestate===PLAY)
    {
      
      // making invisible
      gameOver.visible=false;
      restart.visible=false;
      
      // adding running animation
      mario.changeAnimation("running", mImage);
      
      if(keyDown("space")&&mario.y>=200)
      {
          mario.velocityY=-6;
          jumpSound.play();
      }  
  
      //gravity
      mario.velocityY=mario.velocityY+0.8;
      mario.collide(ground);
  
      //setting the ground back
      if(ground.x<0)
      {
        ground.x=width/2;
      }
      spwanbrick();
      spwanObstacle();
      //spwandoublebrick()
      
      if(mario.isTouching(obstaclesGroup))
        {
          gamestate=END;
           dieSound.play();
        }
    
      mario.displace(brickGroup, explosion);
 
    }
    else if(gamestate===END)
    {
      gameOver.visible=true;
      restart.visible=true;
      mario.changeAnimation("collided", cImage);
      ground.velocityX=0;
      mario.velocityY=0;
      
       obstaclesGroup.setLifetimeEach(-1);
      brickGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
     brickGroup.setVelocityXEach(0);
      
     if(mousePressedOver(restart)) {
       
      reset();
    }
        
  }
  drawSprites();
  fill("black");
  textSize(20);
  text("SCORE : "+score,480,30);
}

function explosion(mario, brick) 
{
      brick.remove();
      score=score+5;
     pointSound.play( )
}
function reset()
{
    gamestate=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    obstaclesGroup.destroyEach();
    brickGroup.destroyEach();
    score=0;
    mario.changeAnimation("running",mImage);

}
function spwanbrick()
{
  
  if(frameCount%60===0)
    {  
       var rand=Math.round(random(200,250));
      brick = createSprite(600,rand,100,100);
      brick.addImage("brick",brImag);
      brick.velocityX=-(4 + 3* score/100);
      
      brick.lifetime = 300;
      brickGroup.add(brick);
      
    }
  
}


function spwanObstacle()
{
  if(frameCount%90===0)
    {
     obstacle= createSprite(600,310,100,100);
      obstacle.velocityX=-(4 + 3* score/100);
      obstacle.addAnimation("obstacle",obstacleImage);
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
    }
}