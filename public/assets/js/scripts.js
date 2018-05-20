
$(document).ready(() => {

    // Load listbox
    loadArtists();

    // Submit button function ('/')
    $('#submitbutton').on('click', (evt) => {
        // evt.preventDefault();
        // set id to clicked data-id
        var artist = $('#selector').find(':selected').attr('data-id');
        
        // if data-id exists (option added dynamically)
        if (artist) {
            console.log(artist);

            // call route to pull artists from db table
            // $.get("/api/artist/" + artist);
            location.assign('api/artist/'+ artist);
        }
    });

    // Admin Login Button function ('/admin')
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

    // Modal JS for artist page (/artist)
    $('img.port-img').on('click', (evt) => {
        evt.preventDefault();
        var modal = $('#artModal');
        var modalImg = $('#modalImg')
        var caption = $('#caption');
        $('.modal').css('display', 'block');
        modalImg.attr('src', evt.currentTarget.src);
        caption.html('<h1>' + $(evt.currentTarget).attr('alt') + 
        '</h1><br />' + '<h4> Currently showing at: <h4>') 
        
        // only show museum if available
        if ($(evt.currentTarget).attr('data-m') != 'NA') {
            caption.append('<h2>' + $(evt.currentTarget).attr('data-m') + '<h2>');
        }

        caption.append('<h3>' + $(evt.currentTarget).attr('data-m-street') + '<br />' + 
        $(evt.currentTarget).attr('data-m-city') + ', ' + 
        $(evt.currentTarget).attr('data-m-state') + '  ' + 
        $(evt.currentTarget).attr('data-m-zip') + '</h3>');

        // only show museum phone if available
        if ($(evt.currentTarget).attr('data-m-phone') != 'NA') {
            caption.append('<h3>' + $(evt.currentTarget).attr('data-m-phone') + '</h3>');
        }

        // only offer ticket purchase if website available
        if ($(evt.currentTarget).attr('data-m-website') != 'NA') {
            caption.append('<h3><a href="' + $(evt.currentTarget).attr('data-m-website') + '" target="_blank">Buy Tickets Now</a></h3>');
        }
    });


    // close Modal
    
    $('.close').on('click', () => {
        $('.modal').css('display', 'none');
    });
    
    
    
    // FUNCTION used to pull artist from db and add into array ('/')
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
    