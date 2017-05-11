(function() {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('YourYearGoalController', YourYearGoalController);

    function YourYearGoalController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Year Goal');
    }
}());