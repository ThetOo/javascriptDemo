//Back
function back() {
	history.back();
}

//Forward
function forward() {
	history.forward()
}

//Refresh
function refresh() {
	location.reload();
}

//Change Image
function changeImage() {
	var image = document.getElementById('myImage');
	if (image.src.match("bulbon")) {
		image.src = "/img/doraemon01.gif";
	} else {
		image.src = "/img/doraemon02.gif";
	}
}

//JavaScript can change style
function styleChange() {
	var x = document.getElementById("styles");
	x.style.fontSize = "25px";
	x.style.color = "red";
}

//JavaScript Can Validate Input
function dataChange() {
	var x, text;

	//Get the value of the input field with id="numb"
	x = document.getElementById("numb").value;

	//If x is Not a Number or less than one or greater than 10
	if (isNaN(x, text) || x < 1 || x > 10) {
		text = "Input not valid";
	} else {
		text = "Input OK";
	}
	document.getElementById("dataChanges").innerHTML = text;
}

//JavaScript Code Blocks
function codeBlock() {
	document.getElementById("myPar").innerHTML = "Hello Dolly.";
    document.getElementById("myDiv").innerHTML = "How are you?";
}