from django.shortcuts import render
from .serializer import CustomerSerializer, OrderSerializer
from .models import Customer, Order
from rest_framework.response import Response
from rest_framework.decorators import api_view
import csv
import mysql.connector


@api_view(['GET'])
def showCustomer(request):
    if request.method == 'GET':
        results = Customer.objects.all()
        serialize = CustomerSerializer(results, many=True)
        return Response(serialize.data)


@api_view(['GET'])
def showOrder(request):
    if request.method == 'GET':
        results = Order.objects.all()
        serialize = OrderSerializer(results, many=True)
        return Response(serialize.data)


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

            print(count)
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
        print(request.data)
        username = request.data['username']
        password = request.data['password']
        host = request.data['host']
        if not username or not host:
            print('Connection not possible')
            return Response('Connection not possible')
        else:
            try:

                user_db = mysql.connector.Connect(
                    host=host, user=username, password=password, database='busigence', auth_plugin='mysql_native_password')
                print(user_db)
                userInfo['username'] = username
                userInfo['password'] = password
                userInfo['host'] = host

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
            if request.data:
                table1 = request.data['table1']
                table2 = request.data['table2']
                tablesChosen.append(table1)
                tablesChosen.append(table2)
                user_db = mysql.connector.Connect(
                    host=host, user=username, password=password, database='busigence', auth_plugin='mysql_native_password')
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

                print(commonTables)

        return Response(commonTables)
    else:

        return Response(commonTables)


chosenTablesCol = []


@api_view(['GET', 'POST'])
def chooseColumns(request):
    if request.method == 'GET':
        print(tablesChosen)
        username = userInfo['username']
        host = userInfo['host']
        password = userInfo['password']
        user_db = mysql.connector.Connect(
            host=host, user=username, password=password, database='busigence', auth_plugin='mysql_native_password')
        mycursor = user_db.cursor()
        mycursor.execute(
            "select * from INFORMATION_SCHEMA.COLUMNS where table_name ='{}'".format(tablesChosen[0]))
        chosenTablesCol.append({1: []})
        for i in mycursor:
            # print(i)
            chosenTablesCol[0][1].append(i[3])

        mycursor.execute(
            "select * from INFORMATION_SCHEMA.COLUMNS where table_name ='{}'".format(tablesChosen[1]))
        chosenTablesCol.append({2: []})
        for i in mycursor:
            # print(i)
            chosenTablesCol[1][2].append(i[3])
        print(chosenTablesCol)
    return Response(chosenTablesCol)


@api_view(['GET', 'POST'])
def joinTables(request):
    if request.method == 'POST':
        commonCol = request.data['options']
        joinT = []
        for i in commonCol:
            joinT.append(i['value'])
        print(joinT)
        print(userInfo)
        username = userInfo['username']
        host = userInfo['host']
        password = userInfo['password']
        user_db = mysql.connector.Connect(
            host=host, user=username, password=password, database='busigence', auth_plugin='mysql_native_password')
        print(commonTables)

        mycursor = user_db.cursor()
        mycursor.execute(
            'select customers.CustomerID, customers.CompanyName, customers.ContactName, customers.ContactTitle, orders.EmployeeID, orders.OrderDate, orders.RequiredDate, orders.ShipVia, orders.Freight from customers join orders on customers.CustomerID = orders.CustomerID;')

        res = mycursor.fetchall()

        return Response(res)

        # for row in res:
        #     print(row)
        # for i in mycursor:
        #     print(i)

        # with open("new_file.csv", "w", newline='') as file:
        #     print(file)
        #     for row in res:
        #         csv.writer(file).writerow(row)

    return Response(commonCol)
