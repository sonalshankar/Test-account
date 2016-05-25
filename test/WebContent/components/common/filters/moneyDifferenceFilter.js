DMSApp.filter('MoneyDifferenceFilter',function(){
    return function (input) {
        return input.difference.amount+' '+input.difference.currency +'(' + input.percentage+'%'+')';
    }
});