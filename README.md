# Persons Assignment
The aim was to build a small application where employees are displayed in a datagrid and can be edited, using react.js.
After I spent too much time on setting up my own development environment, I decided to use next.js since it looked like an excellent react framework to use, and extend. I added axios to the project to handle requests and json-server for serving the provided persons.json file.
## Getting Started
First, you will need to clone the repository. Create a project folder and open a terminal inside it, then type in
```
git clone https://github.com/Zentie/persons_assignment.git
```
enter the persons_assignment folder
```
cd persons_assignment
```
install dependencies
```
npm install
```
## Running the project in local development mode
Open a terminal in the root folder (persons_assignment) and fire up the json-server
```
npm run json-server
```
make sure nothing runs on port 4000 and 3000.
Open another terminal in the root folder of the project, and let's run next.js by typing in
```
npm run dev
```
and now you can open the app on http://localhost:3000 in your browser
