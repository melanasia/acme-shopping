# Grace Shopper

Link to Grace Shopper starting repo:

- https://github.com/ericpkatz/acme-shopping

## Base Experience

- [sync tables and seed data](https://github.com/melanasia/acme-shopping/tree/main/db/seedData)

### As a logged in user, I want to be able to:

- access a deployed version of the website so I can browse and purchase products.
- [view all available products so I can pick from a variety.](https://github.com/melanasia/acme-shopping/tree/main/db/seedData)
- [view a single product so I can see more details.](https://github.com/melanasia/acme-shopping/blob/main/src/components/Product.js)
- [add a product to my cart.](https://github.com/melanasia/acme-shopping/blob/main/src/components/ProductModal.js#L70)
  - [Redux action](https://github.com/melanasia/acme-shopping/blob/main/src/store/cart.js#L17)
  - [Express route](https://github.com/melanasia/acme-shopping/blob/main/routes/orders.js#L68)
- edit my cart if I change my mind:
  - [change the quantity of a product in my cart.](https://github.com/melanasia/acme-shopping/blob/main/src/store/cart.js#L91)
  - [remove a product in my cart.](https://github.com/melanasia/acme-shopping/blob/main/src/components/CartModal.js#L50)
  - [_No one else should be able to edit my cart except me._](https://github.com/melanasia/acme-shopping/blob/main/routes/orders.js#L70)
- ["checkout" the items in my cart so I can purchase my desired goods.](https://github.com/melanasia/acme-shopping/blob/main/src/components/Checkout.js#L213)
  - [Redux action](https://github.com/melanasia/acme-shopping/blob/main/src/store/cart.js#L201)
  - [Express route](https://github.com/melanasia/acme-shopping/blob/main/src/store/cart.js#L201)

### As a guest I should be able to create an account:

- create an account so I can have a logged-in experience.(https://github.com/melanasia/acme-shopping/blob/main/src/components/SignUpForm.js#L42)
  - [Redux action](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/src/store/session.js#L107)
  - [Express route](https://github.com/melanasia/acme-shopping/blob/main/routes/users.js#L8)

### As a logged-in customer, I want to be able to: (refer to lines 19-22)

- have a persistent cart so I can revisit and pick up where I left off.
  - _Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart._
  - _No one else should be able to edit my cart except me._

### As a guest I should be able to add items in my cart which persist in local storage:

- [upon login, the cart in local storage should be persisted to a database.](https://github.com/melanasia/acme-shopping/blob/main/src/store/cart.js#L190)

### [As an administrator, I want to be able to:](https://github.com/melanasia/acme-shopping/blob/main/routes/middleware.js)

- have full rights to make backend requests to add, edit, and remove products.
  - _No one else should have access._
- view user information.
  - _No one else should have access._

### As a logged-in customer, I want to be able to:

- [see my order history so I can remember my previously purchased items.](https://github.com/melanasia/acme-shopping/blob/main/src/components/OrdersHistory.js)
  - [Redux action](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/src/store/orders.js#L12)
  - [Express route](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/routes/orders.js#L76)
 
- [view and edit my user profile so I can update my information when necessary.](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/src/components/Account.js)
- [Redux action](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/src/store/session.js#L74)
- [Express route](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/routes/sessions.js#L24)

## Possible Additional Features

- allow users to upload an avatar which will display in login *****
- 
- allow customers to have wishlist for products they might buy in the future **
- 
- allow customers to rank / review products which they have purchased (and show reviews with those products) *****

- [ability of customers to add multiple shipping addresses](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/src/components/AddressForm.js)
    - [Redux store](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/src/store/addresses.js#L24)
    - [Express route](https://github.com/melanasia/acme-shopping/blob/39dfa9dc16fcc905775414108ea1969610219384/routes/addresses.js)
   
- ability to pay for purchases using stripe *****
- 
- ability of an administrator to setup coupon codes which offer discounts to customers on orders **

- email confirmations for customers orders ***** (aligned with Stripe integration - third party)
- real time notification to end users for the best selling product
- allow administrators to view data graphically ** (third party)
  - this might be a geographical map with markers for customer addresses
  - this might be sales data for some time period
