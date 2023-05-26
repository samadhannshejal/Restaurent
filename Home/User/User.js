// Function to create the hotel card with food checkboxes
window.addEventListener('storage', (event) => {
    if (event.storageArea === localStorage) {
        location.reload();
    }
});
function createHotelCard(hotelData) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    const cardContent = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Hotel Name: ${hotelData.hotelName}</h5>
          <p class="card-text">Food Type: ${hotelData.foodType}</p>
          <div class="row">
            <div class="col">Food Name</div>
            <div class="col">Price</div>
          </div>
          ${createFoodColumns(hotelData.foods)}
        </div>
      </div>
    `;
    card.innerHTML = cardContent;
    return card;
}

// Function to create the food columns with checkboxes
function createFoodColumns(foods) {
    let columnsHTML = '';

    foods.forEach(food => {
        const foodName = food.food;
        const foodPrice = food.price;

        columnsHTML += `
        <div class="row">
          <div class="col">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" value="${foodName}" data-price="${foodPrice}">
              <label class="form-check-label">${foodName}</label>
            </div>
          </div>
          <div class="col">${foodPrice}</div>
        </div>
      `;
    });

    return columnsHTML;
}




// Event listener for the Create Order button
const filter = document.getElementsByClassName('main-filter')[0];
filter.style.display = 'none';
document.getElementById('createOrderButton').addEventListener('click', function () {
    const HotelFood = JSON.parse(localStorage.getItem('HotelFood')) || [];
    console.log(HotelFood)
    

    const hotelCardsContainer = document.getElementById('hotelCardsContainer');
    filter.style.display = 'block'
    // Clear the existing content
    hotelCardsContainer.innerHTML = '';

    // Create and append cards for each hotel data
    let selectFoodArray;

    HotelFood.forEach(hotelData => {
        const card = createHotelCard(hotelData);
        hotelCardsContainer.appendChild(card);;
        selectFoodArray=hotelData.selectFood;
    });
    console.log("selectFoodArray",selectFoodArray)


});
const sortByPriceButton = document.getElementById('filterByPriceButton');
let sortOrder = 'asc'; // Initial sorting order

sortByPriceButton.addEventListener('click', function () {
    const hotelCardsContainer = document.getElementById('hotelCardsContainer');
    const hotelCards = Array.from(hotelCardsContainer.children);

    // Toggle the sorting order
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    // Sort the hotel cards based on the price
    hotelCards.sort((cardA, cardB) => {
        const priceA = parseFloat(cardA.querySelector('.form-check-input').dataset.price);
        const priceB = parseFloat(cardB.querySelector('.form-check-input').dataset.price);
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Reorder the hotel cards in the container
    hotelCards.forEach(card => {
        hotelCardsContainer.appendChild(card);
    });

    // Update the button text based on the sorting order
    sortByPriceButton.innerText = sortOrder === 'asc' ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)';
});




// document.getElementById('foodTypeFilter').addEventListener('change', function () {
//     const selectedFoodType = this.value;
//     const hotelCardsContainer = document.getElementById('hotelCardsContainer');
//     const hotelCards = Array.from(hotelCardsContainer.children);

//     // Show all cards by default
//     hotelCards.forEach(card => {
//         console.log('card', card)
//         card.style.display = 'block';
//     });

//     // Filter cards based on selected food type
//     if (selectedFoodType) {
//         hotelCards.forEach(card => {
//             const foodType = card.querySelector('.card-text').textContent.split(':')[1].trim();
//             if (foodType !== selectedFoodType) {
//                 card.style.display = 'none';
               
//             }
            
//         });
//     }

// });

document.getElementById('foodTypeFilter').addEventListener('change', function () {
    const selectedFoodType = this.value;
    const hotelCardsContainer = document.getElementById('hotelCardsContainer');
    const hotelCards = Array.from(hotelCardsContainer.children);
    let hasMatchingData = false; // Flag to track if matching data is found

    // Show all cards by default
    hotelCards.forEach(card => {
        card.style.display = 'block';
    });

    // Filter cards based on selected food type
    if (selectedFoodType) {
        hotelCards.forEach(card => {
            const foodType = card.querySelector('.card-text').textContent.split(':')[1].trim();
            if (foodType !== selectedFoodType) {
                card.style.display = 'none';
            } else {
                hasMatchingData = true; // Matching data found
            }
        });
    }

    // Show or hide message based on matching data
    const noDataMessage = document.getElementById('noDataMessage');
    if (hasMatchingData) {
        noDataMessage.style.display = 'none';
    } else {
        noDataMessage.style.display = 'block';
    }
});


let selectedOrders = JSON.parse(localStorage.getItem('SelectedOrders')) || [];
let url = window.location.href;
const queryString = url.split("?")[1];
const searchParams = new URLSearchParams(queryString);
const currentUser = searchParams.get('username');

// Get the URL parameter value
const urlParams = new URLSearchParams(window.location.search);
const usernameParam = urlParams.get('username');

// Decode the URL parameter value
const decodedUsername = decodeURIComponent(usernameParam);

// Extract the username
const username = decodedUsername.split('@')[0];

console.log(username); // Output: sam


document.getElementById('placeOrderButton').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.form-check-input:checked');

    if (checkboxes.length === 0) {
        Swal.fire({
            title: 'No Selection',
            text: 'Please select at least one item before placing the order.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
        return; // Stop further execution
    }


    Swal.fire({
        title: 'Place Order',
        text: 'Are you sure you want to place the order?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, place order',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Proceed with placing the order
            // Rest of the code for processing the selected orders

            const selectedOrders = [];

            checkboxes.forEach(checkbox => {
                const food = checkbox.value;
                const price = parseFloat(checkbox.dataset.price);

                const order = {
                    food,
                    price
                };

                selectedOrders.push(order);
               
            });

            // Retrieve the existing orders from localStorage
            let storedOrders = JSON.parse(localStorage.getItem('SelectedOrders')) || [];

            // Generate a unique identifier for the new set of orders
            const orderId = Date.now().toString();
            console.log(Date.now())
            // Create a new entry for the orders with the unique identifier

            const newOrderEntry = {
                orderId,
                orders: selectedOrders,
                userName: currentUser,
                name: username
            };

            // Add the new order entry to the existing orders
            storedOrders.push(newOrderEntry);

            // Store the updated orders in localStorage
            localStorage.setItem('SelectedOrders', JSON.stringify(storedOrders));
            Swal.fire(
                'Sucesses!',
                'Your order is confirmed.',
                'success'
              )
            setTimeout(()=>{
                location.reload()
            },1000)
        }
    });

});
document.getElementById('viewOrderButton').addEventListener('click', function () {
    const storedOrders = JSON.parse(localStorage.getItem('SelectedOrders')) || [];

    const current = storedOrders.filter(i => i.userName == currentUser)

    if (current.length === 0) {
        alert('No orders found.');
        return; // Stop further execution
    }

    const orderContainer = document.getElementById('orderContainer');
    orderContainer.innerHTML = '';

    const row = document.createElement('div');
    row.classList.add('row', 'justify-content-center');

    current.forEach(orderEntry => {
        const orderId = orderEntry.orderId;
        const orders = orderEntry.orders;

        const cardCol = document.createElement('div');
        cardCol.classList.add('col-md-4', 'mb-3');

        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.textContent = `Order ID: ${orderId}`;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const foodList = document.createElement('ul');
        foodList.classList.add('list-group', 'list-group-flush');

        let totalPrice = 0; // Variable to store the total price

        orders.forEach(order => {
            const foodItem = document.createElement('li');
            foodItem.classList.add('list-group-item');
            foodItem.textContent = `${order.food} - $${order.price.toFixed(2)}`;

            totalPrice += order.price; // Add the price to the total

            foodList.appendChild(foodItem);
        });

        const totalPriceItem = document.createElement('li');
        totalPriceItem.classList.add('list-group-item', 'font-weight-bold');
        totalPriceItem.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

        foodList.appendChild(totalPriceItem);

        cardBody.appendChild(foodList);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardCol.appendChild(card);
        row.appendChild(cardCol);
    });

    orderContainer.appendChild(row);

    const orderSection = document.getElementById('orderSection');
    orderSection.style.display = 'block';
});


