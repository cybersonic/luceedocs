    ////Add functionality to the String object
    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (str){
       return this.indexOf(str) == 0;
      };
    }
    //
    //$(function() {
    //
    //  $( "#tags" ).autocomplete({
    //    source: availableTags,
    //    select: function( event, ui ) {
    //
    //            if(ui.item.value.startsWith("cf")){
    //              window.location = "/tag/" + ui.item.value;
    //            }
    //            else {
    //              window.location = "/function/" + ui.item.value;
    //            }
    //
    //            }
    //  });
    //
    //  //Start the popover!
    //
    //  //Check if we have shown them a popup!
    //
    //  //$('##beta').popover('show');
    //  $('#beta').popover();
    //  $('.poopy').popover();
    //});

    $(function(){
        $("#searchform").submit(function(event){
            event.preventDefault();
        });

        $("#searchresults").autocomplete({
            source : "/search/",
            select: function(event, ui){
                if(!ui.item.value){
                    return;
                }

                var selectedItem = ui.item.value;

                if(selectedItem.startsWith("cf")){
                    window.location = "/tag/" +  ui.item.value;
                }
                else if(selectedItem.split(".").length == 2){
                    var parts = selectedItem.split(".");

                    var type = parts[0];
                    var func = parts[1].replace(/\(\)/, "");

                    window.location = "/object/"+ type + "/" + func;
                }
                else {
                    window.location = "/function/" + ui.item.value;
                }

            }
        });


    });