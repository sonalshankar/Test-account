DMSApp.filter('UOMFilter',function(){
    return function(input){
        return input.amount+' '+input.unitOfMeasure;
    }
});