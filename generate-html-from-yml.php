<?php 
	$icons = array();
	$created = array();
	$categories = array();
	$file='icons.yml';
	$file='Font-Awesome-master\src\icons2.yml';
	$file='Font-Awesome-master\src\icons.yml';
	try {
		require_once 'Spyc/spyc.php';
		$a = spyc_load_file($file);
	} catch (ParseException $e) {
		printf("Unable to parse the YAML string: %s", $e->getMessage());
	}
// echo '<pre> = '. print_r($a['icons'][0], true).'</pre>';
// echo '<pre> = '. print_r($a, true).'</pre>';
$html=
"<!DOCTYPE html>
<html lang='en' xml:lang='en' xmlns='http://www.w3.org/1999/xhtml'>
	<head>
		<meta charset='utf-8'>
		<meta content='en' name='language'>
		<meta content='width=device-width, initial-scale=1' name='viewport'>
		<script src='tommyp-multifilter\lib\jquery.js'></script>
		<script src='clipboard.js-master\dist\clipboard.min.js'></script>
		<script src='tommyp-multifilter\multifilter.js'></script>
		<link href='tommyp-multifilter\style.css' media='screen' rel='stylesheet' type='text/css'>
		<link rel='stylesheet' type='text/css' href='Font-Awesome-master/css/font-awesome.min.css'>
		<title>faifilter</title>
		<script type='text/javascript'>
			//<![CDATA[
				$(document).ready(function() {
					$('.filter').multifilter()
					var clipboard = new Clipboard('i', {
						text: function(trigger) {
							console.log($(trigger).attr('class') );
							$(trigger).animate({opacity: 0}, function() {
								$(trigger).removeAttr('style');
							});
							return $(trigger).attr('class').replace(' fa-2x', '');
						}
					});

					$('#compact').on('change', function (e) {
						$('table').removeClass('compact').addClass(this.value);
					})

					$('.reset').click(function () {
						e = $(this).prev();
						// if(e.prop('tagName').toLowerCase() == 'select')
							e.val('').trigger('change');
					})

					$('small').click(function () {
						e = $(this).prev();
						var col = $(this).parent().parent().children().index($(this).parent());
						console.log(col );
						if(col==3)
							$('#keyword').val($(this).text()).trigger('change');
						else if(col==4)
							$('#categories').val($(this).text()).trigger('change');
					});

					$('i').hover(
						function () {
							$(this).addClass('fa-2x');
						},
						function () {
							$(this).removeClass('fa-2x');
						}
					);
				})
			//]]>
		</script>
		<style type='text/css'>
		.compact td:nth-child(1), .compact tr {display:inline-block;}.compact td:not(:first-child) {display:none;}tr{padding:0;margin:0;}td{min-width:2.5em;padding:0;margin:0;}i:not(.fa-2x){padding:0.5em;}i ,small ,button.reset{cursor: pointer;}small {text-decoration: underline;}small:hover {text-decoration: none;}
		</style>
	</head>
	<body style='background-color: black;color: white;'>
		<div class='container'>
		%s
		<h1>faifilter - font awesome icon filter <code>(fa: v%s)</code></h1>
			<table class='compact' cellpadding='0' cellspacing='0'>
				<thead>
					<th>view <br/>
						<select id='compact'>
							<option value='compact'>…</option>
							<option value=''>—</option>
						</select>
					</th>
					<th>created <br/>
						<select class='filter' name='created' placeholder='created' data-col='created'>
							<option value=''>*</option>
							%s
						</select><button class='reset'>×</button>
					</th>
					<th>aliases <br/> <input autocomplete='off' class='filter' id='aliases' name='aliases' placeholder='aliases' data-col='aliases'><button class='reset'>×</button></th>
					<th>keyword <br/> <input autocomplete='off' class='filter' id='keyword' name='keyword' placeholder='keyword' data-col='keyword'><button class='reset'>×</button></th>
					<th>categories <br/> 
						<select class='filter' id='categories' name='categories' placeholder='categories' data-col='categories'>
							<option value=''>*</option>
							%s
						</select><button class='reset'>×</button>
					</th>
				</thead>
				<tbody>
					%s
				</tbody>
			</table>
		</div>
	</body>
</html>";
$tbody="";
$table_row=
"<tr>
<td title='%s'><i class='fa fa-%s'></i></td>
<td>%s</td>
<td>%s</td>
<td>%s</td>
<td>%s</td>
</tr>"
;
	foreach($a['icons'] as $i){
		$created[] = $i['created'];
		$categories = array_merge($categories, $i['categories']);
		$tbody.=sprintf($table_row
		, $i['name']
		, $i['id']
		, $i['created']
		, $i['id'] . (isset($i['aliases']) ? ',' . implode(',', $i['aliases']) : '')
		, isset($i['filter']) ? ( is_array($i['filter']) ? '<small>' . implode('</small> <small>', $i['filter']) .'</small>' : $i['filter'] ) : ''
		, isset($i['categories']) ? str_replace(' Icons', '', '<small>' . implode('</small> <small>', $i['categories']) .'</small>' ) : ''
		);
	}
	
	$categories = array_unique($categories);sort($categories);
	$created = array_unique($created);sort($created);
	$last_vers = $created[ count($created) - 1 ];
	
	$option_created="";
	foreach($created as $i)
		$option_created.='<option value="'.$i.'">'.$i.'</option>';
	$option_categories="";
	foreach($categories as $i)
		$option_categories.='<option value="'.str_replace(' Icons', '', $i ).'">'.str_replace(' Icons', '', $i ).'</option>';

	$file = 'fa-list-'.$last_vers.'.html';
	// Open the file to get existing content
	$current = "John Smith\n";
	// Write the contents back to the file
	file_put_contents($file, sprintf($html, '', $last_vers, $option_created, $option_categories, $tbody));

	$link = "generated html: <a href='".$file."'>".$file."</a>";
	// echo sprintf($html, $num, $location);
	echo sprintf($html, $link, $last_vers, $option_created, $option_categories, $tbody);
	
?>
