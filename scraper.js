var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	fileName = 'cards.txt',
	query = '|["Theros"]|["Journey+into+Nyx"]|["Born+of+the+Gods"]',
	baseUrl = 'http://gatherer.wizards.com/Pages/',
	checklistUrl = baseUrl + 'Search/Default.aspx?output=checklist&action=advanced&set=' + query;
	//multiverseUrl = baseUrl + 'Card/Details.aspx?multiverseid='; // TODO: Extract more card attributes by scraping this url too with cardid
	
var doRequest = function (callback) {
	var start = new Date().getTime();
	console.log('>>> Magic scraper started.');
	console.log('>>> Cards will be stored in: ' + fileName);

	request(checklistUrl, function(err, resp, body) {
		if (err)
			throw err;

		$ = cheerio.load(body);

		callback($);

		var end = new Date().getTime();
		var time = end - start;
		console.log('>>> Magic scraper finished in ' + time + ' ms.');
	});
}

var extractCards = function ($) {
	fs.unlink(fileName, function () {
		$('.checklist .cardItem').each(function () {
			fs.appendFile(fileName, formatCardItem(getCardItem(this)));
		});
	});
};

var getCardItem = function (cardItem) {
	return {
		number: $(cardItem).find('.number').text(),
		name: $(cardItem).find('.name').text(),
		cardid: $(cardItem).find('.nameLink').attr('href').split('=')[1],
		artist: $(cardItem).find('.artist').text(),
		color: $(cardItem).find('.color').text(),
		rarity: $(cardItem).find('.rarity').text(),
		set: $(cardItem).find('.set').text()
	};
};

var formatCardItem = function (cardItem) {
	return	cardItem.number + '\t' + 
			cardItem.name + '\t' + 
			cardItem.cardid + '\t' + 
			cardItem.artist + '\t' + 
			cardItem.color + '\t' + 
			cardItem.rarity + '\t' + 
			cardItem.set + '\n';
};

(function () {
	doRequest(extractCards);
}());