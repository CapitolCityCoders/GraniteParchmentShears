
  function statusChangeCallback(response) {

    if (response.status === 'connected') {
      //retrive the photo for the for fb user
      getPhoto();
      //retrive the name and id of the fb user
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      sessionStorage.removeItem('imgUrl')
      sessionStorage.removeItem('fbUser')
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Login with Facebook';
        // very small image that can not be seen
      // document.getElementById('img').src ="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '269345560105374',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI() {
    //api call to retrive name and id
    FB.api('/me', function(response) {
      sessionStorage.setItem('fbUser', response.name)

      document.getElementById('status').innerHTML =
        'Welcome to Rock Shop ' + response.name + '!';
    });
  }

   function getPhoto() {
    // api call to retrive a large profile image for user
    FB.api('/me/picture?type=large', function(response) {
      sessionStorage.setItem('imgUrl', response.data.url);
    });
  }
