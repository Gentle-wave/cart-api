```markdown
# E-Commerce Backend API

A Node.js/Express TypeScript backend with SQLite for product and cart management.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## API Documentation

### Base URL
`http://localhost:3000`

### Endpoints

#### 1. Products
- **GET /products**  
  Get all products  
  Example:
  ```bash
  curl http://localhost:3000/products
  ```

#### 2. Cart
- **POST /cart**  
  Add product to cart  
  Required body: { "productId": number, "quantity": number }  
  Example:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"productId": 1, "quantity": 2}' http://localhost:3000/cart
  ```

- **DELETE /cart/:id**  
  Remove item from cart  
  Example:
  ```bash
  curl -X DELETE http://localhost:3000/cart/1
  ```

- **GET /cart**  
  Get all cart items with product details  
  Example:
  ```bash
  curl http://localhost:3000/cart
  ```

- **POST /cart/checkout**  
  Clear cart items (simulate checkout)  
  Example:
  ```bash
  curl -X POST http://localhost:3000/cart/checkout
  ```

## Testing with Postman

1. Import the Postman collection:
   - Download [Postman Collection](./E-Commerce-API.postman_collection.json)
   - Import into Postman

2. Environment variables:
   - Create an environment variable `base_url` with value `http://localhost:3000`

3. Test endpoints using the provided collection

## Testing with cURL

### Product Endpoints
```bash
# Get all products
curl http://localhost:3000/products
```

### Cart Endpoints
```bash
# Add to cart
curl -X POST -H "Content-Type: application/json" -d '{"productId": 1, "quantity": 2}' http://localhost:3000/cart

# Get cart items
curl http://localhost:3000/cart

# Remove item from cart
curl -X DELETE http://localhost:3000/cart/1

# Checkout
curl -X POST http://localhost:3000/cart/checkout
```

## Database Structure
- **In-memory SQLite** (resets when server restarts)
- **Tables**:
  - `products` (pre-seeded with 3 sample products)
  - `cart_items` (stores cart entries with product references)

## Notes
- No authentication required
- All prices are in USD
- Database resets when server restarts
- Error responses follow format: `{ error: string }`
- Success responses include resource data

## License
[MIT](LICENSE)
```

To use this README:

1. Save it as `README.md` in your project root
2. Update the repository URL in the "Installation" section
3. Optionally add a Postman collection export (if you want to include specific examples)
4. Modify the license information if needed

The README includes:
- Clear setup instructions
- API endpoint documentation
- Testing instructions for both Postman and cURL
- Database information
- Error handling documentation
- License information

For Postman testing, you can create a collection with the endpoints and export it as a JSON file to include with your project.