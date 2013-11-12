/**
 * Created by Ryanl on 17/10/13.
 */
var clientflash = {

    show : function(){

        $("#flashmessages").empty()
        $.each(flashes, function(type,message){

            $.each(message, function(index, messageitem){
                $("#flashmessages").append('<div style="height:0px; padding-top:0px; padding-bottom:0px; margin:0px" class="alert alert-' + type + '">' +
                                                '<p>' + messageitem + '</p>' +
                                                '</div>');
            })

        })

        flashes = {};

        $(document).ready(function() {

            $("#flashmessages .alert").animate({
                height: "48px",
                opacity: "100",
                paddingTop: "15px",
                paddingBottom: "15px"
            }, 1000);

            setTimeout(function(){

                $("#flashmessages .alert").animate({
                    height: "0px",
                    opacity: "0",
                    paddingTop: "0px",
                    paddingBottom: "0px"
                }, 1000,"swing",function(){});

            },6000)

        })
    },

    flash : function(type, message){
        if(flashes[type] === undefined){
            flashes[type] = []
        }

        flashes[type].push(message)

        clientflash.show()
    }

}