var dgApp = angular.module('dgApp', ['dgApp.controllers', 'ui.router' ,'ui.select']);
dgApp.constant('settings', {
  STATIC_URL: '/static/'
});


dgApp.config(function($stateProvider, $urlRouterProvider,  settings) {
  $stateProvider
    .state('presentation-view', {
      url: '/presentaitons/:presentationID',
      templateUrl: settings.STATIC_URL+"partials/presentation_view.html",
      controller: 'PresentationViewController as pviewer',
    })
    .state('presentation-edit', {
      url: "/presentations/:presentationID/edit",
      templateUrl: settings.STATIC_URL+"partials/presentation_edit.html",
      controller: 'PresentationEditController as editor'
    })
    //.state('route1', {
      //url: "/route1",
      //views: {
        //"viewA": { template: "route1.viewA" },
        //"viewB": { template: "route1.viewB" }
      //}
    //})
    //.state('route2', {
      //url: "/route2",
      //views: {
        //"viewA": { template: "route2.viewA" },
        //"viewB": { template: "route2.viewB" }
      //}
    //})
    .state('presentations', {
      url: "/presentations",
      templateUrl: settings.STATIC_URL+"partials/homestate.html",
      controller: 'PresentationListController as pl'
    })
    .state({
      name: 'new-presentation',
      url: "/presentations/new",
      templateUrl: settings.STATIC_URL+"partials/presentation_new.html",
      controller: 'PresentationNewController as creator'
    });
  $urlRouterProvider.otherwise("/presentations");
});
dgApp.run(['$state', function($state){
    console.log($state.get());

}]);
