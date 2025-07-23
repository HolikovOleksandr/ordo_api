## Employee API

All endpoints start with `/api/employee`

- **POST /api/employee** — create a new employee  
  - Pass employee data in the body (first name, last name, phone, qualification)  
  - Returns the created object or an error  

- **GET /api/employee** — get a list of all employees  

- **GET /api/employee/:id** — get an employee by ID (UUID)  
  - Returns 404 if not found  

- **PUT /api/employee/:id** — update an employee by ID  
  - Pass fields to update in the body  
  - Returns 404 if not found  

- **DELETE /api/employee/:id** — delete an employee by ID  
  - Returns 404 if not found  
  - Successful deletion returns 204 (no body)  

---

This is a straightforward CRUD API. If you have questions, feel free to ask.
