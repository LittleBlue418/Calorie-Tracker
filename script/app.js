// STORAGE CONTROLLER




// ITEM CONTROLLER
const ItemCtrl = (function () {

  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 720},
      // {id: 1, name: 'Leamonaid', calories: 120},
      // {id: 2, name: 'Ice Cream', calories: 320},
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public Methods
  return {

    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Push new item to the data structure
      data.items.push(newItem)

      return newItem;
    },

    getItemById: function (id) {
      let found = null;

      // Loop through the items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      })

      return found;
    },

    // Updating the item in the data structure (not UI)
    updatedItem: function (name, calories) {
      // parsing the calories input to a number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          // Re-setting the information in the current item
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    deleteItem: function (id){
      // Get ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      // get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },

    clearAllItems: function () {
      data.items = [];
    },

    setCurrentItem: function (item) {
      data.currentItem = item
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    getTotalCalories: function () {
      let total = 0;

      // Loop through items and add calories
      data.items.forEach(function (item) {
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      return data.totalCalories;
    },

    logData: function () {
      return data;
    }
  }
})()





// UI CONTROLLER
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',

    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',

    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',

    totalCalories: '.total-calories',
  }

  // Public Methods
  return {

    populateItemList: function (items) {
      let html = '';
      items.forEach(function (item) {
        html += `
          <li class="collection-item" id="item-${item.id}">
              <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
              <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>
        `;
      });

      // Insert list items to html
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      }
    },

    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`
      // Add HTML
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },

    updateListItem: function (item) {
      // Getting our list items (node list)
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Convert the node list into an array
      listItems = Array.from(listItems);

      // Loop through
      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute('id');

        // If the item we check is the same ID as the one we feed in...
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        `;
        }
      })

    },

    deleteListItem: function (id){
      const itemID = `#item-${id}`
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },

    removeAllItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(item) {
        item.remove();
      })
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    getSelectors: function () {
      return UISelectors;
    }

  }

})()





// APP CONTROLLER
const AppCtrl = (function (ItemCtrl, UICtrl) {

  // Event Listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable enter key
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    })

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Back button event
    //document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    document.querySelector(UISelectors.backBtn).addEventListener('click', backBtnSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Clear all
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }


  // Add item
  const itemAddSubmit = function (e) {
    e.preventDefault();

    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories)

      // Add item to the UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories)

      // Clear fields
      UICtrl.clearInput();
    }
  }

  // Click the edit button on an item
  const itemEditClick = function (e) {
    e.preventDefault();

    // Target the specific icon
    if (e.target.classList.contains('edit-item')) {
      // Get list item id (item-0 etc)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIDArray = listId.split('-')

      // get the actual id
      const id = parseInt(listIDArray[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit)

      // Add item to form
      UICtrl.addItemToForm();

    }
  }

  // Update the submitted Item
  const itemUpdateSubmit = function (e) {
    e.preventDefault();

    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

  }

  // Back button
  const backBtnSubmit = function (e){
    e.preventDefault();
    UICtrl.clearEditState();
  }

  // Delete an Item
  const itemDeleteSubmit = function(e) {
    e.preventDefault();

    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from the UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  }

  // Clear items event
  const clearAllItemsClick = function(e){
    e.preventDefault();

    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeAllItems();

    // Clear the empty UL
    UICtrl.hideList();
  }

  // Public Methods
  return {

    init: function () {
      // Clear Edit state / set initial state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories)

      // Load event listeners
      loadEventListeners();
    }

  }

})(ItemCtrl, UICtrl);





// Initialize App
AppCtrl.init();
