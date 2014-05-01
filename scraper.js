var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	query = '|["Theros"]|["Journey+into+Nyx"]|["Born+of+the+Gods"]',
	baseUrl = 'http://gatherer.wizards.com/Pages/',
	checklistUrl = baseUrl + 'Search/Default.aspx?output=checklist&action=advanced&set=' + query;
	//multiverseUrl = baseUrl + 'Card/Details.aspx?multiverseid='; // TODO: Extract more card attributes by scraping this url too with cardid
	
request(checklistUrl, function(err, resp, body) {
	if (err)
		throw err;
	$ = cheerio.load(body);
	fs.unlink('cards.txt', function () {
		$('.checklist .cardItem').each(function () {
			var number = $(this).find('.number').text(),
				name = $(this).find('.name').text(),
				cardid = $(this).find('.nameLink').attr('href').split('=')[1],
				artist = $(this).find('.artist').text(),
				color = $(this).find('.color').text(),
				rarity = $(this).find('.rarity').text(),
				set = $(this).find('.set').text(),
				toAppend = number + '\t' + name + '\t' + cardid + '\t' + artist + '\t' + color + '\t' + rarity + '\t' + set + '\n';
			fs.appendFile('cards.txt', toAppend);
		});
		console.log('Scraping finished');
	});
});