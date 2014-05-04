magic_scraper
=============

  Written with NodeJS... see my other project magic-card-scraper for a Clojure/Leiningen version.

Scraping the gatherer for card info on any set produced ever

Requires that nodejs is installed on host system.

Checkout project or download from github and run:

$ cd magic_scraper

$ npm install request cheerio

Then run the scraper by issuing the following command:

$ node scraper.js

This will delete and recreate a file called cards.txt, which is a tab separated file to be imported into other systems.
