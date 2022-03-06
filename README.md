# METCS602_Project
![BU MET!](https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/70685441_2848187218541888_5583214686003789824_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=973b4a&_nc_ohc=BwDf3gHf8ukAX8qFZzF&_nc_oc=AQm021PAFiF9x3VmH1OPpS8Eid79jYIE7jtuRt4fLwljACl9Sc3m9hsKvK7jSRw_NJk&_nc_ht=scontent-hkt1-2.xx&oh=860551b869193d0d896ae464ee060cf5&oe=60DA9D26)

Institution: [Boston University's Metropolitan College](https://www.bu.edu/met/)<br>
# METCS602 Project - Online Bakery store (Sweet Bakery)

## Project Description:
In my project, I build an online bakery store called Sweet Bakery using node.js, express, javascript and mongodb. There are four categories of bakeries for the customer to choose namely Pastries, Cookies, Pies and Cakes. As a customer, you can search the products by name or type or by price range. The customer can add the products to the cart and then click the basket image to access the shopping cart, the customer can change the quantity of the item, the total price of the item and the total price of the order will be updated instantly and the application has capability to check the stock availability when checkout. If this is the case customer will be informed to either change the quantity or remove the item; otherwise the customer will be informed the order is completed. The customer can check the orders by clicking the order history image on the right top corner. The customer will be informed to login for checkout.

Admin has to login to access the admin menu. After login it will redirect to the product list page.  At product list page, Admin can add the product, edit and delete the product. Admin can go to the customer list page which will list all the customers and by clicking the customer id will take the admin to the customer order list page which will list all the orders for this customer. At this page, admin can edit or delete the orders of the customer. Admin can update the customer order by changing the quantity of the items or remove the items, total quantity, total price for each item and total price for the order will be updated, the application has capability to check the stock availability when update. 



<br>

## Requirement
- npm install 
- has to set up mongodb, create the data/db for mongodb, create admin account and user account for mongdb.
- node models/initDB.js to initialize the database.
- node app.js to run the application.


## Important information
- The website has been tested with Chrome and Firefox.
- Note : If Admin edit the order without changing the quantity of the item/items or remove item/items, the admin has to click the 'Cancel' button to go back to the customer list. DON'T hit the 'Update' button without changing the quantity or remove item.

- For testing, Admin can use tiramisu.png for adding the product.
- For testing the application to check the stock of the product against the shopping cart items quantity before checkout the order or update the order, tester can use Donut to do the testing as Donut only has 3 pieces available.






