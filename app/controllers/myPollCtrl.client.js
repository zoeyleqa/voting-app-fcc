'use strict';

(function () {

   
   var table = document.querySelector('table');
   var tbody = document.querySelector('#qstnLst');
   var thead = document.querySelector('thead');
   
   var apiUrl = appUrl + '/api/:id/poll';
  
  //update if delete a poll
   	function updateVoteFace(data){
   	   var element = document.querySelector('#'+data.id);
   	   var row = element.parentNode.parentNode;
    	   row.parentNode.removeChild(row);
   	}
   
   function setVoteFace (data) {
      var acc = JSON.parse(data);
      
      var noTableHead = true;
      acc.github.pollList.forEach(function(element){
         if(noTableHead){
            var row = thead.insertRow(0);
            row.insertCell(-1).innerHTML = "Question";
            row.insertCell(-1).innerHTML = "Delete Poll";
            noTableHead = false;
         }
         var row = tbody.insertRow(-1);
         var temp = document.createElement("A");
         temp.setAttribute('href' , '/result/'+ element.id);
         temp.setAttribute('class' , 'question');
         temp.innerHTML = element.q;
         row.insertCell(-1).appendChild(temp);
         
         var delbtn = document.createElement("BUTTON");
         delbtn.setAttribute('class', 'btn btn-danger delbtn');
         delbtn.setAttribute('id', element.id);
         delbtn.innerHTML = "delete";
         row.insertCell(-1).appendChild(delbtn);
      });
         if(!noTableHead){      
         var delBtnList = document.querySelectorAll('.delbtn');
       
         delBtnList.forEach(function(b){
         
            b.addEventListener('click', function (e) {
            var theID = {id:e.currentTarget.id};
               ajaxFunctions.ajaxRequest('DELETE', apiUrl, theID, function () {
                  updateVoteFace(theID);
                  
               });
            }, false);
         });
         } else {
            table.appendChild(document.createTextNode("Nope, you have no poll."));
         }
         
      }
   
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl,null, setVoteFace));

   
})();
