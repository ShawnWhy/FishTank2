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

function setupFish(fishClass){
var sideSticks = $(fishClass + " .fishSideFinSub");
var topSticks = $(fishClass + " .fishTopFinSub");
var tailSticks = $(fishClass + " .fishTailSub");
var scaleColumns = $(fishClass + " .fishScaleColumn");

  sideSticks.each(function (index, value) {
    $(value).css("transform","rotate("+ (10-index*5)+"deg)");
    $(value).css("left",index*5+"px")
    $(value).css("top", Math.abs(3-index)*-2 + "px");

  });

    topSticks.each(function (index, value) {
      $(value).css("transform", "scaleY("+(1-index*.05)+") rotate(" + (-10 + index * 5) + "deg)");
      $(value).css("left", index * 10 + "px");
      $(value).css("top", index*.5 + "px");
    });

      tailSticks.each(function (index, value) {
        $(value).css(
          "transform",
          "rotate(" +
            (-20 + index * 5) +
            "deg)"
        );
        $(value).css("top", index * 4 + "px");
        // $(value).css("left", index * 4 + "px");
      });

}

setupFish(".fish1")


const fishTank = document.getElementsByClassName("fishTank");
console.log(fishTank)
fishTank[0].addEventListener("mousemove", (event) => {
  // console.log(event)
  mouseLeft = event.clientX;
  mouseTop = event.clientY;
  $(".fish").css("top", mouseTop - 100 + "px");
  $(".fish").css("left", mouseLeft - 100 + "px");
  // console.log(mouseTop);
});