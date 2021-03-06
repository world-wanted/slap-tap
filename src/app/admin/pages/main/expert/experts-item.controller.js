(function () {
    'use strict';

    angular
        .module('manage.experts.module')
        .controller('expertsItemController', expertsItemController);

    /* @ngInject */
    function expertsItemController($scope, expertService, coupons, pageService, productsService, couponService, toaster, $stateParams, $state, Upload, CONFIG, userService) {

        angular.extend($scope, {
            expert: {},
            personalities: [
                "Tough",
                "Empathetic",
                "Sincere",
                "Direct",
                "Casual",
                "Structured",
                "Business-like",
                "Social",
                "Advisor",
                "Partner"
            ],
            expertId: $stateParams.expert_id,
            coupons: coupons,
            image: null,
            originalImage: null,
            imageFileName: null,
            avatar_file: null,
            is_calendar_setup_available: true,
            //deleteItem: deleteItem,
            Upload: Upload,
            createOrSave: createOrSave,
            fileUpload: fileUpload,
            isCalendarSetupAvailable: isCalendarSetupAvailable,
            setupCalendarAvailability: setupCalendarAvailability,
            isValid: isValid
        });
        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({ name: 'Experts', path: 'experts.list' });
        if (!$scope.expertId) {
            pageService
                .addCrumb({ name: 'Add', path: 'experts.item' })
                .setPageTitle('Create Expert');
            $scope.expert = {
            };
        } else {
            expertService.get($scope.expertId).then(function (response) {
                $scope.expert = response.data;
                pageService
                    .addCrumb({ name: $scope.expert.name + ' ' + $scope.expert.lastName, path: 'experts.list' })
                    .setPageTitle('Edit Expert');
            });
        }
        activate();
        function activate() {
            userService.getUser()
            .then(function(user){
                expertService.getExpertWithUserId(user._id)
                .then(function(res) {
                    $scope.expert = res.data;
                    if ($scope.expert && $scope.expert.avatarId) {
                        $scope.originalImage = CONFIG.api + "/v1/user/avatar/" + $scope.expert.avatarId; 
                        $scope.image = CONFIG.api + "/v1/user/avatar/" + $scope.expert.avatarId;                        
                    }
                })    
            })
        }
        function createOrSave(event) {
            if (!$scope.isValid()) {
                return;
            }            
            if ($scope.image != $scope.originalImage) {
                $scope.Upload.upload({
                    url: CONFIG.api + '/admin/uploadAvatar',
                    data: { avatar: $scope.avatar_file }
                }).then(function (resp) {
                    $scope.expert.avatarId = resp.data;
                    update().then(function () {
                        toaster.pop({ type: 'success', body: 'Profile Updated!', timeout: 1000 });
                        $state.go('slapsters.list');
                    }).catch(function (err) {
                        toaster.pop({ type: 'error', body: err.data.message });
                    });

                    }, function (response) {
                    }, function (evt) {
                });                
            }
            else {
                update().then(function () {
                    toaster.pop({ type: 'success', body: 'Expert Saved!', timeout: 1000 });
                    $state.go('slapsters.list');
                }).catch(function (err) {
                    toaster.pop({ type: 'error', body: err.data.message });
                });
            }

        }

        function isValid() {
            if ($scope.expert.personality1 == $scope.expert.personality2 || $scope.expert.personality1 == $scope.expert.personality3 || $scope.expert.personality2 == $scope.expert.personality3) {
                toaster.pop({type: 'error', body: 'You must choose 3 different Personality/Expert Style Words.  Please go back and update your choices.'});                
                return false;
            }
            return true;
        }


        function fileUpload(event) {
            $('.avatar-file').click();
        }
        function update() {
            if ($scope.expert._id) {
                return expertService.update($scope.expert);
            } else {
                return expertService.add($scope.expert);
            }
        }

        function isCalendarSetupAvailable() {
            return $scope.is_calendar_setup_available;
        }

        function setupCalendarAvailability() {
            $scope.is_calendar_setup_available = true;
        }
    }
}());