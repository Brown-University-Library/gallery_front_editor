angular
  .module('dgApp.controllers', ['ngResource', 'ui.router', 'ui.select'])
  //Configurations
  .config(['$resourceProvider',
   function($resourceProvider) {
     $resourceProvider.defaults.stripTrailingSlashes = false;
   }])
   //Factories
  .factory('Repository',
           ['$http',
    function($http){
      var repo;
      return {
        get: function(pid){
          return $http({
            method: 'JSONP',
            url: "https://repository.library.brown.edu/api/items/"+pid+"/",
            params: {
              'callback': 'JSON_CALLBACK'
            }
          });
        },

        search: function(query){
          return $http({
            method: 'JSONP',
            url: "https://repository.library.brown.edu/api/search/",
            params: {
              'callback': 'JSON_CALLBACK',
              'q':query
            }
          });
        }
    }
  }])
  .factory('Presentations', 
           ['$resource',
    function($resource) { 
      return $resource('/api/programs/:id/',
                       {id: '@id'},
                       {"update": {method: "PUT"}}
                      );
    }])
  .factory('Slide', 
           ['$resource',
    function($resource) { 
      return $resource('/api/slides/:id/', {id: '@id'}); 
    }])

  //Controllers
  .controller('PresentationEditController',
              ['Presentations', '$state', '$stateParams', 'Repository',
       function(Presentations,   $state,   $stateParams,   Repository){
         var gotoPresentations = function(){
               $state.go('presentations');
         }

         var editor = this;
         editor.title = "Create a new presentation";
         editor.presentation = Presentations.get({id:$stateParams.presentationID});

         editor.repository_items=[];
         editor.searchItems = function(query){
            Repository.search(query).success(function(data){
              editor.repository_items = data.response.docs || [];
            });
         };
        editor.addSlide = function(){
          editor.presentation.slides.push({"durration":30});
        };
        editor.removeSlide = function(idx){
          editor.presentation.slides.splice(idx,1);
        };
        editor.save = function(){
          editor.presentation.$update().then(gotoPresentations);
        };
  }])
  .controller('PresentationViewController',
              ['Presentations', '$stateParams',
       function(Presentations,   $stateParams){
         this.presentation = Presentations.get({
           id:$stateParams.presentationID
         });
       }]
  )
  .controller('PresentationNewController',
              ['Presentations', '$state', 'Repository',
       function(Presentations,   $state,   Repository){
         var gotoPresentations = function(){
               $state.go('presentations');
         }

         var editor = this;
         editor.title = "Create a new presentation";
         editor.presentation = {slides:[]};

         editor.repository_items=[];
         editor.searchItems = function(query){
            Repository.search(query).success(function(data){
              editor.repository_items = data.response.docs || [];
            });
         };
        editor.addSlide = function(){
          editor.presentation.slides.push({"durration":30});
        };

        editor.save = function(){
          Presentations.save(editor.presentation, gotoPresentations);

        };
       }])
  .controller('PresentationListController',
              ['Presentations',
       function(Presentations){
         this.presentations = Presentations.query();
       }]
  );
 //.run([
    //'$http', 
    //'$cookies', 
    //function($http, $cookies) {
        //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    //}]);
