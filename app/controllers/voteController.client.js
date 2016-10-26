'use strict';

(function () {

   
   var question = document.querySelector('.question');
   var optsect = document.querySelector('.optsect');
   var container = document.querySelector('.btn-container');
   var arrtmp = window.location.pathname.split('/');
   var apiUrl = appUrl + '/api/'+arrtmp[1] 
                        +'/vote/'+arrtmp[3];
   
   var colorwheel = ['rgba(255, 102, 102, 0.8)', //salmon
                     'rgba(54, 162, 235, 0.8)', //blue
                     'rgba(255, 206, 86, 0.8)', //yel
                     'rgba(102, 255, 102, 0.8)', //lightgrean
                     'rgba(153, 102, 255, 0.6)', //pur
                     'rgba(152, 230, 230, 0.8)', //skyblue
                     'rgba(204, 0, 102, 0.6)', //darkpink
                     'rgba(133, 173, 173, 0.8)', //grey
                     'rgba(255, 102, 0, 0.6)',//orange
                     'rgba(0, 128, 128, 0.6)' //teal  
                     ] 

//after voting, take away choices and replace with the pie chart
   	function updateVoteFace(data){
   	   var dataObj = JSON.parse(data);  
   	   
   	   var arrNum = [], arrLegend = [];
   	   dataObj.a.forEach(function(element) {
   	       arrNum.push(element.numVote);
   	       arrLegend.push(element.opt);
   	   });
   	   
   	   container.parentNode.removeChild(container);
       
         // For a pie chart
         
         var ctx = document.getElementById('myChart').getContext('2d');
         data = {
            datasets: [{
               data: arrNum,
               backgroundColor: colorwheel.splice(0, arrNum.length)
            }],

         // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: arrLegend
            
            
         };
      
      // console.log('chart');
      var myPieChart = new Chart(ctx,{
         type: 'doughnut',
         data: data,
         options: {
            legend: {
               display: true,
               position: 'bottom'
            }
         }
      });
      
      
      
      
   }
   
//set vote page with choices as buttons
   function setVoteFace (data) {
      var voteData = JSON.parse(data);
      question.innerHTML = voteData.q;

      voteData.a.forEach(function(element){
         var temp = document.createElement("INPUT");
         temp.setAttribute('type' , 'submit');
         temp.setAttribute('name' , 'opt');
         temp.setAttribute('value' , element.opt);
         temp.innerHTML = element.opt;
         temp.setAttribute('class' , 'btn-vote');
         optsect.appendChild(temp);
      });
      
         //add buttons for choices
         var voteBtnList = document.querySelectorAll('.btn-vote');
         
         voteBtnList.forEach(function(b){
         b.addEventListener('click', function (e) {
         
         //sending value to the db to increment the choice
         ajaxFunctions.ajaxRequest('POST', apiUrl, 
                        { value : e.currentTarget.value } ,  function () {
            //update the page with the result pie chart               
            ajaxFunctions.ajaxRequest('GET', apiUrl,null,  updateVoteFace);
      
         });
   }, false);
         });
   }
   
//set the vote page on load   
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl,null, setVoteFace));
   
   
   
})();
