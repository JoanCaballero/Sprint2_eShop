// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cartList = products.map(product => ({
  ...product,             
  quantity: 0             
}));

const cart = [];

const total = 0;

// Exercise 1
const buy = (id) => {
    const product = cartList.find(p => p.id === id);
    if (!product) return;

    const productInCart = cart.find(p => p.id === id);
    if (productInCart) {
        productInCart.quantity++;
    } else {
        product.quantity++;
        cart.push(product); 
    }

    applyPromotionsCart();
    printCart();
    updateCartCount();
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
}

// Exercise 2
const cleanCart = () =>  {
    for(let product of cart){
        product.quantity = 0;
    }
    cart.splice(0, cart.length);
    updateCartCount();
    printCart();
}

// Exercise 3
const calculateTotal = () =>  {
    let total = 0;
    for(let product of cartList){
        if (product.subtotalWithDiscount) {
            total += product.subtotalWithDiscount;
        }else{
            total += product.price * product.quantity;
        }
    }
    return total;
    // Calculate total price of the cart using the "cartList" array
}

// Exercise 4
const applyPromotionsCart = () =>  {
    for (let product of cartList) {
        const subtotal = product.price * product.quantity;
        if (product.offer && product.quantity >= product.offer.number) {
            product.subtotalWithDiscount = subtotal * (1 - product.offer.percent / 100);
        } else {
            delete product.subtotalWithDiscount;
        }
    }
    // Apply promotions to each item in the array "cart"
}

// Exercise 5
const printCart = () => {
    const cartTableBody = document.getElementById("cart_list");
    const totalPriceElement = document.getElementById("total_price");
    cartTableBody.innerHTML = "";

    if (cart.length === 0) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted">Your cart is empty 🛒</td>
            </tr>`;
        totalPriceElement.textContent = "0";
        return;
    }

    let total = 0;
    for (let product of cart) {
        const subtotal = product.price * product.quantity;
        const subtotalWithDiscount = product.subtotalWithDiscount ?? subtotal;
        total += subtotalWithDiscount;
        cartTableBody.innerHTML += `
            <tr>
                <th scope="row">${product.name}</th>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>$${subtotalWithDiscount.toFixed(2)}</td>
            </tr>
        `;
    } 
    totalPriceElement.textContent = total.toFixed(2);
    // Fill the shopping cart modal manipulating the shopping cart dom
}

const updateCartCount = () => {
  const countElement = document.getElementById("count_product");
  const totalQuantity = cart.reduce((sum, p) => sum + p.quantity, 0);
  if (countElement) countElement.textContent = totalQuantity;
};

document.addEventListener("DOMContentLoaded", () => {
    // Botons Add to Cart
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.productId);
            buy(id);
        });
    });
    // Botó Clean Cart
    const cleanBtn = document.getElementById("clean-cart");
    if (cleanBtn) {
        cleanBtn.addEventListener("click", () => cleanCart());
    }
});


// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {
    const productInCart = cart.find(p => p.id === id);
    if (!productInCart) return; 

    if (productInCart.quantity > 1) {
        productInCart.quantity--;
    } else {
        const index = cart.findIndex(p => p.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
        }
    }
    applyPromotionsCart();
    updateCartCount();
    printCart();
}

const open_modal = () =>  {
    applyPromotionsCart();
    printCart();
    updateCartCount();
}