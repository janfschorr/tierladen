(function(angular) {
    'use strict';
    angular.module("tierladenApp.controllers", []);
    angular.module("tierladenApp.services", []);
    angular.module("tierladenApp", [
        "ngResource",
        "tierladenApp.controllers",
        "tierladenApp.services"
    ]);
}(angular));