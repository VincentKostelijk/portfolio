const root = document.querySelector(':root');

const projectNames = [
	'stainedglasslamp',
	'portablespeakerv2',
	'lightglasses',
	'rocketstove',
	'theaterlamp',
	'surroundset',
	'surroundschakelaar',
	'powersupply',
	'circleclock',
	'modeltable',
	'computercase',
	'alduinswall',
	'schoolprojectsamplepicker',
	'stagearexx',
	'stagehoentjencreatie',
	'stagetekendesign',
	'bbq',
	'portablespeaker',
	'radiokist',
	'rcboat',
	'rccar'
];

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}


// Change header color with every reload
const headerColors = [
	['#f4a127', '#ffecb4', '#5a3d2b', '#75c8ae'],
	['#f4a24f', '#f7efd8', '#580f0c', '#c63434'],
	['#ccdee2', '#fff9e9', '#553f3a', '#bb2b2a'],
	['#dddb76', '#e4f2ef', '#388895', '#ef694d'],
	['#D06224', '#E9C891', '#8A8635', '#AE431E'],
	['#4d675a', '#bfa082', '#847b45', '#f5aa5f'],
	['#61465f', '#6199b3', '#607796', '#e2816f'],
	['#63b0a6', '#ffcb52', '#7a4842', '#d65d4f']			
];

function changeHeaderColors() {
	var i = getRandomInt(headerColors.length);
	root.style.setProperty('--colorOne', headerColors[i][0]);
	root.style.setProperty('--colorTwo', headerColors[i][1]);
	root.style.setProperty('--colorThree', headerColors[i][2]);
	root.style.setProperty('--colorFour', headerColors[i][3]);
}

changeHeaderColors();


// Create gallery depending on button being clicked
function getTitleNode(titleName) {
	var gridTitleNode = document.createElement('div');
	gridTitleNode.className = "grid-title";
	gridTitleNode.textContent = titleName;
	return gridTitleNode;
}


function getStripeNode(stripeNumber, stripeContent) {
	var gridStripeNode = document.createElement('div');
	gridStripeNode.className = stripeNumber;
	gridStripeNode.textContent = stripeContent;
	return gridStripeNode;
}

function getImgNode(imgPath) {
	var gridImgNode = document.createElement('div');
	gridImgNode.className = "grid-item";
	var imgNode = document.createElement('img');
	imgNode.className = "grid-photo";
	imgNode.src = imgPath;
	gridImgNode.appendChild(imgNode);
	return gridImgNode;
}

function createGallery(path) {
	changeHeaderColors();

	document.querySelector(".grid-container").innerHTML = '';

	document.querySelector(".grid-container").appendChild(getTitleNode(path));

	document.querySelector(".grid-container").appendChild(getStripeNode("grid-stripe", String.fromCharCode(31)));

	// Functions does only work with HTTP URL scheme, does not work when URL specifies local files
	// for (let i = 1; i < 10; i++) {
	// 	var imgPath = path + '/' + i + '.jpg';

	// 	var xhr = new XMLHttpRequest();
	// 	xhr.open('HEAD', imgPath, false);
	// 	xhr.send();

	// 	if (xhr.status == "404") {
	// 	}
	// 	else {
	// 		document.querySelector(".grid-container").appendChild(getImgNode(imgPath));
	// 	}
	// }

	// Function does not filter out non-existing files
	for (let i = 1; i < 10; i++) {
		var imgPath = path + '/' + i + '.jpg';
		document.querySelector(".grid-container").appendChild(getImgNode(imgPath));
	}
}

// Create navigation grid on load of webpage
function getStringForArrayLength(wordInString, array) {
	var rowOfString = "";
	for (let i = 0; i < array.length; i++) {
		rowOfString = rowOfString + wordInString + " ";
	}
	return rowOfString;
}

function cutStringLength(string, length) {
	var cuttedString = "";
	for (let i = 0; i < length; i++) {
		cuttedString = cuttedString + string.charAt(i);
	}
	return cuttedString;
}

function getNavNode(path) {
	var gridClickNode = document.createElement('a');
	gridClickNode.onclick = function(){createGallery(path)};

	var navNode = document.createElement('div');
	navNode.className = "nav-grid-item";

	var barcodeNode = document.createElement('img');
	barcodeNode.alt = path + " in KIX barcode";
	var barcodeSource = "https://barcode.tec-it.com/barcode.ashx?data=" + cutStringLength(path, 11) + "&code=KIX&unit=Px&imagetype=Svg&bgcolor=e6e6e6&hidehrt=True&modulewidth=3";
	barcodeNode.src = barcodeSource;
	navNode.appendChild(barcodeNode);

	var imgNode = document.createElement('img');
	imgNode.className = "nav-grid-photo";
	imgNode.alt = path + " in patent-style drawing";
	imgNode.src = path + "/1.jpg";
	navNode.appendChild(imgNode);

	gridClickNode.appendChild(navNode);
	return gridClickNode;
}

function createNavigation() {
	root.style.setProperty('--gridColumnsAuto', getStringForArrayLength("auto", projectNames));

	for (let x of projectNames) {
		document.querySelector(".nav-grid-container").appendChild(getNavNode(x));
	}
}

createNavigation();
