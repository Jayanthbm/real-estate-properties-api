# Real Estate Properties API

This is a simple Express application to manage real estate properties using an SQLite database.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Git installed on your machine.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/real-estate-properties-api.git
   cd real-estate-properties-api
   ```

2. **Install the dependencies:**

   ```sh
    npm install
   ```

3. **Run the server:**

   ```sh
   npm start
   ```

4. **Verify the database:**
   Ensure that the real_estate.db file is created in the root directory. This file will be created automatically when you start the server for the first time.

### API Endpoints

**1.Add a New Property**

**_Endpoint:_** :POST /properties

Sample Request:

```sh

curl -X POST http://localhost:3000/properties \
-H "Content-Type: application/json" \
-d '{
  "address": "123 Main St, City",
  "houseName": "Beautiful Villa",
  "rooms": 4,
  "bathrooms": 3,
  "squareFeet": 2500,
  "price": "$750,000",
  "customerImage": "https://example.com/customer-image.jpg",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  "landKunte": "30x40",
  "propertyType": "building",
  "buildingType": "villa"
}'
```

**2. List All Properties**
**_Endpoint:_** :GET /properties

Sample Request:

```sh
curl -X GET http://localhost:3000/properties
```

**3.Update a Property**

**_Endpoint:_** :PUT /properties/:id

Sample Request:

```sh
sh
curl -X PUT http://localhost:3000/properties/PROPERTY_ID \
-H "Content-Type: application/json" \
-d '{
"address": "123 Main St, City",
"houseName": "Updated Villa",
"rooms": 5,
"bathrooms": 4,
"squareFeet": 2700,
"price": "$800,000",
"customerImage": "https://example.com/updated-customer-image.jpg",
"images": [
"https://example.com/updated-image1.jpg",
"https://example.com/updated-image2.jpg",
"https://example.com/updated-image3.jpg"
],
"landKunte": "40x50",
"propertyType": "building",
"buildingType": "villa"
}'
```

**4.Delete a Property**

**_Endpoint:_**:DELETE /properties/:id

Sample Request:

```sh
curl -X DELETE http://localhost:3000/properties/PROPERTY_ID
```

**Notes**
Replace PROPERTY_ID with the actual ID of the property you want to update or delete.
The server should be running on http://localhost:3000 for the curl commands to work.
Ensure that the real_estate.db file is present in the root directory after starting the server for the first time. This file will be created automatically by the application.
