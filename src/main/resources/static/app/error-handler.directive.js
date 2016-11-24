(function (angular) {
    'use strict';
    var ErrorHandlerDirective = function () {
        var controller = ['$scope', function ($scope) {

            $scope.reset = function () {
                $scope.errs = [];
            };

            // FIXME use one way function binding instead
            var watchRef = $scope.$watch("resetOn", function (newVal, oldVal) {
                if (newVal && oldVal && oldVal != "" && oldVal != newVal) {
                    $scope.reset();
                    watchRef(); // deregistering watch
                }
            });
        }];
        return {
            restrict: 'E',
            scope: {
                errs: "=",
                resetOn: "="
            },
            templateUrl: 'app/error-handler.directive.html',
            controller: controller
        };
    };
    ErrorHandlerDirective.$inject = [];

    angular
        .module("tierladenApp")
        .directive("tlError", ErrorHandlerDirective);
}(angular));