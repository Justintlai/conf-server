Build your app and run it locally
Run the npm install command in your local app directory to install the dependencies that you declared in your package.json file.
$ npm install
Start your app locally using the heroku local command, which is installed as part of the Heroku CLI.
$ heroku local web
Your app should now be running on http://localhost:5000/.

==============

Deploying

1. git add .
2. git commit -am"comment"
3. git push heroku master
