# StonkLabs Project Description
Welcome!

StonkLabs is a mock trading website for beginning traders.
On our website, users start by creating an account. Users are then able to create their own watchlist
to keep track of stocks that they are considering buying, as well as a portfolio to track stocks that 
they have decided to purchase. Once a stock is purchased, users are able to keep track of the percent
change in their portfolio to see if they're ready to take on real trading! To help new users explore 
stocks, we have provided a list of trending stocks, as well as the biggest movers for each day. 

Good luck and happy trading!

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# UI - Initial Prototype
https://www.figma.com/file/cDR1gxbFnbCESOcPGTMJzu/StonkTracker?node-id=3%3A3

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# Development Environment Set Up
**FRONT END:**
Open terminal and navigate to target project folder
1) Git init 
2) Git add origin https://github.com/jwalla13/StonkLabs
3) Git pull origin master
4) *Confirm you have 'npm' installed by typing 'npm --version', otherwise follow the instructions here: https://nodejs.org/en/download/ 
5) npm install axios
6) npm install antd
7) npm install @material-ui/core
8) npm install @material-ui/icons
9) npm install @material-ui/lab
10) npm start

**Back End:**

Open terminal and navigate to target project folder
1) Git init
2) Git add origin https://github.com/WesReynolds/StonksBackend
3) Git pull origin master
4) Install Flask here: https://flask.palletsprojects.com/en/1.1.x/installation/ 
5) pip install -r requirements.txt
7) Check Instructions in createDatabases.py to set up 
8) export FLASK_APP=linkingFuncs.py
9) export FLASK_ENV=development
10) flask run

# Diagrams (need to update Class Diagram)
https://github.com/jwalla13/StonkLabs/wiki

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# Set Up Your Style Guide

For Python Code Contributers Follow: http://pylint.pycqa.org/en/latest/

Pylint Description : 

Pylint is a tool that checks for errors in Python code, tries to enforce a coding standard and looks for code smells. 
It can also look for certain type errors, it can recommend suggestions about how particular blocks can be refactored 
and can offer you details about the code's complexity.

Run: 
pip install pylint

pylint [filename]

For JavaScript Code Contributers Follow: https://standardjs.com/

JavaScript Standard Style Description:

The beauty of JavaScript Standard Style is that it's simple. No one wants to maintain 
multiple hundred-line style configuration files for every module/project they work on. 
Enough of this madness!

Run:

npx standard --fix 
