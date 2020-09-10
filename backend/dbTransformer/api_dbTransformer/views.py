from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import csv
import mysql.connector


count = 0
fileData = []


@api_view(['GET', 'POST'])
def preProcessCSV(request):
    if request.method == 'POST':
        for file in request.FILES.values():
            print(file)

        file = request.FILES['file']
        decoded_file = file.read().decode('latin-1').splitlines()
        reader = csv.DictReader(decoded_file)
        if not fileData:
            for row in reader:

                fileData.append(row)

            # print(count)
        else:
            fileData.clear()
            for row in reader:
                fileData.append(row)

        return Response(fileData)

    if request.method == 'GET':
        return Response(fileData)


all_databases = []
all_tables = []

userInfo = {}


@api_view(['GET', 'POST'])
def preProcessMySQL(request):
    if request.method == 'POST':
        # print(request.data)
        username = request.data['username']
        password = request.data['password']
        host = request.data['host']
        database = request.data['database']
        if not username or not host or not database:
            print('Connection not possible')
            return Response('Connection not possible')
        else:
            try:

                user_db = mysql.connector.Connect(
                    host=host, user=username, password=password, database=database, auth_plugin='mysql_native_password')
                print(user_db)
                userInfo['username'] = username
                userInfo['password'] = password
                userInfo['host'] = host
                userInfo['database'] = database

                print(userInfo)

                mycursor = user_db.cursor()
                mycursor.execute('Show databases')

                if all_databases or all_tables:
                    all_databases.clear()
                    all_tables.clear()
                for i in mycursor:
                    # print(i)
                    all_databases.append(i)
                test_dbs = all_databases.copy()
                count = 0
                for i in test_dbs:
                    mycursor.execute('use '+str(i[0]))
                    mycursor.execute('show tables')
                    test_table = []
                    for j in mycursor:
                        # print(j)

                        test_table.append(j)
                    all_tables.append(test_table)

                    all_databases[count] += tuple(test_table)
                    # print(all_databases)
                    count += 1

                # print(all_databases)

                return Response(all_databases)

            except:
                print('Not able to connect..')
                return Response('Not able to connect..')

    if request.method == 'GET':
        return Response(all_databases)


commonTables = [{"status": "False"}]

tablesChosen = []


@api_view(['GET', 'POST'])
def selectTables(request):

    if request.method == 'POST':
        if userInfo:
            username = userInfo['username']
            host = userInfo['host']
            password = userInfo['password']
            database = userInfo['database']
            if request.data:
                table1 = request.data['table1']
                table2 = request.data['table2']
                tablesChosen.append(table1)
                tablesChosen.append(table2)
                user_db = mysql.connector.Connect(
                    host=host, user=username, password=password, database=database, auth_plugin='mysql_native_password')
                mycursor = user_db.cursor()
                mycursor.execute(
                    "select A.COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS A join INFORMATION_SCHEMA.COLUMNS B on A.COLUMN_NAME = B.COLUMN_NAME where A.TABLE_NAME = '{}' and B.TABLE_NAME = '{}'".format(table1, table2))

                if commonTables:
                    commonTables.clear()
                count = 0
                for i in mycursor:
                    commonTables.append(
                        {"id": count, "table": i[0], "status": "True"})
                    # print(i)
                if not commonTables:
                    commonTables.append({"status": "False"})

                # print(commonTables)

        return Response(commonTables)
    else:

        return Response(commonTables)


joinT = []


@api_view(['GET', 'POST'])
def joinTables(request):
    if request.method == 'POST':
        commonCol = request.data['options']
        for i in commonCol:
            joinT.append(i['value'])
        # print(joinT)
        # print(userInfo)

        # for row in res:
        #     print(row)
        # for i in mycursor:
        #     print(i)

        # with open("new_file.csv", "w", newline='') as file:
        #     print(file)
        #     for row in res:
        #         csv.writer(file).writerow(row)

    return Response(commonCol)


chosenTablesCol = []


@api_view(['GET', 'POST'])
def chooseColumns(request):
    if request.method == 'GET':
        # print(tablesChosen)
        username = userInfo['username']
        host = userInfo['host']
        password = userInfo['password']
        database = userInfo['database']

        # print(joinT)
        user_db = mysql.connector.Connect(
            host=host, user=username, password=password, database=database, auth_plugin='mysql_native_password')
        mycursor = user_db.cursor()
        if chosenTablesCol:
            chosenTablesCol.clear()
        mycursor.execute(
            "select * from INFORMATION_SCHEMA.COLUMNS where table_name ='{}'".format(tablesChosen[0]))
        chosenTablesCol.append({'table': tablesChosen[0], 'columns': []})

        for i in mycursor:
            # print(i)

            chosenTablesCol[0]['columns'].append(
                {'value': i[3], 'label': i[3]})

        mycursor.execute(
            "select * from INFORMATION_SCHEMA.COLUMNS where table_name ='{}'".format(tablesChosen[1]))
        chosenTablesCol.append({'table': tablesChosen[1], 'columns': []})
        for i in mycursor:
            # print(i)
            chosenTablesCol[1]['columns'].append(
                {'value': i[3], 'label': i[3]})
        # print(chosenTablesCol)
        return Response(chosenTablesCol)

    if request.method == 'POST':
        # print(tablesChosen[0], request.data['selectedOption1'])

        colsExtract1 = request.data['selectedOption1']
        colsExtract2 = request.data['selectedOption2']

        colsToShow1 = []
        colsToShow2 = []

        sqlInner = ''

        for i in colsExtract1:
            colsToShow1.append(
                ' ' + str(tablesChosen[0]) + '.' + i['value'] + ',')

            sqlInner += str(tablesChosen[0]) + '.' + i['value'] + ','

        for i in colsExtract2:
            colsToShow2.append(
                " " + str(tablesChosen[1]) + '.' + i['value'] + ',')

            sqlInner += str(tablesChosen[1]) + '.' + i['value'] + ','

        # print(sqlInner)

        sqlInner = sqlInner[:-1]

        # print(sqlInner)
        # print(colsToShow1)
        # print(colsToShow2)
        # print()
        # print(tablesChosen[1], request.data['selectedOption2'])
        # print(chooseColumns[1], request.dat   a['selectedOptionTable2'])

        username = userInfo['username']
        host = userInfo['host']
        password = userInfo['password']
        database = userInfo['database']
        user_db = mysql.connector.Connect(
            host=host, user=username, password=password, database=database, auth_plugin='mysql_native_password')
        # print(commonTables)

        mycursor = user_db.cursor()
        mycursor.execute(
            'select {} from {} join {} on {}.{} = {}.{};'.format(sqlInner, tablesChosen[0], tablesChosen[1], tablesChosen[0], joinT[0], tablesChosen[1], joinT[0]))

        res = mycursor.fetchall()

        return Response(res)

    return Response('Working')
