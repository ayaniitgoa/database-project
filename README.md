### DB Transformer

### About the Project:

- This web application using ReactJS and Django for joining two tables and providing the output in a downloadable CSV file
- Users have to log in to their local MySQL database, select the schema and the tables to join.
- Users also have to choose the primary and select the attributes that have to be displayed in the CSV file.
- Users can also upload two CSV files for performing the join operation.
- Used Django REST Framework for building APIs, Redux for state management and MySQL Connector in python for performing SQL queries.
- Also used Material-UI for designing the webpage.

### To start:

1. Clone the Repository

```bash
git clone https://github.com/ayaniitgoa/database-project.git
```

2. Start react-app

```bash
cd client
npm install
npm start
```

3. Start django backend

```bash
cd backend
python -m venv env
source env/Scripts/activate
pip install -r requirements.txt
```

4. Connect your MySQL database by making changes to the [settings.py](/backend/dbTransformer/dbTransformer/settings.py) file.

5. Start backend server

```bash
cd dbTransformer
python manage.py runserver
```

#### [MIT License](./LICENSE)
