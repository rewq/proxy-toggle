function proxySwitch() {
  browser.extension.isAllowedIncognitoAccess().then(function(value) {
    if (value) {
      browser.proxy.settings.get({}).then(function(fetched){
        let newSetting = fetched.value;
        console.log(fetched);
        if (newSetting.proxyType === "none") {
          // Turn on
          newSetting.proxyType = "manual"
          browser.proxy.settings.set({"value": newSetting});
          browser.browserAction.setIcon({path: "icons/icon-on.png"});
          //var setting = browser.proxy.settings.set({"value": newSetting});
          //setting.then(onSet);
        } else {
          // Turn off
          console.log("[Proxy Toggle] Off");
          newSetting.proxyType = "none";
          browser.proxy.settings.set({"value": newSetting});
          browser.browserAction.setIcon({path: "icons/icon-off.png"});
          browser.proxy.settings.clear({});
        }
      });
    } else {
      
      browser.browserAction.setPopup({
        "popup": "popup.html"
      });
      browser.browserAction.openPopup();
    }
  });
}

console.log("[Proxy Toggle] Extension Loaded");

browser.browserAction.onClicked.addListener(proxySwitch);