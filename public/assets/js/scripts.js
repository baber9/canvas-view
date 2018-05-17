
$(() => {

    // Load drop-down list box on ready
    $(document).ready(() => {

        // call getArtists which returns array of artists names
        var artists = getArtists();

        // loop through array
        for(var i = 0; i < artists.length; i++) {
            // build option
            var newOpt = $('<option>');
            newOpt.attr('data-id', artists[i]).text(artists[i]);
            // append
            $('#selector').append(newOpt);
        }
    });


    // Submit button function
    $('#submitbutton').on('click', (evt) => {
        evt.preventDefault();
        // set id to clicked data-id
        var artist = $('#selector').find(':selected').attr('data-id');
        
        // if data-id exists (option added dynamically)
        if (artist) {
            console.log(artist);

            // INSERT CODE TO PULL ONE ARTIST


        }
        

    //     // update egg as devoured
    //     $.ajax('/api/eggs/' + id, {
    //         type: 'PUT',
    //         data: devouredState
    //     }).then(() => {
    //         // reload page to move to devoured column
    //         location.reload();
    //     });

    });

    // FUNCTION used to pull artist from db and add into array
    function getArtists() {
        $.get('/api/artists', (data) => {
            var artists = [];

            for(var i = 0; i < data.length; i++) {
                artists.push(data[i].name);
            }

            return artists;
        });
    }
});
    