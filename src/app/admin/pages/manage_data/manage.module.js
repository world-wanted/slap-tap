(function() {
    'use strict';

    angular
        .module('adminapp.pages.manage', [
            'manage.products.module',
            'manage.coupon.module',
            'manage.users.module',
            'manage.emailtemplates.module',
            'manage.partners.module',
            'manage.experts.module',
            'manage.testusers.module'
        ]);
}());