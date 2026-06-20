---
layout: page
title: Google Books
parent: Installation
nav_order: 3
---

# Google Books

Robinson uses the Google Books API as one of it's source for book metadata. Retrieving data such as titles, authors, descriptions, total page number, and cover images. While some requests can be made without an API key, using a key is recommended for adding large numbers of books.

## Prerequisites

* A Google account
* Access to Google Cloud Console

## Step 1: Create or Select a Google Cloud Project

1. Go to the Google Cloud Console.
2. Sign in with your Google account.
3. Create a new project or select an existing project from the project selector.

## Step 2: Enable the Books API

1. In the Cloud Console, open **APIs & Services → Library**.
2. Search for **Books API**.
3. Select **Books API** from the results.
4. Click **Enable**.

## Step 3: Create an API Key

1. Navigate to **APIs & Services → Credentials**.
2. Click **Create Credentials**.
3. Select **API Key**.
4. Give your key a memorable name.
5. Under **Select API Restrictions**, select Books API
6. Google will generate a new API key.
7. Copy the key and add it to the environment variable `GOOGLE_BOOKS_API_KEY`
8. Restart your application stack.

## Step 4: Restrict the API Key (Optional, but suggested)

To improve securityif you're exposing robinson on the internet through a reverse proxy

1. Open the newly created API key.
2. Under **Application restrictions**, choose a website restriction, add your instance address here.
3. Save your changes.


## Additional Resources

- Google Books API Documentation: [https://developers.google.com/books/docs/v1/using](https://developers.google.com/books/docs/v1/using)
- Google Cloud Console: [https://console.cloud.google.com/](https://console.cloud.google.com/) 
- API Keys Documentation: [https://cloud.google.com/docs/authentication/api-keys](https://cloud.google.com/docs/authentication/api-keys) 
- APIs & Services Dashboard:[https://console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard) 