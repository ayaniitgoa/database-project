from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/customers', views.showCustomer, name='showCustomers'),
    path('api/orders', views.showOrder, name='showOrders'),
    path('api/preprocess/csv', views.preProcessCSV, name='preProcessCSV'),
    path('api/preprocess/mysql', views.preProcessMySQL, name='preProcessMySQL'),
    path('api/preprocess/selecttables', views.selectTables, name='selectTables'),
    path('api/preprocess/jointables', views.joinTables, name='joinTables'),
    path('api/preprocess/choosecolumns',
         views.chooseColumns, name='chooseColumns')
]
