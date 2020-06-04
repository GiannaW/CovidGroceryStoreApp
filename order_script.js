/* Rebecca Sakaguchi + Team :D
CSC-435 / Spring 2020
FINAL!! Project */ 

(function() {
  "use strict"; 

	window.onload = function() { 

    console.log("we running!");

		init(); 

    function init() {
      id("signin_submit_button").addEventListener("click", getUserInput);
      id("login").addEventListener('submit', handleForm);
      id("sign_out_button").addEventListener("click", signOut);

      itemFetcher();

      //all the item buttons:
      id("carrot_button").addEventListener("click", addItems);
      id("cheese_button").addEventListener("click", addItems);
      id("cherry_button").addEventListener("click", addItems);
      id("corn_button").addEventListener("click", addItems);
      id("cucumber_button").addEventListener("click", addItems);
      id("fish_button").addEventListener("click", addItems);

    } //end init func

    function getUserInput() {
      let input = id('username').value;

      id("username_welcome").innerHTML = "Welcome back, " + input;
      id("signed_in").classList.remove("hidden");
      id("not_signed_in").classList.add("hidden");

    } //end getUserInput function

    //stops html form from refreshing page, thus losing input:
    function handleForm(event) { 
      event.preventDefault(); 
    } 

    function signOut() {
      id("signed_in").classList.add("hidden");
      id("not_signed_in").classList.remove("hidden");
    }


    function addItems() {
      console.log("add item to basket!");

      let foodNameButton = event.target.id //will read food_button
      let foodNameArray = foodNameButton.split("_");
      let foodItem = foodNameArray[0]
      console.log(foodItem);

      // id(foodItem + "_quantity").innerHTML = "";
      // console.log("here dude: " + foodItem + "_quantity");

      let foodQuantity = id(foodItem + "_quantity").value;
      console.log("addItems says: user quantity = " + foodQuantity);


      let url = ("php/order_serverside.php?item="+ foodItem + "&quantity="+ foodQuantity);
      // console.log(url);

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(displayItemAdded)

        //FOR TROUBLESHOOTING: 
        // .then(function (response) {
        //   return response.text();
        // })
        // .then(function (consoley) {
        //   console.log(consoley);
        // })
        // .then(checkStatus);

    } //end addItems func


    function displayItemAdded(response) {
      console.log("displayItemAdded running!");

      let itemStatus = response[0]; //T OR F determines whether item valid
      let itemQuantityStatus = response[1]; // T OR F determines if quantity specified is in stock
      let itemQuantityUser = response[2]; //int val
      let foodName = response[3];

      let validInput;

      console.log("displayItems says: user quantity = " + itemQuantityUser);

      if (itemStatus == true && itemQuantityStatus == true) {
        console.log("the request went through correctly!");
        validInput = true; 

        if (itemQuantityUser == 1) {
          var responseContent = ("You've successfully added " + itemQuantityUser + " " + foodName + " to your basket");
        } else {
          var responseContent = ("You've successfully added " + itemQuantityUser + " " + foodName + "s to your basket");
        }

      } else {
          console.log("sorry, we don't have " + itemQuantityUser + " of this food in stock");
          validInput = false; 
          var responseContent = ("Sorry, we don't have " + itemQuantityUser + " " + foodName + "s in stock. Try again!");
      }

      id(foodName + "_status").innerHTML = responseContent;

      if (validInput == true) {
        id(foodName + "_status").classList.remove("incorrect_text");
        id(foodName + "_status").classList.add("hurray_text");
      } else {
        id(foodName + "_status").classList.remove("hurray_text");
        id(foodName + "_status").classList.add("incorrect_text");

      }

      //clears form so user can input values again:
      var itemForm = id(foodName + "_form");
      itemForm.reset();

    } //end displayItemAdded func


    function itemFetcher() {
      console.log("itemFetch is running!");
      let url = ("php/order_stockPopulator_serverside.php?populateStock=true");
      console.log(url);

      fetch(url)
        .then(function (response) {
          // console.log("she said: " + response.json());
          return response.json(); //returns promise
          // return response;
        })
        .then(itemStockPopulator)

        //FOR TROUBLESHOOTING: 
        // .then(function (response) {
        //   return response.text();
        // })
        // .then(function (consoley) {
        //   console.log(consoley);
        // })
        // .then(checkStatus);

    } //end itemFetcher

    function itemStockPopulator(response) {
      console.log("itemStockPopulator is running!");

      let stockArray = response; //an array 
      console.log(stockArray);

      for (let i = 0; i < stockArray.length; i++) {
        let tempFoodName = stockArray[i];
        let tempFoodStock = stockArray[i+1];
        let tempFoodPrice = stockArray[i+2];
        console.log("your food: " + tempFoodName);
        console.log("your stock: " + tempFoodStock);
        console.log("your price: " + tempFoodPrice);

        id(tempFoodName + "_stockDOM").innerHTML = "Current Stock: " + tempFoodStock;
        id(tempFoodName + "_price").innerHTML = "$" + tempFoodPrice + " per lb";

        i++; //i skips since we need to match the correct item with its stock 
        i++; 
      }


    } //end itemStockPopulator



	}; //end window.onload function












/* ------------------------------ Provided Shorthand Functions ------------------------------ */
  // Note: These are the three provided shorthand functions shown in lecture/section. You may use these
  // in your own JS, but these are the only functions you are allowed to use in your own work as an
  // exception to the course Academic Conduct policy. These are also useful examples of JSDoc comments!
  

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
  }


  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 ||
        response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(
        new Error("Javascript says: " + response.status + ": " + response.statusText));
    }
  }

})(); //end giant anon function