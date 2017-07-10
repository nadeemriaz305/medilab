
var slide1 = document.getElementById("slider1_image");
var imageArray = ["header-bg.jpg","header-bg.jpg","header-bg.jpg","header-bg.jpg"];
var imageIndex = 0;
function changeImage()
{
	slider1_image.setAttribute("src", imageArray[imageIndex++]);
	if(imageIndex >= imageArray.length)
		imageIndex = 0;
	
}


var intervalHandler = setInterval(changeImage, 2000);
	slide1.onclick = function()
	{
		clearInterval(intervalHandler);
		
	}