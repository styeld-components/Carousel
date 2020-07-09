## Server API

### Get user info
  * GET `/api/users`

**Path Parameters:**

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "name": "String",
      "likeplace": [{
        "name": "String",
        "list": "String",
        "like": "Boolean"
      }]
    }
```

### Add listing to user favorites
  * POST `/api/users`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "likeplace": [{
        "name": "String",
        "list": "String",
        "like": "Boolean"
      }]
    }
```


### Update listing user favorites
  * PATCH `/api/users/:placeId`

**Path Parameters:**
  * `placeId` listing id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "likeplace": [{
        "name": "String",
        "list": "String",
        "like": "Boolean"
      }]
    }
```

### Delete user favorite
  * DELETE `/api/users/:placeId`

**Path Parameters:**
  * `placeId` listing id

**Success Status Code:** `204`