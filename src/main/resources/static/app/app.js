(function(angular) {
    'use strict';
    angular.module("tierladenApp.controllers", []);
    angular.module("tierladenApp.services", []);
    angular.module("tierladenApp.pet", []);
    angular.module("tierladenApp", [
        "ngResource",
        "tierladenApp.pet",
        "tierladenApp.controllers",
        "tierladenApp.services"
    ]);
}(angular));