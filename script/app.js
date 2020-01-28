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
    logData: function(){
      return data;
    }
  }
})()





// UI CONTROLLER
const UICtrl = (function(){

  // Public Methods
  return {

  }

})()





// APP CONTROLLER
const AppCtrl = (function(ItemCtrl, UICtrl){

  // Public Methods
  return {
    init: function() {
      console.log('initializing app')
    }
  }

})(ItemCtrl, UICtrl);





// Initialize App
AppCtrl.init();
