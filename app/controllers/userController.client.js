'use strict';

(function () {

//clementine.js basic templete for profile picture and profile page
   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var action =  document.querySelector('#formdata') || null;
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, null, function (data) {
      var userObject = JSON.parse(data);
      var name;
      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
         // name = userObject['displayName'];
      } else {
         updateHtmlElement(userObject, displayName, 'username');
         // name =  userObject['username'];
      }

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
         name = userObject['id'];
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if (profileRepos !== null) {
         updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      }
      
      if (action !== null) {
         action.setAttribute('action', '/api/' + name+'/poll');
         
      }
   }));
})();
