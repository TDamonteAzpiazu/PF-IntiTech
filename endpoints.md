# ENDPOINTS

## users

### login/register google

GET:
http://localhost:3000/auth/googleLogin

### register

POST:
http://localhost:3000/auth/register

### login

POST:
http://localhost:3000/auth/login

### get all users

GET:
http://localhost:3000/users

### get by id users

GET:
http://localhost:3000/users/:id

### actualizar user

PUT:
http://localhost:3000/users/:id

- El put va a tener varias funcionalidades.

## products

### agregar img cloudinary

POST:
http://localhost:3000/files/uploadPanelImage/:id

### get all products

GET:
http://localhost:3000/panelForSale

### get product by id

GET:
http://localhost:3000/panelForSale/:id

### create product

POST:
http://localhost:3000/panelForSale

### actualizar producto

PUT:
http://localhost:3000/panelForSale/:id

### eliminar producto

DELETE:
http://localhost:3000/panelForSale/:id
