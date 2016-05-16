angular.module('DMSApp').factory('simpleEventFactory', function($q, $http, $filter, $location){
    
	var simpleEventService = {};

	simpleEventService.getTimeDimensions = function () {
    	var deferred = $q.defer();

    	$http.get('components/mocks/timedimension.json').success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    };

	simpleEventService.getEventTypes = function () {
    	var deferred = $q.defer();

    	$http.get('components/mocks/eventtypes.json').success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    };
    
	simpleEventService.getValidityPeriodTypes = function () {
    	var deferred = $q.defer();

    	$http.get('components/mocks/validityPeriodTypes.json').success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    };
    
	simpleEventService.getSuppliers = function () {
    	var deferred = $q.defer();

    	$http.get('components/mocks/suppliers.json').success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    };
    
	simpleEventService.searchSuppliers = function () {
    	var deferred = $q.defer();

    	$http.get('components/mocks/supplierSearch.json').success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    };

	simpleEventService.getItems = function () {
    	var deferred = $q.defer();

    	$http.get('components/mocks/items.json').success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    };
    
	simpleEventService.getTemplates = function () {
    	var deferred = $q.defer();

    	$http.get('components/mocks/templates.json').success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    };

   /* forecastService.tablePersonalization = function (buyerOrgId) {
        var deferred = $q.defer();

        $http.get('/Network/forecast/personalization/forecastTable', {
            params: {
            buyerOrg: buyerOrgId
      }
    }).success(function (data) {
			deferred.resolve(data);
       }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

    	return deferred.promise;
    }

    forecastService.saveTablePersonalization = function (data) {
		$http.post('/Network/forecast/personalization/saveForecastTable', data );
    };

    forecastService.getBuyerOrg = function(val)
	{
    	var deferred = $q.defer();

	    return $http.get('/Network/forecast/buyerOrg', {
	    	params: {
		        name: val
	      }
	    }).success(function (data) {
			deferred.resolve(data);
	      }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });

	    return deferred.promise;
	};

	forecastService.getBuyerPart = function(val, buyerOrgId)
	{
		var deferred = $q.defer();

	    return $http.get('/Network/forecast/buyerPart', {
	    	params: {
		        name: val,
		        buyerOrg: buyerOrgId
	      }
	    }).success(function (data) {
			deferred.resolve(data);
	       }).error(function(data,status,headers,config){
	            //reject the promise
	            deferred.reject('ERROR');
	        });

	    return deferred.promise;
	};

	forecastService.getSupplierPart = function(val, buyerOrgId)
	{
		var deferred = $q.defer();

	    return $http.get('/Network/forecast/supplierPart', {
	    	params: {
		        name: val,
		        buyerOrg: buyerOrgId
	      }
	    }).success(function (data) {
			deferred.resolve(data);
	       }).error(function(data,status,headers,config){
	            //reject the promise
	            deferred.reject('ERROR');
	        });

	    return deferred.promise;
	};

	forecastService.getCustomerPlannerCode = function(val, buyerOrgId)
	{
		var deferred = $q.defer();

	    return $http.get('/Network/forecast/customerPlannerCode', {
	    	params: {
		        name: val,
		        buyerOrg: buyerOrgId
	      }
	    }).success(function (data) {
			deferred.resolve(data);
	       }).error(function(data,status,headers,config){
	            //reject the promise
	            deferred.reject('ERROR');
	        });

	    return deferred.promise;
	};

	forecastService.getPlant = function(val, buyerOrgId)
	{
		var deferred = $q.defer();

	    return $http.get('/Network/forecast/plant', {
	    	params: {
		        name: val,
		        buyerOrg: buyerOrgId
	      }
	    }).success(function (data) {
			deferred.resolve(data);
	       }).error(function(data,status,headers,config){
	            //reject the promise
	            deferred.reject('ERROR');
	        });

	    return deferred.promise;
	};

	forecastService.commitProduct = function(data, userParams, buyerOrg)
	{
		var buyerOrgId = null;
		if( !(typeof buyerOrg === 'undefined' || buyerOrg === null || buyerOrg === "" )){
			buyerOrgId = buyerOrg.id;
		}

		return $http.post('/Network/forecast/massCommitForecastData',{ 'forecastProduct' : data, 'localeSetting' : userParams, 'buyerOrg' : buyerOrgId } );
	};

	forecastService.sendForecastCommit = function(data, userParams, buyerOrg)
	{
		var buyerOrgId = null;
		if( !(typeof buyerOrg === 'undefined' || buyerOrg === null || buyerOrg === "" )){
			buyerOrgId = buyerOrg.id;
		}
		
		return $http.post('/Network/forecast/sendCommitDataToBuyer',{ 'forecastProduct' : data, 'localeSetting' : userParams, 'buyerOrg' : buyerOrgId } );
	};
	
	forecastService.getPickerValue = function(pickerObjVal){
		if( !(typeof pickerObjVal === 'undefined' || pickerObjVal === null || pickerObjVal === "")){
			if( pickerObjVal.pickerObjectId){
				return pickerObjVal.pickerObjectId;
			}
		}
		return pickerObjVal;
	}
	
	forecastService.getForecastSearchParams = function(searchCriteria){
		
		var buyerOrgId = null;
		if( !(typeof searchCriteria.selectedBuyerOrg === 'undefined' || searchCriteria.selectedBuyerOrg === null || searchCriteria.selectedBuyerOrg === "" )){
			buyerOrgId = searchCriteria.selectedBuyerOrg.id;
		}
		
		var searchParam = {  
				buyerOrg:  buyerOrgId,
		        buyerPartId: forecastService.getPickerValue( searchCriteria.selectedBuyerPart),
		        supplierPartId: forecastService.getPickerValue(searchCriteria.selectedSupplierPart),
		        plannerCode:  forecastService.getPickerValue(searchCriteria.selectedCustomerPlannerCode) ,
		        plantId: forecastService.getPickerValue(searchCriteria.selectedPlant),
		        fromDateStr: $filter('date')(searchCriteria.dtFrom, 'dd-MM-yyyy'),
		        timeSeriesType : searchCriteria.timeSeriesVal,
		        selectedPage : searchCriteria.selectedPage,
		        sortOrder : searchCriteria.sortDir,
		        sortCol : searchCriteria.sortCol,
		        moveForwardFromDate : searchCriteria.moveForwardFromDate
		}
		return searchParam;
	}
	
	forecastService.searchForecast = function(searchCriteria, userPref){
		var deferred = $q.defer();
		var searchParam = forecastService.getForecastSearchParams(searchCriteria);
		searchParam.localeSetting = userPref;
		$http.post('/Network/forecast/productDetails', searchParam).success(function (data) {
			deferred.resolve(data);
	    }).error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
        });
	    return deferred.promise;
	};


	forecastService.exportForecast = function(searchCriteria, userPref){

		var searchParam = forecastService.getForecastSearchParams(searchCriteria);
		searchParam.localeSetting = userPref;
		
		$http({
		    url: '/Network/forecast/exportForecast',
		    method: "POST",
		    data: searchParam,
		    headers: {
		       'Content-type': 'application/json'
		    }
		}).success(function (data) {
			var downloadURL = $location.protocol() + '://'+ $location.host() +':'+  $location.port()  +'/Network/forecast/downloadForecastExcel?fileName='+data.fileName;
            window.location = downloadURL;
		});
	};*/

    return simpleEventService;
});