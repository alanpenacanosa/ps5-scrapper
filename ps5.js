const config = require('./config.json')
const websites = require('./websites.json')

const fetch = require('node-fetch')
const jsdom = require('jsdom')
const chalk = require('chalk')
const open = require('open')
const notifier = require('node-notifier')

function checkAvailability() {
    console.log(chalk.italic.underline.bold(`\n${Date()}`))
    for (const website of websites) {
        fetch(website.url)
            .then(res => res.text())
            .then(html => {
                const document = new jsdom.JSDOM(html).window.document
                const element = document.querySelector(website.selector)
                if (element && element.textContent === website.expecting) {
                    if (config.enableLogs) console.log(chalk.red(`${website.name} :\t${element.textContent}`))
                } else {
                    console.log(chalk.magenta.bold(element.textContent))
                    if (config.enableLogs) console.log(chalk.green.bold(`${website.name} :\t${config.availableText}`))
                    notifier.notify({
                        title: 'PS5 Scrapper',
                        message: `${config.availableText} - ${website.name}`,
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
setInterval(checkAvailability, config.timeBetweenRequestsInMinutes * 60 * 1000)