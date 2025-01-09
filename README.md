# movie_demo
Sample node/express app to get movie info by release year

## Submission notes
- unit tests are TBD; I had some environment problems and wanted to get the code working first
- I couldn't find out how to get a new access token from my api key so all requests use the api_key parameter
  - NOTE: requests work with my bearer token from my TMDB account, but I couldn't generate a new one from the api
- something with my git setup wouldn't let me push to the gist fork, so I created a new repo in my account
- inconsistent naming is due to my brain still stuck in python-land

## Setup
- clone the repo and run `npm install`
- add a `.env` file to repo root and set `TMDB_API_KEY=[your api key for api.themoviedb.org]`

## Run server
- debug: `npm run dev`
- non-debug: `npm run start`

## API Usage
make request to `http://localhost:5050/movies/year/YYYY` where YYYY is 4 digit year

Sample response for 1978:
```json
[
    {
        "title": "Superman",
        "release_date": "1978-12-14",
        "vote_average": 7.139,
        "editors": [
            "Stuart Baird",
            "Michael Ellis",
            "Leonard Green",
            "Michael J. Duthie",
            "Bob Mullen",
            "Neil Farrell",
            "George Akers",
            "Christopher Morris",
            "Mike Round",
            "Russ Woolnough",
            "David Beesley",
            "Peter Watson"
        ]
    },
    {
        "title": "Halloween",
        "release_date": "1978-10-24",
        "vote_average": 7.565,
        "editors": [
            "Charles Bornstein"
        ]
    }
]
```
