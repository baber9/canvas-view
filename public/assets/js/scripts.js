
$(document).ready(() => {

    // Load listbox
    loadArtists();

    // Submit button function
    $('#submitbutton').on('click', (evt) => {
        evt.preventDefault();
        // set id to clicked data-id
        var artist = $('#selector').find(':selected').attr('data-id');
        
        // if data-id exists (option added dynamically)
        if (artist) {
            // console.log(artist);

            // call route to pull artists from db table
            $.get("/api/artist/:artist", function (data) {
                console.log(data);
                // create handlebars obj
                var hbsObject = {
                    artist: data
                }

                data.render('index', hbsObject);

            });
        }
    });

    // Admin Login Button function
    $('#loginbutton').on('click', (evt) => {
        evt.preventDefault();
        var username = $('#username').val().trim();
        var enteredPW = $('#password').val().trim();
        
        if (username && enteredPW) {
            $.ajax({
                url: '/api/admin/',
                type: 'POST',
                data: {
                    name: username,
                    password: enteredPW
                },
                dataType: 'json'

            }).then((result) => {
                if(result.valid) {
                    console.log('you are in!');
                } else {
                    console.log('try again!');
                    window.location.href = "/admin"
                }
            });

        } else {
            // username/pw req
            console.log('username & pw required');
        }
    });

    // FUNCTION used to pull artist from db and add into array
    function loadArtists() {

        // call route to pull artists from db table
        $.get("/api/artists/", function (data) {

            // data will be artists array of objs
            var artists = data;

            // loop through array
            for(var i = 0; i < artists.length; i++) {
                // build option
                var newOpt = $('<option>');
                newOpt.attr('data-id', artists[i].artist_name).text(artists[i].artist_name);
                // append
                $('#selector').append(newOpt);
            }
        });
    }
});
    