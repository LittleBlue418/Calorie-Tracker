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
      {id: 0, name: 'Steak Dinner', calories: 720},
      {id: 1, name: 'Leamonaid', calories: 120},
      {id: 2, name: 'Ice Cream', calories: 320},
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public Methods
  return {
    getItems: function(){
        return data.items;
    },
    logData: function(){
      return data;
    }
  }
})()





// UI CONTROLLER
const UICtrl = (function(){

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
      document.getElementById('item-list').innerHTML = html;
    }
  }

})()





// APP CONTROLLER
const AppCtrl = (function(ItemCtrl, UICtrl){

  // Public Methods
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);
    }
  }

})(ItemCtrl, UICtrl);





// Initialize App
AppCtrl.init();
