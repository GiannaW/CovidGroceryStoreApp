<?php

// Rebecca Sakaguchi + Team :D
// CSC-435 / Spring 2020
// Final Project 


// -------- PARSING THROUGH INVENTORY.TXT  --------

//reading inventory.txt file as each line a new index in array:
$inventoryFileContent = file("item_inventory.txt");

//iterates through each item and creates variable w/ name, quantity and price:
for ($i = 0; $i < count($inventoryFileContent); $i++) {
	// echo ("The number is:" . $i . "<br>");
	${"itemInfo" . $i} = $inventoryFileContent[$i];


	// echo(${"itemInfo" . $i} . "<br>");
}

//then for each item, break up name, stock and price by to its own separate variables:
for ($i = 0; $i < count($inventoryFileContent); $i++) {
	// echo(${"itemInfo" . $i} . "<br>");

	//breaks up into sub-array
	$tempArray = explode("	", ${"itemInfo" . $i});

	${"item_" . $tempArray[0] . "_Name"} = $tempArray[0];
	${"item_" . $tempArray[0] . "_Stock"} = $tempArray[1];
	${"item_" . $tempArray[0] . "_Price"} = $tempArray[2];

	//EX: will create variables
	//item_apple_Name = apple
	//item_apple_Stock = 4
	//item_apple_Price = 1.00

	//item_orange_Name = orange
	//item_orange_Stock = 3
	//item_orange_Price = 1.00

	// echo (json_encode(${"item" . $i . "_Name"}) . "test" . "<br>");
}


// -------- RECEIVING POST REQUESTS  --------

//if not given enough information aka if food or quantity is missing
if (!isset($_GET["item"]) || !isset($_GET["quantity"])) {
	header("HTTP/1.1 400 Invalid Request");
	die(); // PHP equivalent to exit(); 
}

//if we are given valid info:
if (isset($_GET["item"]) || isset($_GET["quantity"])) {
	// echo("ah yes a food....now let's check the quantity!" . "\n\r");

	$foodName = $_GET["item"];
	// echo("your food is: " . $foodName . "\n\r");
	$foodQuantity = $_GET["quantity"]; 
	// echo("your quantity is: " . $foodQuantity . "\n\r");

	$itemStatus; //determines whether item valid
	$itemQuantityStatus; // determines if quantity specified is in stock
	$itemQuantityUser; 

	/* notes on the following conditions:
	* first we must check if the food given is in stock
	* then we check if the quantity given is valid (a number higher than 0 and not a type other than an a number)
	* then we check if the valid quantity is below our stock level! 
	*/

	if ($foodName == ${"item_" . $foodName . "_Name"}) {
		// echo ("ah you're looking for " . ${"item_" . $foodName . "_Name"} . "<br>");
		$itemStatus = True; 

		if ($foodQuantity == 0) {
			// echo("you fool thats either 0 or a string you've given!!!");

			$itemQuantityStatus = False;
		} else {
			// echo("that is indeed a valid quantity number!");

			if ( ($foodQuantity) <= (${"item_" . $foodName . "_Stock"}) ) {
				// echo (${"item_" . $foodName . "_Stock"});
				// echo("congrats we have that in stock! <br>");
				// echo("you've ordered " . $foodQuantity . " " . $foodName . "s!");

				$itemQuantityStatus = True;

			} else {
				// echo("sorry, we don't have " . $foodQuantity . " " . $foodName . "s in stock right now!");

				$itemQuantityStatus = False;
			} 
		}
	} else {
		// echo ("sorry, we don't carry that food in our inventory!");
		$itemStatus = False; 
	}

	$itemQuantityUser = intval($foodQuantity);

	//what we pass back to client side:
	$AddItemsResponseArray = array($itemStatus, $itemQuantityStatus, $itemQuantityUser, $foodName);
    echo(json_encode($AddItemsResponseArray));

} //end BIG item and quantity GET request

else {
	echo ("sorry there's an error dude");
} 


//end global php tag: 
?>
