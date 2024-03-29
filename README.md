# OGADA-SWIFT-BANKING-FRONTEND

### With 79+ Unit / Component passing Tests
![TEST VIDEO (1)](https://github.com/stanleyogada/OGADA-SWIFT-BANKING-FRONTEND/assets/102979724/f12022c0-f61d-4429-9feb-bfd327ddaa72)



<a href="https://ogada-swift-banking.vercel.app/">Production Link</a> 🚀

An application solely for education purposes! 
This is a DEMO simple banking application that allows users to create accounts, deposit, withdraw, and transfer funds between accounts.

**There are no .env files for the projects**

#

## For Quick Test with Docker On Your Local Machine

- **Check out the QUICK_TEST_WITH_DOCKER.md file**
- Or visit this link: [OGADA-SWIFT-BANKING-FRONTEND-DEV-TEST](https://github.com/stanleyogada/OGADA-SWIFT-BANKING-FRONTEND-DEV-TEST-DOCKER)

## Usage

1. First Run `node -v` if your version **< v12** Then update to the latest node version - https://nodejs.org/en/download/, Don't download the latest
2. Run `git clone https://github.com/stanleyogada/OGADA-SWIFT-BANKING-FRONTEND.git`
3. Run `cd OGADA-SWIFT-BANKING-FRONTEND`
4. Run `npm i --force --legacy-peer-deps`

### Run directly on your machine

5. **Run `npm run dev`**

### Run with Docker

##### Prerequisites

- _Install the following on your machine_
  - _[Docker](https://docs.docker.com/get-docker/)_
  - _[Docker Compose](https://docs.docker.com/compose/install/)_
- _Start Docker-Desktop on your machine_

5. **Run `docker-compose up`**

#

## VSCode Extensions

- Install `Prettier` extension.
- Install `vscode-styled-components` extension

#

## How to contribute

1. Checkout to main branch and pull latest changes `git checkout main && git pull origin main && npm i --force --legacy-peer-deps`
2. Create your branch with the of your current ticket e.g `git checkout -b ch-#675-add-pretier-configuration`.
3. Make your changes.
4. Stage and commit your changes. e.g. `git add . && git commit -m "ch-#675: setup prettier configuration"`.
5. Repeat **step 3 and 4** until you're done with your ticket tasks.
6. Pull from origin `main` branch to sync all changes online with your local branch `git pull origin main && npm i --force --legacy-peer-deps`.
7. Fix all conflict/s if any (You might need to consult help from the Engineer responsible for causing the conflict/s).
8. Push your changes on your current branch! eg. `git push origin ch-#5-add-pretier-configuration`
9. Create a **PR** in GitHub if you don't have any yet.
10. If any change/s is requested by your Code Reviewers, repeat **step 3 to 8** until your **PR** is approved.
11. Merge **PR**. 🚢

#

## Pull Request (**PR**)

#### Rules

1. Request an Engineer/s to review your PR (to check if your code makes sense to merge to the `main` branch).
2. Assign yourself (for anyone to quickly identify you as the owner of the PR).
3. Don't Merge without approval from your Code reviewer/s!!! (This could deal some potential damage if you do this 🥴)
4. Merge after approval. 🚢

#### Format

- The **PR** title. eg. `[#675] Add prettier configuration`.
- The **PR** body: This should be the link to the ticket on Trello. eg. `Trello: https://trello.com/c/XEv0yeTA`.
- **Below is screenshot example of the perfect PR**: take a look=>https://github.com/stanleyogada/Opay-Demo-Frontend/pull/3
  ![image](https://user-images.githubusercontent.com/104577296/221747744-f5a893cf-ae75-4a63-ba69-9016798e47a9.png)

#

## Branch / Commits Conventions

#### Branch

- Format `<ch|ft|bg>-#ticket-id-<ticket-title>`
- Example `ft-#675-add-button-component`

#### Commit

- Format `<ch|ft|bg>-#ticket-id: <short description>`
- Example `bg-#675: fix all failing links`
