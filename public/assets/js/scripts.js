
$(document).ready(() => {

    // Load listbox on home page, load dropdown button on artist view
    loadArtists();

    // Dropdown Toggle for Art View page button
    $('.dropdown-toggle').dropdown();

    // Submit button function on index
    $('#submitbutton').on('click', (evt) => {

        // Set id to clicked data-id
        var artist = $('#selector').find(':selected').attr('data-id');
        
        // if data-id exists (option added dynamically)
        if (artist) {
            
            // Go to artist page - calls api/db for info
            location.assign('api/artist/'+ artist);
        }
    });

    // Admin Login Button function from adminlogin
    $('#loginbutton').on('click', (evt) => {
        evt.preventDefault();
        
        var username = $('#username').val().trim();
        var enteredPW = $('#password').val().trim();
        
        // if no user name, display alert
        if (!username || !enteredPW) {
            $('#no-password-alert').show();

        // else post to api (for pw check)
        } else {
            $.ajax({
                url: '/api/admin/',
                type: 'POST',
                data: {
                    name: username,
                    password: enteredPW
                },
                dataType: 'json'

            }).then((result) => {

                // if return valid, permit entry
                if(result.valid === true) {
                    window.location.href = '/admin/entry';

                // else, throw alert u &| pw incorrect
                } else {
                    $('#wrong-password-alert').show();
                }
            });
        }
    });

    // Modal JS for artist view page (when user clicks on artist's work)
    $('img.port-img').on('click', (evt) => {
        evt.preventDefault();

        // set modal variables
        var modal = $('#artModal');
        var modalImg = $('#modalImg')
        var caption = $('#caption');

        // display modal
        $('.modal').css('display', 'block');

        // set img src to image clicked src
        modalImg.attr('src', evt.currentTarget.src);

        // add caption
        caption.html('<h1>' + $(evt.currentTarget).attr('alt') + 
        '</h1><br />' + '<h4> Currently showing at: <h4>') 
        
        // only show museum if available
        if ($(evt.currentTarget).attr('data-m') != 'NA') {
            caption.append('<h2>' + $(evt.currentTarget).attr('data-m') + '<h2>');
        }

        // append clicked img attributes to caption 
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
            caption.append('<h3><a href="' + $(evt.currentTarget).attr('data-m-website') + '" target="_blank">Plan Your Visit Today!</a></h3>');
        }
    });

    // close Modal
    $('.close').on('click', () => {
        $('.modal').css('display', 'none');
    });


    // Submit new art button function from admin - admintextentry
    $('#submit-new-art-button').on('click', (evt) => {
        evt.preventDefault();
        var title = $('#art_title').val().trim();
        var artist = $('#artist_name').val().trim();
        var url = $('#image_url').val().trim();
        var museum = $('#museum_name').val().trim();
        var address = $('#address').val().trim();
        var city = $('#city').val().trim();
        var state = $('#state').val().trim();
        var zip = $('#zipcode').val().trim();
        var phone = $('#phone').val().trim();
        var website = $('#website').val().trim();

        // if any fields aren't complete, display alert
        if (!title || !artist || !url || !museum || !address || !city || !state || !zip || !phone || !website) {
            $('#incomplete-alert').css('display', 'inherit');
            return;
        }

        // create newArt obj
        var newArt = {
            art_title: title,
            artist_name: artist,
            image_url: url,
            museum_name: museum,
            address: address,
            city: city,
            state: state,
            zipcode: zip,
            phone: phone,
            website: website
        }

        // call submitArt function
        submitArt(newArt);

    });

    // home button function on artist view page
    $('#home-button').on('click', evt => {
        evt.preventDefault();
        window.location.href='/';
    });

    // admin logout button from admintextentry
    $('#admin-logout').on('click', (evt) => {
        evt.preventDefault();
        window.location.href='/admin';
    });
    
    // FUNCTION to submit new art (by admin)
    function submitArt(Art) {
        $.post('/api/admin/post/', Art, (result) => {
            window.location.href='/admin/entry';
            alert(`${Art.art_title} added!`);
        });
    }
    
    // FUNCTION used to pull artist from db and display ('/') & (/api/artist/:artist_name)
    function loadArtists() {

        // call route to pull artists from db table
        $.get("/api/artists/", function (data) {

            // data will be artists array of objs
            var artists = data;

            // loop through array
            for(var i = 0; i < artists.length; i++) {
                    
                // FOR INDEX.HTML USE
                // build option (for '/')
                var newOpt = $('<option>');
                newOpt.attr('data-id', artists[i].artist_name).text(artists[i].artist_name);
                // append
                $('#selector').append(newOpt);


                // FOR /api/artist/:artist_name USE
                // artist current shown 
                var currentArtist = $(".artview-artist-name").text();

                // Do not include artist currently shown on page
                if (currentArtist != artists[i].artist_name) {
                    
                    // build li with anchor for art view (hndlbrs view)
                    var newLi = $('<li>');
                    newLi.attr('data-id', artists[i].artist_name);
                    var newLink = $('<a>');
                    newLink.attr("href", "/api/artist/" + artists[i].artist_name).text(artists[i].artist_name);
                    newLi.append(newLink);
                    // append to page
                    $('#dropdown-button').append(newLi);
                }
            }
        });
    }
});
    