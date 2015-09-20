$(function(){
    var catModel = {
	cats: [],
	init: function(){
	    // if(!localStorage.cats){
	    // 	localStorage.cats = [];
	    // }
	},
	add: function(cat_object){
	    this.cats.push(cat_object);
	},
	getAllCats: function(){
	    return this.cats;
	}
    };

    var controller = {
	Ncats: 5,
	addNewCats: function(){
	    for(var i=0; i<this.Ncats; i++){
		catModel.add({name: 'Cat'+i,
			      clicks: 0});
	    }
	},
	addClicks: function(cat){
	    cat.clicks += 1;
	},
	renderAllCats: function(){
	    this.addNewCats();
	    var cats = catModel.getAllCats();
	    for(var i=0; i<cats.length; i++){
		view.renderCat(cats[i]);
	    }
	},
	init: function(){
	    catModel.init();
	    this.renderAllCats();
	}
    };

    var view = {
	renderUpdate: function(cat){
	    console.log('clicked');
	},

	renderCat: function(cat){
	    var cat_name = document.createElement('span');
	    cat_name.textContent = cat.name;
	    var clicks = document.createElement('span');
	    clicks.setAttribute('id', 'clicks');
	    clicks.textContent = cat.clicks;
	    
	    var div = document.createElement('div');
	    div.setAttribute('id', cat.name);
	    div.appendChild(cat_name);
	    div.appendChild(clicks);
	    div.addEventListener('click', (function(cat){
		return function(){
		    controller.addClicks(cat);
		    $('#'+cat.name + ' #clicks').html(cat.clicks);
		}
	    })(cat));
	    document.body.appendChild(div);
	},
    };

    controller.init();
});
