# project4

This project is a Web Application that let's users search the NY Times for articles based on keyword or section topic. A query could be an author or a person, country, etc. of interest. Topics are chosen from a list of categories that is supplied by the NY Times which roughtly correspond to sections. Articles may be saved if the user logs in.

The application uses React for the front end and Rails for the backend. React was chosen for it's loading speed and Rails was chosen for it's speed.

Here's a link to my wireframes: https://drive.google.com/file/d/0B24HDSb--6XOMVJsZTloSmFFQkk/view?usp=sharing

Here's a link to my ERD: https://drive.google.com/open?id=0B24HDSb--6XOUDR0S05pQ2xKUEU

Here's a link to my User Stories: https://drive.google.com/open?id=1Owo2Dzl2iHg-MlTRJpDp-7C3LiFEoFf1hmNq16tBKy8

Here's a link to my presentation: https://drive.google.com/open?id=1gbRmkSwiODSivzpK3sVtt48tIO7K7FQ676SdSqICAAc

Devise Token Auth was used for authentication but required that the header be handled in React. I tried using JToker to do this but was unable to get the configuration to work.

In order to deploy this to Heroku I created 2 new repos, one for the React part, https://github.com/michaeljgut/project4_react, and one for the rails part, https://github.com/michaeljgut/project4_rails. Please see these 2 repos for changes made after 10/15/2017.
