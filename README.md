### DB Transformer

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

4. Connect your MySQL database by making changes to the [settings.py](backend\dbTransformer\api_dbTransformer\serializer.py) file

5. Start backend server

```bash
cd dpTransformer
python manage.py runserver
```
