const hotelName = document.getElementById('hotelName').value;


const foodTypes = [
  {
    type: "Chinese",
    foods: ["Dumplings", "Fried Rice", "Sweet and Sour Chicken"]
  },
  {
    type: "South Indian",
    foods: ["Dosa", "Idli", "Sambhar"]
  },
  {
    type: "Punjabi",
    foods: ["Butter Chicken", "Naan", "Sarson da Saag"]
  }
];
const HotelFood = JSON.parse(localStorage.getItem('HotelFood')) || [];

// document.getElementById('foodTypeSelect').addEventListener('change', function () {
//   const selectedOption = this.options[this.selectedIndex];
//   const selectedFoodType = selectedOption.text;

//   foodItemsContainer.innerHTML = '';

//   if (selectedFoodType) {
//     const selectedFoodTypeObj = foodTypes.find(foodType => foodType.type === selectedFoodType);
//     console.log("selectedFoodTypeObj,", selectedFoodTypeObj);
//     console.log(selectedFoodTypeObj.foods)
//     if (selectedFoodTypeObj) {

//       selectedFoodTypeObj.foods.forEach(food => {
//         const checkboxDiv = document.createElement('div');
//         checkboxDiv.classList.add('form-check', 'selectedInput', 'mb-3');

//         const inputBox = document.createElement('input');
//         inputBox.type = 'number';
//         inputBox.classList.add('form-control', 'input-number', 'w-50', 'ms-5');
//         inputBox.placeholder = 'Enter a price';

//         const checkboxInput = document.createElement('input');
//         checkboxInput.type = 'checkbox';
//         checkboxInput.classList.add('form-check-input', 'me-3');
//         checkboxInput.value = food;

//         const checkboxLabel = document.createElement('label');
//         checkboxLabel.classList.add('form-check-label');
//         checkboxLabel.textContent = food;

//         checkboxDiv.appendChild(checkboxInput);
//         checkboxDiv.appendChild(checkboxLabel);
//         checkboxDiv.appendChild(inputBox);

//         foodItemsContainer.appendChild(checkboxDiv);
//       });

//       // Capture the form submission event
//       const form = document.querySelector('.was-validated');
//       form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const hotelName = document.getElementById('hotelName').value;
//         const selectedFoodsContainer = foodItemsContainer.querySelectorAll('.form-check');
//         const selectedFoodsData = [];

//         selectedFoodsContainer.forEach(checkboxDiv => {
//           const checkboxInput = checkboxDiv.querySelector('.form-check-input');
//           const inputBox = checkboxDiv.querySelector('.form-control');
//           const food = checkboxInput.value;
//           const price = parseFloat(inputBox.value);

//           if (checkboxInput.checked && !isNaN(price)) {
//             selectedFoodsData.push({
//               food,
//               price
//             });
//           }
//         });

//         if (selectedFoodsData.length > 0) {
//           // Check if the hotelName already exists
//           const isHotelNameExists = HotelFood.some(entry => {
//             return entry.hotelName === hotelName;
//           });

//           if (!isHotelNameExists) {



            
//             const hotelData = {
//               hotelName,
//               foodType: selectedFoodType,
//               foods: selectedFoodsData,
//               // selectFood:[],
//             };

//             // Remove previous entries with the same hotelName and foodType
//             const updatedHotelFood = HotelFood.filter(entry => {
//               return !(entry.hotelName === hotelData.hotelName && entry.foodType === hotelData.foodType);
//             });

//             updatedHotelFood.push(hotelData);
//             localStorage.setItem('HotelFood', JSON.stringify(updatedHotelFood));
//             location.reload()
//           } else {
//             // Hotel name already exists, show an alert or take appropriate action
//             swal.fire({
//               title: 'Error',
//               text: 'Hotel name is already exits',
//               icon: 'error',
//               button: 'OK'
//             });          }
//         }
//         else {
//           // Show SweetAlert indicating that at least one food must be selected
//           swal.fire({
//             title: 'Error',
//             text: 'Please select at least one food item and enter its price.',
//             icon: 'error',
//             button: 'OK'
//           });
//         }
      

