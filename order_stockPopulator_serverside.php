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

	${"item_" . $i . "_Name"} = $tempArray[0];
	${"item_" . $i . "_Stock"} = $tempArray[1];
	${"item_" . $i . "_Price"} = $tempArray[2];

	//EX: will create variables
	//item_0_Name = apple
	//item_0_Stock = 4
	//item_0_Price = 1.00

}


// -------- RECEIVING POST REQUESTS  --------

//if not given enough information aka if food or quantity is missing
if (!isset($_GET["populateStock"])) {
	header("HTTP/1.1 400 Invalid Request");
	die(); // PHP equivalent to exit(); 
}

//if we are given valid info:
if (isset($_GET["populateStock"])) {
	// echo("PHP says: lets populate that stock!!" . "\n\r");

	$ItemStockResponseArray = array(); 

	//loop for amount of items in inventory
	for ($i = 0; $i < count($inventoryFileContent); $i++) {
		$tempItemName = ${"item_" . $i . "_Name"};
		$tempItemStock = ${"item_" . $i . "_Stock"};
		$tempItemPrice = ${"item_" . $i . "_Price"};
		array_push($ItemStockResponseArray, $tempItemName, $tempItemStock, $tempItemPrice);
	}

	// echo(print_r($ItemStockResponseArray));

	//what we pass back to client side:
	echo(json_encode($ItemStockResponseArray));
	

} //end BIG item and quantity GET request

else {
	echo ("sorry there's an error dude");
} 


//end global php tag: 
?>
