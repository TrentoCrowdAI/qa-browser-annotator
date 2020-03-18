# QA-Browser-Annotator
The data collection interface for QA-Browser.

## Quick start
### Cloning the project
Clone the repository with
```
git clone https://github.com/TrentoCrowdAI/qa-browser-annotator/
```

### Create database
The project uses a PostgreSQL database, with:
* database name: `qabrowser`
* username: `qauser`
* password: `qauserPwd`
* port: `5432`
You can change these params, in the environment configuration file (`.env`).

Create the required tables, you chan use the `database-init.sql` file.

## Start the QA-Browser-Annotator
In a command line type
```
npm start
```
Open the annotator interface: [http://localhost:3000/ui](http://localhost:3000/ui)

