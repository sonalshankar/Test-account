DMSApp.controller('PriceConditionsCtrl',['$scope', '$http', '$log', '$locale', '$filter', function($scope, $http, $log, $locale, $filter){
	/*$scope.user = {
		    name: 'awesome user'
		  }; 
	$scope.person_name = "John Doe";*/
	$scope.itemsGridOptions = {};
    //$http.get('components/mocks/eventDetails.json')
    $http.get('components/mocks/priceconditions.json')
        .success(function(data) {
            $scope.itemsGridOptions.columnDefs = defineGridColumnDefs(data.itemColumns);
            $scope.itemsGridOptions.data = populateItemsGridData(data.items);
            //console.log($scope.itemsGridOptions.columnDefs);
        });
    
    function defineGridColumnDefs(columnsMetaData){
        var columnDefs = [];
        for (i = 0; i < columnsMetaData.length; i++) {
           var columnObj = {};
            columnObj['name'] = columnsMetaData[i].fieldId;
            columnObj['field'] = columnsMetaData[i].fieldId;
            columnObj['displayName'] = columnsMetaData[i].label;
            columnObj['width'] = '10%';
            columnObj['enableCellEdit'] = columnsMetaData[i].isEditable;
            columnObj['pinnedLeft'] = columnsMetaData[i].isPinned;

            if (columnsMetaData[i].type === 'ariba.sourcing.basic.Attachment') {
                columnObj['visible'] = false;
                
            } else if (columnsMetaData[i].type === 'java.lang.Integer' || columnsMetaData[i].type === 'java.math.BigDecimal') {
                columnObj['type'] = 'number';
                if (columnsMetaData[i].isEditable === true) {
                    columnObj['cellTemplate'] = '<div class="ui-grid-cell-contents"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></div>'
                    columnObj['editableCellTemplate'] = '<div><form name="inputForm"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></form></div>';
                }
                
            } else if (columnsMetaData[i].type === 'java.lang.Boolean') {
                columnObj['type'] = 'boolean';
            }
            else if (columnsMetaData[i].type === 'java.lank.String') {
                if (columnsMetaData[i].isEditable === true) {
                    columnObj['cellTemplate'] = '<div class="ui-grid-cell-contents"><input type="text" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></div>'
                    columnObj['editableCellTemplate'] = '<div><form name="inputForm"><input type="text" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></form></div>';
                }
            }
            else if (columnsMetaData[i].type === 'ariba.sourcing.basic.UCMoney') {
                if (columnsMetaData[i].isEditable === true) {
                    columnObj['cellTemplate'] = '<div class="ui-grid-cell-contents"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD.amount"><span>{{MODEL_COL_FIELD.currency}}</span></div>'
                    columnObj['editableCellTemplate'] = '<div><form name="inputForm"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD.amount"></form></div>';

                } else {
                    columnObj['cellFilter'] = 'currencyFilter:this';
                }


            } else if (columnsMetaData[i].type === 'ariba.sourcing.basic.UOMQuantity') {
                if (columnsMetaData[i].isEditable === true) {
                    columnObj['cellTemplate'] = '<div class="ui-grid-cell-contents"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD.amount"><span>{{MODEL_COL_FIELD.unitOfMeasure}}</span></div>'
                    columnObj['editableCellTemplate'] = '<div><form name="inputForm"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD.amount"></form></div>';
                } else {
                    columnObj['cellFilter'] = 'UOMFilter';
                }


            } else if (columnsMetaData[i].type === 'ariba.base.core.ShortMultiLocaleString') {
                if (columnsMetaData[i].isEditable === true) {
                    columnObj['cellTemplate'] = '<div class="ui-grid-cell-contents"><textarea rows="5" cols="50" ng-class="\'colt\' + col.uid" ng-model="MODEL_COL_FIELD.text"></div>'
                    columnObj['editableCellTemplate'] = '<div><form name="inputForm"><textarea rows="5" cols="50" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD.text"></form></div>';
                } else {
                    columnObj['cellFilter'] = 'ShortMultiLocaleStringFilter';
                }


            } else if (columnsMetaData[i].type === 'ariba.sourcing.basic.MoneyDifference') {
                columnObj['cellFilter'] = 'MoneyDifferenceFilter';
                columnObj['editableCellTemplate'] = '<div><form name="inputForm"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD.difference.amount"></form></div>';
            }
            columnDefs.push(columnObj);
        }
        //console.log(columnDefs);
        return columnDefs;
    }

    function populateItemsGridData(itemsdata) {
        var data = [];
        for (i = 0; i < itemsdata.length; i++) {
            var itemObject = {};
            for (j = 0; j < itemsdata[i].terms.length; j++) {
                itemObject[itemsdata[i].terms[j].fieldId] = itemsdata[i].terms[j].value;
               if(itemsdata[i].terms[j].fieldId === 'PRICE') {
                	for (k=0; k < itemsdata[i].terms[j].supplierPricingConditions.length; k++) {
                		itemObject[itemsdata[i].terms[j].supplierPricingConditions[k].fieldId] = itemsdata[i].terms[j].supplierPricingConditions[k].value;
                		
                	}
                }
            }
            data.push(itemObject);
        }
        //console.log(data);
        return data;
    };

    $scope.scrollTo = function (rowIndex, colIndex) {
        console.log($scope.gridApi.core.getVisibleRows().length);
        $scope.gridApi.core.scrollTo($scope.itemsGridOptions.data[rowIndex], $scope.itemsGridOptions.columnDefs[colIndex]);
    };
    
    $scope.itemsGridOptions.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
        gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
            // var rowCol = {row: newRowCol.row.index, col:newRowCol.col.colDef.name};
            // var msg = 'New RowCol is ' + angular.toJson(rowCol);
            // if(oldRowCol){
            //    rowCol = {row: oldRowCol.row.index, col:oldRowCol.col.colDef.name};
            //    msg += ' Old RowCol is ' + angular.toJson(rowCol);
            // }
            $log.log('navigation event');
        });
    };

}]);