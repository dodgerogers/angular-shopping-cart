function CartController($scope) {

	$scope.bill = {};
	$scope.items = [
		{title: "Intense M1 Frameset", price: 2000.00},
		{title: "Azonic DS1 Frameset", price: 300.00},
		{title: "Marazocchi DJ1", price: 250.00},
		{title: "Profile Cranks", price: 200.00},
		{title: "Sun Ringle Hubs on Mavic 321's", price: 190.00},
		{title: "North Shore Billet Derailleur Hanger", price: 25.00}
	];
	
	$scope.shoppingCart = [];
	
	$scope.subTotal = function(){
		return $scope.totalCart() - $scope.bill.discount;
	};
	
	$scope.totalCart = function(){
		var total = 0, length = $scope.shoppingCart.length;
		for(var i = 0; i < length; i++) {
			total = total + $scope.shoppingCart[i].price * ($scope.shoppingCart[i].quantity || 0);
		}
		return total;
	};
	
	function calculateDiscount(newValue, oldValue, scope) {
		$scope.bill.discount = newValue >= 100 ? 10 : 0
	}
	
	$scope.$watch($scope.totalCart, calculateDiscount);
	
	$scope.addToCart = function(item) {
		// See if the item exists in the cart
		var index = $scope.shoppingCart.indexOf(item);
		
		// Copy the item
		var newItem = angular.copy(item);
		
		// push to the cart array
		$scope.shoppingCart.push(newItem);
	};
	
	$scope.removeFromCart = function(item) {
		angular.forEach($scope.shoppingCart, function(value, index){
			if(value.title === item.title) {
				$scope.shoppingCart.splice(index, 1);
			}
		});
	};
}