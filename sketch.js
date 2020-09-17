var mush, turtle1, mario, mariojump, brick1, brick2, clouds, mario2, ground,gameState ,PLAY, END;
var obstaclegroup , cloudgroup
function preload() {
  mario2=loadAnimation("sprite_mario0.png","sprite_mario1.png","sprite_mario2.png")
  turtle1=loadAnimation("e5.png","e6.png","e7.png","e8.png")
  brick1=loadImage("b1.png")
  brick2=loadImage("b2.png")
  clouds=loadImage("sprite_clouds0.png")
  mush=loadAnimation("e1.png","e2.png")
  mariojump = loadSound("Mario-jump-sound.mp3")
  PLAY = 0
  gameState = PLAY;
  END = 1
}

function setup() {
  createCanvas(800,400);
  mario=createSprite(400, 200, 50, 50)
  mario.addAnimation("g", mario2)
  mario.scale = 0.1
  ground=createSprite(400,390,820,20)
  mario.setCollider("circle",0,0,210)
  mario.debug = false
  obstaclegroup = createGroup();
  cloudgroup = createGroup();
}

function draw() {
  background(255,255,255);  
  drawSprites();
  mario.collide(ground)
  if(gameState === PLAY)
  {
    createObstacles()
    createClouds() 
    if(keyWentDown("space"))
  {
    mario.velocityY = -10
    mariojump.play()
  }
  //score=score+1
  mario.velocityY= mario.velocityY + 0.5
  if(mario.isTouching(obstaclegroup))
  {
    gameState = END
  }
  }
  if(gameState === END)
  {
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
  }
}
function createClouds()
  {
    if(frameCount % 40 === 0)
    {
      var cloud = createSprite(800,200,20,20)
      cloud.addImage("clouds",clouds)
      cloud.velocityX = -5
      cloud.scale = 0.1
      cloud.y = random(100,200)
      cloudgroup.add(cloud)
    }
  }
function createObstacles()
{
  if(frameCount % 60 === 0)
  {
    var obstacle = createSprite(800,375,20,20)
    obstacle.addAnimation("mush", mush)
    obstacle.velocityX = -5
    //obstacle.collide(ground)
    obstacle.debug = true
    obstacle.setCollider("rectangle",0,0,obstacle.width,20)
    obstaclegroup.add(obstacle)
  }
}