'use strict';

(function (){
 
        
// 		function copyToClipboard(element) {
// 		var $temp = $("<input>");
// 		 $("body").append($temp);
// 		  $temp.val($(element).text()).select();
// 		  document.execCommand("copy");
// 		  $temp.remove();
// 		}
        var host = window.location.protocol + "//" + window.location.host 
        + "/" ; 
		var arr = window.location.pathname.split('/');
		var url = host+arr[2]+"/vote/"+arr[3];
		document.querySelector("#link").setAttribute('value', url);
		document.querySelector('#takealook').setAttribute('href',url);
		// document.querySelector('#copybtn').addEventListener('click', function(){
		    
  //  		var text = document.getElementById('link').innerHTML;
  //  		// console.log(text);
  //  		text.select();
		//     document.execCommand('copy');
		//     alert("Copied the text: " + url.value);
		// });
		

})();