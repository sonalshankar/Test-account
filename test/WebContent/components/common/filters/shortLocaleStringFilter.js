DMSApp.filter('ShortMultiLocaleStringFilter',function(){
    return function (input) {
        return !input ? "" : input.text;
    }
});