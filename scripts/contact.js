$(document).ready(function () {
	
    $("#submit").on("click", function() {
    
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val(); 
        
        $.ajax({
        
            url: "mail.php",
            type: "post",

            data: {
                "name": name,
                "email": email,
                "message": message
            },

            success: function(data) {
                $(".result").html(data);
                if ($("#name").val() != '' && $("#email").val() != '' && $("#message").val() != '') {
                    $("#name").val(''), $("#email").val(''), $("#message").val('');
                }
            } 
        });
    });
    
});