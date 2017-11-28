const app = angular.module('pirateApp', ['ngAnimate', 'ngRoute']);

app.config(function config($locationProvider, $routeProvider) {
    $routeProvider.
    when('/', {
      template: '<pirate-list></pirate-list>'
  }).
    when('/pirates/:pirateId', {
      template: '<pirate-detail></pirate-detail>'
  }).
    otherwise('/');
}
);

app.component('pirateDetail', {
    templateUrl: '/js/pirate-detail.template.html',
    controller:  function PirateDetailController($http, $routeParams) {
        $http.get('/api/pirates/' + $routeParams.pirateId)
        .then((response) => this.pirate = response.data);

        this.savePirate = (pirate, pid) => {
            $http.put('/api/pirates/' + pid, pirate)
            .then((res) => this.editorEnabled = false )
        }

        this.back = () => window.history.back();

        this.editorEnabled = false;
        this.toggleEditor = () => this.editorEnabled = !this.editorEnabled;
    }
})

app.component('pirateList', {
    templateUrl: '/js/pirate-list.template.html' ,
    controller: function PirateAppController($http, $scope){
        $http.get('/api/pirates').
        then( (res) => {
            $scope.pirates = res.data;
        })

        $scope.deletePirate = function(index, pid) {
            $http.delete('/api/pirates/' + pid)
            .then( () => $scope.pirates.splice(index, 1))
        }

        $scope.addPirate = function(data){
            $http.post('/api/pirates', data)
            .then( (res) => {
                $scope.pirates.push(res.data)
                $scope.pirate = {}
            })
        }
    }
})
















