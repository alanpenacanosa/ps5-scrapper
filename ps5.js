const config = require('./config.json')
const websites = require('./websites.json')

const fetch = require('node-fetch');
const jsdom = require('jsdom')
const notifier = require('node-notifier')
const open = require('open');
const chalk = require('chalk')

function checkAvailability() {
    for (const website of websites) {
        fetch(website.url)
            .then(res => res.text())
            .then(html => {
                const document = new jsdom.JSDOM(html).window.document
                const textFound = document.querySelector(website.selector).textContent
                if (textFound === website.expecting) {
                    if (config.enableLogs) console.log(chalk.red(`${website.name} :\t${textFound}`))
                } else {
                    if (config.enableLogs) console.log(chalk.green.bold(`${website.name} :\t${config.availableText}`))
                    notifier.notify({
                        title: 'PS5 Scrapper',
                        message: `${config.availableText} chez ${website.name}`,
                        sound: true,
                        wait: true
                    });
                    notifier.on('click', (notifierObject, options) => open(website.url))
                    open(website.url)
                }
            }).catch(err => console.error(chalk.bgRed(err)))
    }
}

checkAvailability()
setInterval(checkAvailability, config.timeBetweenRequests * 60 * 1000)