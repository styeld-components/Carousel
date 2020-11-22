## Server API

### Get place info
  * GET `/api/places/:zipcode/`

**Path Parameters:**

**Success Status Code:** `200`

**Request Query: Expects JSON with the following keys.**

```json
    {
      "numberBeds": "Number",
      "price": "Number"
    }

```

**Returns:** JSON

```json
    [{
      "placeId": "Number",
      "title": "String",
      "zipcode": "Number",
      "placeType": "String",
      "numberBeds": "Number",
      "price": "Number",
      "rating": "Number",
      "totalReviews": "Number",
      "picUrl": "String",
      "placeUrl": "String",
      "SuperHost": "Boolean",
      "HostPlus": "Boolean"
    },
    ...
    ]
```

### Get favorite lists
  * GET `/api/users/:userId`

**Path Parameters:**
  * `userId` user id

**Success Status Code:** `201`

**Returns:** JSON

```json
    {
      "userId": "Number",
      "username": "String",
      "favoriteLists": [{
        "listId": "Number",
        "listName": "String",
        "places": [
          {"placeId": "Number"},
          ...
        ],
        ...
      }]
    }
```

### Add new favorites list
  * POST `/api/users/:userId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "listName": "String"
    }
```

### Add listing to favorites
  * POST `/api/users/:userId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "listId": "Number",
      "placeId": "Number"
    }
```


### Update list name
  * PATCH `/api/users/:userId`

**Path Parameters:**
  * `userId` listing id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
  {
    "listId": "Number",
    "listName": "String"
  }
```

### Delete place from favorites list
  * DELETE `/api/users/:userId`

**Path Parameters:**
  * `userId` user id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys

```json
  {
    "listId": "Number",
    "placeId": "Number"
  }
```
