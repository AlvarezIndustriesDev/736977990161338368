(function(w, d, s, id) {
    w.PUBX = w.PUBX || {
      pub: "fit_gal_ri",
      discover: false,
      lazy: true
    };
    var js, pjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.async = true;
    js.src = "//main.pubexchange.com/loader.min.js";
    pjs.parentNode.insertBefore(js, pjs);
  }(window, document, "script", "pubexchange-jssdk"));
  /*
  (function(s, u, m, o, j, v) {
    j = u.createElement(m);
    v = u.getElementsByTagName(m)[0];
    j.async = 1;
    j.src = o;
    j.dataset.sumoSiteId = '292bcff2270f0c8b2fb1c41d528dab6b000bc120aa040e4eb5b53950a8be7cbf';
    v.parentNode.insertBefore(j, v)
  })(window, document, 'script', '//load.sumo.com/'); */
  
  // method that checks to see if user is on mobile device
  var isMobile = function() {
    //console.log("Device: " + navigator.userAgent);
    return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
  };
  
  var jsonData; // initialize variable
  var pageLoaded = false;
  
  // custom code begins here -----------------------------------------------------------------------------------
  //init(); //Start the code when the page loads
  // redirectInit(); // method called to initialize redirect function
  checkBlog(); // method called to check if current page is blog page
  //handleTrendingCarousel(); // method called to modify "trending" carousel in home page
  
  // method called to initialize redirect function
  /*
  function redirectInit() {
    // method to check if gallery exists
    var checkElement = setInterval(function() {
      if (document.getElementsByClassName("sqs-gallery-design-grid").length) {
        clearInterval(checkElement); // stop the loop
        addEventListeners(); // call method to add event listeners to product tiles
      }
    }, 100);
  }
  */
  
  // method that checks if current page is "blog" page
  function checkBlog() {
    // execute if the page contains a blog list filter
    if (document.getElementsByClassName("BlogList-filter").length) {
      var blogFilters = document.getElementsByClassName("BlogList-filter"); // initialize and declare elements with blog filter class
  
      // loop through elements with blog filter class
      for (var i = 0; i < blogFilters.length; i++) {
        var string = blogFilters[i].innerText.split(" "); // initialize and declare blog filter text in array format
        var newString; // initialize new string
  
  
        // execute if first word contains the word "POSTS"
        if (string[0] == "POSTS") {
          string.splice(0, 1, 'STORIES'); //removes first word and replaces with STORIES
          newString = string.join(" "); //converts the array in string adding spaces
          blogFilters[i].innerText = newString; // replaces the original text with the new one
        }
      }
  
    }
    // console.log("First time running function...");
    // Actual function runs below this line
    // -----------------------------------------------------------------------
    // location.pathname.split("/"); returns an array containing all the URL parts
    var pathName = location.pathname.split("/")[1]; // initialize and retrieve current URL pathname
    var secondaryPathName = location.pathname.split("/")[2]; // initialize and retrieve current URL pathname after "/blog/"
  
    var extraPathName; // initialize extra path name variable
  
    // execute if URL has parameters
    if (location.href.split("?")[1]) {
      //console.log("Exists!", location.href.split("?"));
      extraPathName = location.href.split("?")[1].split("="); // initialize and retrieve current parameter after "/blog/"
      // console.log(authorPathName);
    }
  
    // console.log("Other pathname: ", secondaryPathName);
    // console.log("Path name:", pathName);
    // execute if current page has "blog" (or "feels-good") path in URL
    if (pathName == "blog" && secondaryPathName) {
      // console.log(location.href);
      var formattedURL; // initialize formatted URL variaWble
      var urlHasParameters = checkForParameters(location.href); // call method to check if current URL has parameters
  
      // execute if not on mobile device
      if (!isMobile()) {
        console.log("Not mobile");
        insertAdSidebar();
      }
  
      // execute if page is article page (pathname exists after "/blog/")
      /*
        if (secondaryPathName == "narcissistic-mother") {
          insertPinterestButtons();
        }
          */
      // checkForExternalLinks(); // method called to check if anchor tags (links) found in document are external
  
      // execute if URL has parameters
      if (urlHasParameters) {
        formattedURL = location.href + "&format=json"; // set formatted URL variable to current link and add json format parameter to end
        // execute if URL has no parameters
      } else {
  
        // check if url contains question mark
        if (location.href.indexOf("?") !== -1 && location.href.split('?')[1] == "") {
          console.log("[PARAMETERS]: Url contains ? & white space...trimming ? from url");
          formattedURL = location.href + "format=json"; // set formatted URL variable to current link and create json format parameter and add to end
        } else {
          formattedURL = location.href + "?format=json"; // set formatted URL variable to current link and create json format parameter and add to end
        }
      }
  
      insertImageButtons();
      console.log("Formatted URL:", formattedURL);
      // method to retrieve page in JSON format
      $.ajax({
        url: formattedURL,
        success: function(result) {
  
          callback(result); // method called to assign ajax result to variable
  
          // console.log(result);
          // execute if page has category filter
          if (result['categoryFilter']) {
            // console.log("Filter name:", result['categoryFilter']);
            // checkInArray(result['categoryFilter'], articlesForEmbed); // method called to check if element exists in articles array
  
            // NOTE: Execute checkForExternalLinks function for articles that are categorized under "Feel Good(s)"
            if (result['categoryFilter'] == "Feel Good(s)") {
              checkForExternalLinks(true); // method called to check if anchor tags (links) found in document are external and apply no-follow property
  
              // execute if article is feel good(s) and matches second parameter name
              /*if (secondaryPathName == "revolve-dresses") {
                    insertAdvertisements(true);
              }*/
  
              insertAdvertisements(true);
              
              // execute if insert custom disclaimer text variable is true
              if (insertCustomDisclaimerText == true) {
                console.log("[CUSTOM DISCLAIMER TEXT]", "Insert custom disclaimer...");
                var currentText = "Every editorial product is independently selected. If you purchase something through our linked recommendations, our partner(s) may provide a portion of the revenue to I AM Media.";
                
                var elementsInArray = $("article em:contains('Every editorial product')");
                
                console.log("[CUSTOM DISCLAIMER TEXT]", elementsInArray);
                
                 // execute if disclaimer element exists in DOM
                if (elementsInArray.length > 0) {
                  console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist?");
                  for (var i = 0; i < elementsInArray.length; i++) {
                    console.log("[CUSTOM DISCLAIMER TEXT]", $(elementsInArray[i]).text());
                    if ($(elementsInArray[i]).text() == currentText) {
                      console.log("[CUSTOM DISCLAIMER TEXT]", "Current text matches!");
                      $(elementsInArray[i]).text(newDisclaimerText);
                    }
                    } // end for loop
                // execute if disclaimer element does not exist in DOM
                } else {
                  console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist!");
                  var disclaimerHTML = "<div class='sqs-block spacer-block sqs-block-spacer new-custom-article-sqs-block'><div class='sqs-block-content sqs-intrinsic' style='padding-bottom: 0.157729%;'>&nbsp;</div></div><div class='sqs-block html-block sqs-block-html new-custom-article-sqs-block'><div class='sqs-block-content'><p style='white-space:pre-wrap;'><em>" + newDisclaimerText + "</em></p></div></div>";
                  console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer not found");
                  $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12").append(disclaimerHTML);
                } // end if statement
              } // end if statement
  
            } else {
              checkForExternalLinks(false); // method called to check if anchor tags (links) found in document are external
  
              // executeif article matches second parameter name
              /* if (secondaryPathName == "revolve-dresses") {
                    insertAdvertisements(false);
              }*/
  
              insertAdvertisements(false);
  
            }
  
            insertCustomHTML(result['categoryFilter']); // method called to insert custom HTML
  
            // execute if page does not have category filter parameter
          } else if (result['item']['categories']) {
            // console.log(result['item']['categories']);
            var categoryArray = result['item']['categories']; // initialize and declare variable
            var checked = false; // initialize and declare variable to false
  
            var insertNoFollowLinks = categoryArray.some(function(item) {
              return item === "Feel Good(s)";
            }); // filter through category array and return true if "Feel Good(s)" category is returned
  
            // console.log("Add no follow: ", insertNoFollowLinks);
  
            // execute if insertNoFollowLinks returns true
            if (insertNoFollowLinks) {
              checkForExternalLinks(true); // method called to check if anchor tags (links) found in document are external and apply no-follow property
  
              // execute if article is feel good(s) and matches second parameter name
              /*if (secondaryPathName == "revolve-dresses") {
                    insertAdvertisements(true);
              }*/
  
              insertAdvertisements(true);
              
              // execute if insert custom disclaimer text variable is true
              if (insertCustomDisclaimerText == true) {
                console.log("[CUSTOM DISCLAIMER TEXT]", "Insert custom disclaimer...");
                var currentText = "Every editorial product is independently selected. If you purchase something through our linked recommendations, our partner(s) may provide a portion of the revenue to I AM Media.";
                
                var elementsInArray = $("article em:contains('Every editorial product')");
                
                console.log("[CUSTOM DISCLAIMER TEXT]", elementsInArray);
                
                // execute if disclaimer element exists in DOM
                if (elementsInArray.length > 0) {
                  console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist?");
                  for (var i = 0; i < elementsInArray.length; i++) {
                    console.log("[CUSTOM DISCLAIMER TEXT]", $(elementsInArray[i]).text());
                    if ($(elementsInArray[i]).text() == currentText) {
                      console.log("[CUSTOM DISCLAIMER TEXT]", "Current text matches!");
                      $(elementsInArray[i]).text(newDisclaimerText);
                    }
                    } // end for loop
                // execute if disclaimer element does not exist in DOM
                } else {
                  console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist!");
                  var disclaimerHTML = "<div class='sqs-block spacer-block sqs-block-spacer new-custom-article-sqs-block'><div class='sqs-block-content sqs-intrinsic' style='padding-bottom: 0.157729%;'>&nbsp;</div></div><div class='sqs-block html-block sqs-block-html new-custom-article-sqs-block'><div class='sqs-block-content'><p style='white-space:pre-wrap;'><em>" + newDisclaimerText + "</em></p></div></div>";
                  console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer not found");
                  $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12").append(disclaimerHTML);
                } // end if statement
                
              } // end if statement
  
              // execute if insertNoFollowLinks returns false
            } else {
              checkForExternalLinks(false); // method called to check if anchor tags (links) found in document are external
  
              // execute if article is feel good(s) and matches second parameter name
              /* if (secondaryPathName == "revolve-dresses") {
                    insertAdvertisements(false);
              } */
  
              insertAdvertisements(false);
  
            }
  
            // loop through result array
            for (var i = 0; i < categoryArray.length; i++) {
              console.log("[CHECK BLOG] Category Array:", categoryArray);
              var existsInArticlesForEmbed = articlesForEmbed.some(function(item) {
                return item === categoryArray[i];
              }); // filter through articlesForEmbed array and return true if article category exists
  
              // execute if article category exists in articlesForEmbed array and checked is false
              if (existsInArticlesForEmbed && !checked) {
                console.log("[CHECK BLOG] Insert the following category for breadcrumb:", categoryArray[i]);
                insertCustomHTML(categoryArray[i]); // method called to insert custom HTML
                checked = true; // set value to true
              }
            }
  
            // execute if article category does not exist in articlesForEmbed array
            if (!checked) {
              insertCustomHTML(null); // method called to insert custom HTML
            }
  
          }
        }
      });
      // execute if current page is an author's page
      // && (authorPathName[1] == "5b5b442a88251bc96fcdcdd7" || authorPathName[1] == "5b5b442a88251bc96fcdcdd7#show-archive")
    } else if (pathName == "blog" && extraPathName[0] == "author") {
      var prependHTML = "<div class='custom-author-container sqs-block-html'><div class='custom-loading-image'><img src='https://ds4bdrko1q549.cloudfront.net/assets/common/images/loader.gif' alt='' title='' /></div></div>";
  
      $(".Main .Main-content").prepend(prependHTML);
      // console.log("This is an author page.");
  
      var formattedURL; // initialize formattedURL variable
  
      // execute if authorPathName contains #
      if (extraPathName[1].split("#")) {
        // console.log(authorPathName[1].split("#"));
        formattedURL = location.href.replace("#" + extraPathName[1].split("#")[1], "") + "&format=json"; // set formatted URL variable to modified link and add json format parameter to end
        // execute if authorPathName does not contain #
      } else {
        formattedURL = location.href + "&format=json"; // set formatted URL variable to current link and add json format parameter to end
      }
  
      // console.log(formattedURL);
  
      insertAuthorBio(formattedURL); // method called to insert author bio information to page
      // execute if current page is a category page
    } else if (pathName == "blog" && extraPathName[0] == "category") {
      console.log("This page is a category page");
  
      insertAdsExtraPages(); // call method that inserts advertisements on author & category pages
  
      // execute if current page is "feel-goods" page
    } else if (pathName == "feel-goods") {
      checkForExternalLinks(true); // method called to check if anchor tags (links) found in document are external and apply no-follow property
  
      // execute if article is feel good(s) and matches second parameter name
      /* if (secondaryPathName == "revolve-dresses") {
        insertAdvertisements(true);
      } */
  
      insertAdvertisements(true);
  
      // execute if current page is "featured-1" page
    } else if (pathName == "self-care") {
  
      console.log("Current pathname is:", pathName);
  
      // dynamically load advertisements with content hints
      var checkSelfCareContent = setInterval(function() {
        // execute if pageLoaded variable is true
        if (pageLoaded == true) {
          clearInterval(checkSelfCareContent); // stop the loop
          console.log("[ADVERTISEMENTS] PAGE LOADED!");
          $mediavine.web.fillContentHints();
        }
      }, 100);
  
    }
  
  }

  // method that loads mediavine's videos
  function loadMediavineVideo() {
    var pathName = location.pathname.split("/")[1]; // initialize and retrieve current URL pathname
    var secondaryPathName = location.pathname.split("/")[2]; // initialize and retrieve current URL pathname after "/blog/"

    if (pathName == "blog" && secondaryPathName == "karamo-brown") {
      var videoID = "hh392mxhnfhmt3cwx1ku";
      var videoURL = "//video.mediavine.com/videos/hh392mxhnfhmt3cwx1ku.js";
      // set autoplay property to true
      $('#' + videoID).attr('data-autoplay', 'true');

      // load javascript
      $.getScript(videoURL, function( data, textStatus, jqxhr ) {
        console.log("[VIDEO]", textStatus); // Success
        console.log("[VIDEO]", jqxhr.status); // 200
        console.log("[VIDEO]", "Load was performed.");
      });
    }
  }
  
  // method that checks if elements exist
  function checkForElements() {
    // method to check if all custom HTML variables exist
    var checkElement = setInterval(function() {
      if ($("article .custom-breadcrumb").length && $("article .BlogItem-title") && $("article .Blog-meta.BlogItem-meta") && $("article .BlogItem-share") && $("article .sqs-layout.sqs-grid-12.columns-12")) {
        console.log("[FUNCTION]:", "Elements ready for moving!");
        clearInterval(checkElement); // stop the loop
        insertAdSidebar();
      }
    }, 100);
  }
  
  // method that inserts custom pinterest & facebook buttons for images
  function insertImageButtons() {
    let tag = "[PINTEREST]";
  
    console.log(tag, "Insert new pinterest save buttons");
  
    // retrieve all image elements within the article content
    var images = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 .sqs-block.image-block.sqs-block-image img");
  
    // loop through images
    for (var i = 0; i < images.length; i++) {
      console.log(tag, images[i]);
  
      var saveItButton = "<div class='custom-image-button-section'><i class='fab fa-facebook-f custom-image-button custom-facebook-button' style='z-index: 3;'></i><i class='fab fa-pinterest-p custom-image-button custom-pinterest-button' data-image='" + $(images[i]).attr('data-image') + "' data-desc='" + $(images[i]).attr('alt') + "' style='z-index: 3;'></i></div>";
  
  
  
      $(images[i]).after(saveItButton);
  
      // retrieve pinterest button
  
      var pinterestButton = $(images[i]).siblings(".custom-image-button-section").find(".custom-pinterest-button")[0];
      var facebookButton = $(images[i]).siblings(".custom-image-button-section").find(".custom-facebook-button")[0];
  
      // method that inserts event listener and executes a function when button is pressed
      pinterestButton.addEventListener('click', function(e) {
        // console.log(e);
        e.preventDefault(); // prevent anchor tag from automatically changing page
        e.stopPropagation(); // prevents anchor tag from being handled by another event
        PinUtils.pinOne({
          'url': location.href,
          'media': e.target.attributes['data-image'].value,
          'description': e.target.attributes['data-desc'].value
        });
      });
  
      // method that inserts event listener and executes function when button is pressed
      facebookButton.addEventListener('click', function(e) {
  
        e.preventDefault(); // prevent anchor tag from automatically changing page
        e.stopPropagation(); // prevents anchor tag from being handled by another event
  
        var formattedURL = "https://www.facebook.com/sharer/sharer.php?u=" + location.href;
  
        window.open(formattedURL, "shareBlog", "toolbar = 0, status = 0, height = 225, width = 420, resizable = 0")
      });
  
    }
  
  }
  
  // method that inserts custom HTML for advertisements
  function insertAdvertisements(isFeelGoods) {
    // var adHTML = "<div class='test-content'>Test</div>";
  
    console.log("[FUNCTION] Insert advertisements!");
    /* NOTE: For sidebar, use the flex option on the article element itself */
    /* NOTES from client */
    // --------------------------------------------------------------------------
    /* Insert content hints above H2 tags and H3 tags
      line blocks, spacer blocks, H2 and H3s are the main ways we break up our content.
      on feel-good(s) articles can you insert the code above line blocks or spacer blocks
      --
      on non feel-good(s) articles can you insert the code above line blocks, spacer blocks, 		H2's and H3's up to (8) ads per article */
    // --------------------------------------------------------------------------
    /* Feel-Good(s)
    -------------------------------------------------------------------------------
    */
    if (isFeelGoods) {
      console.log("[FUNCTION] is feel good(s)");
      // var adHTML = "<div class='test-content sqs-block html-block sqs-block-html'>Test</div>";
      var adHTML = "<div class='content_hint custom-appended'></div>";
  
      // -- Line blocks
      var lineBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.horizontalrule-block.sqs-block-horizontalrule");
      console.log("Line blocks:", lineBlocks.length);
      // -- H2 elements
      var h2Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h2");
      console.log("H2 elements:", h2Elements.length);
      // -- H3 elements
      var h3Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h3");
      console.log("H3 elements:", h3Elements.length);
      // -- P elements
      var pElements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p");
      console.log("P elements:", pElements.length);
  
      var totalElements = [lineBlocks, h2Elements, h3Elements, pElements];
  
      var totalElementsLength = lineBlocks.length + h2Elements.length + h3Elements.length + pElements.length;
  
      var finalAdRatio;
  
      // execute if user is on a mobile device
      if (isMobile()) {
        finalAdRatio = Math.ceil(totalElementsLength * (mobileAdRatio / 100));
      } else {
        finalAdRatio = Math.ceil(totalElementsLength * (desktopAdRatio / 100));
      }
  
      var adPerPageLimit;
  
      // execute if ad ratio exceeds the limit
      if (finalAdRatio > 8) {
        adPerPageLimit = 8; // set limit value to ad-per-page limit variable
      } else {
        adPerPageLimit = finalAdRatio; // set ad ratio value to ad-per-page limit variable
      }
  
      console.log("Ad Ratio:", adPerPageLimit);
  
      // ---------------------------------------------------
      var elementArray = returnAdPositions(totalElements, adPerPageLimit); // call method that returns ad positions
  
      console.log("Final Element Array:", elementArray);
  
      // loop through elements array and append div content avove
      for (var i = 0; i < elementArray.length; i++) {
  
        // NOTE: Append paragraphs after, everything else before
        if ($(elementArray[i]).is("p")) {
          console.log("[ADS] Element is a paragraph!");
          $(elementArray[i]).after(adHTML);
          
          /* check if the element after the appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
          if ($(elementArray[i]).next().is(".content_hint")) {
            var elementAppended = $(elementArray[i]).next();
            console.log("[JUST APPENDED AFTER]", elementAppended);
            
            if (elementAppended.next().is(".content_hint")) {
             elementAppended.remove(); 
            }
          }
          
        } else {
          console.log("[ADS] Element is not a paragraph!");
          $(elementArray[i]).before(adHTML);
          
          /* check if prev element after appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
          if ($(elementArray[i]).prev().is(".content_hint")) {
            var elementAppended = $(elementArray[i]).prev();
            console.log("[JUST APPENDED BEFORE]", elementAppended); 
            
            if (elementAppended.prev().is(".content_hint")) {
             elementAppended.remove(); 
            }
            
          }
          
        }
  
      }
      //$mediavine.web.fillContentHints();
      /* Non-Feel-Good(s)
      -------------------------------------------------------------------------------
      */
    } else {
      console.log("[FUNCTION] is not feel good(s)");
      // var adHTML = "<div class='test-content'>Test</div>";
      var adHTML = "<div class='content_hint custom-appended'></div>";
  
      // -- Line blocks
      var lineBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.horizontalrule-block.sqs-block-horizontalrule");
      console.log("Line blocks:", lineBlocks.length);
      // -- Spacer blocks
      /* var spacerBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.spacer-block.sqs-block-spacer");
      console.log("Spacer blocks:", spacerBlocks.length); */
      // -- H2 elements
      var h2Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h2");
      console.log("H2 elements:", h2Elements.length);
      // -- H3 elements
      var h3Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h3");
      console.log("H3 elements:", h3Elements.length);
      // -- P elements
      var pElements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p");
      console.log("P elements:", pElements.length);
  
      var totalElements = [lineBlocks, h2Elements, h3Elements, pElements];
  
      var totalElementsLength = lineBlocks.length + h2Elements.length + h3Elements.length + pElements.length;
  
  
      var finalAdRatio;
  
      // execute if user is on a mobile device
      if (isMobile()) {
        finalAdRatio = Math.ceil(totalElementsLength * (mobileAdRatio / 100));
      } else {
        finalAdRatio = Math.ceil(totalElementsLength * (desktopAdRatio / 100));
      }
  
      var adPerPageLimit;
  
      // execute if ad ratio exceeds the limit
      if (finalAdRatio > 8) {
        adPerPageLimit = 8; // set limit value to ad-per-page limit variable
      } else {
        adPerPageLimit = finalAdRatio; // set ad ratio value to ad-per-page limit variable
      }
  
      console.log("Ad Ratio:", adPerPageLimit);
  
      // ---------------------------------------------------
  
      var elementArray = returnAdPositions(totalElements, adPerPageLimit); // call method that returns ad positions
  
      console.log("Final Element Array:", elementArray);
  
      // loop through elements array and append div content avove
  
      for (var i = 0; i < elementArray.length; i++) {
        // console.log(elementArray[i]);
  
        // NOTE: Append paragraphs after, everything else before
        
        if ($(elementArray[i]).is("p")) {
          console.log("[ADS] Element is a paragraph!");
          $(elementArray[i]).after(adHTML);
          
          /* check if the element after the appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
          if ($(elementArray[i]).next().is(".content_hint")) {
            var elementAppended = $(elementArray[i]).next();
            console.log("[JUST APPENDED AFTER]", elementAppended);
            
            if (elementAppended.next().is(".content_hint")) {
             elementAppended.remove(); 
            }
            
          }
          
        } else {
          console.log("[ADS] Element is not a paragraph!");
          $(elementArray[i]).before(adHTML);
          
          /* check if prev element after appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
          if ($(elementArray[i]).prev().is(".content_hint")) {
            var elementAppended = $(elementArray[i]).prev();
            console.log("[JUST APPENDED BEFORE]", elementAppended); 
            
            if (elementAppended.prev().is(".content_hint")) {
             elementAppended.remove(); 
            }
            
          }
          
        }
        
        
        
        /*
        if (!$(elementArray[i]).prev().is(".content_hint")) {
          console.log("[ADS] Previous element is not a content hint!", $(elementArray[i]).prev());
          
          if ($(elementArray[i]).is("p")) {
            console.log("[ADS] Element is a paragraph!");
            $(elementArray[i]).after(adHTML);
          } else {
            console.log("[ADS] Element is not a paragraph!");
            $(elementArray[i]).before(adHTML);
          }
          
        } */
  
      } // end for-loop
  
    } // end outer (is feel goods) statement
  
    var checkForFinishedElementMovement = setInterval(function() {
      // execute if element movement was finished
      if ($("article .custom-content .custom-article-content .BlogItem-comments")) {
        console.log("[FINAL MOVEMENT FINISHED]");
        clearInterval(checkForFinishedElementMovement); // stop the loop
        // insert ads below and above comment section
        /*
        $("article .custom-content .custom-article-content .BlogItem-comments").before("<div class='content_hint custom-appended'></div>");
        $("article .custom-content .custom-article-content .BlogItem-comments").after("<div class='content_hint custom-appended'></div>");
        */
      }
    });
  
    var checkPageLoaded = setInterval(function() {
      // execute if pageLoaded variable is true
      if (pageLoaded == true) {
        clearInterval(checkPageLoaded); // stop the loop
        console.log("[ADVERTISEMENTS] PAGE LOADED!");
        $mediavine.web.fillContentHints();
      }
    }, 100);
  } // end function
  
  function returnAdPositions(array, limit) {
    var finalElementsArray = [];
    var elementsRemaining = limit;
  
    // loop through array
    for (var i = 0; i < array.length; i++) {
      // console.log("Element Array:", array[i]);
  
      // remove first element in all element arrays
      array[i] = array[i].slice(1);
  
      // execute if current array is pElements array
      /*
      if (i == 3) {
       array[i] = array[i].splice(1); // remove first paragraph element
      } */
  
      // execute if elements exist
      if (array[i].length) {
        // algorithm
        var delta = Math.ceil(array[i].length / limit);
  
        // execute if delta is ever zero
        if (delta == 0) {
          delta = 1;
        }
  
        console.log("Final delta [" + i + "]:", delta);
  
  
        // loop through elements
        for (var j = 0; j < array[i].length; j = j + delta) {
          // execute if final array does not contain element limit
          if ((finalElementsArray.length < limit) && elementsRemaining > 0) {
            // console.log(array[i][j]);
            var contentHintExists = checkContentSiblings(array[i][j]);
            console.log("ContentHints Exist?:", contentHintExists);
            if ($(array[i][j]).is("h2") && contentHintExists) {
              console.log("This element is an H2, and content hint exists");
              console.log(array[i][j]);
              elementsRemaining--; // still subtract but do not push to array
            } else {
              finalElementsArray.push(array[i][j]);
              // console.log("New elements array:", finalElementsArray);
              elementsRemaining--;
            }
          } // end final elements array if statement
  
        } // end array[i][j] loop
  
      } // end array[i][j] if statement
    } // end array[i] loop
    return finalElementsArray; // return final array
  } // end function
  
  // method that checks for content siblings to prevent ads from appearing too close to eachother
  function checkContentSiblings(element) {
    var closestSqsBlock = $(element).closest(".sqs-block.html-block"); // initialize and retrieve closest html block element
    var closestContentHint = $(element).prevAll(".content_hint"); // initialize and retrieve closest content hint element
    
    /*
    if (closestContentHint && $(element).is("h2")) {
      console.log("[PREV ELEMENT]:", "Is a content hint in the same tree as h2 element");
      console.log("[PREV ELEMENT SPECIAL]:", "Is the previous element of the h2 element a content hint?", $(element).prev().is(".content_hint"), $(element).prev());
      //return true; // return true
    } */
  
    /* check for horizontal line instead, check if it is right before h2 sqs block */
  
    // execute if previous element is a horizontal rule block (to prevent ads from re-appearing after content hint was inserted prior to horizontal rule block
    if (closestSqsBlock.prev().is(".sqs-block.horizontalrule-block.sqs-block-horizontalrule")) {
      console.log("[PREV ELEMENT]:", "Is correct horizontal element!");
      return true; // return true
    } else {
      return false; // return false
    }
    /*
    if (closestSqsBlock.siblings().closest(".content_hint")) {
      console.log("H2 element is really close to content hints");
      return true
    } else {
     return false
    } */
  }
  
  // method that inserts sidebar and sidebar advertisements
  function insertAdSidebar() {
    console.log("[FUNCTION]: Insert ads!");
  
    // initialize sidebar div HTML
    var sidebarHTML = "<div class='custom-ad-sidebar'></div>";
  
    // create new custom content div with custom article content
    $(".Main-content article").append("<div class='custom-content'><div class='custom-article-content'></div></div>");
    console.log("INSERTED CUSTOM CONTENT");
  
    // add css
    // $("article .custom-content").css("order","6");
  
    // append sidebar content
    $("article .custom-content").append(sidebarHTML);
  
    // initialize and declare variables
    var articleContent = $("article .sqs-layout.sqs-grid-12.columns-12");
    var commentsContent = $("article .BlogItem-comments");
  
    /*
    // method to check if custom summary container exists
    var checkSummaryContent = setInterval(function() {
      if ($("article .custom-summary-container")) {
        console.log("[FUNCTION]:", "Summary container found!");
        clearInterval(checkSummaryContent); // stop the loop
        var summaryContent = $(".custom-summary-container");
        console.log(summaryContent[0]);
        $("article .custom-content .custom-article-content").append(articleContent);
        $("article .custom-content .custom-article-content").append(summaryContent);
        $("article .custom-content .custom-article-content").append(commentsContent);
  
      }
    }, 100); */
    $("article .custom-content .custom-article-content").append(articleContent);
    $("article .custom-content .custom-article-content").append(commentsContent);
  
    /* NOT NEEDED BUT KEPT FOR REFERENCE 10:45 PM 03/05/19 */
    // add custom css to style sidebar
    // $("section.Main-content").css(mainContentCSS);
  
    $(".Intro-content .sqs-col-12>.sqs-block:not(.float):not(.sqs-float-left):not(.sqs-float-right):not(.sqs-block-gallery):not(.sqs-block-image):not(.sqs-block-video):not(.sqs-block-map):not(.sqs-block-calendar):not(.sqs-block-menu):not(.sqs-block-tourdates):not(.sqs-block-summary-v2):not(.sqs-block-archive):not(.sqs-block-instagram),.Main:not(.Main--events-list):not(.Main--events-item):not(.Main--blog-list) .Main-content .sqs-layout .sqs-col-12>.sqs-block:not(.float):not(.sqs-float-left):not(.sqs-float-right):not(.sqs-block-gallery):not(.sqs-block-image):not(.sqs-block-video):not(.sqs-block-map):not(.sqs-block-calendar):not(.sqs-block-menu):not(.sqs-block-tourdates):not(.sqs-block-summary-v2):not(.sqs-block-archive):not(.sqs-block-instagram),.tweak-blog-list-style-stacked .BlogList--posts-full .sqs-layout .sqs-col-12>.sqs-block:not(.float):not(.sqs-float-left):not(.sqs-float-right):not(.sqs-block-gallery):not(.sqs-block-image):not(.sqs-block-video):not(.sqs-block-map):not(.sqs-block-calendar):not(.sqs-block-menu):not(.sqs-block-tourdates):not(.sqs-block-summary-v2):not(.sqs-block-archive):not(.sqs-block-instagram),.Index-page .sqs-layout .sqs-col-12>.sqs-block:not(.float):not(.sqs-float-left):not(.sqs-float-right):not(.sqs-block-gallery):not(.sqs-block-image):not(.sqs-block-video):not(.sqs-block-map):not(.sqs-block-calendar):not(.sqs-block-menu):not(.sqs-block-tourdates):not(.sqs-block-summary-v2):not(.sqs-block-archive):not(.sqs-block-instagram),.Footer-blocks--top .sqs-col-12>.sqs-block:not(.float):not(.sqs-float-left):not(.sqs-float-right):not(.sqs-block-gallery):not(.sqs-block-image):not(.sqs-block-video):not(.sqs-block-map):not(.sqs-block-calendar):not(.sqs-block-menu):not(.sqs-block-tourdates):not(.sqs-block-summary-v2):not(.sqs-block-archive):not(.sqs-block-instagram),.Footer-blocks--bottom .sqs-col-12>.sqs-block:not(.float):not(.sqs-float-left):not(.sqs-float-right):not(.sqs-block-gallery):not(.sqs-block-image):not(.sqs-block-video):not(.sqs-block-map):not(.sqs-block-calendar):not(.sqs-block-menu):not(.sqs-block-tourdates):not(.sqs-block-summary-v2):not(.sqs-block-archive):not(.sqs-block-instagram),.tweak-footer-layout-stacked .Footer-blocks--middle .sqs-col-12>.sqs-block:not(.float):not(.sqs-float-left):not(.sqs-float-right):not(.sqs-block-gallery):not(.sqs-block-image):not(.sqs-block-video):not(.sqs-block-map):not(.sqs-block-calendar):not(.sqs-block-menu):not(.sqs-block-tourdates):not(.sqs-block-summary-v2):not(.sqs-block-archive):not(.sqs-block-instagram)").addClass("new-custom-article-sqs-block");
    // $("article .custom-content").css(customContentCSS);
    $("article .custom-content .custom-article-content").addClass("new-custom-article-content");
    // $("article .custom-content .custom-ad-sidebar").css(sidebarCSS);
  
    document.querySelector('style').textContent +=
      "@media screen and (min-width: 1025px) {.new-custom-article-sqs-block {width: calc(56.65800000000001% + 175px) !important;} .new-custom-article-content {width: calc(100% - (300px)) !important;}}"
  
    // execute if article has image blocks
    if ($("article .image-block").length) {
      //console.log("[MSG]:", "Retrieving image blocks...");
      var imageBlocks = $("article .image-block");
      //console.log(imageBlocks);
  
      // loop through image block
      for (var i = 0; i < imageBlocks.length; i++) {
        // find nearest row
        var nearestRow = retrieveNearestRow(imageBlocks[i]);
        // find nearest row's parent
        var rowParent = retrieveRowParent(nearestRow);
        // check if nearest row parent has class ".col.sqs-col-12.span-12"
        var topRow = checkForClass(nearestRow, rowParent, 0);
        // console.log("Row Index:", topRow);
        // PRAISE THE LORD, IT WORKS!
  
        if (topRow != null) {
          var customImageBlockHTML = $("<div class='row sqs-row custom-row-" + i + "'><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div><div class='col sqs-col-8 span-8'></div><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div></div>");
  
          // console.log("We were able to find the top row.");
          // insert new image block element
          var previousRow = topRow;
          // console.log(previousRow);
  
          $(previousRow).before(customImageBlockHTML);
          // append image to new image block element
          $(".custom-row-" + i).find(".col.sqs-col-8.span-8").append(imageBlocks[i]);
          // delete old row
          previousRow.remove();
  
        } // end if statement
      } // end for-loop statement
    } // end if statement
  
    // execute if article has image gallery blocks
    if ($("article .sqs-block.gallery-block.sqs-block-gallery").length) {
      console.log("[MSG] Retrieving image gallery blocks");
      var galleries = $("article .sqs-block.gallery-block.sqs-block-gallery");
  
      // loop through image gallery blocks
      for (var i = 0; i < galleries.length; i++) {
        // find nearest row
        var nearestRow = retrieveNearestRow(galleries[i]);
        // find nearest row's parent
        var rowParent = retrieveRowParent(nearestRow);
        // check if nearest row parent has class ".col.sqs-col-12.span-12"
        var topRow = checkForClass(nearestRow, rowParent, 0);
        // console.log("Row Index:", topRow);
        // PRAISE THE LORD, IT WORKS!
  
        if (topRow != null) {
          var customImageBlockHTML = $("<div class='row sqs-row custom-image-gallery-row-" + i + "'><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div><div class='col sqs-col-8 span-8'></div><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div></div>");
  
          // retrieve previous row
          var previousRow = topRow;
  
          // insert new image gallery block element
          $(previousRow).before(customImageBlockHTML);
  
          // append image gallery to new image gallery block element
          $(".custom-image-gallery-row-" + i).find(".col.sqs-col-8.span-8").append(galleries[i]);
  
          // delete old row
          previousRow.remove();
  
        } // end if statement
      } // end for-loop statement
    } // end if statement
  
    // call function to display latest articles
    var loadingImage = "<div class='custom-loading-image-sidebar sqs-block-html'><div class='custom-loading-image'><img src='https://ds4bdrko1q549.cloudfront.net/assets/common/images/loader.gif' alt='' title='' /></div></div>";
  
    // insert loading gif to sidebar
    $("article .custom-content .custom-ad-sidebar").prepend(loadingImage);
  
    var rssFeedURL = "https://iamandco.com/blog?format=rss";
    var sidebarArticleStartHTML = "<div id='sidebar_atf_wrapper'></div><div class='sqs-block-html custom-sidebar-article-wrapper'><div class='custom-sidebar-wrapper-title'>" + sidebarArticleTitle + "</div><ul class='custom-sidebar-article-list'>";
    var sidebarArticleMiddleHTML = "";
    var sidebarArticleEndHTML = "</ul></div><div id='sidebar_btf_wrapper'></div>";
  
    // method to retrieve blog page RSS in XML format
    $.ajax({
      url: rssFeedURL,
      accepts: {
        xml: "application/rss+xml"
      },
      dataType: "xml",
      success: function(data) {
        console.log("[SIDEBAR DATA AJAX]:", data);
  
        var items = data.getElementsByTagName("channel")[0].getElementsByTagName("item");
  
        for (var i = 0; i < sidebarArticleLimit; i++) {
          var item; // initialize variable
  
          // execute if current item title is the same as page title/link
          // items[i].getElementsByTagName("title")[0].textContent == decodeText(jsonData['item']['title'])
          if (location.href.indexOf(items[i].getElementsByTagName("link")[0].textContent) !== -1) {
            console.log("Current item link is the same as current page....");
            item = items[i + 1]; // set variable as xml item
            i++; // increment for-loop index
            sidebarArticleLimit++; // increment sidebar article limit
            // execute if current item title is not the same as page title
          } else {
            item = items[i]; // set variable as xml item
          }
  
          // item.getElementsByTagName("title")[0].textContent ||
          var itemTitle = item.getElementsByTagName("title")[0].textContent; // initialize and set variable to xml item title
  
          // item.getElementsByTagName("link")[0].textContent ||
          var itemLink = item.getElementsByTagName("link")[0].textContent; // initialize and set variable to xml item URL
          var itemAuthor = ""; // initialize xml item author variable
  
          // execute if element exists in item
          if (item.getElementsByTagName("dc:creator")[0]) {
            itemAuthor = item.getElementsByTagName("dc:creator")[0].textContent; // set variable to xml item author
            // execute if element does not exists (Microsoft Edge works with this one)
          } else {
            itemAuthor = $(item).children("dc\\:creator").text(); // set variable to xml item author
          }
  
          sidebarArticleMiddleHTML += "<li class='custom-sidebar-article-item'><div class='custom-sidebar-article-editorial'><a class='custom-sidebar-article-title' href='" + itemLink + "' data-url='" + itemLink + "'>" + itemTitle + "</a><p class='custom-sidebar-article-author-name'>" + itemAuthor + "</p></div></li>"; // set value to custom summary block item HTML
        } // end for-loop
  
        var completeHTML = sidebarArticleStartHTML + sidebarArticleMiddleHTML + sidebarArticleEndHTML; // concatenate HTML
  
        // execute if article category does not contain "Feel Good(s)"
        // && (location.pathname.split("/")[2] == "75-of-the-funniest-cheesy-pick-up-lines")
  
        $("article .custom-content .custom-ad-sidebar").append(completeHTML); // append to custom HTML element in custom sidebar
        $("article .custom-content .custom-ad-sidebar .custom-loading-image-sidebar").remove(); // remove the loading image from sidebar
  
      } // end ajax success
    }); // end ajax function
  }
  
  // method that retrives the nearest row for positioning advertisements on article content
  function retrieveNearestRow(element) {
    // find nearest row
    var nearestRow = $(element).closest(".row.sqs-row")[0];
    return nearestRow;
  }
  
  // method that retrieves nearest row parent for positioning advertisements on article content
  function retrieveRowParent(element) {
    var nearestRowParent = $(element).parent()[0];
    return nearestRowParent;
  
  }
  
  // method that checks element class for positioning advertisements on article content
  function checkForClass(row, parent, numTry) {
    //console.log("[CHECK] Row:");
    //console.log(row);
    //console.log("[CHECK] Row Parent:");
    //console.log(parent);
  
    var parentHasClass = $(parent).hasClass("col sqs-col-12 span-12");
    var numberOfTries = numTry + 1;
  
    if (parentHasClass) {
      // retrieve element index
      var topLevelIndex = $(row).index();
      //console.log("[CHECK] Top Level index of this element (parentHasClass):", topLevelIndex);
      //console.log("[CHECK] Element at that index is:");
      // console.log($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12").find("div").eq(topLevelIndex));
      return row;
    } else {
      //console.log("[CHECK] Following element does not have class!");
      //console.log(parent);
      if (numberOfTries < 2) {
        // check parent for class
        // console.log("[CHECK] Searching for top level element again!");
        // find nearest row
        var newNearestRow = retrieveNearestRow(parent);
        // find nearest row's parent
        var newNearestRowParent = retrieveRowParent(newNearestRow);
        return checkForClass(newNearestRow, newNearestRowParent, numberOfTries);
      } else {
        // console.log("[CHECK] NO HOPES OF FINDING IT");
        return null;
      }
    }
  
  }
  
  // method that inserts author bio information to page
  function insertAuthorBio(linkURL) {
    // method to retrieve page in JSON format
    $.ajax({
      url: linkURL,
      success: function(result) {
        // console.log(result);
        var authorID = result["author"]["id"]; // initialize and declare author ID
  
        var authorName = result["author"]["displayName"]; // initialize and declare author name
  
        var authorWebsiteURL = result["author"]["websiteUrl"]; // initialize and declare author website URL
  
        var authorWebsiteString; // initialize author website HTML string
  
        // execute if author website URL exists
        if (authorWebsiteURL) {
          authorWebsiteString = "<p><a class='custom-author-website' href='" + authorWebsiteURL + "' target='_blank' rel='nofollow'>Website</a></p>";
          // executte if author website URL does not exist
        } else {
          authorWebsiteString = "";
        }
  
        var authorBio = result["author"]["bio"]; // initialize author bio statement
  
        /*
        if (result["author"]["bio"]) {
          // create element to extract author bio text
          var htmlElement = document.createElement('div');
          htmlElement.innerHTML = result["author"]["bio"];
          authorBio = htmlElement.getElementsByTagName("em")[0].textContent; // initialize and declare author bio statement
        } else {
          authorBio = "";
        } */
  
  
        var authorAvatarURL; // initialize author avatar URL
  
        // execute if author avatarURL exists
        if (result["author"]["avatarAssetUrl"]) {
          authorAvatarURL = result["author"]["avatarAssetUrl"];
          // execute if author avatarURL does not exist
        } else {
          authorAvatarURL = stockAvatarURL;
        }
  
        var img = document.createElement("img"); // create image element
        img.src = authorAvatarURL; // set image source to author avatarURL
  
        // method that executes when image is loaded
        img.onload = function() {
          var width = img.naturalWidth || img.width;
          var height = img.naturalHeight || img.height;
          // console.log("Image height:", height);
          // console.log("Image width:", width);
  
          // console.log(authorID, authorName, authorWebsiteURL, authorBio);
  
          var html = "<div class='custom-author-image'><img src='" + authorAvatarURL + "' alt='' title='" + authorName + "' /></div><div class='custom-author-info'><h1 class='custom-author-title'>" + authorName + "</h1><div class='custom-author-bio'>" + authorBio + "</div>" + authorWebsiteString + "</div>";
  
          $(".custom-loading-image").remove();
  
          $(".custom-author-container").append(html);
  
          // execute if image width is greater than height
          if (width > height) {
            $(".custom-author-image img").addClass("author-img-landscape");
          }
  
          insertAdsExtraPages(); // call method that inserts advertisements on author pages
  
        }
      }
    });
  }
  
  // method that inserts advertisements on author & category pages
  function insertAdsExtraPages() {
    console.log("[FUNCTION] Insert ads into author pages!");
    var advertisementHTML = "<br><article class='BlogList-item' style='width: 100%;'><div class='content_hint'></div></article><br>";
    var groupHTML = "<div class='custom-author-group'></div>";
  
    // execute if article elements exist
    if ($(".Main-content section.BlogList.BlogList--posts-excerpt article").length) {
      console.log("[FUNCTION] Articles exist!");
      // execute if user is on a mobile device
      if (isMobile()) {
        $(".Main-content section.BlogList.BlogList--posts-excerpt > article:nth-child(4n)").after(advertisementHTML);
      } else {
        $(".Main-content section.BlogList.BlogList--posts-excerpt > article:nth-child(6n)").after(advertisementHTML);
      }
  
      // dynamically load advertisements with content hints
      var checkExtraPages = setInterval(function() {
        // execute if pageLoaded variable is true
        if (pageLoaded == true) {
          clearInterval(checkExtraPages); // stop the loop
          console.log("[ADVERTISEMENTS] PAGE LOADED!");
          $mediavine.web.fillContentHints();
        }
      }, 100);
  
    }
  
  }
  
  // method that checks if a URL has parameters
  function checkForParameters(url) {
    var urlArray = url.split('?'); // initialize and declare value to URL split at '?' character
    // execute if splitted URL has length greater than one and if path after '?' character is not empty
  
    console.log("[PARAMETERS] URL ARRAY LENGTH:", urlArray)
    if (urlArray.length > 1 && urlArray[1] !== '') {
      // console.log("Parameters found in this URL");
      return true; // return true
    }
    return false; // return false if URL has no parameters
  }
  
  // method that sets ajax result value to variable
  function callback(data) {
    jsonData = data; // set variable value to data passed in parameter
  }
  
  // method thtat checks if number is even
  function isEven(number) {
    return number % 2 == 0; // uses mod to return boolean value to indicate if parameter number is even or odd
  }
  
  // method that decodes entities in JSON data
  function decodeText(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
    textArea.parentNode.removeChild(textArea);
  }
  
  // method that adds event listeners to products found in a design gallery grid
  
  /*
  function addEventListeners() {
    // console.log("AddEventListener function was executed...");
    var anchorTags = document.getElementsByClassName("sqs-gallery-design-grid")[0].getElementsByTagName("a"); // initialize and retrieve anchor tags inside div as array-like collection of elements
    var newURL; // initialize new URL variable
  
    // loop through anchor tags
    for (var i = 0; i < anchorTags.length; i++) {
      if (isMobile() || (screen && screen.width < 768)) {
        // add an event listerner to anchor tag
        anchorTags[i].addEventListener("touchend", function(e) {
          e.preventDefault(); // prevent anchor tag from automatically changing page
          newURL = location.protocol + '//' + location.hostname + '/redirect?ref=' + this.href; // set newURL variable value to desired redirect URL page
          //console.log(newURL);
          // NOTE: Creating an anchor tag and triggering its "click" event prevents multiple tabs from being opened in mobile Google Chrome browser
          var button = document.createElement("a"); // create anchor tag
          button.target = "_blank"; // set anchor tag target to "_blank" to open link on new tab
          button.href = newURL; // set anchor tag reference to new URL
          document.body.appendChild(button); // append anchor tag to body
          button.click(); // trigger anchor tag "click" event
          button.parentNode.removeChild(button); // remove anchor tag from body
        });
      } else {
        // add an event listerner to anchor tag
        anchorTags[i].addEventListener("click", function(e) {
          e.preventDefault(); // prevent anchor tag from automatically changing page
          newURL = location.protocol + '//' + location.hostname + '/redirect?ref=' + this.href; // set newURL variable value to desired redirect URL page
          //console.log(newURL);
          // NOTE: Creating an anchor tag and triggering its "click" event prevents multiple tabs from being opened in mobile Google Chrome browser
          var button = document.createElement("a"); // create anchor tag
          button.target = "_blank"; // set anchor tag target to "_blank" to open link on new tab
          button.href = newURL; // set anchor tag reference to new URL
          document.body.appendChild(button); // append anchor tag to body
          button.click(); // trigger anchor tag "click" event
          button.parentNode.removeChild(button); // remove anchor tag from body
        });
      }
    }
  }
  */
  
  // method that checks if anchor tags (links) found in document are external
  function checkForExternalLinks(applyNoFollow) {
    // console.log("Function external links works! Apply no follow: ", applyNoFollow);
  
    var anchorTagsInDocument; // initialize variable
  
    // execute if the article element exists in document
    if (document.getElementsByTagName("article")[0]) {
      anchorTagsInDocument = document.getElementsByTagName("article")[0].getElementsByClassName("sqs-layout")[0].getElementsByTagName("a"); // initialize and retrieve anchor tags inside document as array-like collection of elements
      // execute if article element does not exist in document
    } else {
      anchorTagsInDocument = document.getElementsByTagName("a"); // initialize and retrieve anchor tags inside document as array-like collection of elements
    }
  
  
    // loop through anchor tags
    for (i = 0; i < anchorTagsInDocument.length; i++) {
      var hostName = anchorTagsInDocument[i].hostname; //initialize and retrieve hostname of anchor tag href
  
      // execute if host name of anchor tag href does not contain "iamandco"
      if (hostName.indexOf("iamandco") == -1) {
        //console.log("does not contain iamandco ", hostName);
  
        //anchorTagsInDocument[i].removeEventListener("click", checkForExternalLinks, false);
  
        // execute if function parameter is true
        if (applyNoFollow) {
          anchorTagsInDocument[i].setAttribute("rel", "nofollow"); // adds rel attribute to elements in DOM
        }
  
        anchorTagsInDocument[i].setAttribute("target", "_blank"); // add target attribute to elements in DOM
  
  
        // add event listener to anchor tag
  
        /*
        anchorTagsInDocument[i].addEventListener("click", function(e) {
          console.log(e);
          e.preventDefault(); // prevent anchor tag from automatically changing page
          e.stopPropagation(); // prevents anchor tag from being handled by another event
          //console.log(this.href);
          /* NOTE: Creating an anchor tag and triggering its "click" event prevents multiple tabs from being opened in mobile Google Chrome browser */
  
        /*
  
          var button = document.createElement("a"); // create anchor tag
          button.target = "_blank"; // set anchor tag target to "_blank" to open link on new tab
          button.href = this.href; // set anchor tag reference to new URL
          //console.log("Link being applied!: ", button.href);
  
          // NOTE: Apply "no-follow" attribute if links are affiliate links
          if (applyNoFollow == true) {
            button.setAttribute("rel", "nofollow"); // set rel attribute to "no-follow"
            console.log("Applied no-follow attribute!.....", button.href);
          }
  
          document.body.appendChild(button); // append anchor tag to body
          button.click(); // trigger anchor tag "click" event
          button.parentNode.removeChild(button); // remove anchor tag from body
        });
  
        */
      }
    }
  }
  
  // method that dynamically inserts custom HTML into the DOM of article pages
  function insertCustomHTML(articleCategory) {
    // console.log("insertCustomHTML function called!");
    // console.log("Article category:", articleCategory);
  
    var articleResult; // initialize article result variable
  
    var pubExchangeHTML; // initialize PubExchange HTML variable
    var summaryBlockHTML; // initialize summary block HTML variable
    var categoryBlockHTML; // initialize category block HTML variable
    var authorBlockHTML; // initialize author block HTML variable
  
    // execute if user is not on a mobile device
    if (!isMobile()) {
      // append the custom summary container inside the custom content div
      $(".custom-content .custom-article-content div[data-layout-label='Post Body']").after("<div class='custom-summary-container'></div>"); // append a custom HTML element into footer of article
    } else {
      // append the custom summary container inside the article element and after the share buttons
      $(".BlogItem-share").after("<div class='custom-summary-container'></div>"); // append a custom HTML element into footer of article
    }
  
    console.log("INSERTED CUSTOM SUMMARY CONTAINER");
  
    var isAcceptable = articlesForEmbed.some(function(item) {
      return item === articleCategory;
    }); // filter articlesForEmbed array and return true if article passed in parameter exists in array
  
    // execute if category passed in parameter (articleCategory) exists in articlesForEmbed array
    if (isAcceptable) {
      // console.log("LINE 353 MSG: Article is acceptable!");
  
      // filter article data
      articleResult = articleData.filter(function(data) {
        return data.articleName === articleCategory;
      })[0]; // set value to returned article data object
  
      // execute if category passed in parameter does not exist in articlesForEmbed array
    } else {
      // console.log("LINE 353 MSG: Article is NOT acceptable!");
  
      // filter article data
      articleResult = articleData.filter(function(data) {
        return data.articleName === "Latest Articles";
      })[0]; // set value to returned article data object
    }
  
    var mailChimpHTML = "<div id='customMCEmbed' class='sqs-block html-block sqs-block-html'><link href='' rel='stylesheet' type='text/css'><style type='text/css'>#mc_embed_signup{background:#fff; clear:left; font:16px futura-pt,Helvetica,Arial,sans-serif; width:100%;}</style><div id='mc_embed_signup'><form action='https://iamandco.us16.list-manage.com/subscribe/post?" + articleResult.actionID + "' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' class='validate' novalidate><div id='mc_embed_signup_scroll'><label for='mce-EMAIL'><h2>" + articleResult.formTitle + "</h2></label><input type='email' value='' name='EMAIL' class='email' id='mce-EMAIL' placeholder='email address' required><div style='position: absolute; left: -5000px;' aria-hidden='true'><input type='text' name='" + articleResult.inputNameValue + "' tabindex='-1' value=''></div><div class='clear'><input type='submit' value='" + buttonText + "' name='subscribe' id='mc-embedded-subscribe' class='button'></div></div><p><a href='https://iamandco.com/terms-of-use' target='_blank'>Terms & Conditions</a> and <a href='https://iamandco.com/privacy-policy' target='_blank'>Privacy Policy</a></p><div id='mce-success-response' style='display:none;'>SUCCESS MESSAGE GOES HERE</div><div id='mce-error-response' style='display:none;'>ERROR MESSAGE GOES HERE</div></form></div><script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></div>"; // initialize and set value to custom MailChimp embed HTML
  
  
    var length = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p").length; // set value to length of article DOM elements
  
    // divides the length by 2 and rounds number up ---> gives append position
    // console.log(length);
  
    var positionIndex = Math.ceil(length / 4); // initialize and declare position index for custom MailChimp embed HTML
  
    // console.log("Approximate position index of middle of page:", positionIndex);
  
    // execute if insertMailChimpHTML variable is true
    if (insertMailChimpHTML == true) {
      $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p").eq(positionIndex - 1).after(mailChimpHTML); // append MailChimp embed in middle (approximate) position in article
    }
  
    var pubExchangeElement = document.getElementsByClassName("pubexchange_module")[0]; // initialize and set value to pubExchange element in DOM
    var htmlToInsert = '<div class="pubexchange_module" id="pubexchange_below_content" data-pubexchange-module-id="2747"></div>'; // initialize and set value to pubExchange HTML
  
    // if pubExchange element already exists
    if (pubExchangeElement) {
      // console.log("Exists! Removing now...");
      $(".pubexchange_module").remove(); // remove from DOM
    }
  
    // execute if insertPubExchangeHTML variable is true
    if (insertPubExchangeHTML == true) {
      // console.log("Does not exist, creating now!");
      //$(".custom-summary-container").prepend(htmlToInsert); // append to custom HTML element into footer of article
      pubExchangeHTML = htmlToInsert; // set value to PubExchange HTML
    }
  
    // execute if insertSummaryBlockHTML variable is true
    if (insertSummaryBlockHTML == true) {
      var summaryBlockHTMLStart = "<div class='custom-summary-block sqs-block-html'><div class='custom-summary-wrapper'><div class='custom-summary-external'><div class='custom-summary-title'>" + customEmbedTitle + "</div><ul class='custom-summary-module'>"; // initialize and set value to custom summary block HTML
      var summaryBlockHTMLMiddle = ""; // initialize and set value to custom summary block HTML
      var summaryBlockHTMLEnd = "</ul></div></div></div>"; // initialize and set value to custom summary block HTML
  
      var rssFeedURL; // initialize RSS Feed URL variable
      var categoryResult; // initialize category result variable
      // var isFeelGoods = false; // initialize and declare value to false
  
      // NOTE: The following code retrieves the rss feed URL for the category
  
      // execute if article only has one category
      if (jsonData['categoryFilter']) {
  
        console.log("Article HAS Category Filter");
  
        var articleCategoryExists = summaryBlockData.some(function(item) {
          return item['categoryName'] === jsonData['categoryFilter'];
        }); // filter through summaryBlockData array and return true if article category exists
  
        // execute if article category exists in summaryBlockData array
        if (articleCategoryExists) {
          categoryResult = summaryBlockData.filter(function(data) {
            return data['categoryName'] === articleCategory;
          })[0]; // set value to returned article data object
        }
  
        // execute if article category is Feel Good(s)
        /*
        if (jsonData['categoryFilter'] == "Feel Good(s)") {
          isFeelGoods = true; // set value to true
        } */
        // execute if page does not have category filter node
      } else if (jsonData['item']['categories']) {
  
        console.log("Article HAS Item Categories");
  
        var checkedCategory = false; // initialize and set value to false
  
        var categoriesArray = jsonData['item']['categories']; // initialize and declare variable value to JSON data array
  
        /*
        var testIsFeelGoods = categoriesArray.some(function(item) {
          return item == "Feel Good(s)";
        });
  
        // execute if article category is Feel Good(s)
        if (testIsFeelGoods) {
          isFeelGoods = true; // set value to true
        } */
  
        // loop through JSON data array
        for (var i = 0; i < categoriesArray.length; i++) {
  
          // console.log(categoriesArray[i]);
  
          var existsInArticlesArray = summaryBlockData.some(function(item) {
            return item['categoryName'] === categoriesArray[i];
          }); // filter through summaryBlockData array object and return true if article category exists
  
          // execute if article category exists in summaryBlockData array object and checked is false
          if (existsInArticlesArray && !checkedCategory) {
  
            categoryResult = summaryBlockData.filter(function(data) {
              return data['categoryName'] === categoriesArray[i];
            })[0]; // set value to returned article data object
  
  
            checkedCategory = true; // set value to true
          } // end if statement
        } // end for-loop statement
      } // end if statement
  
      console.log("RSS FEED URL: ", categoryResult);
  
      /* NOTE: Optimize this by adding a check for category result before adding any breadcrumbs, etc */
      if (categoryResult) {
        console.log("[CATEGORY RESULT] Exists!", categoryResult);
  
        // execute if insertBreadcumbHTML variable is true
        if (insertBreadcrumbHTML == true) {
          var html = "<div class='custom-breadcrumb'><p>Story from <a href='" + categoryResult.categoryURL + "'>" + categoryResult.categoryName + "</a><span class='special-symbol'></span></p></div>"; // initialize and declare breadcrumb HTML
  
          $("article").prepend(html); // insert custom breadcrumb HTML into top of article page
  
        }
  
        rssFeedURL = categoryResult.categoryURL + "&format=rss"; // set value of article RSS Feed URL
  
        // console.log(rssFeedURL);
  
        // method to retrieve blog page RSS in XML format
        $.ajax({
          url: rssFeedURL,
          accepts: {
            xml: "application/rss+xml"
          },
          dataType: "xml",
          success: function(data) {
            var items = data.getElementsByTagName("channel")[0].getElementsByTagName("item");
  
            for (var i = 0; i < summaryBlockArticleLimit; i++) {
              var item; // initialize variable
  
              // execute if current item title is the same as page title
              if (items[i].getElementsByTagName("title")[0].textContent == decodeText(jsonData['item']['title'])) {
                item = items[i + 1]; // set variable as xml item
                i++; // increment for-loop index
                summaryBlockArticleLimit++; // increment summary block article limit
                // execute if current item title is not the same as page title
              } else {
                item = items[i]; // set variable as xml item
              }
  
              // item.getElementsByTagName("title")[0].textContent ||
              var itemTitle = item.getElementsByTagName("title")[0].textContent; // initialize and set variable to xml item title
  
              // item.getElementsByTagName("link")[0].textContent ||
              var itemLink = item.getElementsByTagName("link")[0].textContent; // initialize and set variable to xml item URL
              var itemAuthor = ""; // initialize xml item author variable
  
              // execute if element exists in item
              if (item.getElementsByTagName("dc:creator")[0]) {
                itemAuthor = item.getElementsByTagName("dc:creator")[0].textContent; // set variable to xml item author
                // execute if element does not exists (Microsoft Edge works with this one)
              } else {
                itemAuthor = $(item).children("dc\\:creator").text(); // set variable to xml item author
              }
  
              var itemDescription; // initialize xml item description variable
  
              // item.getElementsByTagName("description")[0].textContent ||
              // execute if the article item description contains HTML element tags
              if (item.getElementsByTagName("description")[0].textContent.indexOf("<p>") != -1) {
                itemDescription = " "; // set variable to empty string
                // execute if the article item description does not contain HTML element tags
              } else {
                itemDescription = item.getElementsByTagName("description")[0].textContent; // initialize and set variable to xml item description
              }
              var itemImage = ""; // initialize xml item image variable
  
              // execute if element exists in item
              if (item.getElementsByTagName("media:content")[0]) {
                itemImage = item.getElementsByTagName("media:content")[0].attributes[1].value; // set variable to xml item image
                // console.log("Current Item Image: ", itemImage);
  
                // execute if the image URL returned is not an actual url (Internet Explorer works with this one)
                if (itemImage.indexOf("http://") == -1 || itemImage.indexOf("https://") == -1) {
                  itemImage = item.getElementsByTagName("media:content")[0].getAttribute("url");
                }
                // execute if element does not exists (Microsoft Edge works with this one)
              } else {
                itemImage = $(item).children("media\\:content").attr("url"); // set variable to xml item image
              }
  
              //console.log(itemImage);
  
              var itemStyle = ""; // initialize xml item CSS style variable
  
              var itemThumbnail = itemImage.replace(/^http:\/\//i, 'https://'); // set variable to HTTP replaced URL
  
              // console.log("New updated!: ", itemThumbnail);
  
              // variables: itemTitle, itemLink, itemAuthor, itemDescription, itemThumbnail
  
              summaryBlockHTMLMiddle += "<li class='custom-summary-article'><div class='custom-summary-thumb-wrapper'><a class='custom-summary-thumb' href='" + itemLink + "' data-url='" + itemLink + "'><img style='' src='" + itemThumbnail + "' data-pin-nopin='1' nopin='1'></a></div><div class='custom-summary-editorial'><a class='custom-summary-headline' href='" + itemLink + "' data-url='" + itemLink + "'>" + itemTitle + "</a><p class='custom-summary-author-name'>" + itemAuthor + "</p></div></li>"; // set value to custom summary block item HTML
            }
  
            var completeHTML = summaryBlockHTMLStart + summaryBlockHTMLMiddle + summaryBlockHTMLEnd; // concatenate HTML
  
            // execute if article category does not contain "Feel Good(s)"
            // && (location.pathname.split("/")[2] == "75-of-the-funniest-cheesy-pick-up-lines")
  
            // $(".custom-summary-container").prepend(completeHTML); // append to custom HTML element into footer of article
            summaryBlockHTML = completeHTML; // set value to summary block HTML
  
          } // end ajax success
        }); // end ajax request
      }
  
  
  
    } // end insertSummaryBlockHTML
  
    // execute if insertCategoryBlockHTML variable is true
    if (insertCategoryBlockHTML == true) {
      // execute if article has categories node
      if (jsonData['item']['categories']) {
        // console.log("Article has multiple categories");
  
        var categoriesArray = jsonData['item']['categories']; // initialize and declare variable value to JSON data array
        var specialCharacter = ""; // initialize special character variable
        var startHTML = "<div class='custom-category-block sqs-block-html'>"; // initialize and declare start of category block HTML
        var middleHTML = ""; // initialize middle of category block HTML
        var endHTML = "</div>"; // initialize and declare end of category block HTML
  
        // loop through JSON data array
        for (var i = 0; i < categoriesArray.length; i++) {
          // console.log(categoriesArray[i]);
  
          var categoryURL = ""; // initialize category URL variable
  
          var existsInCategoryArray = summaryBlockData.some(function(item) {
            return item['categoryName'] === categoriesArray[i];
          }); // filter through summaryBlockData array object and return true if article category exists
  
          // console.log(existsInCategoryArray);
  
          // execute if article category exists in category array (summaryBlockData)
          if (existsInCategoryArray) {
            categoryURL = summaryBlockData.filter(function(data) {
              return data['categoryName'] === categoriesArray[i];
            })[0].categoryURL; // set value to returned article data object
            // execute if article category does not exist in category array
          } else {
            // console.log("ERROR:", "Article category does not exist...");
            categoryURL = "https://iamandco.com/blog?category=" + categoriesArray[i];
          }
  
          // console.log("URL:", categoryURL);
  
          if (i == 0) {
            specialCharacter = "";
          } else {
            specialCharacter = " • ";
          }
  
          middleHTML += "<span class='category-block-item'><span class='bullet-point'>" + specialCharacter + "</span><a href='" + categoryURL + "' target='_blank'>" + categoriesArray[i] + "</a></span>";
  
        }
  
  
        var completeHTML = startHTML + middleHTML + endHTML; // concatenate HTML
  
        // $(".custom-summary-container").prepend(completeHTML); // append to custom HTML element into footer of article
  
        categoryBlockHTML = completeHTML; // set value to category block HTML
      }
    }
  
    // execute if insertAuthorBlockHTML variable is true
    if (insertAuthorBlockHTML == true) {
      console.log("[AUTHOR ARTICLE BLOCK]:", jsonData);
  
      var authorName = jsonData["item"]["author"]["displayName"]; // initialize and declare author name
      var authorID = jsonData["item"]["author"]["id"]; // initialize and declare author ID
  
      var authorAvatarURL; // initialize author avatar URL
  
      // execute if author avatarURL exists
      if (jsonData["item"]["author"]["avatarUrl"]) {
        authorAvatarURL = jsonData["item"]["author"]["avatarUrl"];
        // execute if author avatarURL does not exist
      } else {
        authorAvatarURL = stockAvatarURL;
      }
  
      var img = document.createElement("img"); // create image element
      img.src = authorAvatarURL; // set image source to author avatarURL
  
      // method that executes when image is loaded
      img.onload = function() {
        var customClass = ""; // initialize custom class
        var width = img.naturalWidth || img.width;
        var height = img.naturalHeight || img.height;
        // console.log("Image height:", height);
        // console.log("Image width:", width);
  
        // execute if image width is greater than height
        if (width > height) {
          customClass = "author-img-landscape"; // set value to landscape image class
        }
  
  
        authorBlockHTML = "<div class='custom-author-article-container'><div class='custom-author-article-image'><img class='" + customClass + "' src='" + authorAvatarURL + "' title='" + authorName + "' alt='" + authorName + "' /></div><div class='custom-author-article-info'><p>Written by</p><a href='/blog/?author=" + authorID + "'>" + authorName + "</a></div></div>";
      }
  
      authorBlockHTML = "<div class='custom-author-article-container'><div class='custom-author-article-image'><img src='" + authorAvatarURL + "' title='" + authorName + "' alt='" + authorName + "' /></div><div class='custom-author-article-info'><p>Written by</p><a href='/blog/?author=" + authorID + "'>" + authorName + "</a></div></div>";
    }
  
    // method to check if all custom HTML variables exist
    var checkElement = setInterval(function() {
      if (pubExchangeHTML && summaryBlockHTML && categoryBlockHTML) {
        // console.log("MESSAGE:", "Elements ready for insertion!");
        clearInterval(checkElement); // stop the loop
        $(".custom-summary-container").prepend(pubExchangeHTML); // append to custom HTML element into footer of article
        $(".custom-summary-container").prepend(summaryBlockHTML); // append to custom HTML element into footer of article
        $(".custom-summary-container").prepend(authorBlockHTML); // append custom HTML into footer of article
        $(".custom-summary-container").prepend(categoryBlockHTML); // append to custom HTML element into footer of article
        if (movePaginationHTML == true) {
          moveElements(); // method called to change position of elements in blog page
        }
      }
    }, 100);
  
  }
  
  // method that changes position of elements in blog page
  function moveElements() {
    var paginationElement = $(".BlogItem-pagination"); // initialize and declare pagination element variable
    var socialElement = $(".BlogItem-share");
  
    // execute if paginationElement exists
    if (paginationElement[0]) {
      // console.log("pagination element exists!");
      // console.log(paginationElement);
  
      var paginationElementClone = paginationElement.clone();
  
      paginationElement.remove();
  
      $(".custom-summary-container .custom-category-block").after(paginationElementClone);
      // execute if paginationElement does not exist
    } else {
      // console.log("ERROR:", "Pagination Element does not exist!");
    }
  
    if (socialElement[0]) {
      // console.log("social element exists!");
      // console.log(socialElement);
  
      var socialElementClone = socialElement.clone();
  
      // socialElementClone.removeClass("hidden");
  
      // console.log(socialElementClone);
  
      // socialElement.remove();
  
      $(".custom-summary-container .BlogItem-pagination").after(socialElementClone);
  
    }
  }
  
  /* This stuff listens for an ajax page change */
  // window.onload = watch;
  window.onload = function() {
    console.log("[ANNOUNCEMENT] ALL IMAGES/ASSETS/SCRIPTS HAVE LOADED");
    pageLoaded = true;
  }
  
  window.addEventListener("DOMContentLoaded", watch);
  
  function watch() {
    // Adds an event listener that fires when page loads using SquareSpace's AJAX loading
    // This method is more efficient than the MutationObserver and it prevents the functions from running twice per load
    window.addEventListener('mercury:load', function() {
      document.querySelector('meta[itemprop="datePublished"]').setAttribute( "content", "");
      summaryBlockArticleLimit = 4; // initialize value that indicates the number of articles to retrieve from RSS feed for custom summary block
      sidebarArticleLimit = 5; // initialize value that indicates the number of sidebar articles to retrieve from RSS feed for sidebar articles
      checkBlog();
      console.log("Will be calling function to load custom video javascript...");
      //$mediavine.web.fillContentHints();
      window.instgrm.Embeds.process();
      loadMediavineVideo(); // call method that loads mediavine's video
      console.log("Called function to load customm video javascript!");
    });
  }