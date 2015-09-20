$(function(){
    var catModel = {
	current_cat: null,
	cats: [],
	size: 5,
	init: function(){
	    for(var i=0; i<this.size; i++){
		this.add({name: 'Cat'+i,
			      clicks: 0});
	    }
	},
	add: function(cat_object){
	    this.cats.push(cat_object);
	},
	getAllCats: function(){
	    return this.cats;
	}
    };

    var controller = {
	init: function(){
	    catModel.init();
	    view.init();
	    this.listAllCats();
	},
	addClicks: function(){
	    var cat = this.getCurrentCat();
	    cat.clicks++;
	    view.render(cat);
	},
	listAllCats: function(){
	    view.refreshCatList();
	    var cats = catModel.getAllCats();
	    for(var i=0; i<cats.length; i++){
		view.renderCatLink(cats[i]);
	    }
	},
	getCurrentCat: function(){
	    return catModel.current_cat;
	},
	setCurrentCat: function(cat){
	    catModel.current_cat = cat;
	    view.render(cat);
	},
	updateCat: function(){
	    var cat_name = $('#input-cat-name');
	    var cat_url = $('#input-img-src');
	    catModel.current_cat.name = cat_name.val();
	    catModel.cat_url = cat_url.val();
	    
	    this.listAllCats();
	    view.hideAdminForm();
	    view.render(catModel.current_cat);
	}
    };

    var view = {
	init: function(){
	    this.hideAdminForm();
	    $('#cat-name').click(function(e){
		controller.addClicks();
	    });
	    //admin button click listener
	    $('#admin-btn').click(function(e){
		$('#admin-form').css('display', 'block');
	    });

	    //save button click listener
	    $('#save-cat').click(function(e){
		e.preventDefault();
		controller.updateCat();
	    });
	    //cancel button click listener
	    $('#cancel-save').click(function(e){
		e.preventDefault();
		view.hideAdminForm();
	    });
	},

	hideAdminForm: function(){
	    $('#admin-form').css('display', 'none');
	},
	refreshCatList: function(){
	    $('#cat-list').html('');
	},
	renderCatLink: function(cat){
	    var anchor = document.createElement('a');
	    anchor.textContent = cat.name;
	    var link_elem = document.createElement('li');
	    link_elem.appendChild(anchor);
	    anchor.addEventListener('click', (function(cat){
		return function(){
		    controller.setCurrentCat(cat);
		}
	    })(cat));

	    $('#cat-list').append(link_elem);
	},
	render: function(cat){
	    $('#click-count').html(cat.clicks);
	    $('#cat-name').html(cat.name);
	    
	    //input fields
	    $('#input-cat-name').val(cat.name);
	    $('#n-clicks').html(cat.clicks);
	}
    };

    controller.init();
});
