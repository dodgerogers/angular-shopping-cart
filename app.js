function CartController($scope) {

	$scope.bill = {};
	$scope.shoppingCart = [];
	$scope.items = [
		{title: "Intense M1 Frameset", price: 2000.00, quantity: 1},
		{title: "Azonic DS1 Frameset", price: 300.00, quantity: 1},
		{title: "Marazocchi DJ1", price: 250.00, quantity: 1},
		{title: "Profile Cranks", price: 200.00, quantity: 1},
		{title: "Sun Ringle Hubs on Mavic 321's", price: 190.00, quantity: 1},
		{title: "North Shore Billet Derailleur Hanger", price: 25.00, quantity: 1}
	];
	
	$scope.subTotal = function(){
		return $scope.totalCart() - $scope.bill.discount;
	};
	
	$scope.totalCart = function(){
		var total = 0;
		angular.forEach($scope.shoppingCart, function(value, index){
			total = total + value.price * (value.quantity || 0);
		});
		return total;
	};
	
	function calculateDiscount(newValue, oldValue, scope) {
		$scope.bill.discount = newValue >= 100 ? 10 : 0
	}
	
	$scope.$watch($scope.totalCart, calculateDiscount);
	
	$scope.addToCart = function(item){
		var newItem = angular.copy(item);
		var counter = 0;
		
		// updating an existing item quantity
		angular.forEach($scope.shoppingCart, function(value, index) {
			if(value.title === item.title){
				value.quantity = parseInt(value.quantity) + parseInt(item.quantity);
				counter++
			}
		});
		
		// if counter is still zero, it means nothing was updated
		if(counter == 0) {
			$scope.shoppingCart.push(newItem);
		}
	};
	
	$scope.removeFromCart = function(item){
		angular.forEach($scope.shoppingCart, function(value, index){
			if(value.title === item.title){
				$scope.shoppingCart.splice(index, 1);
			}
		});
	};
}