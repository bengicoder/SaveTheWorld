/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var watchID = null;
var gpsId = null;
var intervalId = null;
   

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //startWatch();
       // startGps();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


  function startWatch() {
                console.log('STARTING THE WATCH ......');
                var options = {frequency: 1000};
                watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
            }
            function stopWatch() {
                console.log('STOPPING THE WATCH ......');
                if (watchID) {
                    navigator.accelerometer.clearWatch(watchID);
                    watchID = null;
                }
            }
            function onSuccess(acceleration) {
                console.log('SUCCESSFUL ACCELERATION DETECTION ......');
                var elementx = document.getElementById('accelerometer-x');
                var elementy = document.getElementById('accelerometer-y');
                var elementz = document.getElementById('accelerometer-z');

                elementx.innerHTML = 'Acceleration X: ' + (acceleration.x/0.44704) + ' MPH<br />';
                         
                       // 'Timestamp: ' + acceleration.timestamp + '<br />';
                
                elementy.innerHTML = 'Acceleration Y: ' + (acceleration.y/0.44704) + ' MPH<br />';
                
                elementz.innerHTML = 'Acceleration Z: ' + (acceleration.z/0.44704) + ' MPH<br />';
            }
            function onError() {
                alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
            }
            
            function startGps(){
                console.log("Starting Gps current position service");
               // var gpsOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
               // gpsId = navigator.geolocation.getCurrentPosition(geolocationSuccess,
                                                //  geolocationError, gpsOptions);
                                                
             var gpsOptions = {maximumAge: 3000, enableHighAccuracy: true, timeout:10000 };
             
             intervalId =  window.setInterval(function(){
                    //console.log("Running Gps current position service");
                    gpsId = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, gpsOptions);
                }, 5000);                    
            }
            
            function stopGps() {
                console.log('STOPPING THE GPS Geolocation Loop');
                if (gpsId) {
                    navigator.geolocation.clearWatch(gpsId);
                    gpsId = null;
                }
                clearInterval(intervalId);
            }
            
            
            function geolocationSuccess(position){
                
                console.log('SUCCESSFUL GEOLOCATION DETECTION ......');
                
               
                var elementx = document.getElementById('accelerometer-x');
                var elementy = document.getElementById('accelerometer-y');
                var elementz = document.getElementById('accelerometer-z');
                
                elementx.innerHTML = (position.coords.speed/0.44704) + ' MPH'; 
                elementy.innerHTML = (position.coords.altitude*3.28)  + ' Feet'; 
                elementz.innerHTML = 'Latitude: '          + position.coords.latitude          + '<br />' +
              'Longitude: '         + position.coords.longitude         + '<br />';
                
               // console.info('POSITION OBJECT');
               // console.info(position);
               // position = angular.copy(position);
                               
                var element = document.getElementById('geolocation');
               
               element.innerHTML = 'Latitude: '          + position.coords.latitude          + '<br />' +
              'Longitude: '         + position.coords.longitude         + '<br />' +
              'Altitude: '          + position.coords.altitude          + '<br />' +
              'Accuracy: '          + position.coords.accuracy          + '<br />' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br />' +
              'Heading: '           + position.coords.heading           + '<br />' +
              'Speed: '             + position.coords.speed             + '<br />' +
              'Timestamp: '         + position.timestamp                + '<br />';
               
            }                        
            
            function geolocationError(error){
                alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
            }

app.initialize();