---
layout: page
title: API
nav_order: 5
has_children: false
---

# Robinson API
Robinson RESTful API

## Version: 0.1.0

**Contact information:**  
Ryan McCartney  
https://ryan.mccartney.info/robinson  
hello@mccartney.info  

**License:** [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)

---
### /books

#### GET
##### Summary

Get a list of all books

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### POST
##### Summary

Add a new book

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/orphaned

#### GET
##### Summary

Get a list of all books that don't have a shelf (Orphaned)

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/favourites

#### GET
##### Summary

Get a list of all books that have been favourite'd

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/progress

#### GET
##### Summary

Get a list of all books that have been started (have progress)

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/new

#### GET
##### Summary

Get a list of all books in order of newest

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/case/{caseId}

#### GET
##### Summary

Get a list of all books in a case

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| caseId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/shelf/{shelfId}

#### GET
##### Summary

Get a list of all books on a shelf

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelfId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/cover/{bookId}

#### GET
##### Summary

Get a book cover by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /books/{bookId}

#### GET
##### Summary

Get a book by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### PUT
##### Summary

Update a book by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### DELETE
##### Summary

Delete a book by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| bookId | path | The book ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

---
### /cases

#### GET
##### Summary

Get a list of all cases

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### POST
##### Summary

Add a new case

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /cases/{caseId}

#### GET
##### Summary

Get a case by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| caseId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### PUT
##### Summary

Update a case by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| caseId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### DELETE
##### Summary

Delete a case by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| caseId | path | The case ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

---
### /libraries

#### GET
##### Summary

Get a list of all libraries

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### POST
##### Summary

Add a new library

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /libraries/{libraryId}

#### GET
##### Summary

Get a library by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| libraryId | path | The library ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### PUT
##### Summary

Update a library by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| libraryId | path | The library ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### DELETE
##### Summary

Delete a library by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| libraryId | path | The library ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

---
### /login

#### POST
##### Summary

Creates a login session

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /logout

#### POST
##### Summary

Clears any session cookies to log a user out.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

---
### /metadata/{isbn}

#### GET
##### Summary

Get a list of all available metadata

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| isbn | path | ISBN of the book, should convert between any format | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### PUT
##### Summary

Get a list of all available metadata and update existing records for an existing book

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| isbn | path | ISBN of the book, should convert between any format | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### POST
##### Summary

Get a list of all available metadata and create a book with it

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| isbn | path | ISBN of the book, should convert between any format | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

---
### /search

#### GET
##### Summary

Search books, shelves, libraries, cases

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| query | query | The query string to make a search against | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

---
### /shelves

#### GET
##### Summary

Get a list of all shelves

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### POST
##### Summary

Add a new shelf

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /shelves/{shelfId}

#### GET
##### Summary

Get a shelf by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelfId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### PUT
##### Summary

Update a shelf by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelfId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### DELETE
##### Summary

Delete a shelf by it's ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| shelfId | path | The shelf ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

---
### /users

#### GET
##### Summary

Get a list of all users

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### POST
##### Summary

Add a new user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /users/current

#### GET
##### Summary

Get the current user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### PUT
##### Summary

Update the current user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

### /users/{userId}

#### GET
##### Summary

Get a user by their ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| userId | path | The user ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### PUT
##### Summary

Update a user by their ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| userId | path | The user ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |

#### DELETE
##### Summary

Delete a user by their ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| userId | path | The user ID string | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 401 | Unauthorized |
| 403 | Forbidden |
| 405 | Incorrect request data |
| 500 | Error |
