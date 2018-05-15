require('dotenv').config();

var traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal'),
    xappToken = process.env.xappToken;

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
api = traverson.from('https://api.artsy.net/api').jsonHal();

api.newRequest()
  .follow('artist')
  .withRequestOptions({
    headers: {
      'X-Xapp-Token': xappToken,
      'Accept': 'application/vnd.artsy-v2+json'
    }
  })

  // USE LISTBOX AND SEARCH BY ID OF LISTBOX FOR BIO, IMG, ETC
  .withTemplateParameters({ id: 'andy-warhol' })
  .getResource(function(error, andyWarhol) {
    
    console.log('Brief About: ' + andyWarhol.name + ' was born in ' + andyWarhol.birthday + ' in ' + andyWarhol.hometown + ".\r\r");

    console.log('Bio: ' + andyWarhol.biography + "\r\r");

    console.log('Img Src: ' + andyWarhol._links.thumbnail.href);
    // console.log(andyWarhol);
  });