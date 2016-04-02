// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }])


    /*


     var opts = {
     lines: 13 // The number of lines to draw
     , length: 28 // The length of each line
     , width: 14 // The line thickness
     , radius: 42 // The radius of the inner circle
     , scale: 1 // Scales overall size of the spinner
     , corners: 1 // Corner roundness (0..1)
     , color: '#000' // #rgb or #rrggbb or array of colors
     , opacity: 0.25 // Opacity of the lines
     , rotate: 0 // The rotation offset
     , direction: 1 // 1: clockwise, -1: counterclockwise
     , speed: 1 // Rounds per second
     , trail: 60 // Afterglow percentage
     , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
     , zIndex: 2e9 // The z-index (defaults to 2000000000)
     , className: 'spinner' // The CSS class to assign to the spinner
     , top: '50%' // Top position relative to parent
     , left: '50%' // Left position relative to parent
     , shadow: false // Whether to render a shadow
     , hwaccel: false // Whether to use hardware acceleration
     , position: 'absolute' // Element positioning
     }


     */
.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setTheme('bigBlue', {color: 'blue', radius: 20});
    usSpinnerConfigProvider.setTheme('smallRed', {color: 'red', radius: 6, top:50,left:75,position:'absolute'});
    usSpinnerConfigProvider.setTheme('mySpinLoader', {color: 'red', radius: 6, top:50,left:75,position:'relative'});

}])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);