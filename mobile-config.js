App.info({
    name: 'Meet Me at the Corner',
    description: 'Help find your friends and plan events.',
    author: 'Kevin Burton',
    website: 'http://kevinsapps.com',
    version: '0.1.0'
});

App.icons({
    'android_ldpi': 'resources/icons/android_ldpi.png',
    'android_mdpi': 'resources/icons/android_mdpi.png',
    'android_hdpi': 'resources/icons/android_hdpi.png',
    'android_xhdpi': 'resources/icons/android_xhdpi.png'
});

App.launchScreens({
    'android_ldpi_portrait': 'resources/splash/android_splash_ldpi.png',
    'android_mdpi_portrait': 'resources/splash/android_splash_mdpi.png'
});

App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');

App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
