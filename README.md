# Webtech Warehouse Project

### About

<hr>
This project has a Spring Boot Rest API called warehousebackend and a REACTJS application called warehouse_frontend.
The project is to enable clients find warehouses with products they need and to also enable warehouse owners create offers
that are good for their customers.

### Guides

<hr>

- [Click here to view the project plan](https://github.com/williamNshuti/webtech_warehouse.git/blob/main/projectPlan.pdf)

- [Click here to view the project requirements](https://github.com/williamNshuti/webtech_warehouse.git/blob/main/warehouseRequirements.pdf)

- [Click here to view the User Documentation](https://github.com/williamNshuti/webtech_warehouse.git/blob/main/userdocumentation.pdf)

- [Click here to view the database schema](https://github.com/williamNshuti/webtech_warehouse.git/blob/main/warehousems_ERD.pdf)

### Applications

<hr>
<b> warehousebackend</b>

Warehouse-backend application exposes a REST API to manage warehouses.
Its secured endpoints can be just accessed if an access token (JWT) is provided

warehousebackend stores its data in a Postgresql database.

<b>warehouse_frontend</b>

warehouse_frontend is where users can find and save warehouses and warehouse owners can create offers. In order to access the application, a user/warehouse-owner must login using their username and password. All requests coming from the warehouse_frontend to the secured endpoints in the warehousebackend have an access token (JWT) that is generated when a login happens.

warehouse_front uses semantic UI React as frontend library.

### Using this application

<b>Prerequisites</b>

<hr>
Java 17+
node

<b>Setup</b>

<hr></hr>

Clone the repository

<pre>https://github.com/williamNshuti/webtech_warehouse.git</pre>

Navigate to the newly created folder:

<pre> cd webtech_warehouse</pre>

<b>Frontend -</b>

Install NodeJS.v.18 + / npm v.8.3.0

Go to the frontend subfolder

<pre>cd warehouse_frontend</pre>

Install the modules

<pre>npm i</pre>

Start the application on the localhost;

<pre>npm start</pre>

<b>Backend -</b>

Install JDK 20

Go to the backend subfolder

<pre>cd warehousebackend</pre>

Run project

AUTHOR

<hr>

[William NSHUTI](https://github.com/williamNshuti)
