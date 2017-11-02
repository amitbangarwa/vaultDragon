angular.module('vault', ['ngRoute', 'ngToast'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'home',
                controller: 'homeCtrl'
            }).otherwise({
                redirectTo:'/'
            })
    }])
    .controller('homeCtrl', ['$scope', '$http', 'ngToast', function ($scope, $http, ngToast) {
        function init() {
            $scope.showForm = false;
            $scope.showValueField = false;
            $scope.showTable = false;
        }
        init();
        $scope.getAll = function () {
            init();
            $http.get('/api/object').then(function successCallback(response) {
                let data = response.data;
                $scope.object = {};
                $scope.showTable = true;
                $scope.objects = data.data;
                ngToast.create(data.message);
            }, function errorCallback(err) {
                ngToast.create(err.data);
            });
        };
        $scope.generic = function (object) {
            if (object.hasOwnProperty('value')) {
                $http.post('/api/object', object).then(function successCallback(response) {
                    let data = response.data;
                    $scope.object = {};
                    if (typeof data.data !== 'number') {
                        $scope.showTable = true;
                        $scope.objects = data.data;
                    }
                    ngToast.create(data.message);
                }, function errorCallback(err) {
                    ngToast.create(err.data);
                });
            } else {
                $http.get('/api/object/' + object.key).then(function successCallback(response) {
                    let data = response.data;
                    $scope.object = {};
                    $scope.showTable = true;
                    $scope.objects = data.data;
                    ngToast.create(data.message);
                }, function errorCallback(err) {
                    ngToast.create(err.data);
                });
            }
        };
        $scope.toggle = function (str) {
            if (str === 'key') {
                $scope.showForm = true;
                $scope.showValueField = false;
                $scope.showTable = false;
            } else {
                $scope.showForm = true;
                $scope.showValueField = true;
                $scope.showTable = false;
            }
        }
    }]);