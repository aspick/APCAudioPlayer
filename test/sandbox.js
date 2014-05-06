$(function(){

var images = [
	'image1.jpg',
	'image2.jpg',
	'image3.jpg',
	'image4.jpg'
];

var currentPage = 1;

var border = $("#viewer");
border.html('');

function innnerImageElem(imageName){
	return $("<div class=\"apc-image\" style=\"background-image:url(images/" + imageName + ");\">&nbsp;</div>");
}

var index = 0;
var innerElems = [];
jQuery.each(images, function(){
	var inner = innnerImageElem(this);
	if(index == 0){
		inner.addClass('active');
	}
	border.append(inner);
	index = index + 1;
	innerElems.push(inner);
});

function forwardPage(){
	if(currentPage >= innerElems.length){
		return false;
	}
	innerElems[currentPage -1].removeClass('active');
	currentPage = currentPage + 1;
	innerElems[currentPage -1].addClass('active');
}

function backwordPage(){
	if(currentPage == 1){
		return false;
	}
	innerElems[currentPage -1].removeClass('active');
	currentPage = currentPage - 1;
	innerElems[currentPage -1].addClass('active');
}

function cursorUpdate(e){
	var currentX = e.pageX - border.offset().left;
	if(currentX / border.width() > 0.5){
		if(currentPage == images.length){
			border.css('cursor','auto');
		}else{
			border.css('cursor',"url(images/glyphicons_211_right_arrow.png)");
		}
	}else{
		if(currentPage == 1){
			border.css('cursor','auto');
		}else{
			border.css('cursor',"url(images/glyphicons_210_left_arrow.png)");
		}
	}
}

border.click(function(e){
	var clickedX = e.pageX - border.offset().left;
	if(clickedX / border.width() > 0.5){
		forwardPage();
	}else{
		backwordPage();
	}
	cursorUpdate(e);
});

border.mousemove(function(e){
	cursorUpdate(e);
});

});