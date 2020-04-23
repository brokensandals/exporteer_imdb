# exporteer\_imdb

This is a very simple tool for exporting your data from IMDB.

Currently, it only retrieves your watchlist and ratings. It uses [puppeteer](https://github.com/puppeteer/puppeteer) to download the CSV exports of them from IMDB.

## Setup

1. Install node.js and npm
2. `npm installg -g exporteer_imdb`

## Usage

```bash
export IMDB_EMAIL=your_account_email_address
export IMDB_PASSWORD=your_account_password
exporteer_imdb outputdir
```

This will create the folder `outputdir` (if it doesn't already exist), and write the files `watchlist.csv` and `ratings.csv` to it.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/brokensandals/exporteer_imdb.

## License

This is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
