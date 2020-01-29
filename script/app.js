// STORAGE CONTROLLER




// ITEM CONTROLLER
const ItemCtrl = (function(){

  // Item Constructor
  const Item = function(id, name, calories){
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

    getItems: function(){
        return data.items;
    },

    addItem: function(name, calories){
        let ID;
        // Create ID
        if(data.items.length > 0){
          ID = data.items[data.items.length -1].id +1;
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

    logData: function(){
      return data;
    }
  }
})()





// UI CONTROLLER
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  // Public Methods
  return {

    populateItemList: function(items){
      let html = '';
      items.forEach(function(item){
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

    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      }
    },

    addListItem: function(item){
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

    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    getSelectors: function(){
      return UISelectors;
    }

  }

})()





// APP CONTROLLER
const AppCtrl = (function(ItemCtrl, UICtrl){
  // Load event listeners
  const loadEventListeners = function() {
      // Get UI Selectors
      const UISelectors = UICtrl.getSelectors();

      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }


  // Add item submit
  const itemAddSubmit = function(e){
    e.preventDefault();

    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
        // Add item
        const newItem = ItemCtrl.addItem(input.name, input.calories)

        // Add item to the UI list
        UICtrl.addListItem(newItem);

        // Clear fields
        UICtrl.clearInput();
    }
  }

  // Public Methods
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0){
          UICtrl.hideList();
      } else {
          // Populate list with items
          UICtrl.populateItemList(items);
      }



      // Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);





// Initialize App
AppCtrl.init();
