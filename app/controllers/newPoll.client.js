$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".opt-sect"); //Fields wrapper
    var add_button      = $(".btn-add"); //Add button ID
    
   
    
        
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<tr><td><p>Option</p></td>'
            +'<td  style="width:100%; display:block;" ><input type="text" name="opt"/>&nbsp&nbsp' 
            +'<a href="#" class="remove_field">x</a></td></tr>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); 
        $(this).parent('td').parent('tr').remove(); 
        x--;
    });
    

//   $('form').submit(function(event) {
//     event.preventDefault();
//     var dream = $('input').val();
//     console.log(dream);
//     $.post('/api/:id/poll' + $.param({dream: dream}), function() {
//       console.log(dream);
//       $('input').val('');
//       $('input').focus();
//     });
//   });
  
  
});