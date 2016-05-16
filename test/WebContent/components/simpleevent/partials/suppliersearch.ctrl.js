angular.module('DMSApp').controller('SupplierSearchCtrl',
		function($scope, $uibModalInstance, eventType, simpleEventFactory) {

		 $scope.supplierSearchGridOptions = {
				 enableSorting:true,
				 enableFiltering: true,
				 enableColumnMenus:false,
				 showSelectionCheckbox:false,
				 enableRowHeaderSelection:false,
				 onRegisterApi : function(supplierSearchGridApi) {
					   $scope.supplierSearchGridApi = supplierSearchGridApi;
				}
		 };
	 
			//keep any service calls for populating data when page first loads here.
			$scope.initData = function(){
				 simpleEventFactory.searchSuppliers().then(function(data){
			    	  	// Construct the column defintions for the supplier grid
					 $scope.supplierSearchGridOptions.columnDefs=[];
					 for (var i=0; i< data.columns.length; i++)
					 {
						 var column={};
						 column.name = data.columns[i].label;
						 column.field = data.columns[i].field;
						 $scope.supplierSearchGridOptions.columnDefs.push(column);
					 }
					 $scope.supplierSearchGridOptions.data = data.suppliers;			 	
			 		});
			}
			
			$scope.selected = {
			};
			
			$scope.initData();
			
			$scope.ok = function() {
				$uibModalInstance.close($scope.selected.suppliers);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		});