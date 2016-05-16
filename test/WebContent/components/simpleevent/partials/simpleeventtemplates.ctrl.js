angular.module('DMSApp').controller('SimpleEventTemplatesCtrl',
		function($scope, $uibModalInstance, eventType, simpleEventFactory) {

			//keep any service calls for populating data when page first loads here.
			$scope.initData = function(){
				 simpleEventFactory.getTemplates().then(function(data){
			 			$scope.templates = data.templates;			 	
			 		});		 
			};
			
			$scope.selected = {
			};
			
			$scope.initData();
			
			$scope.eventType = eventType;
			
			$scope.ok = function() {
				$uibModalInstance.close($scope.selected.template);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		});