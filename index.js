#!/usr/bin/env node

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');

program.arguments('<file>')
    .option('-u, --username <username>', 'The user to authenticate as')
    .option('-p --password <password>', 'The user\'s password')
    .action((function (file) {
        co(function *() {
            const username = yield prompt('username: ');
            const password = yield prompt.password('password: ');
            console.log('user: %s pasword %s file %s', username, password, file)
        })
    }))
    .parse(process.argv);
