# CaSMM

> Computation and Science Modeling through Making

Cloud-based, block-based programming interface for Arduinos. Created by UF.

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit

# Added Features
1. Initial Profile Page Layout
   Developer: Rohit Nair
   Description: Create the overall layout of the student view of the profile page'
   

3. Profile Page Link on NavBar
   Developer: Rohit Nair
   Objective: Create a link to the profile page in the NavBar that is only available to logged-in users.
       
4. Per User Profile Routes
   Developer: Rohit Nair
   Description: Based on the type of user that logs in (student or teacher), the link should direct to that specific page.

5. Student Profile Page
   Developer: Rohit Nair
   Description: If a student logs in to their account, clicking on the profile option in the navbar should display the student view of the profile page.

6. Teacher Profile Page - Not Fully Implemented
   Developer: Rohit Nair
   Description: If a teacher logs in to their account, clicking on the profile option in the navbar should display the teacher view of the profile page.

7. Initial Profile Card
   Developer: William Chen
   Description: A user should be able to display their profile image, name, and role. This was implemented in the form of a profile card.

8. Initial Projects Section
   Developer: William Chen
   Description: A student should be able to display the projects that they worked on. The individual projects were intended to use the project component the gallery team provides.

9. Profile Page Data
   Developer: William Chen
   Description: The data for a user’s profile should be stored, persisted, and fetched on the backend. To do this, a database collection and API was implemented on the backend. Additionally, data fetching was implemented on the frontend on the profile page.

10. Profile Page Editing
   Developer: William Chen
   Description: A user should be able to edit their profile page. To do this, forms were implemented for editing a user’s profile image and biography. These forms are only shown if the user owns the profile and sends a request to the backend API to modify the profile data when submitted.


11. User Projects
    Developer: Komlan Tchoukou
    Description: Initial was supposed to allow users to add their projects to their profile page, however for the sake of time these are default user projects.

12. Badge display editing
    Developer: Komlan Tchoukou
    Description: Allows users to choose what badges they want to display by either removing or adding buttons


13. Available Badges Section
    Developer: Joshua Thomas
    Description: I implemented an array component into the Available Badges section of the student profile so that depending on the number of badges, they won’t all appear one below the other but instead have multiple appear in the same row like a multi-column table.

14. Custom Badges
    Developer: Joshua Thomas
    Description: As a student, I want to see some badges that I can earn when starting to learn to code. To achieve this, I created some default badges that by default would appear in the Available Badges section when new students set up their student accounts and profiles.

15. Badge Progress Bar Linked with Individual Badges
    Developer: Joshua Thomas
    Description: As a student, I want to know how much progress I have made towards achieving a certain badge. Using the progress bar component Georges created, I connected it with the badge component so that a progress bar displays the progress made for each badge in the Available Badges section of the student profile page

16. Earned/in-progress/not-started badges
    Developer: Joshua Thomas
    Description: The way a badge is displayed should be modified based on the progress a student has made towards achieving it. To achieve this, a grayscale component was implemented which modifies the color of the badge based on the progress made. The less progress, the more gray the badge looks and the more progress they make, the more colored and bright the badge will look.


17. Earned Badges Section
    Developer: Joshua Thomas
    Description: As a student, I want to be able to display the badges I have fully achieved. To do this, a filter was implemented on the Badge Display section of the student profile to show only badges that have been fully achieved by the student, which means the progress bar is at 100%. Also, the display was modified such that the progress bar is removed and only the badge and the name of the badge are displayed.

18. Badge Creation Form - Not Fully Implemented
    Developer: Joshua Thomas
    Description: As a teacher, I want to create custom badges that are specific to my classroom so the badges are more meaningful for the students. To do this, I created a Create Badge From section in the teacher profile which takes the same spot as the Badge Display in the student profile view. I created the create badge form where the teacher is able to upload images of badges they want to offer their students. The Cancel button functions properly where it closes the form. The only part of the form that doesn’t work is the submit button which would store the badge data in the backend and become accessible to display on the frontend.

19. Badge Display/Available Badges API
    Developer: Georges Sfeir
    Description: As a student, I want to display the badges for work to showcase my abilities. For this task, I learned how to interact with the badges in the backend, as well as how to create the API requests for displaying the badges on the frontend.
 
20. Badge Progress Bar
    Developer: Georges Sfeir
    Description: As a student, I want to know how much progress I have made towards achieving a certain badge. I created the badge progress bar component, displayable on the frontend, during the first sprint. For the creation of this component, I used CSS styling and javascript. Joshua then linked the components individually to badges during sprint 2.

21. Badges Backend Collection
    Developer: Georges Sfeir
    Description: Within the backend of the project there are collection bins of different sorts of data, one of which is for the custom badges. I created this collection and imported all of our badges and their corresponding data so that they could be further utilized and displayed on the frontend.

22. Badge and Badge Display Components
    Developer: Patrick Lehman
    Decription: Badge components serves as a modular component to contain a Badge’s Image, progress bar, name and other attributes
    Badge.jsx file for Badge Component

    Badge.less (styling)  file for Badge Component


    BadgeDisplay.jsx file for BadgeDisplay Component (contains multiple badges)


    BadgeDisplay.less (styling)  file for BadgeDisplay Component

23. Badge Connection to Backend (Tracking Badge Attributes)
    Developers: Patrick / Georges Sfeir
    Description: Functions that connect the Badge to the backend and allow all attributes to be updated in real time (later changed to the single function shown)

