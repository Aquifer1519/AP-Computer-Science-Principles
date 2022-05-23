var coffeeList = ["Cortado" , "Black Coffee", "Cappuccino", "Macchiato", "Flat White", 
"Latte", "Affogato", "Latte Macchiato", "Frappe","Milk"];
var milkAmount = [1, 0, 1, 1, 3, 7, 4, 10, 20, 1];
var expressoAmount = [1, 2, 2, 3, 4, 2, 2, 1, 5,0];
var coffeeRatios = [];
  for(var i = 0; i<coffeeList.length; i++){
    appendItem(coffeeRatios, findRatio(milkAmount[i], expressoAmount[i]));
  }
  
var ratio = 0;
var milk = 0;
var expresso = 0;
var coffee;
console.log(coffeeRatios);
onEvent("milkInput", "change",function(){
  milk = getNumber("milkInput");
  updateML("milk", milk);
});

onEvent("expressoInput", "change", function(){
  expresso = getNumber("expressoInput");
  updateML("expresso", expresso);
});

onEvent("calculateButton", "click", function(){
  setScreen("coffeeScreen");
  console.log(findRatio(milk, expresso));
  setProperty("coffeeOutput", "text", calculateCoffee(milk, expresso));

});

onEvent("reset_Button", "click", function(){
  setScreen("mainScreen");
  milk = 0;
  expresso = 0;
  updateML("milk", milk);
  updateML("expresso", expresso);
  setProperty("milkInput","value",0);
  setProperty("expressoInput","value",0);
});

//stores the values of the sliders and updates the text boxes
//no input
//no output
function updateML(liquid, amount){
  setProperty(liquid+"Output", "text", amount+"\noz");
}

//takes slider values to find the ratio of milk to expresso
//input {int, int} - slider values
//output {float} - returns ratio of milk to coffee and updates mL's
function findRatio(milk, expresso){
  if(isFinite(milk/expresso) && milk/expresso>0){
    ratio = milk/expresso;
  } else if (expresso==0 && milk>0){
    ratio = "Milk";
  } else if (expresso>0 && milk == 0){
    ratio = "Black Coffee";
  } else {
    ratio = "No drink";
  }
  return ratio;
}

//takes user input to calculate a coffee type
//input {number, number} - gets input from findRatio, which is milk and expresso input from the sliders
//output {string} - returns name of the correct coffee type
function calculateCoffee(milk, expresso){
  
  ratio = findRatio(milk, expresso);
  sort(coffeeRatios, coffeeList);
  
  for(i = 0; i<coffeeRatios.length; i++){
    
    if(ratio == coffeeRatios[i]){
      coffee = coffeeList[i];
    } 
    if ((ratio > coffeeRatios[i]) && (ratio < coffeeRatios[i+1])){
      
      coffee = coffeeList[i];
    } 
    if (ratio == "No drink"){
      coffee = "No drink";
    }
  }
  return coffee;
}

//sorts list1 in numerical order while putting list 2 in the same order
//input {list, list} - the ratios list and the corresponding list of coffees
//no return - sorts 2 lists
function sort(list1, list2){
  //var special = 0;
  var temp1;
  var temp2;
  for(var i = 0; i<list1.length; i++){
    if(isNaN(list1[i])){
      
      if(list1[i] == "Milk"){
        temp2 = list2[i];
        list2[i] = list2[list1.length-1];
        list2[list1.length-1] = temp2;
      } else {
        temp2 = list2[i];
        list2[i] = list2[0/*+special*/];
        list2[0/*+special*/] = temp2;
        
        temp1 = list1[i];
        list1[i] = list1[0/*+special*/];
        list1[0/*+special*/] = temp1;
        //special++;
      }
    }
    for(var j = 0/*+special*/; j<list1.length-1; j++){
        if(list1[i] < list1[j]){
        temp1 = list1[i];
        list1[i] = list1[j];
        list1[j] = temp1;
        
        temp2 = list2[i];
        list2[i] = list2[j];
        list2[j] = temp2;
      }
    }
  }
}
