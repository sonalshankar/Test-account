DMSApp.filter('currencyFilter',function(){
    var currencyMap = {
        'USD': '$'
    };
    return function(input){
        return currencyMap[input.currency] + input.amount.toFixed(2);
    }
});