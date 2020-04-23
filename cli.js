#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { download } = require('.');

const email = process.env.IMDB_EMAIL;
const password = process.env.IMDB_PASSWORD;
if (!email || !password) {
  console.log('IMDB_EMAIL and IMDB_PASSWORD environment variables must be set.');
  process.exit(1);
}

if (process.argv.length !== 3) {
  console.log('Usage: exporteer_imdb OUTPUT_DIR');
  process.exit(1);
}
const dir = process.argv[2];

download(email, password)
  .then(data => {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'watchlist.csv'), data.watchlist);
    fs.writeFileSync(path.join(dir, 'ratings.csv'), data.ratings);
  }, err => {
    console.error(err);
    process.exit(2);
  });
