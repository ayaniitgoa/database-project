from django.db import models

# Create your models here.


class Customer(models.Model):
    CustomerID = models.CharField(max_length=50)
    CompanyName = models.CharField(max_length=50)
    ContactName = models.CharField(max_length=50)
    ContactTitle = models.CharField(max_length=50)

    class Meta:
        db_table = 'Customers'


class Order(models.Model):
    OrderID = models.CharField(max_length=50)
    CustomerID = models.CharField(max_length=50)
    EmployeeID = models.IntegerField(10)
    OrderDate = models.CharField(max_length=50)
    RequiredDate = models.CharField(max_length=50)
    ShipVia = models.CharField(max_length=50)
    Freight = models.FloatField(50)

    class Meta:
        db_table = 'Orders'
