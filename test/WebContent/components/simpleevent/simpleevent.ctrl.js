angular.module('DMSApp')
	.controller('SimpleEventCtrl', function($scope, $translatePartialLoader, $translate, $locale, $filter, $log, $window, $uibModal, 
			uiGridConstants, simpleEventFactory, $timeout) {

			$scope.selectedTemplate  ={
			};
			
			$scope.templateSelectedIndicator = false;
			
			 // This will be set to true only after the user selects a template and we get the 
			// item data to render the grid
			 $scope.itemDataLoaded = false;

			 // This will be set to true only after the user selects a template and we get the 
			// supplier data to render the grid
			 $scope.supplierDataLoaded = false;
			 
			 $scope.itemGridOptions = {
					 enableSorting:false,
					 enableFiltering: false,
					 enableColumnMenus:false,
					 showSelectionCheckbox:false,
					 enableRowHeaderSelection:false,
		     		 enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
		     		 enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
					 onRegisterApi : function(itemGridApi) {
						   $scope.itemGridApi = itemGridApi;
					}
			 };

			 $scope.supplierGridOptions = {
					 enableSorting:false,
					 enableFiltering: false,
					 enableColumnMenus:false,
					 showSelectionCheckbox:false,
					 enableRowHeaderSelection:false,
			     	 enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
			     	 enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
					 onRegisterApi : function(supplierGridApi) {
						   $scope.supplierGridApi = supplierGridApi;
					}
			 };
			
			 $scope.dateOptions = {
					    dateDisabled: disabled,
					    formatYear: 'yy',
					    maxDate: new Date(2020, 5, 22),
					    minDate: new Date(),
					    startingDay: 1
					  };
			 
			  // Disable weekend selection
			  function disabled(data) {
			    var date = data.date,
			      mode = data.mode;
			    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
			  }
			 
			  // To launch calendar control for due time
			 $scope.open1 = function() {
				    $scope.popup1.opened = true;
			 };
			 
			 $scope.popup1 = {
					    opened: false
			 };
			 
			  // To launch calendar control for Quote Period start date
			 $scope.open2 = function() {
				    $scope.popup2.opened = true;
			 };
			 
			 $scope.popup2 = {
					    opened: false
			 };
			 
			 $scope.eventData = {
			};
		
			//keep any service calls for populating data when page first loads here.
			 $scope.initData = function(){
				 simpleEventFactory.getTimeDimensions().then(function(data){
			 			$scope.timedimensions = data.timedimensions;			 	
			 		});
				 
				 simpleEventFactory.getEventTypes().then(function(data){
			 			$scope.eventTypes = data.eventTypes;			 	
			 		});

				 simpleEventFactory.getValidityPeriodTypes().then(function(data){
			 			$scope.validityPeriodTypes = data.validityPeriodTypes;			 	
			 		});
			 };
			 
			 $scope.initData();
			 
			 $scope.getTemplates = function(){
				 simpleEventFactory.getTemplates().then(function(data){
			 			$scope.templates = data.templates;			 	
			 		});		 				 
			 };
			 
			 $scope.showSupplierSearch = function() {

				    var supplierSearchModal = $uibModal.open({
				      templateUrl: '/test/components/simpleevent/partials/suppliersearch.html',
				      controller: 'SupplierSearchCtrl',
				      size: 'lg',
				      resolve: {
				        eventType: function () {
				          return $scope.eventData.eventType;
				        }
				      }
				    });

				    //Called when the user clicks the OK button on the dialog
				    supplierSearchModal.result.then(function (selectedSuppliers) {
				      var suppliers = JSON.parse(selectedSuppliers);
				    }, function () {
				      $log.info('Modal dismissed at: ' + new Date());
				    });
				 
			 }
		
			 // Launch the template dialog
			 $scope.showTemplates = function () {
				    var templateModal = $uibModal.open({
				      templateUrl: '/test/components/simpleevent/partials/simpleeventtemplates.html',
				      controller: 'SimpleEventTemplatesCtrl',
				      size: 'lg',
				      resolve: {
				        eventType: function () {
				          return $scope.eventData.eventType;
				        }
				      }
				    });

				    //Called when the user clicks the OK button on the dialog
				    templateModal.result.then(function (selectedTemplate) {
				      var template = JSON.parse(selectedTemplate);
				      $scope.selectedTemplate.templateId = template.id;
				      $scope.selectedTemplate.templateName = template.title;
						
				      $scope.templateSelectedIndicator=true; 
				      $timeout(function () { $scope.templateSelectedIndicator = false; }, 3000);  
					
				      // Get items
				      simpleEventFactory.getItems().then(function(data){
				    	  	// Construct the column definitions for the item grid
							 $scope.itemGridOptions.columnDefs=[];
							 for (var i=0; i< data.columns.length; i++)
							 {
								 var column={};
								 column.name = data.columns[i].label;
								 column.field = data.columns[i].field;
								 $scope.itemGridOptions.columnDefs.push(column);
							 }
							 $scope.itemGridOptions.data = data.items;	
							 if (data.items.length > 20) {
					                $scope.itemGridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.ALWAYS;
					                $scope.itemGridOptions.minRowsToShow = 20;
					            } else {
					                $scope.itemGridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
					                $scope.itemGridOptions.minRowsToShow = data.length;
					         }
							 $scope.itemDataLoaded = true;

					 		});
				      
				      // Get suppliers
				      simpleEventFactory.getSuppliers().then(function(data){
				    	  	// Construct the column defintions for the supplier grid
							 $scope.supplierGridOptions.columnDefs=[];
							 for (var i=0; i< data.columns.length; i++)
							 {
								 var column={};
								 column.name = data.columns[i].label;
								 column.field = data.columns[i].field;
								 $scope.supplierGridOptions.columnDefs.push(column);
							 }
							 $scope.supplierGridOptions.data = data.suppliers;			 	
					 		});

				    }, function () {
				      $log.info('Modal dismissed at: ' + new Date());
				    });
				  };
			
			// Helper function used to hide elements that should not be displayed 
		    // until the user selects a template
			$scope.isTemplateSelected = function (){
				return $scope.selectedTemplate.templateId != null;
			};
			
			// Delete action for the items grid
			$scope.deleteItems = function() {
				 angular.forEach($scope.itemGridApi.selection.getSelectedRows(), function (data, index) {
					    $scope.itemGridOptions.data.splice($scope.itemGridOptions.data.lastIndexOf(data), 1);
					  });
	        };

	        // Delete action for the suppliers grid
			$scope.deleteSuppliers = function() {
				 angular.forEach($scope.supplierGridApi.selection.getSelectedRows(), function (data, index) {
					    $scope.supplierGridOptions.data.splice($scope.supplierGridOptions.data.lastIndexOf(data), 1);
					  });
	        };
	        
	        $scope.setLanguage = function(){
	                var userLang = $translate.preferredLanguage();
	                if( $scope.localeLang ){
	                    userLang = $scope.localeLang;
	                    if ($scope.localeCountry){
	                        userLang += "_"+$scope.localeCountry;
	                    }
	                }
                    $translate.use(userLang);
	                $translatePartialLoader.addPart('simpleevent');
	                $translate.refresh();
	                $log.log("*******Current Language:"+$translate.use())
	            }
	         $scope.setLanguage();

	
});