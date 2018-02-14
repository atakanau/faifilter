	var mydata=get_json()
	,grid = '<li class="filter_class" data-id="item_term" aria-label="item_title" data-role="tooltip" data-microtip-position="top"><i class="fa_class"></i></li>'
	,licat = '<li><input class="filter" data-filter="item_name" type="checkbox" id="checkboxitem_no"><label class="checkbox-label" for="checkboxitem_no">item_name</label></li>'
	// ,grid = '<i class="fa_class"></i>'
	,html_content = ''
	,html_categories = ''
	,categories = []
	,terms = []
	;

	for(i in mydata){
		category = '';
		for(j in mydata[i].styles){
			category += ' fa' + mydata[i].styles[j].charAt(0);
			
			if(typeof(categories[ mydata[i].styles[j] ])=='undefined')
				categories[ mydata[i].styles[j] ] = 1;
			else
				categories[ mydata[i].styles[j] ] += 1;
		}
		
		searchterms = '';
		if(mydata[i].search.terms.length){
			searchterms = mydata[i].search.terms.join(' ');
			
			for(j in mydata[i].search.terms){
				if( terms.indexOf( mydata[i].search.terms[j] ) == -1 )
					terms.push( mydata[i].search.terms[j] );
			}
		}
		html_content += grid
			.replace(/fa_class/g , category.trim() + ' fa-'+i)
			.replace(/item_title/g , mydata[i].label)
			.replace(/filter_class/g , mydata[i].styles.join(' ') )
			.replace(/item_term/g , i + ' ' + searchterms)
			;
		// console.log(mydata[i]);
		// if(i=='apple')
		// if(i=='asterisk')
			// break;
	}
	// console.log('categories' ,categories);
	// console.log('terms' ,terms);
	$('#search_inpt').data('autocomplete',terms);
	html = '';
	no = 1;
	for(i in categories){
		html_categories += licat.replace(/item_name/g , i).replace(/item_no/g , no++);
	}

	// $('#content_ul').html(html_content)
	// $('#list_categories').html(html_categories)