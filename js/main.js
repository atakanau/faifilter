jQuery(document).ready(function($){

	//open/close lateral filter
	$('.cd-filter-trigger').on('click', function(){
		triggerFilter(true);
	});
	$('.cd-filter .cd-close').on('click', function(){
		triggerFilter(false);
	});

	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
		elementsToTrigger.each(function(){
			$(this).toggleClass('filter-is-visible', $bool);
		});
	}

	$('.setview').on('change', function () {
		var opt = $(this);
		if($('#view-color').val()=='1')
			$('.cd-main-content').removeClass('dark');
		else
			$('.cd-main-content').addClass('dark');
		$('#content_ul').attr( 'class', 'list size-' + $('#view-size').val() + 'x' );
	});

	$('.filter').on('click', 'a', function(e){
		parseFilters();
	});
	$('.filter').on('change', function(){
		parseFilters();
	});
	function parseFilters() {
		$( '#content_ul li').removeClass('hide');
		if($('.filter:checked').length)
			$('.filter').each(function(i,e){
				// console.log( $(e).data('filter') );
				if( !e.checked )
					$( '#content_ul li.' + $(e).data('filter') ).addClass('hide');
				$(".cd-filter-content input[type='search']").keyup()
			})
	}

	$('#search_inpt').autoComplete({
		minChars: 1,
		source: function(term, suggest){
			term = term.toLowerCase();
			var choices = ["Axosoft","abort","accept","accessibility","achievement","add","add-on","addon","address","admin","agree","airplane","album","alcohol","alert","all","amex","analytics","anchor","announcement","apartment","app","approve","area-chart","arrow","arrow-circle-o-down","arrow-circle-o-left","arrow-circle-o-right","arrow-circle-o-up","arrows","arrows-alt","arrows-h","arrows-v","ascending","attachment","audio","autocomplete","automatic","award","back","badge","bag","baggage","bar","bar-chart","bars","beaker","beginning","bigger","bike","bitbucket-square","block","blocks","blog","boat","box","boxes","bracket","brackets","branch","breakfast","brighten","broadcast","browser","bubble","building","bullseye","business","buy","cafe","calendar","calendar-o","call","camera","cancel","caret-square-o-down","caret-square-o-left","caret-square-o-right","caret-square-o-up","cc","cell phone","cellphone","chain","chain-broken","chat","checklist","checkmark","checkout","circle-o-notch","circle-thin","clipboard","clone","close","cloud-download","cloud-upload","code","code-fork","collapse","combine","command","commenting","company","completed","computer","confirm","connect","contract","contrast","controller","conversation","coordinates","copy","country","create","credit-card-alt","cross","cup","cutlery","darker","data","date","day","debit","delete","demo","descending","desktop","destination","details","device","diamond","dinner","directory","disagree","disapprove","dislike","display","doctor","document","documentation","done","dot","dots","download","downloading","downloads","drag","drink","drop","dropdown","droplet","duplicate","e-mail","earphone","earth","eat","eco","edit","eercast","ekg","email","emoticon","end","enlarge","enter","error","eur","event","excel","exchange","exit","expand","experimental","exponential","external-link","external-link-square","eyedropper","face","facebook","facebook-official","factory","fast","favorite","feed","feedback","female","file","file-text","files-o","film","finger","finished","first aid","first","firstaid","fix","flame","floppy","floppy-o","fly","food","fork","forward","fullscreen","funnel","game","garbage","gbp","git","github","glass","global","google-plus","google-plus-circle","google-plus-official","graph","grid","hamburger","hand","hand-o-down","hand-o-left","hand-o-right","hand-o-up","handicap","happy","hard drive","harddrive","hash","hashtag","head","header","health","heart","help","hide","hierarchy","higher","hospital","hot","hotel","house","html","idea","ie","ils","import","incognito","indian","information","input","inr","insect","inspiration","intersex","ipad","iphone","italics","join","jpy","judge","knife","krw","label","labels","labs","language","laquo","last","late","lawyer","leaf","learning","leave","leaves","left","letter","level-down","level-up","lighter","lightning","like","line-chart","link","linkedin","linkedin-square","liquor","list","listen","loading","localize","location","lock","log in","log out","login","logout","long-arrow-down","long-arrow-left","long-arrow-right","long-arrow-up","louder","love","lower","luggage","magnify","mail","main","male","man","map","map-marker","marker","martini","meanpath","medical","megaphone","menu","merge","message","microsoft","middle","minify","mobile","mode","money","monitor","more","morning","move","movie","mug","music","mute","nature","neutral","new","next","night","note","notification","notify","number","numbers","nurse","octocat","office","ok","ol","on","open","opinion","options","order","organization","osx","page","panes","password","paste","payment","pdf","pen","pencil","pencil-square","people","person","persons","pet","photo","picker","picture","pie-chart","pin","place","plane","planet","plant","playing","point","popular","power","present","press","previous","privacy","problem","profile","profiles","progress","prompt","protect","purchase","quick","quieter","quote","raindrop","raquo","rating","read","rebase","record","refresh","reload","reminder","remove","reorder","repeat","report","resize","restaurant","rewind","right","robot","rub","sad","safari","satisfied","save","scan","school","science","scissors","score","screen","sea","section","security","send","settings","share","shield","shipping","shopping","show","shuffle","sign in","sign up","sign-in","sign-out","signin","signup","sliders","smaller","sms","social network","social","sort","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc","sort-asc","sort-desc","sort-numeric-asc","sort-numeric-desc","sound","spanner","speech","split","spoon","spreadsheet","spy","square","squares","star","star-half-empty","star-half-full","start","stein","stop","storage","street","student","support","svn","tablet","tachometer","target","tea","telephone","television","text","texting","thumb-tack","thumbs-o-down","thumbs-o-up","tick","ticket","time","timer","timestamp","todo","toggle","transfer","transgender","translate","trash","trash-o","travel","tree","triangle down","triangle left","triangle right","triangle up","trip","try","turkish","tux","tweet","type","ul","unknown","unlock","update","usd","user","vcs","vehicle","version","video","video-camera","views","vimeo","visible","visiblity","voice","volume-control-phone","wait","warning","watch","waterdrop","weather","wheelchair","wheelchair-alt","when","where","whisper","winner","wizard","woman","work","world","write","x","youtube-play","youtube-square","zoom"];
			var suggestions = [];
			for (i=0;i<choices.length;i++)
				if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
			suggest(suggestions);
		}
		,onSelect: function(e, term, item){
			userList.search(term);
		}
	});

	var options = {
		valueNames: [
			'name',
			'born',
			{ data: ['id','key'] },
			// { attr: 'src', name: 'image' },
			// { attr: 'href', name: 'link' },
			// { attr: 'data-timestamp', name: 'timestamp' }
		]
	};
	var userList = new List('icons', options);

	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Select',
		filter_tab_placeholder_text = filter_tab_placeholder.text();
	
	$('.cd-tab-filter li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = $(event.target).data('type');
			
		//check if user has clicked the placeholder item
		if( $(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			$('.cd-tab-filter').toggleClass('is-open');

		//check if user has clicked a filter already selected 
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text($(event.target).text());
			$('.cd-tab-filter').removeClass('is-open');	

		} else {
			//close the dropdown and change placeholder text/data-type value
			$('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = $(event.target).text();
			
			//add class selected to the selected filter item
			$('.cd-tab-filter .selected').removeClass('selected');
			$(event.target).addClass('selected');
		}
	});
	
	//close filter dropdown inside lateral .cd-filter 
	$('.cd-filter-block h4').on('click', function(){
		$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	})

	//fix lateral filter and gallery on scrolling
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
	});

	function fixGallery() {
		var offsetTop = $('.cd-main-content').offset().top,
			scrollTop = $(window).scrollTop();
		( scrollTop >= offsetTop ) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
	}

	//search filtering
	//credits http://codepen.io/edprats/pen/pzAdg
	var inputText;
	var $matching = $();

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		};
	})();

	$(".cd-filter-content input[type='search']").keyup(function(){
		// Delay function invoked to make sure user stopped typing
		delay(function(){
			inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
			userList.search(inputText);
			// Check to see if input field is empty
			if ((inputText.length) > 0) {
				// add item to be filtered out if input text matches items inside the title
			} else {
				// resets the filter to show all item if input is empty
			}
		}, 200 );
	});

	var clipboard = new Clipboard('#content_ul li', {
		text: function(trigger) {
			var copytext =
			$('[name="radioButton"]:checked').val() == 1 ?
			'<i class="' + $(trigger).find('i').attr('class') + '"></i>'
			:
			$(trigger).find('i').attr('class')
			;
			// console.log( copytext, $(trigger).find('i').attr('class') );
			$(trigger).animate({opacity: 0}, 200, function() {
				$(trigger).removeAttr('style');
			});
			return copytext;
		}
	});


});

