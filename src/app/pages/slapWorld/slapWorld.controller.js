(function() {
    'use strict';

    angular
        .module('app.pages.slapWorld')
        .controller('SlapWorldController', SlapWorldController);

    /* @ngInject */
    function SlapWorldController($scope, $state, pageService, $window) {
        pageService
        .setPageTitle('SLAPworld');

        $scope.goToConnect = function() {
        	$window.open('https://connect.thankyousmallbusiness.com/');
        }

        $scope.goToConcierge = function() {
            window.open('/help','_blank');
            // $state.go('get-help');
			// var iframe = document.getElementById("_agile_parent_container_frame");
			// var elmnt = iframe.contentWindow.document.getElementById("agilecrm-button-chat");
			// elmnt.click();
        }

        $scope.goToBenefits = function() {
        	$state.go('slapBenefits')
        }

        $scope.goToChallenge = function() {
        	$state.go('slapChallenge');
        }
    }
}());