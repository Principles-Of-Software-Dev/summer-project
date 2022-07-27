# Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Basic Commands](#basic-commands)
    1. [Creating A New Branch](#creating-a-new-branchhttpswwwatlassiancomgittutorialsusing-branchesgit-checkout)
    2. [Saving and Uploading Your Changes](#saving-and-uploading-your-changes)
    3. [Merging Branches](#merging-brancheshttpswwwatlassiancomgittutorialsusing-branchesgit-merge)
    4. [Merging Your Work into Master Branch](#merging-your-work-into-master-branch)



## Overview

This project is being developed by a small team of 6 students for class related to the Principles of Software Development.
The end goal is a website that emulates a property management system where users (dummy-data) can:

---------------------------
1. Register for Accounts
2. Login to Registered Accounts
3. Update Personal Information
4. Store, Retrieve, Update, and Delete Personal Inventories
5. Add Prices to Items in Inventory
6. Upload Pictures and Videos of Items in Inventory
7. Add Authorized Users to Manage Personal Inventories
8. More TBD
----------------------------

## Getting Started

To get started, make sure you have [generated an SSH key](https://www.youtube.com/watch?v=s6KTbytdNgs&ab_channel=CameronMcKenzie) on your device. The instructions for Unix-based OS *(Mac, Linux)* is very similar. Please also make sure you have **Git** [installed and configured](https://www.jcchouinard.com/install-git-in-vscode/) on your device. Please also make sure you have [NodeJS](https://nodejs.org/en/) installed.

Next, open your prefered terminal and [navigate in the location](https://www.digitalcitizen.life/command-prompt-how-use-basic-commands/) which you want to clone the repository.
Run the following commands to clone *(create a local copy of the master branch)* to your device:

`git clone git@github.com:Principles-Of-Software-Dev/summer-project.git`

This will allow you to modify the current working and tested code without making changes until your code has been tested and is confirmed to work with the overall system. You can develop new code, save your changes, and even alter previous code wihtout affecting the code stored on Github.

-----------------------------

## Basic Commands

### [Creating a New Branch](https://www.atlassian.com/git/tutorials/using-branches/git-checkout): 
When you're developing new, untested code, you often want to upload your progress or codevelop with other developers, but because your code is untested, it can often cause problems with the tested and working code already developed.

For this reason, we can *create a new branch* that can store your current changes without affecting the working code. This branch can then be *merged* into the working code at a later time; usually once tested and confirmed to integrate seemlessly.

The following command can create a new branch:

`git checkout -B {branch_name}`

For example, if you are working on ticket PSD 06, a new branch command will look like this:

`git checkout -B PSD-06`

To switch to a branch without creating new branch, simply run the command without the -B argument like so:

`git checkout PSD-06`

In general, you should never be working in the *master* branch. It's best practice to create a new branch whenever working on developing new functionality.

**NEVER CREATE A BRANCH WITH THE SAME NAME AS A BRANCH THAT ALREADY EXISTS. THIS WILL OVERWRITE THE OLD BRANCH!!**

*If on VS Code, you should be able to see your current working branch near the bottom left hand of your screen*

---------------------------------------

### Saving and Uploading Your Changes:
 After developing a significant function or amount of code, it's best practice to upload your progress to github so your team can collab and see any progress you've made. Keep in mind, you have to save your changes locally (e.g. cntl+s or cmd+s) before Git will recongnize the change.

To do this, issue [Add](https://www.atlassian.com/git/tutorials/saving-changes#:~:text=The%20git%20add%20command%20adds,until%20you%20run%20git%20commit%20.), [Commit](https://www.atlassian.com/git/tutorials/saving-changes/git-commit), and [Push](https://github.com/git-guides/git-push) command sequentially:

* To add all changes in current local repo:

    `git add --all`

* To add all changes in the current directory (note this command uses [relative pathing](http://www.differencebetween.net/technology/difference-between-absolute-and-relative-path/#:~:text=In%20simple%20words%2C%20an%20absolute,directory%20you%20are%20working%20on.))
    
    `git add {directoryname}`


* To add changes from a specific file:

    `git add {filename.extension}`

In most cases, it's perfectly acceptable to add all current changes, but there may be specific cases where you only want to add a specific file or directory. Keep in mind this command only *stages* the changes to be made; **It does not upload them yet.**

From there, run the following command to *commit* changes:

`git commit -m {"commit_message"}`

For example, if you implemented the feature that allows users to register, after *staging* your changes, commit may look something like this:

`git commit -m "Implemented Registration Functionality"`

Lastly, to upload your commits, use the following command on **first** push:

`git push -u origin {branch_name}`

After the fist push to the new branch, you can run all subsequent pushed using the simplified command:

`git push`

---------------------------------------

### [Merging Branches](https://www.atlassian.com/git/tutorials/using-branches/git-merge): 
Lastly, there are times when the *master* branch will be updated with working and tested code while you are working on implementing another feature or test. In this case, it's usually helpful and expected to *merge* the new working code into your repository. **Note we will not be using rebase.** To do this, run the following command:

`git pull --no-rebase origin master`

Take note that you will have to be in the branch you would like to get the lastest updates from *master* in. If not, you can run the `git checkout {branch_name}` command and then rerun the merge command.

The command updates your current branch with all the latest files from *master* and asks which changes you would like to keep. Most of the time, you'll select "accept both changes" for all conflicts but in some cases, such as when you have refactored or updated old code, you'll want to select "accept current changes only." (Remember this action doesn't change the *master* branch until a [pull request](#merging-your-work-into-master-branch) has been made and completed). 

----------------------------------------

For more info, please see the linked tutorials on each of the basic commands.

----------------------------------------

### Merging Your Work into Master Branch: 
Once you've confirmed that your code works and integrates seemlessly with the rest of the working code in Master, you can start a [*Pull Request.*](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) A pull request, a.k.a merge request, basically allows you to create formal invitation for other developers on the team to review your code as "final submission." From there, other developers can provide useful feedback or insights and approve the request or pocket the request pending further optimazation or refactoring on your end. Keep in mind, this only attempts to merge the changes that are already contained within your branch (see [saving and uploading your changes](#saving-and-uploading-your-changes) for more).

To do this:
1. Navigate to the repo via the Github Website or follow the instructions linked above if using the Github CLI or other format.

2. Click *"Pull Requests"* in the top navigation bar as shown in the picture below 

   ![Pull Request Location](/helper_assets/pull_req_1.png)

3. Click "New Pull Request" on the right-hand side of the screen

4. The platform will now as what branch you would like to merge into master. As seen in the picture below, the dropdown labeled "1" or "base" is the branch you want to **merge to** and the dropdown labeled "2" is the branch you want to **take the new changes from**

    ![Merge Selection](/helper_assets/pull_req_2.png)

    * For example, if you wanted to create a Pull Request to merge the changes from *PSD-06* to *master*, you would choose *master* for "1" and *PSD-06* for "2."

5. It will then show you any differences between your branch's files and the master branch's files. Red signifies a deletion while Green signifies an addition; Github shows the entire line as deleted, then added if you only modify part of a line. Click "Create Pull Request"

6. The next screen will ask you for the details of your request including the: title, assignees, reviewers, description of the work done, and labels.

    * Titles should be of the following format: {Ticket}: Quick Description

        * For example, a title for PSD 06 would look like `PSD 06: Updated with Starting Information`
    * You should assign all pull requests you create to yourself
    * You should assign one *reviewer* from your sub-team other than yourself. 
    
        * This ensures code is readable, new code isn't pushed without review, and that at least one other person on your subteam can vouch for the work you've done in case you are not present.

    * Descriptions can be formatted however you prefer. They can also be left out entirely if your title sufficiently describes work done. 
    
        * When in doubt, it's a good idea to assume that a longer description of work done is needed.

    * Labels are just another way to organize requests. Dont spend too much time worrying about all the labels you need, but you should choose at least one.

7. Click "Create Pull Request" one final time to save your request.
8. If you altered or refactored previous code, you will most likely end up with a notification saying "Could Not Merge Automatically, Resolve Conflicts." This is simply because there is a deletion or alteration instead of just an addition to the *master* branches files that Github would like to make you aware of. Click "View the Command Line Instructions" to view the steps to get rid of this error.

**CHANGES MADE VIA [ADD, COMMIT, PUSH](#saving-and-uploading-your-changes) WILL AUTOMATICALLY APPEAR IN YOUR PULL REQUEST. THERE IS NO NEED TO MAKE ADDITIONAL PULL REQUESTS FOR THE SAME TICKET**

*You will then have the option to delete the merged branch; Only do this if you have sufficiently test your code and are sure it integrates well with the master branch. We can always revert master to a previous state but, we may not be able to recover a deleted branch in the case that master is reverted*

------------------------

## Additional Scripts

These scripts are built on top of the base Git Commands to help automate some of the more tedious portions of the project. These require Node Package Manager and are for the purpose of official product deployments, not testing. Testing should be handled via Local Server extensions..

* Sending code to https://principles-of-software-dev.github.io/summer-project. Should only be used on the master branch. @KayyDVC TODO work on automation upon completed pull request

    `npm run deploy`

* Starting Backend Server (Flask).@KayyDVC TODO work on automation upon completed pull request and research proxy in relation to website.

    `npm run start-backend`
