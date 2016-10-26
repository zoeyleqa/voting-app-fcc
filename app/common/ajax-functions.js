'use strict';

var appUrl = window.location.origin;
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   
   //use ajax request to make xmlhttprequest to send data to db
   ajaxRequest: function ajaxRequest (method, url,data, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      
      if(data){
         xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
         // console.log(JSON.stringify(data));
         xmlhttp.send(JSON.stringify(data));
      } else {
         xmlhttp.send();
      }
   }
};