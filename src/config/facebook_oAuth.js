export const initFbsdk = () => {
  return new Promise((resolve) => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: process.env.VUE_APP_FACEBOOK_ID,
        cookie: true,
        xfbml: false,
        version: 'v8.0'
      })
      resolve(window.FB)
    };
    (function (d, s, id) { // eslint-disable-line func-names
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}