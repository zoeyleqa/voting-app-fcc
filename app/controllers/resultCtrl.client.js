'use strict';

(function () {
   
   //get question
   var question = document.querySelector('.question');
   var arrtmp = window.location.pathname.split('/');
   // console.log(arrtmp);
   var apiUrl = appUrl + '/api/:id/vote/'+arrtmp[2];
   
   //assume the max choices are 10
   var colorwheel = ['rgba(255, 102, 102, 0.8)', //salmon
                     'rgba(54, 162, 235, 0.8)', //blue
                     'rgba(255, 206, 86, 0.8)', //yel
                     'rgba(102, 255, 102, 0.8)', //lightgreen
                     'rgba(153, 102, 255, 0.6)', //pur
                     'rgba(152, 230, 230, 0.8)', //skyblue
                     'rgba(204, 0, 102, 0.6)', //darkpink
                     'rgba(133, 173, 173, 0.8)', //grey
                     'rgba(255, 102, 0, 0.6)',//orange
                     'rgba(0, 128, 128, 0.6)' //teal  
                     ] 

 //seting the page
   	function setVoteFace(data){
   	   var dataObj = JSON.parse(data);  
   	   question.innerHTML = dataObj.q;
         
   	   var arrNum = [], arrLegend = [];
   	   dataObj.a.forEach(function(element) {
   	       arrNum.push(element.numVote);
   	       arrLegend.push(element.opt);
   	   });
   	   
   	   
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
   


   //get poll stat and send to setVoteFace function on load
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, null, setVoteFace));

   //copy btn still has bugs
//copy link btn, get link from db then set attribute to copy btn
   ajaxFunctions.ajaxRequest('GET', '/api/:id', null, function(user){
      var data = JSON.parse(user);
      var link = document.querySelector("#link");
      link.setAttribute("value", appUrl+"/"+ data.id+"/vote/"+arrtmp[2]);

      });
   
})();
