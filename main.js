"use strict"
var ANIMATION_TIME = '500';
var lastScroll = 0;
var mainBlock = document.getElementById('main-block');
var thinTitle = document.getElementsByClassName('thin-title')[0];
var title = document.getElementsByClassName('title')[0];
var Filter = [];

var items = {}; // should be replaced with items.json
items.JasperRhino = {
	id: 'JasperRhino',
	title: 'Jasper Rhino',
	description: 'The impersonation of power, this Rhino perfectly suits a boss\' place. Made out of jasper with carnelian horns he has 7 cm length and about 200 g weight. I\'d like to write more, but I haven\'t seen him yet. I believe he is cool',
	tags: ['animal', 'rhino', 'jasper']
};
items.JadeHippo = {
	id: 'JadeHippo',
	title: 'Jade Hippo',
	description: 'Exclusive 64Gb USB 3.0 Flash Drive, made out of jade, jasper, gold, silver and garnet. It\'s a luxury gift which is useful in the daily life. A perfect present for anyone you respect. You can be sure, no one else have it. ',
	tags: ['animal', 'hippo', 'jade', 'jasper', 'gold', 'silver']
};
items.ObsidianPug = {
	id: 'ObsidianPug',
	title: 'Obsidian Pug',
	description: 'Pugs are awesome pets which bring you good mood and positive emotions. It\'s a great gift for people who fall in love with pugs, especially owners. Made out of obsidian with rhodonite tongue and eyes from tiger\'s eye',
	tags: ['animal', 'dog', 'pug', 'jade']
};
items.JasperCrocodile = {
	id: 'JasperCrocodile',
	title: 'Jasper Crocodile',
	description: 'asdadsasdasd asdas dasd asd',
	tags: ['animal', 'crocodile', 'jasper']
}


function addClass(elem, cname) {
			if (!(~elem.className.indexOf(cname))) {
				elem.className = elem.className + " " + cname;
			}
}

function removeClass(elem, cname) {
	var classlist = elem.className.split(" ");
	classlist = classlist.filter(function(q){
		return q != cname;
	});
	elem.className = classlist.join(" ");
}


function itemHover() {
	var item = this;
	item.hover = true;
	addClass(item.children[0], 'hidden');
	addClass(item.children[1], 'hidden');
	setTimeout(function() {
		if(item.hover == false) return;
		addClass(item.children[0], 'center');
		removeClass(item.children[0], 'hidden');
	}, ANIMATION_TIME);
}

function itemUnhover() {
	var item = this;
	item.hover = false;
	addClass(item.children[0], 'hidden');
	setTimeout(function(){
		if(item.hover == true) return;
		removeClass(item.children[0], 'center');
		removeClass(item.children[0], 'hidden');
		removeClass(item.children[1], 'hidden');
	}, ANIMATION_TIME);
}

function addItem(itemInfo) {
	if(document.getElementById(itemInfo.id) != null) { return; }
	var item = document.createElement('div');
	item.className = 'item hidden';
	item.id = itemInfo.id;
	item.style.backgroundImage = 'url(items/' + itemInfo.id + '/' + itemInfo.id + '-1.png)';
	item.addEventListener('mouseenter', itemHover);
	item.addEventListener('mouseleave', itemUnhover);
	var itemTitle = document.createElement('div');
	itemTitle.className = 'item-title';
	itemTitle.innerHTML = itemInfo.title;
	var itemDescription = document.createElement('div');
	itemDescription.className = 'item-description';
	itemDescription.innerHTML = itemInfo.description;
	item.appendChild(itemTitle);
	item.appendChild(itemDescription);
	mainBlock.appendChild(item);
	setTimeout(function(){removeClass(item, 'hidden');}, Math.floor(Math.random()*500));
	
}

function renderMainPage() {

	function filter() {
		for(var renderedItem in items) {
			if(Filter.length == 0) {
				addItem(items[renderedItem]);
			}
			for(var i = 0; i < items[renderedItem].tags.length; i++) {
				for(var j = 0; j < Filter.length; j++) {
					if(Filter[j] == items[renderedItem].tags[i]) { addItem(items[renderedItem]);}
				}
			}
		}
	}

	if(Filter.length == 0) {
		for(var renderedItem in items) {
			addItem(items[renderedItem]);
		}
	} else {
		if(mainBlock.innerHTML != '') { /* clean page */
			mainBlock.style.opacity = '0';
			setTimeout(function(){mainBlock.innerHTML = ''; mainBlock.style.opacity = '1'; filter(); }, 200);
		}

	}

}


/************** START SCENARIOS ****************/




window.addEventListener('scroll', function(){
	if(lastScroll < window.pageYOffset) { 
			removeClass(thinTitle, 'thin-title-shown');
	} else { 
		if(window.pageYOffset > 210) {
			addClass(thinTitle, 'thin-title-shown');
		} else {
			removeClass(thinTitle, 'thin-title-shown');
		}

	}
	lastScroll = window.pageYOffset;
});


renderMainPage();