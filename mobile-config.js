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
    'android_ldpi_portrait': 'resources/splash/drawable-ldpi/screen.png',
    'android_ldpi_landscape': 'resources/splash/drawable-land-ldpi/screen.png',
    'android_mdpi_portrait': 'resources/splash/drawable-mdpi/screen.png',
    'android_mdpi_landscape': 'resources/splash/drawable-land-mdpi/screen.png',
    'android_hdpi_portrait': 'resources/splash/drawable-hdpi/screen.png',
    'android_hdpi_landscape': 'resources/splash/drawable-land-hdpi/screen.png',
    'android_xhdpi_portrait': 'resources/splash/drawable-xhdpi/screen.png',
    'android_xhdpi_landscape': 'resources/splash/drawable-land-xhdpi/screen.png'
});

App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');

App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
App.accessRule('*.kevinsapps.com/*');
