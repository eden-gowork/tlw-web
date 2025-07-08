    console.log('postMessageToParent.js loaded.');
    var referrerValue =  window.document.referrer;
    console.log('window.document.referrer', referrerValue);
    var ancestorOriginsLength = window.location.ancestorOrigins.length;
    if (ancestorOriginsLength >= 1) {
        var ancestorOriginsValue = window.location.ancestorOrigins[0];
        var isAPP = (ancestorOriginsValue.indexOf('file') >= 0 || ancestorOriginsValue.indexOf('localhost') >= 0
                      || ancestorOriginsValue.indexOf('ionic') >= 0);
    }

    console.log('isAPP', isAPP);
    console.log('ancestorOriginsLength', ancestorOriginsLength);


    var LoyaltyApp = {};
    LoyaltyApp.postMessageToParent = function postMessageToParent(urlObj) {
      parent.postMessage(urlObj, '*');
    }

    if (isAPP) {
        var aElements = document.getElementsByTagName("a");
        for (var i = 0, length = aElements.length; i < length; i++) {
            var aHref = aElements[i].getAttribute('href');
            // console.log('href', aHref);
            if (aHref && aHref.indexOf('trplus') >= 0) {
                if (i == 0) {
                    console.info('binding href click event.')
                }
                aElements[i].addEventListener("click", function(e) {
                    var innerHref = this.getAttribute('href');
                    console.log('postMessageToParent', innerHref);
                    var urlObj = { type: 'URL', value: innerHref };
                    LoyaltyApp.postMessageToParent(urlObj);
                    e.preventDefault();
                });
            }
        }
        // remove google fonts
        var linkElements = document.getElementsByTagName("link");
        for (var j = 0, jLength = linkElements.length; j < jLength; j++) {
          var linkHref = linkElements[j].getAttribute('href');
          // console.log('linkHref', linkHref);
          if (linkHref.indexOf('fonts.googleapis.com') >= 0) {
            console.info('remove linkElements', linkElements[j]);
            linkElements[j].remove();
            j--;
            jLength--;
          }
        }

        // Remove all target="_blank" from links
        Array.from(document.querySelectorAll('a[target="_blank"]')).forEach(link => link.removeAttribute('target'));
    }

    var loadObj = { type: 'MSG', value: 'LOAD_FINISH' };
      parent.postMessage(loadObj, '*');

    var objTitle = document.querySelector('title');
    if(objTitle) {
        var edmObj = { type: 'EDM_TITLE', value: objTitle.innerText };
        console.log('edmObj', edmObj);
        parent.postMessage(edmObj, '*');
    }
