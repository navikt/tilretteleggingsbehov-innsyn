const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;
let url = '';
if (process.env.NAIS_CLUSTER_NAME === 'prod-sbs') {
    url =
        'https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';
} else {
    url =
        'https://appres-q1.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';
}

const requestDecorator = callback => request(url, callback);

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                const { document } = new JSDOM(body).window;
                const prop = 'innerHTML';

                const data = {
                    NAV_SCRIPTS: document.getElementById('scripts')[prop],
                    NAV_STYLES: document.getElementById('styles')[prop],
                    NAV_HEADING: document.getElementById('header-withmenu')[prop],
                    NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
                    NAV_MENU_RESOURCES: document.getElementById('megamenu-resources')[prop],
                };

                console.log('> Suksess!\n');
                resolve(data);
            } else {
                reject(new Error(error));
            }
        };

        console.log('Henter Nav-dekoratøren ...');
        requestDecorator(callback);
    });

module.exports = getDecorator;
