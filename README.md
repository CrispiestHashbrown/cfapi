
# cfapi
Built with Express/Node.js, the Commit Frequency API lets users retrieve information about GitHub search results and information about their GitHub account. 

Information about search results includes:
- commit frequency for the past year
- project owner
- project name
- repository stars
- project's primary language

Account information includes:
- users they are following
- public repositories
- starred repositories
- assigned issues

This project is hosted with Google Cloud and [Firebase](https://firebase.google.com/docs/reference).

For an example of an application that uses the CFAPI see the [Commit Frequency App](https://github.com/CrispiestHashbrown/cfapp).

## Getting started (If you want to run this on your own machine)
Clone the application: 
```
git clone https://github.com/CrispiestHashbrown/cfapi.git
```
Navigate to `cfapi/functions` and create your own `.runtimeconfig.json` that contains the following:
```
{
  "appauth": {
    "ghid": _YOUR_OAUTH_CLIENTID_,
    "ghs": _YOUR_OAUTH_CLIENT_SECRET_
  },
  "session": {
    "secret": _YOUR_APPLICATION_SESSION_SECRET_
  }
}
```
**Note: Run the following commands within the `/functions` directory.**

Install dependencies:
```
npm install
```
Starting the project locally:
```
npm start
```
To run unit tests:
```
npm test
```
This project requires the Firebase CLI. To install it, and for more information, visit the [documentation](https://firebase.google.com/docs/web/setup).

Once the Firebase CLI is set up, you can test it locally with:
```
firebase serve --only functions,hosting
```

## Usage
- This API makes HTTP requests to the GitHub API. For more information visit the GitHub API documentation [here](https://developer.github.com/v3/). 

- For more information on GitHub OAuth apps, visit [here](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/).

- GitHub tokens never expire. To manually revoke GitHub tokens you can do so through:
```
Settings > Applications > Authorized GitHub Apps
```

- This has only been tested on Chrome web browser. 

## Contributions
- Contributions welcome!
