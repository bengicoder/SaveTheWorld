(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', '$scope', admin]);

    function admin(common, $scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Admin';        
     
        activate();               

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
               
        }
      
        $scope.submit = function() {
           
            if(typeof $scope.trans === 'undefined'){
               
                log(document.getElementById('trans_rad6').value + ' Transportation Activated');
            }
            else{
               
                log($scope.trans.name + ' Transportation Activated'); 
            }
        
      };
        
    }
})();