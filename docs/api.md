# Robinson API
Robinson RESTful API

## Version: 0.1.0

**Contact information:**  
Ryan McCartney  
https://ryan.mccartney.info/robinson  
ryan@mccartney.info  

**License:** [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)

---
### /books

#### GET
##### Description

Get a list of all books

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Description

Add a new book

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/orphaned

#### GET
##### Description

Get a list of all books that don't have a shelf (Orphaned)

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/favourites

#### GET
##### Description

Get a list of all books that have been favourite'd

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/progress

#### GET
##### Description

Get a list of all books that have been started (have progress)

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/new

#### GET
##### Description

Get a list of all books in order of newest

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/case/{caseId}

#### GET
##### Description

Get a list of all books in a case

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| caseId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/shelf/{caseId}

#### GET
##### Description

Get a list of all books on a shelf

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelfId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/cover/{bookId}

#### GET
##### Description

Get a book cover by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /books/{bookId}

#### GET
##### Description

Get a book by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### PUT
##### Description

Update a book by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Description

Delete a book by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

---
### /cases

#### GET
##### Description

Get a list of all cases

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Description

Add a new case

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /cases/{casesId}

#### GET
##### Description

Get a case by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| casesId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Description

Delete a case by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| casesId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /cases/{caseId}

#### PUT
##### Description

Update a case by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| caseId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

---
### /libraries

#### GET
##### Description

Get a list of all libraries

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Description

Add a new library

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /libraries/{librariesId}

#### GET
##### Description

Get a library by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| librariesId | path | The library ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Description

Delete a library by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| librariesId | path | The library ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /libraries/{libraryId}

#### PUT
##### Description

Update a library by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| libraryId | path | The library ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

---
### /login

#### POST
##### Description

Creates a login session

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | formData | Username | No | string |
| password | formData | Password | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successfully logged in user. | object |

### /logout

#### POST
##### Description

Clears any session cookies to log a user out.

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successfully logged the user out. | object |

---
### /metadata/{isbn}

#### GET
##### Description

Get a list of all available metadata

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| isbn | path | ISBN of the book, should convert between any format | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Description

Get a list of all available metadata and create a book with it

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| isbn | path | ISBN of the book, should convert between any format | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /metadata/{bookId}

#### PUT
##### Description

Get a list of all available metadata and update existing records for an existing book

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | Book ID as a string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

---
### /search

#### GET
##### Description

Search books, shelves, libraries, cases

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successfully logged the user out. | object |

---
### /shelves

#### GET
##### Description

Get a list of all shelves

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Description

Add a new shelf

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /shelves/{shelvesId}

#### GET
##### Description

Get a shelf by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelvesId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Description

Delete a shelf by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelvesId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /shelves/{shelfId}

#### PUT
##### Description

Update a shelf by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelfId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

---
### /users

#### GET
##### Description

Get a list of all users

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
##### Description

Add a new user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /users/current

#### GET
##### Description

Get the current user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### PUT
##### Description

Update the current user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /users/{usersId}

#### GET
##### Description

Get a user by their ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| usersId | path | The user ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### DELETE
##### Description

Delete a user by their ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| usersId | path | The user ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /users/{userId}

#### PUT
##### Description

Update a user by their ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| userId | path | The user ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
