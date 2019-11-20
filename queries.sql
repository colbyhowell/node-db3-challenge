-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT c.categoryname AS category,
    p.productname AS product
FROM product AS p
    JOIN category AS c
    ON p.categoryid = c.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT o.Id, s.CompanyName
FROM Shipper as s
    JOIN [Order] as o 
WHERE o.OrderDate < '2012-08-09'
    AND o.ShipVia = s.Id;

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT p.productname,
    o.quantity
FROM orderdetail AS o
    JOIN
    product AS p 
WHERE o.orderid = "10251"
GROUP BY o.quantity
ORDER BY p.productname;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT o.id,
    c.companyname,
    e.lastname
FROM customer AS c
    JOIN
    [Order] AS o ON o.customerid = c.id
    JOIN
    employee AS e ON o.employeeid = e.id;