//         // Clear the form fields and food items
//         form.reset();
//         foodItemsContainer.innerHTML = '';
//         // location.reload();
//       });
//     }
//   }
// });



// user order

document.getElementById('foodTypeSelect').addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const selectedFoodType = selectedOption.text;

  foodItemsContainer.innerHTML = '';

  if (selectedFoodType) {
    const selectedFoodTypeObj = foodTypes.find(foodType => foodType.type === selectedFoodType);
    console.log("selectedFoodTypeObj,", selectedFoodTypeObj);
    console.log(selectedFoodTypeObj.foods)
    if (selectedFoodTypeObj) {

      selectedFoodTypeObj.foods.forEach(food => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('form-check', 'selectedInput', 'mb-3');

        const inputBox = document.createElement('input');
        inputBox.type = 'number';
        inputBox.classList.add('form-control', 'input-number', 'w-50', 'ms-5');
        inputBox.placeholder = 'Enter a price';

        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.classList.add('form-check-input', 'me-3');
        checkboxInput.value = food;

        const checkboxLabel = document.createElement('label');
        checkboxLabel.classList.add('form-check-label');
        checkboxLabel.textContent = food;

        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);
        checkboxDiv.appendChild(inputBox);

        foodItemsContainer.appendChild(checkboxDiv);
      });

      // Capture the form submission event
      const form = document.querySelector('.was-validated');
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        const hotelName = document.getElementById('hotelName').value;
        const selectedFoodsContainer = foodItemsContainer.querySelectorAll('.form-check');
        const selectedFoodsData = [];

        selectedFoodsContainer.forEach(checkboxDiv => {
          const checkboxInput = checkboxDiv.querySelector('.form-check-input');
          const inputBox = checkboxDiv.querySelector('.form-control');
          const food = checkboxInput.value;
          const price = parseFloat(inputBox.value);

          if (checkboxInput.checked && !isNaN(price)) {
            selectedFoodsData.push({
              food,
              price
            });
          }
        });

        if (selectedFoodsData.length > 0) {
          // Check if the hotelName already exists
          const isHotelNameExists = HotelFood.some(entry => {
            return entry.hotelName === hotelName;
          });

          if (!isHotelNameExists) {
            // Create a new entry for the hotel
            const newHotelEntry = {
              hotelName,
              foodType: selectedFoodType,
              foods: selectedFoodsData
            };

            // Add the new hotel entry to the HotelFood array
            HotelFood.push(newHotelEntry);

            // Update the HotelFood array in localStorage
            localStorage.setItem('HotelFood', JSON.stringify(HotelFood));

            // Reload the page
            location.reload();
          } else {
            // Hotel name already exists, show an alert or take appropriate action
            swal.fire({
              title: 'Error',
              text: 'Hotel name already exists.',
              icon: 'error',
              button: 'OK'
            });
          }
        } else {
          // Show SweetAlert indicating that at least one food must be selected
          swal.fire({
            title: 'Error',
            text: 'Please select at least one food item and enter its price.',
            icon: 'error',
            button: 'OK'
          });
        }

        // Clear the form fields and food items
        form.reset();
        foodItemsContainer.innerHTML = '';
      });
    }
  }
});










document.getElementById('viewOrderButton').addEventListener('click', function () {
  const storedOrders = JSON.parse(localStorage.getItem('SelectedOrders')) || [];



  if (storedOrders.length === 0) {
      alert('No orders found.');
      return; // Stop further execution
  }

  const orderContainer = document.getElementById('orderContainer');
  orderContainer.innerHTML = '';

  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-center');

  storedOrders.forEach(orderEntry => {
      const orderId = orderEntry.orderId;
      const orders = orderEntry.orders;
      const name=orderEntry.name

      const cardCol = document.createElement('div');
      cardCol.classList.add('col-md-4', 'mb-3');

      const card = document.createElement('div');
      card.classList.add('card');

      const cardHeader = document.createElement('div');
      cardHeader.classList.add('card-header');
      cardHeader.textContent = `Order ID: ${orderId}      User : ${name}`;

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




























(() => {
  // 'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()



