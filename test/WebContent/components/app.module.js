angular.module('DMSApp', ['ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection','ui.grid.resizeColumns',
                          'ui.grid.expandable', 'pascalprecht.translate'])
    .config(function($stateProvider, $urlRouterProvider, $windowProvider){

        var $window = $windowProvider.$get();
        $urlRouterProvider.otherwise("/dms");

        $stateProvider
            .state('dms', {
                url: "/dms",
                views:{
                    "simpleevent":{
                        templateUrl: '/test/components/simpleevent/simpleevent.html',
                        controller: 'SimpleEventCtrl'
                    },
                    "priceconditions":{
                        templateUrl: '/test/components/priceconditions/priceconditions.html',
                        controller: 'PriceConditionsCtrl'
                    }
                }
            })
        })
    .config(function($translateProvider, $translatePartialLoaderProvider, $windowProvider){
                    var $window = $windowProvider.$get();

                    $translateProvider.useLoader('$translatePartialLoader', {
                        urlTemplate: '/test/components/{part}/{lang}.json'
                    });
                    $translatePartialLoaderProvider.addPart('simpleevent');
                    // Tell the module what language to use by default
                    $translateProvider.preferredLanguage('en_US');
                    //$translateProvider.determinePreferredLanguage();
                    //$translateProvider.forceAsyncReload(true);
    });

angular.module('DMSApp')
    .run(function ($rootScope, $translate, $log) {
        $rootScope.$on('$translatePartialLoaderStructureChanged', function (event, a) {
            $log.log('$translatePartialLoaderStructureChanged', a);
            $translate.refresh().then(function () {
                $log.log('refresh due to $translatePartialLoaderStructureChanged DONE');
            });
        });

        $rootScope.$on('$translateChangeStart', function (event, a) {
            $log.log('$translateChangeStart', a);
        });
        $rootScope.$on('$translateChangeSuccess', function (event, a) {
            $log.log('$translateChangeSuccess', a);
        });
        $rootScope.$on('$translateChangeError', function (event, a) {
            $log.log('$translateChangeError', a);
        });
        $rootScope.$on('$translateLoadingStart', function (event, a) {
            $log.log('$translateLoadingStart', a);
        });
        $rootScope.$on('$translateLoadingStart', function (event, a) {
            $log.log('$translateLoadingStart', a);
        });
        $rootScope.$on('$translateLoadingSuccess', function (event, a) {
            $log.log('$translateLoadingSuccess', a);
        });
        $rootScope.$on('$translateLoadingError', function (event, a) {
            if( a && a.language ){
                var langArr = a.language.split("_");
                if( langArr.length > 1){
                    $translate.use(langArr[0]);
                }else if ( a.language != "en"){
                    $translate.use('en');
                }
            }
            $log.log('$translateLoadingError', a);
        });
});