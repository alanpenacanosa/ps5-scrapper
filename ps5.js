const config = require('./config.json')
const websites = require('./websites.json')

const request = require('request-promise')
const jsdom = require('jsdom')
const open = require('open');
const chalk = require('chalk')

function checkAvailability() {
    for (const website of websites) {
        request(website.url).then(html => {
            const document = new jsdom.JSDOM(html).window.document
            const textFound = document.querySelector(website.selector).textContent
            if (textFound === website.expecting) {
                if (config.enableLogs) console.log(chalk.red(`${website.name} :\t${textFound}`))
            } else {
                if (config.enableLogs) console.log(chalk.green.bold(`${website.name} :\t${config.availableText}`))
                open(website.url)
            }
        }).catch(err => console.error(chalk.bgRed(err)))
    }
}

checkAvailability()
setInterval(checkAvailability, config.timeBetweenRequests * 60 * 1000)