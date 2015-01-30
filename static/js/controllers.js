angular
  .module('dgApp.controllers', ['ngResource', 'ui.router', 'ui.select'])
  //Configurations
  .config(['$resourceProvider',
   function($resourceProvider) {
     $resourceProvider.defaults.stripTrailingSlashes = false;
   }])
  .config(['$httpProvider',
   function($httpProvider) { 
    $httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs }}';
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
      return $resource('/api/presentations/:id/', {id: '@id'});
    }])
  .factory('Slide', 
           ['$resource',
    function($resource) { 
      return $resource('/api/slides/:id/', {id: '@id'}); 
    }])

  //Controllers
  .controller('PresentationEditController',
              ['Presentations', '$stateParams', 'Repository', '$scope',
       function(Presentations,   $stateParams,   Repository,   $scope){
         var editor = this;
    editor.presentation = Presentations.get({id:$stateParams.presentationID});
    editor.repository_items=[];
    editor.searchItems = function(query){
      Repository.search(query).success(function(data){
        editor.repository_items = data.response.docs || [];
        console.log(editor.repository_items );
      });
    };
    editor.addSlide = function(){
      editor.presentation.slides.push({"durration":30});
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
              ['Presentations',
       function(Presentations){
         this.presentations = Presentations.query();
       }])
  .controller('PresentationListController',
              ['Presentations',
       function(Presentations){
         this.presentations = Presentations.query();
       }]
  );
