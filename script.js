function randomColor1() {
  for (let i = 0; i < 30; i++) {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  }
  return color;
}

function setupFish(fishClass) {
  var sideSticks = $(fishClass + " .fishSideFinSub");
  var topSticks = $(fishClass + " .fishTopFinSub");
  var tailSticks = $(fishClass + " .fishTailSub");
  var scaleColumns = $(fishClass + " .fishScaleColumn");

  sideSticks.each(function (index, value) {
    $(value).css("transform", "rotate(" + (10 - index * 5) + "deg)");
    $(value).css("left", index * 5 + "px");
    $(value).css("top", Math.abs(3 - index) * -2 + "px");
  });

  topSticks.each(function (index, value) {
    $(value).css(
      "transform",
      "scaleY(" + (1 - index * 0.05) + ") rotate(" + (-10 + index * 5) + "deg)"
    );
    $(value).css("left", index * 10 + "px");
    $(value).css("top", index * 0.5 + "px");
  });

  tailSticks.each(function (index, value) {
    $(value).css("transform", "rotate(" + (-20 + index * 5) + "deg)");
    $(value).css("top", index * 4 + "px");
    // $(value).css("left", index * 4 + "px");
  });

  scaleColumns.each(function (index, value) {
    $(value).css("left", 200 - 10 * index + "px");
    if (index % 2 < 1) {
      $(value).css("top", "10px");
    }
  });
}

setupFish(".fish1");
$("body").mousemove((e) => {
  // if(!e.target.hasClass("fishFoodCanContainer")&&!e.target.hasClass("fishFoodCan")){
  var canLeft = e.offsetX;
  $(".canFollowContainer").css("left", canLeft + "px");
  // }
});

var formerX = 0;
var formerY;
const fishTank = document.getElementsByClassName("fishTank");
fishTank[0].addEventListener("mousemove", (event) => {
  mouseLeft = event.offsetX;
  mouseTop = event.offsetY;
  

  if ($(event.target).hasClass("fishTank")) {
    $(".fish").css("top", mouseTop + 50 + "px");
    $(".fish").css("left", mouseLeft - 50 + "px");

    if (mouseLeft > formerX) {
      $(".fish").css("transform", "scaleX(-1)");
    } else if (mouseLeft < formerX) {
      $(".fish").css("transform", "");
    }
    formerX = mouseLeft;
    formerY=mouseTop;
  }
});

fishTank[0].addEventListener("mouseenter", (event) => {
  $(".fishFoodCan").removeClass("canFollow");
  $(".fishFoodCanContainer").removeClass("canFollowContainer");
});

var feeding = false;

fishTank[0].addEventListener("mousedown", (event) => {
  $(".fishLowerLip").addClass("fishLowerLipAnimate");
  $(".fishUpperLip").addClass("fishUpperLipAnimate");
  feeding = true;
});

document.addEventListener("mouseup", (event) => {
  $(".fishLowerLip").removeClass("fishLowerLipAnimate");
  $(".fishUpperLip").removeClass("fishUpperLipAnimate");
  feeding = false;
});

var canFollow = "off";

$(".fishFoodCanContainer").click((e) => {
  e.stopPropagation();
  e.preventDefault();
  $(".fishFoodCanContainer").addClass("canFollowContainer");
  $(".fishFoodCan").addClass("canFollow");
  canFollow = "on";
});

$("body").click((e) => {
  if (!$(e.target).hasClass("fishTank") && canFollow == "on") {
    flakeFall(e.offsetX);
  }
});

var eatenColor = "green";
function createFlake(left){
  var flake = $("<div>");
  flake.addClass("flake")
  flake.css("background-color",randomColor1())
  var flakeContainer = $("<div>")
  flakeContainer.addClass("flakeContainer")
    flakeContainer.addClass("notEaten");

  flakeContainer.append(flake);
  flakeContainer.css("left",left+"px")
  flakeContainer.css("top", 0 + "px");
  $(".fishTank").append(flakeContainer)
  
}
function flakeFall(left) {
  // console.log(fishTank[0].getBoundingClientRect());
  tankX = fishTank[0].getBoundingClientRect().x;
  tankX2 = tankX + fishTank[0].getBoundingClientRect().width;
  if (left < tankX2 && left > tankX) {
    // console.log("inbod")
    var fallX = parseFloat(left) - parseFloat(tankX);
    // console.log(fallX)
    createFlake(fallX);
  }
}

function eat(flakeContainer) {

  $(flakeContainer).removeClass("notEaten");
  // console.log("eating");
  // console.log(flakeContainer);

  
  eatenColor = $(flakeContainer).find(".flake").css("background-color");

  flashingScales()
  // console.log($(flakeContainer).find(".flake"));
  // console.log(eatenColor)
  setTimeout(() => {
      $(flakeContainer).find(".flake").remove();

  }, 100);
  for (let i = 0; i < 20; i++) {  
    let smallFlake = $("<div>");
    smallFlake.addClass("smallFlake");
    let randTop = Math.random() * 40 - 20;
    let randleft = Math.random() * 40 - 20;
    smallFlake.css("background-color", eatenColor);
    smallFlake.css("top", randTop + "px");
    smallFlake.css("left", randleft + "px");
    // console.log(flakeContainer)
    $(flakeContainer).append(smallFlake);
  }


}

setInterval(() => {

  var mouthBox = $(".fishMouth").position()
  var fishBox = $(".fish").position()
  // console.log(mouthBox)
  mouthLeft = parseFloat(fishBox.left)+parseFloat(mouthBox.left);
  mouthTop = parseFloat(fishBox.top)+parseFloat(mouthBox.top);
  mouthRight = mouthLeft + 60
  mouthBottom = mouthTop+ 20
  // console.log(mouthLeft)
  // console.log(mouthRight)
  // console.log(mouthTop)
  // console.log(mouthBottom)
  var flakes=$(".flakeContainer");

    flakes.each(function (index, value) {
      let tempTop = $(value).css("top");
      let tempLeft = $(value).css("left")
      let newTop = tempTop.split("px")[0];
      let newLeft = tempLeft.split("px")[0]
      if(newTop>=mouthTop&&newTop<=mouthBottom&&newLeft>=mouthLeft&&newLeft<=mouthRight&&$(value).hasClass("notEaten")&&feeding){

        // console.log("eat 1")
        eat(value)


      }
      
      if(newTop>500){
        $(value).remove();
        
      }
      else{
      newTop = parseFloat(newTop)+1
      // console.log("newTop" + newTop)
    
        $(value).css("top", newTop+"px");
      }

       
      
    });


  
}, 20);




function flashingScales(){
  // var scales = $(".fishScale")
  var scales = document.getElementsByClassName("fishScale")
  console.log(scales[100])
  // console.log(scales.length);

  for(i=0;i<50;i++){
    let randInt = Math.floor(Math.random()*parseInt(scales.length)-1)
   let randInt2 = Math.floor(Math.random() * parseInt(scales.length) - 1);
      let randInt3 = Math.floor(Math.random() * parseInt(scales.length) - 1);
    let randInt4 = Math.floor(Math.random()*parseInt(scales.length)-1)



    setTimeout(() => {
        
        
       scales[randInt].setAttribute("style","background-color:"+eatenColor)
              scales[randInt2].setAttribute(
                "style",
                "background-color:" + eatenColor
              );
       scales[randInt3].setAttribute("style", "background-color:" + eatenColor);
       scales[randInt4].setAttribute("style", "background-color:" + eatenColor);

           


    }, 50*i);
  }



  
}