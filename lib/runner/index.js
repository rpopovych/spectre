/* Core Runner */
'use strict';

const config = require('_/config'),
    log = require('_/log'),
    helpers = require('./helpers'),
    debug = log.debugger('worker:runner:' + process.pid);

module.exports = run;

function run(_ph, msg) {
    return Promise.resolve(true)
        .then(() => helpers.cookie(_ph, msg))
        .then(() => createPage(_ph))
        .then(page => openPage(page, msg))
        .then(page => helpers.render(page, msg))
        .then(page => closePage(page))
        .then(() => 'Open succeeded!');
}

function createPage(_ph) {
    return new Promise((resolve, reject) => {
        _ph.createPage(page => {
            if (!page) return reject('Page creation failed');
            resolve(page);
        });
    });
}

function openPage(page, msg) {
    return new Promise((resolve, reject) => {
        page.open(msg.url, status => {
            if (status !== "success") {
                page.close();
                return reject('Page open failed');
            }
            resolve(page);
        });
    });
}

function closePage(page) {
    page.close();
}