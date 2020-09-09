import mysql.connector

mydb = mysql.connector.connect(
    host='localhost', user='root', password='root123', database='busigence', auth_plugin='mysql_native_password')
print(mydb)

mycursor = mydb.cursor()
mycursor.execute('Show databases')

for i in mycursor:
    print(i)
