# Grace Shopper

Link to Grace Shopper starting repo:

- https://github.com/ericpkatz/acme-shopping

## Base Experience

- sync tables and seed data

### As a logged in user, I want to be able to:

- access a deployed version of the website so I can browse and purchase products.
- view all available products so I can pick from a variety.
- view a single product so I can see more details.
- add a product to my cart.
- edit my cart if I change my mind:
  - change the quantity of a product in my cart.
  - remove a product in my cart.
  - _No one else should be able to edit my cart except me._
- "checkout" the items in my cart so I can purchase my desired goods.

### As a guest I should be able to create an account:

- create an account so I can have a logged-in experience.

### As a logged-in customer, I want to be able to:

- have a persistent cart so I can revisit and pick up where I left off.
  - _Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart._
  - _No one else should be able to edit my cart except me._

### As a guest I should be able to add items in my cart which persist in local storage:

- upon login, the cart in local storage should be persisted to a database.

### As an administrator, I want to be able to:

- have full rights to make backend requests to add, edit, and remove products.
  - _No one else should have access._
- view user information.
  - _No one else should have access._

### As a logged-in customer, I want to be able to:

- see my order history so I can remember my previously purchased items.
- view and edit my user profile so I can update my information when necessary.

## Possible Additional Features

- allow users to upload an avatar which will display in login
- allow customers to have wishlist for products they might buy in the future
- allow customers to rank / review products which they have purchased (and show reviews with those products)
- ability of customers to add multiple shipping addresses
- ability to pay for purchases using stripe
- ability of an administrator to setup coupon codes which offer discounts to customers on orders
- email confirmations for customers orders
- real time notification to end users for the best selling product
- allow administrators to view data graphically
  - this might be a geographical map with markers for customer addresses
  - this might be sales data for some time period
