# Opay-Demo-Frontend
An application solely for education purposes 

## Usage
- Run `git clone https://github.com/stanleyogada/Opay-Demo-Frontend.git`
- Run `cd Opay-Demo-Frontend`
- Run `npm i`
- Run `npm run dev`

#

## VSCode Extensions
- Install `Prettier` extension.
- Install `vscode-styled-components` extension

#

## How to contribute
1. Create your branch with the of your current ticket e.g `git checkout -b ch-#675-add-pretier-configuration`.
2. Make your changes.
3. Stage and commit your changes. e.g. `git add . && git commit -m "ch: setup prettier configuration"`.
4. Repeat **step 2 and 3** until you're done with your ticket tasks.
5. Pull from origin `dev` branch to sync all changes online to your local branch `git pull origin dev`.
6. Fix and conflict/s if any (You might need to consult help from the Engineer responsible for causing the conflict/s).
7. Push your changes eg. `git push origin ch-add-pretier-configuration`
8. Create a **PR** in GitHub.
9. If any change/s is requested by your Code Reviewers, repeat **step 2 to 7** until your **PR** is approved.
10. Merge **PR**. 

#

## Pull Request (**PR**)
#### Rules
1. Request an Engineer/s to review to your PR (to check if your code makes sense to merge to `dev` branch).
2. Assign yourself (to quickly identify you as the owner of the PR).
3. Don't Merge without approval from your Code reviewer/s.
4. Merge after approval.

#### Format
- The **PR** title. eg. `[#675] Add prettier configuration`.
- The **PR** body: this should be the link to the ticket on trello. eg. `Trello: https://trello.com/c/XEv0yeTA`.
- **Below is screenshot example of the perfect PR**: take a look=>https://github.com/stanleyogada/Opay-Demo-Frontend/pull/3
![image](https://user-images.githubusercontent.com/104577296/221747744-f5a893cf-ae75-4a63-ba69-9016798e47a9.png)

#

## Branch / Commits Conventions
#### Branch
- Format `<ch|ft|bg>-#ticket-id-<name-of-your-ticket-like-this>`
- Example `ft-#675--add-button-component`

#### Commit
- Format `<ch|ft|bg>-#ticket-id: <short description>`
- Example `bg-#675: fix all failing links`

