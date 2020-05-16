/* NOTE: The following are customaizable variables that enhance features in article pages */
var insertPubExchangeHTML = true; // setting this variable to true will insert the pubExchange HTML into the footer of article
var insertMailerLite = false; // setting this variable to true will insert the custom MailChimp embed into middle (approximately) of article pages
var insertSummaryBlockHTML = true; // setting this variable to true will insert the custom summary block HTML into the bottom of article pages
var insertCategoryBlockHTML = true; // setting this variable to true will insert the custom category link block HTML into the bottom of article pages
var insertAuthorBlockHTML = true; // setting this variable to true will insert the custom author block HTML into the bottom of article pages
var movePaginationHTML = true; // setting this variable to true will reposition the pagination element HTML into the bottom of article pages
var insertBreadcrumbHTML = true; // setting this variable to true will insert a custom breadcrumb HTML into the top of article pages
var insertCustomDisclaimerText = true; // setting this variable to true will replace Feel Good(s) article disclaimers
var newDisclaimerText = "At I AM & CO, we have a blast curating products that we think you’ll love. Every editorial product is independently selected by our editorial team. When you make a purchase, I AM Media may earn a commission."; // this text will display as Feel Good(s) article disclaimer
var redirectDelay = 1; // initialize and set number of seconds delay before redirecting
var summaryBlockArticleLimit = 4; // value of this variable indicates the number of articles to retrieve from RSS feed for custom summary block
var desktopAdRatio = 25; // in percent (%)
var mobileAdRatio = 28; // in percent(%)
var sidebarArticleLimit = 5; // value of this variable indicates the number of articles tot retrieve from RSS feed for sidebar article block
var sidebarArticleTitle = "Latest Stories"; // this text will display as sidebar article block title
var buttonText = "SIGN ME UP!"; // this text will display as subscribe button text in MailChimp embed form
var customEmbedTitle = "Related Stories"; // this text will display as the title text in custom summary embed
var customMediavineVideoTitle = "READ MORE >>"; // this text will display as the title text in the Mediavine video header
// initialize and declare array of objects containing MailChimp List data
/* NOTE: DO NOT EDIT ARTICLE NAME, ACTION ID, OR INPUT NAME VALUE UNLESS YOU KNOW WHAT YOU ARE DOING! */
var articleData = [{
  articleName: "Latest Articles",
  actionID: "u=23fd1362e2fc3bca611d00b8b&amp;id=765d8a47fd",
  inputNameValue: "b_23fd1362e2fc3bca611d00b8b_765d8a47fd",
  formTitle: "Get our weekly updates so you never miss an article like this one."
}, {
  articleName: "Feel Good(s)",
  actionID: "u=23fd1362e2fc3bca611d00b8b&amp;id=765d8a47fd",
  inputNameValue: "b_23fd1362e2fc3bca611d00b8b_765d8a47fd",
  formTitle: "Get our weekly updates so you never miss an article like this one."
}];
var articlesForEmbed = ["Feel Good(s)"]; // initialize and declare array of blog articles for MailChimp embed (NOTE: any article that does not contain a category from this array will be shown the "Latest Articles" embed)
var categoriesForPopup = ["Astrology", "Spirit"]; // initialize and declare array of blog articles categories that will display MailChimp popups
var summaryBlockData = [{
  categoryName: "Relationships",
  categoryURL: "https://iamandco.com/blog?category=Relationships"
}, {
  categoryName: "Spirit",
  categoryURL: "https://iamandco.com/blog?category=Spirit"
}, {
  categoryName: "Living",
  categoryURL: "https://iamandco.com/blog?category=Living"
}, {
  categoryName: "Culture",
  categoryURL: "https://iamandco.com/blog?category=Culture"
}, {
  categoryName: "Entertainment",
  categoryURL: "https://iamandco.com/blog?category=Entertainment"
}, {
  categoryName: "Career & Money",
  categoryURL: "https://iamandco.com/blog?category=Career%20%26%20Money"
}, {
  categoryName: "Self-Care",
  categoryURL: "https://iamandco.com/blog?category=Self-Care"
}, {
  categoryName: "Health",
  categoryURL: "https://iamandco.com/blog?category=Health"
}, {
  categoryName: "Beauty",
  categoryURL: "https://iamandco.com/blog?category=Beauty"
}, {
  categoryName: "Style",
  categoryURL: "https://iamandco.com/blog?category=Style"
}, {
  categoryName: "Satire",
  categoryURL: "https://iamandco.com/blog?category=Satire"
}, {
  categoryName: "News",
  categoryURL: "https://iamandco.com/blog?category=News"
}]; // initialize and declare array of article objects for custom summary block embed
/* var selection = [".sqs-block.html-block.sqs-block-html", ":header", "p"]; // initialize and declare array of pre-defined HTML selectors for positioning of custom summary block **/
var stockAvatarURL = "https://images.squarespace-cdn.com/content/54ff0211e4b0331c7906899c/1581827889194-T5VPUG7JM871930PPU1F/generic-user-icon.jpg?content-type=image%2Fpng"; // initialize and declare stock avatar image URL

/* Scripts */
/* ------------------------------------------------------------------------------- */
(function (w, d, s, id) {
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
var isMobile = function () {
  //// // console.log("Device: " + navigator.userAgent);
  return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
};

var jsonData; // initialize variable
var pageLoaded = false;
var articleIsFeelGoods = false;
var sentenceArray = [];
var searchPageIndex = 0;

// custom code begins here -----------------------------------------------------------------------------------
checkBlog(); // method called to check if current page is blog page

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
  // // // console.log("First time running function...");
  // Actual function runs below this line
  // -----------------------------------------------------------------------
  // location.pathname.split("/"); returns an array containing all the URL parts
  var pathName = location.pathname.split("/")[1]; // initialize and retrieve current URL pathname
  var secondaryPathName = location.pathname.split("/")[2]; // initialize and retrieve current URL pathname after "/blog/"

  var extraPathName; // initialize extra path name variable

  // execute if URL has parameters
  if (location.href.split("?")[1]) {
    //// // console.log("Exists!", location.href.split("?"));
    extraPathName = location.href.split("?")[1].split("="); // initialize and retrieve current parameter after "/blog/"
  }

  // // // console.log("Other pathname: ", secondaryPathName);

  // execute if current page has "blog" (or "feels-good") path in URL
  if (pathName == "blog" && secondaryPathName) {
    // // // console.log(location.href);
    var formattedURL; // initialize formatted URL variaWble
    var urlHasParameters = checkForParameters(location.href); // call method to check if current URL has parameters
    var blogHasVideo = false;

    // execute if not on mobile device
    if (!isMobile()) {
      // // console.log("Not mobile");
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
        // // console.log("[PARAMETERS]: Url contains ? & white space...trimming ? from url");
        formattedURL = location.href + "format=json"; // set formatted URL variable to current link and create json format parameter and add to end
      } else {
        formattedURL = location.href + "?format=json"; // set formatted URL variable to current link and create json format parameter and add to end
      }
    }

    // call method that inserts Pinterest buttons to images
    insertImageButtons();
    // // console.log("Formatted URL:", formattedURL);

    // check if article has reddit blocks
    if ($(".reddit-card").length > 0) {
      console.log("[REDDIT] Cards were found.");

      loadRedditScripts(); // load reddit scripts
    }

    // method to retrieve page in JSON format
    $.ajax({
      url: formattedURL,
      success: function (result) {

        callback(result); // method called to assign ajax result to variable

        // // // console.log(result);
        // execute if page has category filter
        if (result['categoryFilter']) {
          // // // console.log("Filter name:", result['categoryFilter']);
          // checkInArray(result['categoryFilter'], articlesForEmbed); // method called to check if element exists in articles array

          // NOTE: Execute checkForExternalLinks function for articles that are categorized under "Feel Good(s)"
          if (result['categoryFilter'] == "Feel Good(s)") {
            checkForExternalLinks(true); // method called to check if anchor tags (links) found in document are external and apply no-follow property

            // execute if article is feel good(s) and matches second parameter name
            /*if (secondaryPathName == "revolve-dresses") {
                  insertAdvertisements(true);
            }*/

            // insertAdvertisements(true);

            articleIsFeelGoods = true;

            // execute if insert custom disclaimer text variable is true
            if (insertCustomDisclaimerText == true) {
              // // console.log("[CUSTOM DISCLAIMER TEXT]", "Insert custom disclaimer...");
              var currentText = "Every editorial product is independently selected. If you purchase something through our linked recommendations, our partner(s) may provide a portion of the revenue to I AM Media.";

              var elementsInArray = $("article em:contains('Every editorial product')");

              // // console.log("[CUSTOM DISCLAIMER TEXT]", elementsInArray);

              // execute if disclaimer element exists in DOM
              if (elementsInArray.length > 0) {
                // // console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist?");
                for (var i = 0; i < elementsInArray.length; i++) {
                  // // console.log("[CUSTOM DISCLAIMER TEXT]", $(elementsInArray[i]).text());
                  if ($(elementsInArray[i]).text() == currentText) {
                    // // console.log("[CUSTOM DISCLAIMER TEXT]", "Current text matches!");
                    $(elementsInArray[i]).text(newDisclaimerText);
                  }
                } // end for loop
                // execute if disclaimer element does not exist in DOM
              } else {
                // // console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist!");
                var disclaimerHTML = "<div class='sqs-block spacer-block sqs-block-spacer new-custom-article-sqs-block'><div class='sqs-block-content sqs-intrinsic' style='padding-bottom: 0.157729%;'>&nbsp;</div></div><div class='sqs-block html-block sqs-block-html new-custom-article-sqs-block'><div class='sqs-block-content'><p style='white-space:pre-wrap;'><em>" + newDisclaimerText + "</em></p></div></div>";
                // // console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer not found");
                $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12").append(disclaimerHTML);
              } // end if statement
            } // end if statement

            insertFeelGoodAds(); // call new method that inserts advertisement for feel good articles

          } else {
            checkForExternalLinks(false); // method called to check if anchor tags (links) found in document are external

            // executeif article matches second parameter name
            /* if (secondaryPathName == "revolve-dresses") {
                  insertAdvertisements(false);
            }*/

            // execute if button blocks exist within article (similar to feel-good(s) buttons)
            if ($(".sqs-block.button-block").length > 0) {
              insertFeelGoodAds(); // call new method that inserts advertisement for feel good articles
            } else {
              insertNonFeelGoodAds(); // call new method that inserts advertisements for non feel good articles
              // insertAdvertisements(false);
            }

          }

          insertCustomHTML(result['categoryFilter']); // method called to insert custom HTML

          // execute if page does not have category filter parameter
        } else if (result['item']['categories']) {
          // // // console.log(result['item']['categories']);
          var categoryArray = result['item']['categories']; // initialize and declare variable
          var checked = false; // initialize and declare variable to false

          var insertNoFollowLinks = categoryArray.some(function (item) {
            return item === "Feel Good(s)" || item === "The Style Letter";
          }); // filter through category array and return true if "Feel Good(s)" category is returned

          var inDoNotShowList = categoryArray.some(function (item) {
            return item === "Contests" || item === "Dedicated Feature";
          }); // filter through category array and return true if "Contests" category is returned

          var isArticleStyleExclusive = false;

          // var isArticleStyleExclusive = categoryArray.some(function (item) {
          //   return item === "The Style Letter";
          // });

          // // // console.log("Add no follow: ", insertNoFollowLinks);

          /* var isStylesArticle = categoryArray.some(function (item) {
            return item === "Style";
          });

          // execute if article has "style" category
          if (isStylesArticle) {
            // initialize MailerLite specific HTML
            var mailerLiteStyleHTML = "<div class='sqs-block html-block sqs-block-html mailer-lite-style'><span style = font-style:italic; font-family:'Arial',Helvetica,sans-serif;><a href='javascript:;' onclick='ml_account('webforms', '1626504', 'u0v0s4', 'show')' style='font-weight:800;color:#000000;border-bottom:solid 4px #ff5a41;'>Subscribe to \"The Style Letter\"</a> and get FREE fashion industry news, exclusive members-only articles, exclusive discounts from our style partners, style partner sale announcements, swag, freebies, and more.</span><span style = font-style:italic; font-family:'Arial',Helvetica,sans-serif;> The Style Letter is always 100% free and delivered to your inbox Tuesdays at 9 p.m. EST. All it takes is <a href='javascript:;' onclick='ml_account('webforms', '1626504', 'u0v0s4', 'show')' style='font-weight:800;color:#000000;border-bottom:solid 4px #ff5a41;'>2 clicks to join</a> a global community of smart style lovers.</span></div>";

            // append after first image thumbnail
            $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.image-block:eq(0)").parent().parent().after(mailerLiteStyleHTML);

          } */

          // execute if the article is a style letter article
          if (isArticleStyleExclusive) {

            console.log("[STYLE LETTER]", "This article is a style exclusive letter article.");

            /* INSERT STYLE EXCLUSIVE TITLE */
            var customHTML = "<p class='style-letter-title'>The Style Letter Exclusive</p><p class='style-letter-by'>by <span class='style-letter-name'>I AM & CO</span></p>";

            // insert custom style letter title above title
            $("article .BlogItem-title").prepend(customHTML);

          }

          // execute if insertNoFollowLinks returns true (article is a "Feel Good(s)")
          if (insertNoFollowLinks) {
            checkForExternalLinks(true); // method called to check if anchor tags (links) found in document are external and apply no-follow property

            // execute if article is feel good(s) and matches second parameter name
            /*if (secondaryPathName == "revolve-dresses") {
                  insertAdvertisements(true);
            }*/

            // insertAdvertisements(true);

            articleIsFeelGoods = true;

            // execute if insert custom disclaimer text variable is true
            if (insertCustomDisclaimerText == true) {
              // // console.log("[CUSTOM DISCLAIMER TEXT]", "Insert custom disclaimer...");
              var currentText = "Every editorial product is independently selected. If you purchase something through our linked recommendations, our partner(s) may provide a portion of the revenue to I AM Media.";

              var elementsInArray = $("article em:contains('Every editorial product')");

              // // console.log("[CUSTOM DISCLAIMER TEXT]", elementsInArray);

              // execute if disclaimer element exists in DOM
              if (elementsInArray.length > 0) {
                // // console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist?");
                for (var i = 0; i < elementsInArray.length; i++) {
                  // // console.log("[CUSTOM DISCLAIMER TEXT]", $(elementsInArray[i]).text());
                  if ($(elementsInArray[i]).text() == currentText) {
                    // // console.log("[CUSTOM DISCLAIMER TEXT]", "Current text matches!");
                    $(elementsInArray[i]).text(newDisclaimerText);
                  }
                } // end for loop
                // execute if disclaimer element does not exist in DOM
              } else {
                // // console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer does not exist!");
                var disclaimerHTML = "<div class='sqs-block spacer-block sqs-block-spacer new-custom-article-sqs-block'><div class='sqs-block-content sqs-intrinsic' style='padding-bottom: 0.157729%;'>&nbsp;</div></div><div class='sqs-block html-block sqs-block-html new-custom-article-sqs-block'><div class='sqs-block-content'><p style='white-space:pre-wrap;'><em>" + newDisclaimerText + "</em></p></div></div>";
                // // console.log("[CUSTOM DISCLAIMER TEXT]", "Disclaimer not found");
                $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12").append(disclaimerHTML);
              } // end if statement

            } // end if statement

            // execute if contests category exists in article (if it does DO NOT display video or in-content ads)
            if (!inDoNotShowList) {
              insertFeelGoodAds(); // call new method that inserts advertisement for feel-good(s) articles

              // check if user is on mobile (if they are, do not show the video at all)
              if (!isMobile()) {

                /* 2/20/2020 - FIX THIS PLEASE, MAKE IT BETTER */

                // loop through scripts and find mediavine video
                $('script[data-noptimize]').each(function () {
                  var src = this.src; // initialize and retrieve script source link
                  var searchString = src.search("video.mediavine.com"); // declare variable REGEX search result for subdomain

                  // // console.log("[VIDEO] SRC: ", src);
                  // execute if search string returns a valid match
                  if (searchString != -1) {
                    var searchText = "/videos/"; // initialize search text variable
                    var videoID = src.substr(src.indexOf(searchText) + searchText.length).slice(0, -3); // retrieve video ID from script source link

                    console.log("[VIDEO] Mediavine video script found.");

                    blogHasVideo = true;

                    // call method that loads mediavine's videos
                    // loadMediavineVideo("//scripts.mediavine.com/tags/i-am-and-co.js", videoID, false);

                    return false;

                  }
                });

                console.log("[VIDEO] Blog has video or not:", blogHasVideo);

                // execute if blog does not have video
                if (!blogHasVideo) {

                  console.log("[VIDEO] Blog does not have a video.");

                  // retrieve video information from database
                  $.get("https://www.naxelo.com/iamandco/api/video/read.php", { type: "all-video-information" }).done(function (response) {
                    console.log(response);
                    if (response['status'] == "success") {

                      // initialize variables
                      var videoID = response['data'][0]['video_id'];
                      // var videoElement = "<div id='" + videoID + "' data-volume='70' data-ratio='16:9'></div>";
                      var videoElement = "<div class='mv-video-target mv-video-id-" + videoID + "' data-video-id='" + videoID + "' data-volume='70' data-ratio='16:9'></div>";
                      // var scriptURL = "//video.mediavine.com/videos/" + videoID + ".js";
                      // var scriptURL = "//scripts.mediavine.com/tags/i-am-and-co.js";

                      // check if article has horizontal line after second paragraph indicating that it has a list?
                      if ($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p:eq(1)").parent().parent().next().is(".sqs-block-horizontalrule")) {
                        // remove horizontal rule
                        $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p:eq(1)").parent().parent().next().remove();
                        // insert video element after second paragraph
                        $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p:eq(1)").after(videoElement);
                      } else {
                        // initialize variable that will hold all available paragraphs
                        var availableParagraphs = new Array();

                        // loop through first ten paragraphs in DOM
                        for (var i = 0; i < 10; i++) {
                          // check if paragraph is inside an image tag
                          if (!$($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p")[i]).parent().hasClass("image-caption")) {
                            // insert paragraph into list
                            availableParagraphs.push($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p")[i]);
                          }
                        }

                        // insert video element after third paragraph
                        $(availableParagraphs[1]).after(videoElement);
                      }

                      // call method that loads mediavine's videos
                      loadMediavineVideo(/*scriptURL,*/videoID, true, response);

                    }
                  });

                }
              } else {
                // remove video from DOM if it exists
                if ($(".mediavine-video__target-div").length > 0) {
                  $(".mediavine-video__target-div").remove();
                }
              }
            }

            // execute if insertNoFollowLinks returns false
          } else {
            checkForExternalLinks(false); // method called to check if anchor tags (links) found in document are external

            // execute if article is feel good(s) and matches second parameter name
            /* if (secondaryPathName == "revolve-dresses") {
                  insertAdvertisements(false);
            } */

            // execute if contests category exists in article (if it does, DO NOT display video or in-content ads)
            if (!inDoNotShowList) {

              // check if user is on mobile (if they are, do not show the video at all)
              if (!isMobile()) {
                // loop through scripts and find mediavine video
                $('script[data-noptimize]').each(function () {
                  var src = this.src; // initialize and retrieve script source link
                  var searchString = src.search("video.mediavine.com"); // declare variable REGEX search result for subdomain

                  console.log("[VIDEO] SRC: ", src, searchString);
                  // execute if search string returns a valid match
                  if (searchString != -1) {
                    var searchText = "/videos/"; // initialize search text variable
                    var videoID = src.substr(src.indexOf(searchText) + searchText.length).slice(0, -3); // retrieve video ID from script source link

                    console.log("[VIDEO] Mediavine video script found.");

                    blogHasVideo = true;

                    // call method that loads mediavine's videos
                    // loadMediavineVideo("//scripts.mediavine.com/tags/i-am-and-co.js", videoID, false);

                    return false;

                  }
                });

                console.log("[VIDEO] Blog has video or not:", blogHasVideo);

                // execute if blog does not have video
                if (!blogHasVideo) {

                  console.log("[VIDEO] Blog does not have a video.");

                  // retrieve video information from database
                  $.get("https://www.naxelo.com/iamandco/api/video/read.php", { type: "all-video-information" }).done(function (response) {
                    console.log(response);
                    if (response['status'] == "success") {

                      // initialize variables
                      var videoID = response['data'][0]['video_id'];
                      // var videoElement = "<div id='" + videoID + "' data-volume='70' data-ratio='16:9'></div>";
                      var videoElement = "<div class='mv-video-target mv-video-id-" + videoID + "' data-video-id='" + videoID + "' data-volume='70' data-ratio='16:9'></div>";
                      // var scriptURL = "//video.mediavine.com/videos/" + videoID + ".js";
                      // var scriptURL = "https://scripts.mediavine.com/tags/i-am-and-co.js";

                      // check if article has horizontal line after second paragraph indicating that it has a list?
                      if ($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p:eq(1)").parent().parent().next().is(".sqs-block-horizontalrule")) {
                        // remove horizontal rule
                        $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p:eq(1)").parent().parent().next().remove();
                        // insert video element after second paragraph
                        $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p:eq(1)").after(videoElement);
                      } else {
                        // initialize variable that will hold all available paragraphs
                        var availableParagraphs = new Array();

                        // loop through first ten paragraphs in DOM
                        for (var i = 0; i < 10; i++) {
                          // check if paragraph is inside an image tag
                          if (!$($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p")[i]).parent().hasClass("image-caption")) {
                            // insert paragraph into list
                            availableParagraphs.push($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p")[i]);
                          }
                        }

                        // insert video element after third paragraph
                        $(availableParagraphs[1]).after(videoElement);

                      }

                      // call method that loads mediavine's videos
                      loadMediavineVideo(/*scriptURL,*/videoID, true, response);
                    }
                  });

                }
              } else {
                // remove video from DOM if it exists
                if ($(".mediavine-video__target-div").length > 0) {
                  $(".mediavine-video__target-div").remove();
                }
              }


              // execute if button blocks exist within article (similar to feel-good(s) buttons)
              if ($(".sqs-block.button-block").length > 0 || $("div.sqs-block.horizontalrule-block.sqs-block-horizontalrule").length > 2) {
                insertFeelGoodAds(); // call new method that inserts advertisement for feel good articles
              } else {
                // insertAdvertisements(false);
                insertNonFeelGoodAds(); // call new method that inserts advertisements for non feel good articles
              }
            }

          }

          // loop through result array
          for (var i = 0; i < categoryArray.length; i++) {
            // // console.log("[CHECK BLOG] Category Array:", categoryArray);

            /* REMOVED IN UPDATE 09/28/2019:
            checkArticlesForPopup(categoryArray[i], categoriesForPopup); // method called to check if element exists in articles array
            */
            var existsInArticlesForEmbed = articlesForEmbed.some(function (item) {
              return item === categoryArray[i];
            }); // filter through articlesForEmbed array and return true if article category exists

            // execute if article category exists in articlesForEmbed array and checked is false
            if (existsInArticlesForEmbed && !checked) {
              // // console.log("[CHECK BLOG] Insert the following category for breadcrumb:", categoryArray[i]);
              insertCustomHTML(categoryArray[i]); // method called to insert custom HTML
              checked = true; // set value to true
            }

          }

          // execute if article category does not exist in articlesForEmbed array
          if (!checked) {
            insertCustomHTML(null); // method called to insert custom HTML
            checked = false; // set value to false
          }

        }

      }
    });

    // execute if current page is an author's page
    // && (authorPathName[1] == "5b5b442a88251bc96fcdcdd7" || authorPathName[1] == "5b5b442a88251bc96fcdcdd7#show-archive")
  } else if (pathName == "blog" && extraPathName && findKeywordInArray("author", extraPathName)) {
    var prependHTML = "<div class='custom-author-container sqs-block-html'><div class='custom-loading-image'><img src='https://ds4bdrko1q549.cloudfront.net/assets/common/images/loader.gif' alt='' title='' /></div></div>";

    $(".Main .Main-content").prepend(prependHTML);
    // console.log("This is an author page.");

    var formattedURL; // initialize formattedURL variable

    // execute if authorPathName contains #
    if (extraPathName[1].split("#")) {
      // // // console.log(authorPathName[1].split("#"));
      formattedURL = location.href.replace("#" + extraPathName[1].split("#")[1], "") + "&format=json"; // set formatted URL variable to modified link and add json format parameter to end
      // execute if authorPathName does not contain #
    } else {
      formattedURL = location.href + "&format=json"; // set formatted URL variable to current link and add json format parameter to end
    }

    // // // console.log(formattedURL);

    insertAuthorBio(formattedURL); // method called to insert author bio information to page
    // execute if current page is a category page
  } else if (pathName == "blog" && extraPathName && findKeywordInArray("category", extraPathName)) {

    // console.log("This page is a category page.");
    insertAdsExtraPages(); // call method that inserts advertisements on author & category pages

    // execute if current page is "feel-goods" page
  } else if (pathName == "feel-goods") {
    checkForExternalLinks(true); // method called to check if anchor tags (links) found in document are external and apply no-follow property

    // execute if article is feel good(s) and matches second parameter name
    /* if (secondaryPathName == "revolve-dresses") {
      insertAdvertisements(true);
    } */

    // insertAdvertisements(true);

    // execute if current page is "featured-1" page
  } else if (pathName == "self-care") {

    // // console.log("Current pathname is:", pathName);

    // dynamically load advertisements with content hints
    var checkSelfCareContent = setInterval(function () {
      // execute if pageLoaded variable is true
      if (pageLoaded == true) {
        clearInterval(checkSelfCareContent); // stop the loop
        // // console.log("[ADVERTISEMENTS] PAGE LOADED!");
        // $mediavine.web.fillContentHints();
        loadMediavineScripts();
      }
    }, 100);

  } else if (pathName == "products") {

    // // console.log("Current pathname is:", pathName);

    // call method that changes image URLs in shop page
    changeShopImageURLs();

  } else if (pathName == "splash") {

    // call method to redirect to affiliate link
    redirectToAffiliate();

  } else if (pathName == "blog" && !secondaryPathName && !extraPathName) {

    console.log("This is the blog page.");

    insertAdsExtraPages(); // call method that inserts advertisements on author & category pages

  } else if (pathName == "search") {

    console.log("[SEARCH PAGE]", "This page is the search page.");

    // hide the default search page result container
    $(".sqs-search-page-result").hide();
    $(".sqs-search-page-more-wrapper").hide();
    $(".sqs-search-page-notice").hide();

    // check if the input element exists in the page
    var checkSearchElement = setInterval(function () {

      // check if input element exists
      if ($(".sqs-search-page-input input").length > 0) {

        // stop the loop from running
        clearInterval(checkSearchElement);

        // check if the URL has query parameters
        if (extraPathName) {
          // call function that edits the search page
          editSearchPage(extraPathName);
        } else {
          // call function that edits the search page
          editSearchPage();
        }

      }

    });

  } else if (pathName == "shop" || pathName == "bulk" || pathName == "wholesale") {
    // check if user is viewing on mobile
    if (isMobile()) {
      // check if wiremo div has loaded
      if ($('wiremo-widget-lite').length > 0) {
        $('wiremo-widget-lite').hide().appendTo('article .ProductItem-details.ProductItem-details--mobile').fadeIn();
      } else {
        // check if the element exists in the page
        var checkReviewStars = setInterval(function () {
          // check if input element exists
          if ($("wiremo-widget-lite").length > 0) {
            // stop the loop from running
            clearInterval(checkReviewStars);
            // place beneath title
            $('wiremo-widget-lite').hide().appendTo('article .ProductItem-details.ProductItem-details--mobile').fadeIn();
          }
        });
      }
    }
  } else if (pathName == "") {
    console.log("Home page?");

    // hide product block
    // $('main section .sqs-block.product-block.sqs-block-product .sqs-block-content .product-block').hide();

    if ($('main section .sqs-block.product-block.sqs-block-product .sqs-block-content .product-block .sqs-product-quick-view-button').length > 0) {
      // trigger click event
      $('main section .sqs-block.product-block.sqs-block-product .sqs-block-content .product-block .sqs-product-quick-view-button').trigger('click');
    } else {
      var checkButtonExists = setInterval(function() {
        if ($('main section .sqs-block.product-block.sqs-block-product .sqs-block-content .product-block .sqs-product-quick-view-button').length > 0) {
          clearInterval(checkButtonExists);
          // trigger click event
          $('main section .sqs-block.product-block.sqs-block-product .sqs-block-content .product-block .sqs-product-quick-view-button').trigger('click');
        }
      });
    }

    // check if product quick view div has loaded
    if ($('.sqs-product-quick-view-content').length > 0) {
      console.log("Quick view exists, in first check.");
      // place on product block
      $('.sqs-widget.sqs-product-quick-view').hide().appendTo('main section .sqs-block.product-block.sqs-block-product').fadeIn();
      // remove the quick view selection
      $('main section .sqs-block.product-block.sqs-block-product .sqs-block-content .product-block').remove();
      // remove the lightbox
      $('.sqs-modal-lightbox.sqs-product-quick-view-lightbox').remove();
    } else {
      // check if the element exists in the page
      var checkQuickView = setInterval(function () {
        // check if input element exists
        if ($(".sqs-product-quick-view-content").length > 0) {
          // stop the loop from running
          clearInterval(checkQuickView);
          console.log("Quick view exists, in second check.");
          // place on product block
          $('.sqs-widget.sqs-product-quick-view').hide().appendTo('main section .sqs-block.product-block.sqs-block-product').fadeIn();
          // remove the quick view selection
          $('main section .sqs-block.product-block.sqs-block-product .sqs-block-content .product-block').remove();
          // remove the lightbox
          $('.sqs-modal-lightbox.sqs-product-quick-view-lightbox').remove();
        }
      });
    }
  }
}

// method that returns search results to the search page
function editSearchPage(queryParameter) {

  // empty the default search page result container
  $(".sqs-search-page-result").remove();

  // declare HTML code for spinner icon
  var spinnerHTML = "<div class='yui3-widget sqs-spin dark large'><div class='sqs-spin-content'></div></div>";

  // declare HTML code for "see more" button
  var buttonHTML = "<div class='sqs-search-page-more-wrapper'><button class='sqs-search-page-more sqs-system-button-style-mixin sqs-editable-button search-more-button'>See more</button></div>";

  // declare number of columns for articles
  var columns = 3;

  if (isMobile()) {
    columns = 1;
  }

  // declare HTML code for search results
  var sectionHTML = "<section class='BlogList BlogList--posts-excerpt sqs-blog-list clear' data-columns='" + columns + "'></section>";

  // declare a clone of the form element
  var searchFormElement = $(".sqs-search-page-input form").clone();

  // remove the form element (removes any default event listeners)
  $(".sqs-search-page-input form").remove();

  // append new form element to page
  $(".sqs-search-page-input").append(searchFormElement);

  // append new search results container
  $(".sqs-search-page").find(".sqs-search-page-output").append(sectionHTML);

  // append new search "see more" button
  $(".sqs-search-page").find(".sqs-search-page-output").append(buttonHTML);

  $(".search-more-button").hide();

  // add event listener to form that listens for a form submission event
  searchFormElement.submit(function (e) {

    // prevent any default events from executing
    e.preventDefault();

    // set default value of search index
    searchPageIndex = 0;

    // declare and retrieve the value of the input
    var searchValue = $(searchFormElement).find("input").val();

    console.log("[SEARCH PAGE] Input value:", searchValue);

    // edit the current page url with the new parameter
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + searchValue;
    window.history.pushState({ path: newurl }, '', newurl);

    // hide the search icon
    $(".sqs-search-page-input").addClass("loading");

    // check if spinner wrapper HTML already exists
    if ($(".sqs-search-page-input .spinner-wrapper").children().length > 0) {
      // display the spinner icon
      $(".sqs-search-page-input .spinner-wrapper").show();
    } else {
      // insert the spinner HTML
      $(".sqs-search-page-input .spinner-wrapper").append(spinnerHTML);
    }

    // try statement to ensure Squarespace function exists
    try {

      // execute AJAX request to Squarespace search API
      Y.Data.get({
        url: "/api/search/GeneralSearch",
        data: { q: searchValue, p: searchPageIndex },
        success: function (data) {

          // remove any articles already present in search result container
          $(".BlogList.BlogList--posts-excerpt.sqs-blog-list").empty();

          // hide the spinner icon
          $(".sqs-search-page-input .spinner-wrapper").hide();

          // hide "see-more" button
          $(".search-more-button").hide();

          // display the search icon
          $(".sqs-search-page-input").removeClass("loading");

          // remove any search results text
          if ($(".custom-search-result-text").length > 0) {
            $(".custom-search-result-text").remove();
          }

          // display the search results text
          $(".BlogList.BlogList--posts-excerpt.sqs-blog-list").before('<h1 class="custom-search-result-text">Search results for "' + searchValue + '"</h1>');

          // declare empty variable containing the article HTML
          var middleHTML = "";

          // check if article elements were returned
          if (data["items"] && data["items"].length > 0) {

            console.log("[SEARCH PAGE] Data:", data);

            // assign data to new variable to be able to sort by date
            var searchData = data["items"];

            // sort the data array by descending order (new to old)
            searchData.sort(function (item1, item2) {
              item1 = new Date(item1["publishOn"]);
              item2 = new Date(item2["publishOn"]);
              return item1 > item2 ? -1 : item1 < item2 ? 1 : 0;
            });

            console.log("[SEARCH PAGE] Sorted Data:", searchData);

            // loop through each article item
            for (var i = 0; i < data["items"].length; i++) {

              // check if article item is not a story exclusive
              if (!findKeywordInArray("The Style Letter", data["items"][i]["categories"])) {

                // check if the item is a stories item
                if (data["items"][i]["collectionDisplayName"] == "Stories") {
                  // declare variables containing article information
                  var articleTitle = decodeText(data["items"][i]["title"]);
                  articleTitle = articleTitle.replace("&<em>amp</em>;", "&");
                  var articleAuthorID = data["items"][i]["author"]["id"];
                  var articleAuthor = data["items"][i]["author"]["displayName"];
                  var articleImage = data["items"][i]["imageUrl"];
                  var articleURL = data["items"][i]["itemUrl"];

                  console.log(articleTitle);

                  // fill in data to HTML template
                  middleHTML += "<article class='BlogList-item hentry post-type-text'><div class='BlogList-item-image'><a href='" + articleURL + "' class='BlogList-item-image-link' style='overflow: hidden;'><img data-src='" + articleImage + "' data-image='" + articleImage + "' class='custom-image-search' style='font-size: 0px; left: -0.25px; top: 0px; width: 352.5px; height: 235px; position: relative;' src='" + articleImage + "?format=500w'></a></div><a href='" + articleURL + "' class='BlogList-item-title custom-article-title-search' data-content-field='title'>" + articleTitle + "</a><div class='Blog-meta BlogList-item-meta'><a href='/blog?author=" + articleAuthorID + "' class='Blog-meta-item Blog-meta-item--author'>" + articleAuthor + "</a></div></article>";
                } else if (data["items"][i]["collectionDisplayName"] == "Shop") {
                  // declare variables containing article information
                  var title = decodeText(data["items"][i]["title"]);
                  title = title.replace("&<em>amp</em>;", "&");
                  var image = data["items"][i]["imageUrl"];
                  var url = data["items"][i]["itemUrl"];
                  var collectionDisplayName = data["items"][i]["collectionDisplayName"];

                  // fill in data to HTML template
                  middleHTML += "<article class='BlogList-item hentry post-type-text'><div class='BlogList-item-image'><a href='" + url + "' class='BlogList-item-image-link' style='overflow: hidden;'><img data-src='" + image + "' data-image='" + image + "' class='custom-image-search' style='font-size: 0px; left: -0.25px; top: 0px; width: 352.5px; height: 235px; position: relative;' src='" + image + "?format=500w'></a></div><a href='" + url + "' class='BlogList-item-title custom-article-title-search' data-content-field='title'>" + title + "</a><div class='Blog-meta BlogList-item-meta'><a href='/products' class='Blog-meta-item Blog-meta-item--author'>" + collectionDisplayName + "</a></div></article>";
                }

              }

            }
          } else {
            // append an error message
            $(".BlogList.BlogList--posts-excerpt.sqs-blog-list").append("<h4 style='text-align: center !important;'>No results found. Please try again.</h4>");
          }

          // append article elements to article container section
          $(".BlogList.BlogList--posts-excerpt.sqs-blog-list").append(middleHTML);

          // check if article elements were returned
          if (data["items"] && data["items"].length > 0 && $(".BlogList-item .BlogList-item-image").length < data["totalCount"]) {
            // display "see-more" button
            $(".search-more-button").show();
          }

          // insert ads
          insertAdsExtraPages();

        }
      }, this);

      // catch error messages
    } catch (error) {

      // log the error
      console.log("[SEARCH PAGE]", error);

    }

  });

  // add event listener to form button that listens for a button press
  $(".search-more-button").click(function () {
    console.log("[SEARCH PAGE]", "Button was clicked!");

    // disable the button
    $(this).prop("disabled", true);
    // change the button's background color to a disabled color
    $(this).addClass("custom-search-more-button-disabled");

    // increment the search page number
    searchPageIndex++;

    // declare and retrieve the value of the input
    var searchValue = $(searchFormElement).find("input").val();

    // try statement to ensure Squarespace function exists
    try {

      // execute AJAX request to Squarespace search API
      Y.Data.get({
        url: "/api/search/GeneralSearch",
        data: { q: searchValue, p: searchPageIndex },
        success: function (data) {

          // declare empty variable containing the article HTML
          var middleHTML = "";

          // check if article elements were returned
          if (data["items"] && data["items"].length > 0) {

            console.log("[SEARCH PAGE] Data:", data);

            // assign data to new variable to be able to sort by date
            var searchData = data["items"];

            // sort the data array by descending order (new to old)
            searchData.sort(function (item1, item2) {
              item1 = new Date(item1["publishOn"]);
              item2 = new Date(item2["publishOn"]);
              return item1 > item2 ? -1 : item1 < item2 ? 1 : 0;
            });

            console.log("[SEARCH PAGE] Sorted Data:", searchData);

            // loop through each article item
            for (var i = 0; i < data["items"].length; i++) {

              // check if article item is not a story exclusive
              if (!findKeywordInArray("The Style Letter", data["items"][i]["categories"])) {

                // check if the item is a stories item
                if (data["items"][i]["collectionDisplayName"] == "Stories") {
                  // declare variables containing article information
                  var articleTitle = decodeText(data["items"][i]["title"]);
                  articleTitle = articleTitle.replace("&<em>amp</em>;", "&");
                  var articleAuthorID = data["items"][i]["author"]["id"];
                  var articleAuthor = data["items"][i]["author"]["displayName"];
                  var articleImage = data["items"][i]["imageUrl"];
                  var articleURL = data["items"][i]["itemUrl"];

                  console.log(articleTitle);

                  // fill in data to HTML template
                  middleHTML += "<article class='BlogList-item hentry post-type-text'><div class='BlogList-item-image'><a href='" + articleURL + "' class='BlogList-item-image-link' style='overflow: hidden;'><img data-src='" + articleImage + "' data-image='" + articleImage + "' class='custom-image-search' style='font-size: 0px; left: -0.25px; top: 0px; width: 352.5px; height: 235px; position: relative;' src='" + articleImage + "?format=500w'></a></div><a href='" + articleURL + "' class='BlogList-item-title custom-article-title-search' data-content-field='title'>" + articleTitle + "</a><div class='Blog-meta BlogList-item-meta'><a href='/blog?author=" + articleAuthorID + "' class='Blog-meta-item Blog-meta-item--author'>" + articleAuthor + "</a></div></article>";
                } else if (data["items"][i]["collectionDisplayName"] == "Shop") {
                  // declare variables containing article information
                  var title = decodeText(data["items"][i]["title"]);
                  title = title.replace("&<em>amp</em>;", "&");
                  var image = data["items"][i]["imageUrl"];
                  var url = data["items"][i]["itemUrl"];
                  var collectionDisplayName = data["items"][i]["collectionDisplayName"];

                  // fill in data to HTML template
                  middleHTML += "<article class='BlogList-item hentry post-type-text'><div class='BlogList-item-image'><a href='" + url + "' class='BlogList-item-image-link' style='overflow: hidden;'><img data-src='" + image + "' data-image='" + image + "' class='custom-image-search' style='font-size: 0px; left: -0.25px; top: 0px; width: 352.5px; height: 235px; position: relative;' src='" + image + "?format=500w'></a></div><a href='" + url + "' class='BlogList-item-title custom-article-title-search' data-content-field='title'>" + title + "</a><div class='Blog-meta BlogList-item-meta'><a href='/products' class='Blog-meta-item Blog-meta-item--author'>" + collectionDisplayName + "</a></div></article>";
                }

              }

            }
          } else {
            // hide the button
            $(this).hide();

          }

          // append article elements to article container section
          $(".BlogList.BlogList--posts-excerpt.sqs-blog-list").append(middleHTML);

          // check if article elements were returned
          if (data["items"] && data["items"].length > 0) {

            // check if there are more items to be inserted
            if ($(".BlogList-item .BlogList-item-image").length < data["totalCount"]) {
              // disable the button
              $(this).prop("disabled", false);
              // change the button's background color to a disabled color
              $(this).removeClass("custom-search-more-button-disabled");
            } else {
              $(this).hide();
            }

            // check if content hints exist
            if ($(".content_hint").length > 0) {
              // remove the content hints
              $(".content_hint").parent().remove();

              // remove any break elements
              $("br").remove();

              // insert ads
              insertAdsExtraPages();
            }

          }

        }
      }, this);

      // catch error messages
    } catch (error) {

      // log the error
      console.log("[SEARCH PAGE]", error);

    }

  });

  // check if query parameters exist
  if (queryParameter && queryParameter[0] == "q" && queryParameter[1].length > 0) {

    // trigger form submission
    searchFormElement.trigger("submit");

  }

}

// method that loads mediavine's videos
function loadMediavineVideo(/*src,*/videoID, addObserver, response) {

  var hrElement = "<div class='sqs-block horizontalrule-block sqs-block-horizontalrule new-custom-article-sqs-block custom-hr-element'><div class='sqs-block-content'><hr></div></div>";

  // console.log("[VIDEO] SRC:", src);

  // set autoplay property to true
  $('.mv-video-id-' + videoID).attr('data-autoplay', 'true');

  // set autoplay property to true for video element
  $('.mv-video-id-' + videoID).find('.video-js').find('video').attr('autoplay', 'true');

  // execute if addObserver element is true
  if (addObserver && response) {

    // method to check if all custom HTML variables exist
    var checkElement = setInterval(function () {
      // check if ad container exists inside video
      if ($('.mv-video-id-' + videoID).find(".ima-ad-container").length > 0) {
        clearInterval(checkElement); // stop the loop
        console.log("[VIDEO] Element found.");
        // add horizontal lines
        $('.mv-video-id-' + videoID).before(hrElement);
        $('.mv-video-id-' + videoID).after(hrElement);

        // set autoplay to true and reload the video
        $('.mv-video-id-' + videoID).find('video')[0].autoplay = true;
        // set the title of the mediavine bar
        $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-title").prepend("<span class='mediavine-sticky-header'>Top Stories</span>");
        $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-title a").html("Read More <span class='mediavine-sticky-title-arrow'>>></span>");
        $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-title a").prependTo(".mediavine-video__sticky-bar").addClass("read-more-text");
        // hide the default image
        $('.mv-video-id-' + videoID).find("div:first-child").find("div:first-child").css("background-image", "none");
        var targetElement = $('.mv-video-id-' + videoID).find(".ima-ad-container");
        var miniVideoElement = $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-container");
        observeVideoAd(targetElement, videoID, response);
        observeMiniVideo(miniVideoElement, videoID, response);
      }
    }, 100);

  }

  /* // add horizontal lines
  $('.mv-video-id-' + videoID).before(hrElement);
  $('.mv-video-id-' + videoID).after(hrElement); */

  // load javascript
  /*   $.getScript(src, function (data, textStatus, jqxhr) {
      console.log("[VIDEO]", textStatus); // success message
      console.log("[VIDEO]", jqxhr.status); // 200 message
      console.log("[VIDEO]", "Javascript load was performed successfully."); // custom success message
  
      // execute if addObserver element is true
      if (addObserver && response) {
  
        // method to check if all custom HTML variables exist
        var checkElement = setInterval(function () {
          // check if ad container exists inside video
          if ($('.mv-video-id-' + videoID).find(".ima-ad-container").length > 0) {
            clearInterval(checkElement); // stop the loop
            console.log("[VIDEO] Element found.");
            // add horizontal lines
            $('.mv-video-id-' + videoID).before(hrElement);
            $('.mv-video-id-' + videoID).after(hrElement);
  
            // set autoplay to true and reload the video
            $('.mv-video-id-' + videoID).find('video')[0].autoplay = true;
            // set the title of the mediavine bar
            $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-title").prepend("<span class='mediavine-sticky-header'>Top Stories</span>");
            $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-title a").html("Read More <span class='mediavine-sticky-title-arrow'>>></span>");
            $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-title a").prependTo(".mediavine-video__sticky-bar").addClass("read-more-text");
            // hide the default image
            $('.mv-video-id-' + videoID).find("div:first-child").find("div:first-child").css("background-image", "none");
            var targetElement = $('.mv-video-id-' + videoID).find(".ima-ad-container");
            var miniVideoElement = $('.mv-video-id-' + videoID).find(".mediavine-video__sticky-container");
            observeVideoAd(targetElement, videoID, response);
            observeMiniVideo(miniVideoElement, videoID, response);
          }
        }, 100);
  
      }
  
    }); */

}

// method that adds mutation observer to Mediavine's videos
function observeVideoAd(targetElement, videoID, data) {

  // console.log("[VIDEO] Element:", targetElement, "ID:", videoID);

  // execute if target element exist
  if (targetElement.length > 0) {

    // retrieve the target element
    var adElement = targetElement[0];

    // retrieve anchor tag from data
    var videoInformation = data['data'][0];

    // set options for observer
    var config = { attributes: true, childList: false, subtree: false };

    // callback function to execute when mutations are observed
    var callback = function (mutationsList, observer) {
      // loop through every mutation in the mutation list
      mutationsList.forEach((mutation) => {
        // execute if the ad becomes invisible
        if (mutation.target.style.display == 'none') {
          console.log("[VIDEO] ID:", $('.mv-video-id-' + videoID));
          console.log("[VIDEO] Ad stopped playing...", $('.mv-video-id-' + videoID).find('video')[0].paused);
          // call method that displays the title animations
          animateAdVideo(videoID, videoInformation);
          // execute if the mini video exists
          if ($('.mv-video-id-' + videoID).find('.mediavine-video__is-sticky').length > 0) {
            // hide the "READ MORE" text
            $('.mv-video-id-' + videoID).find('.read-more-text').attr('hidden', 'true');
            // hide the video headline container
            $('.mv-video-id-' + videoID).find('.video-headline-container').attr('hidden', 'true');
          }
          // stop observing
          observer.disconnect();
        }
      });
    };

    // create observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // check if video ID matches Mediavine video ID
    if (videoInformation['video_id'] === videoID) {
      // begin observing the target node for configured mutations
      observer.observe(adElement, config);
    } else {
      console.log("[VIDEO] Video IDs do not match!");
    }

  }

}

// method that displays and animates the video titles
function animateAdVideo(videoID, information) {

  console.log("[VIDEO] Animate video method called.");

  console.log("[VIDEO] Information:", information);

  // pause the video and set time to 0:00
  $('.mv-video-id-' + videoID).find('video')[0].pause();
  $('.mv-video-id-' + videoID).find('video')[0].currentTime = 0;

  // declare the headline HTML
  var headlineHTML = "<div class='video-headline-container'></div>";

  // retrieve the time interval from data
  var timeInterval = information['time_interval']; // in seconds

  // declare word limit per sentence (8 is ideal)
  var wordLimit = 8;

  // declare counter index for headline articles
  var counter = 0;

  // add headline HTML inside video
  $('.mv-video-id-' + videoID).find('.mediavine-video__sticky-video').prepend(headlineHTML);

  // add an event listener that executes when the video ends
  document.getElementsByClassName('mv-video-id-' + videoID)[0].getElementsByTagName('video')[0].onended = function () {
    console.log("[VIDEO]", "The video has finally ended.");
    // remove headlines from container after video ends
    $('.mv-video-id-' + videoID).find('.video-headline-container').empty();
  }

  // retrieve formatted strings based on article title
  retrieveStrings(information['video_links'][counter]['article_title'].split(" "), wordLimit);

  console.log("[VIDEO] Sentence:", sentenceArray);

  // loop through sentence array and append text to video-headline-container
  for (var i = 0; i < sentenceArray.length; i++) {
    // declare HTML for headline text
    var textHTML = "<div class='video-headline-text' data-element-id='" + i + "'>" + sentenceArray[i] + "</div>";
    // append to video headline container
    $('.mv-video-id-' + videoID).find('.video-headline-container').append(textHTML);

  }

  // pause the video and set time to 0:00
  var autoplayPromise = $('.mv-video-id-' + videoID).find('video')[0].play();

  // check if promise is undefined
  if (autoplayPromise !== undefined) {
    autoplayPromise.then(_ => {
      // autoplay started
    }).catch(error => {
      // autoplay was prevented
      console.error(error);
    });
  }

  // reset the sentence array
  sentenceArray.length = 0;

  // increase sentence counter by 1
  counter++;

  // change article titles incrementally
  var changeTitles = setInterval(function () {
    // check if video is paused
    if (!$('.mv-video-id-' + videoID).find('video')[0].paused) {
      // empty the headline text elements
      $('.mv-video-id-' + videoID).find('.video-headline-container').empty();
      // retrieve formatted strings based on article title
      retrieveStrings(information['video_links'][counter]['article_title'].split(" "), wordLimit);
      console.log("[VIDEO] Sentence:", sentenceArray);
      // loop through sentence array and append text to video-headline-container
      for (var i = 0; i < sentenceArray.length; i++) {
        // declare HTML for headline text
        var textHTML = "<div class='video-headline-text'>" + sentenceArray[i] + "</div>";
        // append to video headline container
        $('.mv-video-id-' + videoID).find('.video-headline-container').append(textHTML);
      }

      // reset the sentence array
      sentenceArray.length = 0;

      // increase sentence counter by 1
      counter++;

      // execute if counter exceeds video links
      if (counter > information['video_links'].length - 1) {
        // clear the interval and stop changing links
        clearInterval(changeTitles);
        // reset counter
        counter = 0;
      }
    }
  }, timeInterval * 1000);

}

// method that adds mutation observer to Mediavine's mini video
function observeMiniVideo(targetElement, videoID, data) {

  // execute if target elements exist
  if (targetElement.length > 0) {

    // retrieve the target element
    var videoElement = targetElement[0];

    // retrieve anchor tag from data
    var videoInformation = data['data'][0];

    // set options for observer
    var config = { attributes: true, childList: false, subtree: false };

    // callback function to execute when mutations are observed
    var callback = function (mutationsList, observer) {
      // loop through every mutation in the mutation list
      mutationsList.forEach((mutation) => {
        // execute if the mini video exists
        if (mutation.target.className.indexOf('mediavine-video__is-sticky') > -1) {
          // hide the "READ MORE" text
          $('.mv-video-id-' + videoID).find('.read-more-text').attr('hidden', 'true');
          // hide the video headline container
          $('.mv-video-id-' + videoID).find('.video-headline-container').attr('hidden', 'true');
        } else {
          // execute if the document has the "READ MORE" text
          if ($('.mv-video-id-' + videoID).find('.read-more-text').length > 0) {
            // execute if the document has the video headline container
            if ($('.mv-video-id-' + videoID).find('.video-headline-container').length > 0 && $('.mv-video-id-' + videoID).find('.video-headline-container').is(':hidden')) {
              $('.mv-video-id-' + videoID).find('.video-headline-container').removeAttr('hidden');
            }
            // execute if they have the hidden attribute
            if ($('.mv-video-id-' + videoID).find('.read-more-text').is(':hidden')) {
              // display the hidden containers
              $('.mv-video-id-' + videoID).find('.read-more-text').removeAttr('hidden');
            }
          }
        }
      });
    };

    // create observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // check if video ID matches Mediavine video ID
    if (videoInformation['video_id'] === videoID) {
      // begin observing the target node for configured mutations
      observer.observe(videoElement, config);
    } else {
      console.log("[VIDEO] Video IDs do not match!");
    }

  }

}

// method that returns an array of strings
function retrieveStrings(array, limitPerString) {

  // execute if the array has elements
  if (array.length > 0) {

    // format a string based on the limit of words
    var string = array.splice(0, limitPerString).join(" ");

    // push to the array
    sentenceArray.push(string);

    // call function again to format a string based on remaining words
    retrieveStrings(array, limitPerString);

  }

}

// method that loads mediavine's script
function loadMediavineScripts() {
  var scriptSrc = "//scripts.mediavine.com/tags/i-am-and-co.js"; // initialize and retrieve script source link

  var pathName = location.pathname.split("/")[1]; // initialize and retrieve current URL pathname
  var secondaryPathName = location.pathname.split("/")[2]; // initialize and retrieve current URL pathname after "/blog/"

  // execute if page is an article page under "blog" pathname
  if (pathName == "blog" && secondaryPathName) {
    // load javascript
    $.getScript(scriptSrc, function (data, textStatus, jqxhr) {
      // // console.log("[SCRIPT]", textStatus); // success message
      // // console.log("[SCRIPT]", jqxhr.status); // 200 message
      console.log("[SCRIPT]", "Javascript load was performed successfully."); // custom success message
    });
  }

}

// method that loads javascripts asynchronously
function loadScript(scriptURL, callback) {

  // load javascript
  $.getScript(scriptURL, function (data, textStatus, jqxhr) {
    console.log("[SCRIPT]", "File:", scriptURL, "loaded", textStatus);

    // check if valid function was passed for callback
    if (typeof callback == "function") {
      callback();
    }

  });

}

// method that executes javascript for OneSignal
// function displayOneSignal() {
//   var numSecondsDelay = 15; // number of seconds delay
//   var OneSignal = window.OneSignal || [];
//   /* Why use .push? See: http://stackoverflow.com/a/38466780/555547 */
//   OneSignal.push(function () {
//     OneSignal.init({
//       appId: "cfad4a73-3fa8-4622-80d8-43d0e0ddaf6e",
//     });
//     /* In milliseconds, time to wait before prompting user. This time is relative to right after the user presses <ENTER> on the address bar and navigates to your page */
//     var notificationPromptDelay = numSecondsDelay * 1000;
//     /* Use navigation timing to find out when the page actually loaded instead of using setTimeout() only which can be delayed by script execution */
//     var navigationStart = window.performance.timing.navigationStart;
//     /* Get current time */
//     var timeNow = Date.now();
//     /* Prompt the user if enough time has elapsed */
//     setTimeout(promptAndSubscribeUser, Math.max(notificationPromptDelay - (timeNow - navigationStart), 0));
//   });
//   var promptAndSubscribeUser = function () {
//     console.log("15 seconds have passed...");
//     window.OneSignal.isPushNotificationsEnabled(function (isEnabled) {
//       if (!isEnabled) {
//         window.OneSignal.showSlidedownPrompt();
//       }
//     });
//   }
// }

// method that loads reddit scripts
function loadRedditScripts() {

  var scriptSrc = "https://embed.redditmedia.com/widgets/platform.js"; // initialize and retrieve script source link

  var pathName = location.pathname.split("/")[1]; // initialize and retrieve current URL pathname
  var secondaryPathName = location.pathname.split("/")[2]; // initialize and retrieve current URL pathname after "/blog/"

  // execute if page is an article page under "blog" pathname
  if (pathName == "blog" && secondaryPathName) {
    // load javascript
    $.getScript(scriptSrc, function (data, textStatus, jqxhr) {
      // // console.log("[SCRIPT]", textStatus); // success message
      // // console.log("[SCRIPT]", jqxhr.status); // 200 message
      console.log("[SCRIPT]", "Javascript load was performed successfully."); // custom success message
    });
  }

}

// method that checks if elements exist
function checkForElements() {
  // method to check if all custom HTML variables exist
  var checkElement = setInterval(function () {
    if ($("article .custom-breadcrumb").length && $("article .BlogItem-title") && $("article .Blog-meta.BlogItem-meta") && $("article .BlogItem-share") && $("article .sqs-layout.sqs-grid-12.columns-12")) {
      // // console.log("[FUNCTION]:", "Elements ready for moving!");
      clearInterval(checkElement); // stop the loop
      insertAdSidebar();
    }
  }, 100);
}

// method that changes image URLs in shop page
function changeShopImageURLs() {
  let tag = "[SHOP]";

  // // // console.log(tag, "Change shop image URLs");

  // retrieve all image anchor tags in shop page
  var shopAnchorTags = $("main section[data-content-field='main-content'] .col.sqs-col-12.span-12 .sqs-gallery .sqs-gallery-design-grid-slide a.image-slide-anchor");

  // loop through anchor tags
  for (var i = 0; i < shopAnchorTags.length; i++) {

    // execute when user right clicks on the image
    $(shopAnchorTags[i]).contextmenu(function (event) {
      var currentURL = this.href; // retrieve affiliate URL
      var newURL = "https://iamandco.com/splash?ref=" + currentURL; // set new splash + affiliate URL

      // // console.log(tag, newURL);

      $(this).attr('href', newURL); // set image href to new URL
    });

  }
}

// method that retrieves desired URL parameter
function getURLParameter(url) {
  var query = url.search.substring(1); // retrieve anything after ? query parameter

  // execute if query parameter exists
  if (query) {
    // // console.log(query);
    var afterRef = query.substr(query.indexOf("ref") + 4); // retrieve "ref" parameter
    return afterRef; // return redirect URL
  } else {
    return false;
  }
}

// method that redirects users to affiliate link
function redirectToAffiliate() {
  var currentURL = window.location; // initialize and retrieve current website URL

  var redirectURL = getURLParameter(currentURL); // call method to retrieve URL parameter containing redirect URL

  // // execute if redirect URL exists
  // if (redirectURL != false) {
  //   window.location.href = redirectURL; // redirect the page to new URL
  // }


  // method that redirects page to new URL after specified number of seconds
  setTimeout(function () {
    // execute if redirect URL exists
    if (redirectURL != false) {
      window.location.href = redirectURL; // redirect the page to new URL
    }
  }, redirectDelay * 1000);


}

// method that inserts custom HTML for advertisements
// function insertAdvertisements(isFeelGoods) {
//   // var adHTML = "<div class='test-content'>Test</div>";

//   // // console.log("[FUNCTION] Insert advertisements!");
//   /* NOTE: For sidebar, use the flex option on the article element itself */
//   /* NOTES from client */
//   // --------------------------------------------------------------------------
//   /* Insert content hints above H2 tags and H3 tags
//     line blocks, spacer blocks, H2 and H3s are the main ways we break up our content.
//     on feel-good(s) articles can you insert the code above line blocks or spacer blocks
//     --
//     on non feel-good(s) articles can you insert the code above line blocks, spacer blocks, H2's and H3's up to (8) ads per article */
//   // --------------------------------------------------------------------------
//   /* Feel-Good(s)
//   -------------------------------------------------------------------------------
//   */
//   if (isFeelGoods) {
//     // // console.log("[FUNCTION] is feel good(s)");
//     // var adHTML = "<div class='test-content sqs-block html-block sqs-block-html'>Test</div>";
//     var adHTML = "<div class='content_hint custom-appended'></div>";

//     // -- Line blocks
//     var lineBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.horizontalrule-block.sqs-block-horizontalrule");
//     // // console.log("Line blocks:", lineBlocks.length);
//     // -- H2 elements
//     var h2Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h2");
//     // // console.log("H2 elements:", h2Elements.length);
//     // -- H3 elements
//     var h3Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h3");
//     // // console.log("H3 elements:", h3Elements.length);
//     // -- P elements
//     var pElements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p");
//     // // console.log("P elements:", pElements.length);

//     var totalElements = [lineBlocks, h2Elements, h3Elements, pElements];

//     var totalElementsLength = lineBlocks.length + h2Elements.length + h3Elements.length + pElements.length;

//     var finalAdRatio;

//     // execute if user is on a mobile device
//     if (isMobile()) {
//       finalAdRatio = Math.ceil(totalElementsLength * (mobileAdRatio / 100));
//     } else {
//       finalAdRatio = Math.ceil(totalElementsLength * (desktopAdRatio / 100));
//     }

//     var adPerPageLimit;

//     /* UPDATE 09/27/2019 CHANGED 8 TO 4 */

//     // execute if ad ratio exceeds the limit
//     if (finalAdRatio > 4) {
//       adPerPageLimit = 4; // set limit value to ad-per-page limit variable
//     } else {
//       adPerPageLimit = finalAdRatio; // set ad ratio value to ad-per-page limit variable
//     }

//     // // console.log("Ad Ratio:", adPerPageLimit);

//     // ---------------------------------------------------
//     var elementArray = returnAdPositions(totalElements, adPerPageLimit); // call method that returns ad positions

//     // // console.log("Final Element Array:", elementArray);

//     // loop through elements array and append div content avove
//     for (var i = 0; i < elementArray.length; i++) {

//       // NOTE: Append paragraphs after, everything else before
//       if ($(elementArray[i]).is("p")) {
//         // // console.log("[ADS] Element is a paragraph!");
//         $(elementArray[i]).after(adHTML);

//         /* check if the element after the appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
//         if ($(elementArray[i]).next().is(".content_hint")) {
//           var elementAppended = $(elementArray[i]).next();
//           // // console.log("[JUST APPENDED AFTER]", elementAppended);

//           if (elementAppended.next().is(".content_hint")) {
//             elementAppended.remove();
//           }
//         }

//       } else {
//         // // console.log("[ADS] Element is not a paragraph!");
//         $(elementArray[i]).before(adHTML);

//         /* check if prev element after appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
//         if ($(elementArray[i]).prev().is(".content_hint")) {
//           var elementAppended = $(elementArray[i]).prev();
//           // // console.log("[JUST APPENDED BEFORE]", elementAppended);

//           if (elementAppended.prev().is(".content_hint")) {
//             elementAppended.remove();
//           }

//         }

//       }

//     }
//     //$mediavine.web.fillContentHints();

//     /* Non-Feel-Good(s)
//     -------------------------------------------------------------------------------
//     */
//   } else {
//     // // console.log("[FUNCTION] is not feel good(s)");
//     // var adHTML = "<div class='test-content'>Test</div>";
//     var adHTML = "<div class='content_hint custom-appended'></div>";

//     // -- Line blocks
//     var lineBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.horizontalrule-block.sqs-block-horizontalrule");
//     // // console.log("Line blocks:", lineBlocks.length);
//     // -- Spacer blocks
//     /* var spacerBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.spacer-block.sqs-block-spacer");
//     // // console.log("Spacer blocks:", spacerBlocks.length); */
//     // -- H2 elements
//     var h2Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h2");
//     // // console.log("H2 elements:", h2Elements.length);
//     // -- H3 elements
//     var h3Elements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 h3");
//     // // console.log("H3 elements:", h3Elements.length);
//     // -- P elements
//     var pElements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p");
//     // // console.log("P elements:", pElements.length);

//     var totalElements = [lineBlocks, h2Elements, h3Elements, pElements];

//     var totalElementsLength = lineBlocks.length + h2Elements.length + h3Elements.length + pElements.length;


//     var finalAdRatio;

//     // execute if user is on a mobile device
//     if (isMobile()) {
//       finalAdRatio = Math.ceil(totalElementsLength * (mobileAdRatio / 100));
//     } else {
//       finalAdRatio = Math.ceil(totalElementsLength * (desktopAdRatio / 100));
//     }

//     var adPerPageLimit;

//     /* UPDATE 09/27/2019 CHANGED 8 TO 4 */

//     // execute if ad ratio exceeds the limit
//     if (finalAdRatio > 4) {
//       adPerPageLimit = 4; // set limit value to ad-per-page limit variable
//     } else {
//       adPerPageLimit = finalAdRatio; // set ad ratio value to ad-per-page limit variable
//     }

//     // // console.log("Ad Ratio:", adPerPageLimit);

//     // ---------------------------------------------------

//     /* UPDATE: 10/01/2019 - CHECK IF MEDIAVINE VIDEO EXISTS */
//     var checkMediavineVideoExists = setInterval(function () {
//       // check if video element is inserted
//       if ($(".mediavine-video__target-div").length > 0) {
//         // stop the loop
//         clearInterval(checkMediavineVideoExists);
//         var elementArray = returnAdPositions(totalElements, adPerPageLimit); // call method that returns ad positions

//         console.log("Final Element Array:", elementArray, elementArray.length);

//         // loop through elements array and append div content avove

//         for (var i = 0; i < elementArray.length; i++) {
//           // // // console.log(elementArray[i]);

//           // NOTE: Append paragraphs after, everything else before

//           if ($(elementArray[i]).is("p")) {
//             console.log("[ADS] Element is a paragraph!");
//             $(elementArray[i]).after(adHTML);

//             /* check if the element after the appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
//             if ($(elementArray[i]).next().is(".content_hint")) {
//               var elementAppended = $(elementArray[i]).next();
//               // // console.log("[JUST APPENDED AFTER]", elementAppended);

//               if (elementAppended.next().is(".content_hint")) {
//                 elementAppended.remove();
//               }

//             }

//           } else {
//             // // console.log("[ADS] Element is not a paragraph!");
//             $(elementArray[i]).before(adHTML);

//             /* check if prev element after appended content hint is also a content hint and if so, remove from DOM in order to prevent ads stacking up */
//             if ($(elementArray[i]).prev().is(".content_hint")) {
//               var elementAppended = $(elementArray[i]).prev();
//               // // console.log("[JUST APPENDED BEFORE]", elementAppended);

//               if (elementAppended.prev().is(".content_hint")) {
//                 elementAppended.remove();
//               }

//             }

//           }



//           /*
//           if (!$(elementArray[i]).prev().is(".content_hint")) {
//             // // console.log("[ADS] Previous element is not a content hint!", $(elementArray[i]).prev());

//             if ($(elementArray[i]).is("p")) {
//               // // console.log("[ADS] Element is a paragraph!");
//               $(elementArray[i]).after(adHTML);
//             } else {
//               // // console.log("[ADS] Element is not a paragraph!");
//               $(elementArray[i]).before(adHTML);
//             }

//           } */

//         } // end for-loop
//       }
//     });

//   } // end outer (is feel goods) statement

//   var checkForFinishedElementMovement = setInterval(function () {
//     // execute if element movement was finished
//     if ($("article .custom-content .custom-article-content .BlogItem-comments")) {
//       // // console.log("[FINAL MOVEMENT FINISHED]");
//       clearInterval(checkForFinishedElementMovement); // stop the loop
//       // insert ads below and above comment section
//       /*
//       $("article .custom-content .custom-article-content .BlogItem-comments").before("<div class='content_hint custom-appended'></div>");
//       $("article .custom-content .custom-article-content .BlogItem-comments").after("<div class='content_hint custom-appended'></div>");
//       */
//     }
//   });

//   var checkPageLoaded = setInterval(function () {
//     // execute if pageLoaded variable is true
//     if (pageLoaded == true) {
//       clearInterval(checkPageLoaded); // stop the loop
//       // // console.log("[ADVERTISEMENTS] PAGE LOADED!");
//       // $mediavine.web.fillContentHints();
//       loadMediavineScripts();
//     }
//   }, 100);
// } // end function

// new method that inserts advertisements for feel-good(s) articles
function insertFeelGoodAds() {
  /* TODO:
         
          1. Retrieve all HTML blocks
          2. Retrieve images within HTML blocks
          3. If image+title+button+text combo exists then insert ad after each
          4. If image+title+button+text combo does not exist, try image+title+text but check for html blocks with images (next)
          4. Repeat with mobile devices
     
  */

  let tag = "[FEEL GOOD(S)]:";

  console.log(tag, "Inserting advertisements for feel good(s) articles.");

  // initialize and declare ad HTML for feel-good(s) ads
  var adHTML = "<div class='content_hint custom-appended'></div>";

  // remove any current content hint
  $(".content_hint.custom-appended").remove();

  // declare ad counter variable
  var numAdsInserted = 0;

  // declare ad limit [REMOVE FOR OLD COUNTER]
  adPerPageLimit = 10;

  // execute if user is on a mobile device
  if (isMobile()) {
    // change the total ad limit for mobile
    adPerPageLimit = 9;
    // assign mobile content hints
    adHTML = "<div class='content_mobile_hint custom-appended'></div>";

    // retrieve all horizontal rule elements (line blocks)
    var lineBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.horizontalrule-block.sqs-block-horizontalrule");
    // declare number of line blocks already inserted
    var numAdsInserted = 0;

    // loop through array containing line blocks
    $(lineBlocks).each(function (i, e) {
      // check if line blocks are not before or after mediavine video
      if (!$(e).prev().is(".mediavine-video__target-div") && !$(e).next().is(".mediavine-video__target-div")) {
        // check if ad limit has not been reached
        if (numAdsInserted < adPerPageLimit) {
          // insert advertisement to DOM
          $(e).before(adHTML);
          // increment value of ads inserted
          numAdsInserted++;
        }
      }
    });
    // check if pageLoaded variable has been initialized
    if (pageLoaded == true) {
      // call function that fills in content hints
      $mediavine.web.fillContentHints();
    } else {
      // wait until page is loaded
      var checkPageLoaded = setInterval(function () {
        // execute if pageLoaded variable is true
        if (pageLoaded == true) {
          clearInterval(checkPageLoaded); // stop the loop
          loadMediavineScripts();
        }
      }, 100);
    }

  } else {
    // assign desktop content hints
    adHTML = "<div class='content_desktop_hint custom-appended'></div>";

    // initialize fall back counter variable
    var timesRan = 0;

    // check if article is inserted so that advertisements are inserted after video
    var checkIfMediavineVideoExists = setInterval(function () {

      // increment the number of times this interval has executed
      timesRan++;

      // check if limit of times ran is met
      if (timesRan == 100) {
        // stop the loop
        clearInterval(checkIfMediavineVideoExists);
        // reset the counter
        timesRan = 0;
        console.log(tag, "Video was not found. Falling back to second method.");

        // retrieve all horizontal rule elements (line blocks)
        var lineBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.horizontalrule-block.sqs-block-horizontalrule");
        // declare number of line blocks already inserted
        var numAdsInserted = 0;

        // loop through array containing line blocks
        $(lineBlocks).each(function (i, e) {
          // check if ad limit has not been reached
          if (numAdsInserted < adPerPageLimit) {
            // insert advertisement to DOM
            $(e).before(adHTML);
            // increment value of ads inserted
            numAdsInserted++;
          }
        });
        // check if pageLoaded variable has been initialized
        if (pageLoaded == true) {
          // call function that fills in content hints
          $mediavine.web.fillContentHints();
        } else {
          // wait until page is loaded
          var checkPageLoaded = setInterval(function () {
            // execute if pageLoaded variable is true
            if (pageLoaded == true) {
              clearInterval(checkPageLoaded); // stop the loop
              loadMediavineScripts();
            }
          }, 100);
        }

      }


      // check if mediavine video exists in DOM
      if ($(".mediavine-video__target-div").length > 0) {
        // stop the loop
        clearInterval(checkIfMediavineVideoExists);

        console.log(tag, "Video found.");

        // retrieve all horizontal rule elements (line blocks)
        var lineBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.horizontalrule-block.sqs-block-horizontalrule");
        // declare number of line blocks already inserted
        var numAdsInserted = 0;

        // check if there is a paragraph element after the video
        if ($(".mediavine-video__target-div").next().next().is("p")) {
          // insert advertisement after paragraph
          $(".mediavine-video__target-div").next().next().after(adHTML);
          // increment value of ads inserted
          numAdsInserted++;
        }

        // loop through array containing line blocks
        $(lineBlocks).each(function (i, e) {
          // check if line blocks are not before or after mediavine video
          if (!$(e).prev().is(".mediavine-video__target-div") && !$(e).next().is(".mediavine-video__target-div")) {
            // check if ad limit has not been reached
            if (numAdsInserted < adPerPageLimit) {
              // insert advertisement to DOM
              $(e).before(adHTML);
              // increment value of ads inserted
              numAdsInserted++;
            }
          }
        });
        // check if pageLoaded variable has been initialized
        if (pageLoaded == true) {
          // call function that fills in content hints
          $mediavine.web.fillContentHints();
        } else {
          // wait until page is loaded
          var checkPageLoaded = setInterval(function () {
            // execute if pageLoaded variable is true
            if (pageLoaded == true) {
              clearInterval(checkPageLoaded); // stop the loop
              loadMediavineScripts();
            }
          }, 100);
        }
      }
    }, 100);
  }


  // loop through all line blocks

  // // execute if user is on a mobile device
  // if (isMobile()) {

  //   // change the total ad limit for mobile
  //   adPerPageLimit = 9;

  //   // retrieve all row blocks that contain images and whose parent class is the .col.sqs-col-12.span-12
  //   var htmlBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 .row.sqs-row").filter(function (elem) {
  //     return $(this).parent().attr('class').indexOf("col sqs-col-12 span-12") != -1;
  //   });

  //   // // console.log(tag, "Mobile HTML Blocks:", htmlBlocks);

  //   // execute if article has more than one html blocks
  //   if (htmlBlocks.length > 0) {

  //     /* INSERT ADS IN CONTENT SECTION OF FEEL-GOOD(S) ARTICLES */

  //     /* 09/27/2019 : NO ADS IN CONTENT SECTION UNTIL AFTER VIDEO

  //     // execute if html block contains image block or gallery block
  //     if ($(htmlBlocks[0]).has(".image-block")[0] || $(htmlBlocks[0]).has(".gallery-block")[0]) {

  //       // retrieve the paragraphs in the content section after the first image in the article
  //       var paragraphs = $(htmlBlocks[0]).next().find("p");

  //       // console.log(tag, "Mobile number of paragraphs in content section:", paragraphs.length);

  //       // execute if there is only one paragraph in the content section of Feel-Good(s) articles
  //       if (paragraphs.length < 2) {

  //         // insert after the first paragraph
  //         $(htmlBlocks[0]).next().after(adHTML);

  //       } else {

  //         // insert after every two paragraphs
  //         $(paragraphs).each(function (i, e) {
  //           // execute if paragraph index is even
  //           if ((i + 1) % 2 == 0) {
  //             // insert advertisement every 2 paragraphs
  //             $(e).after(adHTML);
  //           }

  //         });

  //       }

  //     } */

  //     // loop through html blocks
  //     for (var i = 0; i < htmlBlocks.length; i++) {

  //       // execute if html block contains image block or gallery block
  //       if ($(htmlBlocks[i]).has(".image-block")[0] || $(htmlBlocks[i]).has(".gallery-block")[0]) {

  //         // // console.log(tag, "Block (" + i + ") has image block.");

  //         // // console.log(tag, htmlBlocks[i]);

  //         // retrieve blocks with images
  //         var imageBlock = $(htmlBlocks[i]).has(".image-block")[0] || $(htmlBlocks[i]).has(".gallery-block")[0];

  //         // initialize variables
  //         var titleBlock;
  //         var buttonBlock;
  //         var textBlock;

  //         // exeucte if image block meets all requirements
  //         if (($(imageBlock).next().length > 0 && $(imageBlock).next().next().length > 0 && $(imageBlock).next().next().next().length > 0) && ($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) && ($(imageBlock).next().next().attr("class").indexOf("sqs-block button-block") != -1) && ($(imageBlock).next().next().next().attr("class").indexOf("sqs-block html-block") != -1)) {

  //           // retrieve title block if it exists next to image block
  //           if ($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) {
  //             titleBlock = $(imageBlock).next()[0];
  //           }

  //           // retrieve button block if it exists next to title block
  //           if ($(titleBlock).next().attr("class").indexOf("sqs-block button-block") != -1) {
  //             buttonBlock = $(titleBlock).next()[0];
  //           }

  //           // retrieve text block if it exists next to button block
  //           if ($(buttonBlock).next().attr("class").indexOf("sqs-block html-block") != -1) {
  //             textBlock = $(buttonBlock).next()[0];
  //           }

  //           // execute if all four blocks exist
  //           if (imageBlock && titleBlock && buttonBlock && textBlock) {

  //             // // console.log(tag, "All four blocks exist.");

  //             /* NOTE: Ignore ad limit on image+button+text sections

  //             // insert advertisement after text block
  //             $(textBlock).after(adHTML);

  //             */

  //             /*
  //             // execute if article limit has not been reached
  //             if (numAdsInserted < adPerPageLimit) {

  //               // console.log(tag, "Inserting ad into page.");

  //               // insert advertisement after text block
  //               $(textBlock).after(adHTML);

  //               numAdsInserted++;

  //             } // end if statement (insert if ad limit) */
  //             // insert placeholder for ads
  //             $(textBlock).after("<div class='custom-placeholder'></div>");

  //           } // end if statement (check all blocks exist)

  //           // execute if image block meets all requirements for html blocks with image+text+(no image)
  //         } else if (($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) && ($(imageBlock).next().has(".image-block").length == 0) && ($(imageBlock).next().has(".gallery-block").length == 0)) {

  //           // execute if image block is not the first one (will manually add content hints to content section)
  //           if (i != 0) {

  //             // retrieve text block if it exists next to an image
  //             if ($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) {
  //               textBlock = $(imageBlock).next()[0];
  //             }

  //             // execute if image and text block exist
  //             if (imageBlock && textBlock) {

  //               // // console.log("Both image and text blocks exist");

  //               /* NOTE: Ignore ad limit on image+text+(no image) sections */

  //               // insert advertisement after text block
  //               // $(textBlock).after(adHTML);

  //               /*
  //               // execute if article limit has not been reached
  //               if (numAdsInserted < adPerPageLimit) {

  //                 // console.log(tag, "Inserting ad into page.");

  //                 // insert advertisement after text block
  //                 $(textBlock).after(adHTML);

  //                 numAdsInserted++;

  //               } // end if statement (insert if ad limit) */

  //               // insert placeholder for ads
  //               $(textBlock).after("<div class='custom-placeholder'></div>");

  //             }

  //           }

  //         }

  //       } // end if statement (htmlBlock)

  //     } // end for-loop

  //     // retrieve number of ad placeholders
  //     var adPlaceholders = $("div.custom-placeholder");

  //     // calculate even spaces for ads
  //     var evenSpaces = Math.floor(adPlaceholders.length / adPerPageLimit);

  //     console.log(tag, "Number of placeholders:", adPlaceholders.length);

  //     // loop through all ad placeholders
  //     for (var i = 0; i < adPlaceholders.length; i++) {

  //       // insert ad if even space if found
  //       if (i % 2 == 0 && numAdsInserted < adPerPageLimit) {
  //         console.log(tag, "Current number:", i);
  //         // insert advertisement after text block
  //         $(adPlaceholders[i]).after(adHTML);
  //         numAdsInserted++;
  //       }

  //     }

  //     // remove all placeholders
  //     $("div.custom-placeholder").remove();

  //   } // end if statements

  //   // execute if user is on a desktop device
  // } else {

  //   // retrieve all html blocks
  //   var htmlBlocks = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 .sqs-block.html-block");

  //   // // console.log(htmlBlocks);

  //   // execute if article has more than one html blocks
  //   if (htmlBlocks.length > 0) {

  //     /* INSERT ADS IN CONTENT SECTION OF FEEL-GOOD(S) ARTICLES */

  //     /* 09/27/2019 : NO ADS IN CONTENT SECTION UNTIL AFTER VIDEO


  //    // execute if html block contains image block or gallery block
  //    if ($(htmlBlocks[0]).has(".image-block")[0] || $(htmlBlocks[0]).has(".gallery-block")[0]) {

  //      // retrieve the paragraphs in the content section after the first image in the article
  //      var paragraphs = $(htmlBlocks[0]).next().find("p");

  //      // // console.log(tag, "Number of paragraphs in content section:", paragraphs.length);

  //      // execute if there is only one paragraph in the content section of Feel-Good(s) articles
  //      if (paragraphs.length < 2) {

  //        // insert after the first paragraph
  //        $(htmlBlocks[0]).next().after(adHTML);

  //      } else {

  //        // insert after every two paragraphs
  //        $(paragraphs).each(function (i, e) {
  //          // execute if paragraph index is even
  //          if ((i + 1) % 2 == 0) {
  //            // insert advertisement every 2 paragraphs
  //            $(e).after(adHTML);
  //          }

  //        });

  //      }

  //    } */

  //     // loop through html blocks
  //     for (var i = 0; i < htmlBlocks.length; i++) {

  //       // execute if html block contains image block or gallery block
  //       if ($(htmlBlocks[i]).has(".image-block")[0] || $(htmlBlocks[i]).has(".gallery-block")[0]) {

  //         // // console.log(tag, "Block (" + i + ") has image block.");

  //         // // console.log(tag, htmlBlocks[i]);

  //         // retrieve blocks with images
  //         var imageBlock = $(htmlBlocks[i]).has(".image-block")[0] || $(htmlBlocks[i]).has(".gallery-block")[0];

  //         // initialize variables
  //         var titleBlock;
  //         var buttonBlock;
  //         var textBlock;

  //         // console.log(tag, "Image Block:", imageBlock);
  //         // console.log(tag, "Image Next Block:", $(imageBlock).next(), "Has Image:", $(imageBlock).next().has(".image-block").length);
  //         // console.log(tag, "Image Next Next Block:", $(imageBlock).next().next(), "Has Image:", $(imageBlock).next().next().has(".image-block").length);

  //         // execute if image block meets all requirements
  //         if (($(imageBlock).next().length > 0 && $(imageBlock).next().next().length > 0 && $(imageBlock).next().next().next().length > 0) && (($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) && ($(imageBlock).next().next().attr("class").indexOf("sqs-block button-block") != -1) && ($(imageBlock).next().next().next().attr("class").indexOf("sqs-block html-block") != -1))) {

  //           // retrieve title block if it exists next to image block
  //           if ($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) {
  //             titleBlock = $(imageBlock).next()[0];
  //           }

  //           // retrieve button block if it exists next to title block
  //           if ($(titleBlock).next().attr("class").indexOf("sqs-block button-block") != -1) {
  //             buttonBlock = $(titleBlock).next()[0];
  //           }

  //           // retrieve text block if it exists next to button block
  //           if ($(buttonBlock).next().attr("class").indexOf("sqs-block html-block") != -1) {
  //             textBlock = $(buttonBlock).next()[0];
  //           }

  //           // execute if all four blocks exist
  //           if (imageBlock && titleBlock && buttonBlock && textBlock) {

  //             // // console.log(tag, "All four blocks exist.");

  //             /* NOTE: Ignore ad limit on image+button+text sections */

  //             // insert advertisement after text block
  //             // $(textBlock).after(adHTML);

  //             /*

  //             // execute if article limit has not been reached
  //             if (numAdsInserted < adPerPageLimit) {

  //               // console.log(tag, "Inserting ad into page.");

  //               // insert advertisement after text block
  //               $(textBlock).after(adHTML);

  //               numAdsInserted++;

  //             } // end if statement (insert if ad limit) */

  //             // insert placeholder for ads
  //             $(textBlock).after("<div class='custom-placeholder'></div>");

  //           } // end if statement (check all blocks exist)

  //           // execute if image block meets all requirements for html blocks with image+text+(no image)
  //         } else if (($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) && ($(imageBlock).next().has(".image-block").length == 0) && ($(imageBlock).next().has(".gallery-block").length == 0)) {

  //           // console.log(tag, "The following image block meets the requirements for no image only, I guess:", $(imageBlock));

  //           // execute if image block is not the first one (will manually add content hints to content section)
  //           if (i != 0) {

  //             // retrieve text block if it exists next to an image
  //             if ($(imageBlock).next().attr("class").indexOf("sqs-block html-block") != -1) {
  //               textBlock = $(imageBlock).next()[0];
  //             }

  //             // execute if image and text block exist
  //             if (imageBlock && textBlock) {

  //               // // console.log("Both image and text blocks exist");

  //               /* NOTE: Ignore ad limit on image+text+(no image) sections */

  //               // insert advertisement after text block
  //               // $(textBlock).after(adHTML);

  //               /*
  //               // execute if article limit has not been reached
  //               if (numAdsInserted < adPerPageLimit) {

  //                 // console.log(tag, "Inserting ad into page.");

  //                 // insert advertisement after text block
  //                 $(textBlock).after(adHTML);

  //                 numAdsInserted++;

  //               } // end if statement (insert if ad limit) */

  //               // insert placeholder for ads
  //               $(textBlock).after("<div class='custom-placeholder'></div>");

  //             }

  //           }

  //         }

  //       } // end if statement (htmlBlock)

  //     } // end for-loop

  //     // retrieve number of ad placeholders
  //     var adPlaceholders = $("div.custom-placeholder");

  //     // calculate even spaces for ads
  //     var evenSpaces = Math.floor(adPlaceholders.length / adPerPageLimit);

  //     console.log(tag, "Number of placeholders:", adPlaceholders.length);

  //     // loop through all ad placeholders
  //     for (var i = 0; i < adPlaceholders.length; i++) {

  //       // insert ad if even space if found (every two)
  //       if (i % 2 == 0 && numAdsInserted < adPerPageLimit) {
  //         console.log(tag, "Current number:", i);
  //         // insert advertisement after text block
  //         $(adPlaceholders[i]).after(adHTML);
  //         numAdsInserted++;
  //       }

  //     }

  //     // remove all placeholders
  //     $("div.custom-placeholder").remove();

  //   } // end if statements

  // }

} // end function

// new method that inserts advertisements for non-feel-good(s) articles
function insertNonFeelGoodAds() {
  let tag = "[NON-FEEL-GOOD(S)]:";

  console.log(tag, "Inserting advertisements for non-feel-good(s) articles.");

  // retrieve all p elements in the article
  var pElements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p");

  // declare and initialize advertisement html
  var adHTML = "<div class='content_hint custom-appended'></div>";

  // declare and initialize number of ads to insert
  var limit = 10;

  // check if there are instagram embeds in the article
  if ($(".instagram-media").length > 0) {
    // remove all paragraphs inside embeds
    $(".instagram-media p").remove();
    // re-assign pElements to value of current p elements in article
    pElements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 p");
  }

  // check if user is on mobile or desktop
  if (isMobile()) {
    // assign mobile content hints
    adHTML = "<div class='content_mobile_hint custom-appended'></div>";
    // change the ad limit for mobile
    limit = 9;

    // retrieve all paragraph elements
    var paragraphElements = pElements;
    // declare number of paragraph elements already inserted
    var numAdsInserted = 0;
    // retrieve number of paragraphs before video element
    // var numPrevParagraphs = $(".mediavine-video__target-div").prevAll("p").length;
    // // remove paragraphs from array before video element
    // paragraphElements.splice(0, numPrevParagraphs + 1);
    // loop through array containing paragraphs
    $(paragraphElements).each(function (i, e) {
      // execute if paragraph index matches every three
      if (i % 2 == 0) {
        // retrieve paragraph sqs-block parent
        var paragraphParent = $(e).parents(".sqs-block.html-block");

        // declare variable that determines if paragraph parent element is near horizontal rule element
        var isNearHorizontalRule = false;

        // declare variable that determines if paragraph parent element is neighbors with a content hint
        var isNearContentHint = false;

        // declare variable that determines if paragraph parent element is part of image section
        var isNearImageSection = false;

        // check if the next sibling is a horizontal rule
        if ($(paragraphParent).next().is(".sqs-block.horizontalrule-block.sqs-block-horizontalrule")) {
          isNearHorizontalRule = true;
        }

        // check if the next sibling is a content hint
        if ($(paragraphParent).next().is(".content_desktop_hint.custom-appended") || $(paragraphParent).next().is(".content_mobile_hint.custom-appended")) {
          isNearContentHint = true;
        }

        // check if the paragraph element is part of image section
        if ($(e).parent().hasClass("image-caption")) {
          isNearImageSection = true;
        }

        // check if ad limit has not been reached
        if (numAdsInserted < limit) {
          // console.log(tag, "Inserting after:", i, $(e));
          if (e.innerText.indexOf("A post") != -1) {
            // console.log(tag, "This is one of those fake.");
            // skip to the next iteration
            return;
          }

          console.log(tag, "Inserting ad for:", e);

          // check if paragraph element is near another content hint
          if (isNearContentHint || isNearImageSection) {
            // skip to next iteration
            return;
          } else {
            // insert before horizontal rule if paragraph element is near horizontal rule element
            if (isNearHorizontalRule) {
              // insert advertisement to DOM
              $(paragraphParent).after(adHTML);
            } else {
              // insert advertisement to DOM
              $(e).after(adHTML);
            }
          }

          // increment value of ads inserted
          numAdsInserted++;
        }
      }
    });
    // check if pageLoaded variable has been initialized
    if (pageLoaded == true) {
      // call function that fills in content hints
      $mediavine.web.fillContentHints();
    } else {
      // wait until page is loaded
      var checkPageLoaded = setInterval(function () {
        // execute if pageLoaded variable is true
        if (pageLoaded == true) {
          clearInterval(checkPageLoaded); // stop the loop
          loadMediavineScripts();
        }
      }, 100);
    }

  } else {
    // assign desktop content hints
    adHTML = "<div class='content_desktop_hint custom-appended'></div>";

    // initialize fall back counter variable
    var timesRan = 0;

    // check if article is inserted so that advertisements are inserted after video
    var checkIfMediavineVideoExists = setInterval(function () {

      // increment the number of times this interval has executed
      timesRan++;

      // check if limit of times ran is met
      if (timesRan == 100) {
        // stop the loop
        clearInterval(checkIfMediavineVideoExists);
        // reset the counter
        timesRan = 0;
        console.log(tag, "Video was not found. Falling back to second method.");

        // retrieve all paragraph elements
        var paragraphElements = pElements;
        // declare number of paragraph elements already inserted
        var numAdsInserted = 0;
        // remove paragraphs from array before video element
        paragraphElements.splice(0, 1);
        // loop through array containing paragraphs
        $(paragraphElements).each(function (i, e) {
          // execute if paragraph index matches every three
          if (i % 2 == 0) {
            // retrieve paragraph sqs-block parent
            var paragraphParent = $(e).parents(".sqs-block.html-block");

            // declare variable that determines if paragraph parent element is near horizontal rule element
            var isNearHorizontalRule = false;

            // declare variable that determines if paragraph parent element is neighbors with a content hint
            var isNearContentHint = false;

            // declare variable that determines if paragraph parent element is part of image section
            var isNearImageSection = false;

            // check if the next sibling is a horizontal rule
            if ($(paragraphParent).next().is(".sqs-block.horizontalrule-block.sqs-block-horizontalrule")) {
              isNearHorizontalRule = true;
            }

            // check if the next sibling is a content hint
            if ($(paragraphParent).next().is(".content_desktop_hint.custom-appended") || $(paragraphParent).next().is(".content_mobile_hint.custom-appended")) {
              isNearContentHint = true;
            }

            // check if the paragraph element is part of image section
            if ($(e).parent().hasClass("image-caption")) {
              isNearImageSection = true;
            }

            // check if ad limit has not been reached
            if (numAdsInserted < limit) {
              // console.log(tag, "Inserting after:", i, $(e));
              if (e.innerText.indexOf("A post") != -1) {
                // console.log(tag, "This is one of those fake.");
                // skip to the next iteration
                return;
              }

              console.log(tag, "Inserting ad for:", e);

              // check if paragraph element is near another content hint
              if (isNearContentHint || isNearImageSection) {
                // skip to next iteration
                return;
              } else {
                // insert before horizontal rule if paragraph element is near horizontal rule element
                if (isNearHorizontalRule) {
                  // insert advertisement to DOM
                  $(paragraphParent).after(adHTML);
                } else {
                  // insert advertisement to DOM
                  $(e).after(adHTML);
                }
              }

              // increment value of ads inserted
              numAdsInserted++;
            }
          }
        });
        // check if pageLoaded variable has been initialized
        if (pageLoaded == true) {
          // call function that fills in content hints
          $mediavine.web.fillContentHints();
        } else {
          // wait until page is loaded
          var checkPageLoaded = setInterval(function () {
            // execute if pageLoaded variable is true
            if (pageLoaded == true) {
              clearInterval(checkPageLoaded); // stop the loop
              loadMediavineScripts();
            }
          }, 100);
        }
      }

      // check if mediavine video exists in DOM
      if ($(".mediavine-video__target-div").length > 0) {
        // stop the loop
        clearInterval(checkIfMediavineVideoExists);
        // console.log(tag, "Video exists, executing code now.");
        // retrieve all paragraph elements
        var paragraphElements = pElements;
        // declare number of paragraph elements already inserted
        var numAdsInserted = 0;
        // retrieve number of paragraphs before video element
        var numPrevParagraphs = $(".mediavine-video__target-div").prevAll("p").length;
        // remove paragraphs from array before video element
        paragraphElements.splice(0, numPrevParagraphs + 1);
        // loop through array containing paragraphs
        $(paragraphElements).each(function (i, e) {
          // execute if paragraph index matches every three
          if (i % 2 == 0) {
            // retrieve paragraph sqs-block parent
            var paragraphParent = $(e).parents(".sqs-block.html-block");

            // declare variable that determines if paragraph parent element is near horizontal rule element
            var isNearHorizontalRule = false;

            // declare variable that determines if paragraph parent element is neighbors with a content hint
            var isNearContentHint = false;

            // declare variable that determines if paragraph parent element is part of image section
            var isNearImageSection = false;

            // check if the next sibling is a horizontal rule
            if ($(paragraphParent).next().is(".sqs-block.horizontalrule-block.sqs-block-horizontalrule")) {
              isNearHorizontalRule = true;
            }

            // check if the next sibling is a content hint
            if ($(paragraphParent).next().is(".content_desktop_hint.custom-appended") || $(paragraphParent).next().is(".content_mobile_hint.custom-appended")) {
              isNearContentHint = true;
            }

            // check if the paragraph element is part of image section
            if ($(e).parent().hasClass("image-caption")) {
              isNearImageSection = true;
            }

            // check if ad limit has not been reached
            if (numAdsInserted < limit) {
              // console.log(tag, "Inserting after:", i, $(e));
              if (e.innerText.indexOf("A post") != -1) {
                // console.log(tag, "This is one of those fake.");
                // skip to the next iteration
                return;
              }

              console.log(tag, "Inserting ad for:", e);

              // check if paragraph element is near another content hint
              if (isNearContentHint || isNearImageSection) {
                // skip to next iteration
                return;
              } else {
                // insert before horizontal rule if paragraph element is near horizontal rule element
                if (isNearHorizontalRule) {
                  // insert advertisement to DOM
                  $(paragraphParent).after(adHTML);
                } else {
                  // insert advertisement to DOM
                  $(e).after(adHTML);
                }
              }

              // increment value of ads inserted
              numAdsInserted++;
            }
          }
        });
        // check if pageLoaded variable has been initialized
        if (pageLoaded == true) {
          // call function that fills in content hints
          $mediavine.web.fillContentHints();
        } else {
          // wait until page is loaded
          var checkPageLoaded = setInterval(function () {
            // execute if pageLoaded variable is true
            if (pageLoaded == true) {
              clearInterval(checkPageLoaded); // stop the loop
              loadMediavineScripts();
            }
          }, 100);
        }
      }
    }, 100);

  }
}

// method that returns ad
function returnAdPositions(array, limit) {
  var finalElementsArray = [];
  // var elementsRemaining = limit;

  // console.log("[AD POSITIONS]", limit);

  /* 10/01/2019 INSERT 4 ADS AFTER MEDIAVINE VIDEO */
  // check if video element is inserted
  if ($(".mediavine-video__target-div").length > 0) {
    console.log("[AD POSITIONS] Yes, video exist!")
    // loop through array to find array with paragraphs
    for (var i = 0; i < array.length; i++) {
      // check if element is a paragraph element
      if ($(array[i][0]).is("p")) {
        // retrieve all paragraph elements
        var paragraphElements = array[i];
        // declare number of paragraph elements already inserted
        var numAdsInserted = 0;
        // retrieve number of paragraphs before video element
        var numPrevParagraphs = $(".mediavine-video__target-div").prevAll("p").length;
        // remove paragraphs before video element
        paragraphElements.splice(0, numPrevParagraphs + 1);
        // console.log("[AD POSITIONS] Paragraphs:", paragraphElements);
        // loop through the array containing the paragraphs
        $(paragraphElements).each(function (i, e) {
          // execute if paragraph index matches every three
          if (i % 3 == 0) {
            // execute if paragraph ad limit has not been met
            if ((numAdsInserted < limit)) {
              finalElementsArray.push(e);
              numAdsInserted++;
            }
          }
        });
      }
    }
    // return finalElementsArray;
  }

  /* 09/27/2019 REMOVED FOR 4 LIMIT AD

  // loop through the array to find the array with the paragraphs
  for (var i = 0; i < array.length; i++) {

    // check if element is a paragraph element
    if ($(array[i][0]).is("p")) {
      // set percantage of paragraphs to insert (5 of 8 total ads)
      var percentageParagraphs = 5 / 8;
      // calculate math to determine number of ads to insert in first paragraph sections
      var mathCalculation = limit * percentageParagraphs;
      // round to nearest number
      var numParagraphsToInsert = Math.ceil(mathCalculation);
      // set number of paragraphs already inserted
      var numParagraphsInserted = 0;

      // console.log(percentageParagraphs, mathCalculation, numParagraphsToInsert, numParagraphsInserted);

      // loop through first 5 elements and insert every two into finalElementsArray
      $(array[i]).each(function (i, e) {
        // execute if paragraph index is even
        if ((i + 1) % 2 == 0) {

          // execute only if paragraph ad limit has not been reached
          if ((numParagraphsInserted < numParagraphsToInsert) && (finalElementsArray.length < limit)) {
            finalElementsArray.push(e);
            elementsRemaining--;
            numParagraphsInserted++;
          }

        }

      });
    }

  } */

  // // console.log("[AD POSITIONING]: Elements in final array:", finalElementsArray);

  /* 10/01/2019 REMOVED FOR 4 LIMIT AD INSERTED AFTER MEDIAVINE VIDEO

  // loop through array
  for (var i = 0; i < array.length; i++) {
    // console.log("Element Array:", array[i]);

    // remove first element in all element arrays
    array[i] = array[i].slice(1);

    // execute if current array is pElements array
    if (i == 3 && array[i].length > 4) {
      // console.log("Is exexuting!");
      array[i] = array[i].splice(0); // remove first paragraph element
      array[i] = array[i].splice(1); // remove second paragraph element
      array[i] = array[i].splice(2); // remove third paragraph element
      array[i] = array[i].splice(3); // remove fourth paragraph element
      // console.log("Element Array:", array[i]);
    }

    // execute if elements exist
    if (array[i].length) {
      // algorithm
      var delta = Math.ceil(array[i].length / limit);

      // execute if delta is ever zero
      if (delta == 0) {
        delta = 1;
      }

      // // console.log("Final delta [" + i + "]:", delta);

      // loop through elements
      for (var j = 0; j < array[i].length; j = j + delta) {
        // execute if final array does not contain element limit
        if ((finalElementsArray.length < limit) && elementsRemaining > 0) {
          // // // console.log(array[i][j]);
          var matchesConditions = checkContentSiblings(array[i][j]);
          // // console.log("ContentHints Exist?:", matchesConditions);
          // execute if selected element is an H2 and has previous
          if ($(array[i][j]).is("h2") && matchesConditions) {
            // // console.log("This element is an H2, and content hint exists");
            // // console.log(array[i][j]);
            elementsRemaining--;
          } else {
            finalElementsArray.push(array[i][j]);
            // // // console.log("New elements array:", finalElementsArray);
            elementsRemaining--;
          }
        } // end final elements array if statement

      } // end array[i][j] loop

    } // end array[i][j] if statement
  } // end array[i] loop
  */
  return finalElementsArray; // return final array
} // end function

// method that checks for content siblings to prevent ads from appearing too close to eachother
function checkContentSiblings(element) {
  var closestSqsBlock = $(element).closest(".sqs-block.html-block"); // initialize and retrieve closest html block element
  var closestContentHint = $(element).prevAll(".content_hint"); // initialize and retrieve closest content hint element

  /*
  if (closestContentHint && $(element).is("h2")) {
    // // console.log("[PREV ELEMENT]:", "Is a content hint in the same tree as h2 element");
    // // console.log("[PREV ELEMENT SPECIAL]:", "Is the previous element of the h2 element a content hint?", $(element).prev().is(".content_hint"), $(element).prev());
    //return true; // return true
  } */

  /* check for horizontal line instead, check if it is right before h2 sqs block */

  // execute if previous element is a horizontal rule block (to prevent ads from re-appearing after content hint was inserted prior to horizontal rule block
  if (closestSqsBlock.prev().is(".sqs-block.horizontalrule-block.sqs-block-horizontalrule")) {
    // // console.log("[PREV ELEMENT]:", "Is correct horizontal element!");
    return true; // return true  
  } else {
    return false; // return false
  }
  /*
  if (closestSqsBlock.siblings().closest(".content_hint")) {
    // // console.log("H2 element is really close to content hints");
    return true
  } else {
   return false
  } */
}

// method that inserts sidebar and sidebar advertisements
function insertAdSidebar() {
  // // console.log("[FUNCTION]: Insert ads!");

  // initialize sidebar div HTML
  var sidebarHTML = "<div class='custom-ad-sidebar'></div>";

  // create new custom content div with custom article content
  $(".Main-content article").append("<div class='custom-content'><div class='custom-article-content'></div></div>");
  // // // console.log("INSERTED CUSTOM CONTENT");

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
      // // // console.log("[FUNCTION]:", "Summary container found!");
      clearInterval(checkSummaryContent); // stop the loop
      var summaryContent = $(".custom-summary-container");
      // // // console.log(summaryContent[0]);
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
    "@media screen and (min-width: 1025px) {.new-custom-article-sqs-block {width: calc(56.65800000000001% + 175px) !important;} .new-custom-article-content {width: calc(100% - (300px)) !important;}}";

  // execute if article has image blocks
  if ($("article .image-block").length) {
    // // console.log("[MSG]:", "Retrieving image blocks...");
    var imageBlocks = $("article .image-block");

    // loop through image block
    for (var i = 0; i < imageBlocks.length; i++) {
      // find nearest row
      var nearestRow = retrieveNearestRow(imageBlocks[i]);
      // find nearest row's parent
      var rowParent = retrieveRowParent(nearestRow);
      // check if nearest row parent has class ".col.sqs-col-12.span-12"
      var topRow = checkForClass(nearestRow, rowParent, 0);
      // // // // console.log("Row Index:", topRow);
      // PRAISE THE LORD, IT WORKS!

      // NEW ADDITION 10/07/2019 - CHECK IF IMAGE IS VERTICAL
      if (topRow != null) {
        /* NOTE 08/11/2019: Former way to insert images into col-md-rows, new way expands images by inserting them into Squarespace divs with HTML block CSS
        ------------------------------------------------------------------------------------------------------------------------------------------------------
        // var customImageBlockHTML = $("<div class='row sqs-row custom-row-" + i + "'><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div><div class='col sqs-col-8 span-8'></div><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div></div>");
 
        // // console.log("We were able to find the top row.");
        // insert new image block element
        var previousRow = topRow;
        // // console.log(previousRow);
 
        $(previousRow).before(customImageBlockHTML);
        // append image to new image block element
        $(".custom-row-" + i).find(".col.sqs-col-8.span-8").append(imageBlocks[i]);
 
        // execute if previous row has price text and button
        if ($(previousRow).find(".col.sqs-col-9.span-9 .sqs-block.html-block.sqs-block-html")[0]) {
 
          priceElement = $(previousRow).find(".col.sqs-col-9.span-9 .sqs-block.html-block.sqs-block-html")[0];
 
          priceButtonElement = $(priceElement).next();
 
          // // console.log(priceElement, priceButtonElement);
 
          // console.log("[PREV ROW ELEMENTS]:", priceElement);
 
          // insert price element and button element
          $(".custom-row-" + i).find(".col.sqs-col-8.span-8").append(priceElement);
          $(".custom-row-" + i).find(".col.sqs-col-8.span-8").append(priceButtonElement);
 
        }
 
        // delete old row
        previousRow.remove();
        ------------------------------------------------------------------------------------------------------------------------------------------------------
        */

        // new custom image block that expands images to fit article text content
        // code-block sqs-block-code
        var customImageBlockHTML = $("<div class='sqs-block html-block sqs-block-html new-custom-article-sqs-block custom-image-block-" + i + "' style='padding-left: 0px !important; padding-right: 0px !important;'><div class='sqs-block-content'></div></div>");

        // console.log("We were able to find the top row.");
        // insert new image block element
        var previousRow = topRow;
        // console.log(previousRow);

        $(previousRow).before(customImageBlockHTML);
        // append image to new image block element
        $(".custom-image-block-" + i).find(".sqs-block-content").append(imageBlocks[i]);

        // check that the first image does not get affected by vertical image check
        if (i != 0) {
          // call method that gets image height and width
          getImageSize($(imageBlocks[i]).find("img")[0], function (e, width, height) {
            if (height > width) {
              // add class that makes images smaller
              $(e).parents(".image-block").addClass("image-block-vertical");
            }
          });
        }

        // execute if previous row has price text and button
        if ($(previousRow).find(".col.sqs-col-9.span-9 .sqs-block.html-block.sqs-block-html")[0] || $(previousRow).find(".col.sqs-col-6.span-6").has(".sqs-block-button")) {

          priceElement = $(previousRow).find(".col.sqs-col-9.span-9 .sqs-block.html-block.sqs-block-html")[0] || $(previousRow).find(".col.sqs-col-6.span-6 .sqs-block.html-block.sqs-block-html")[0];

          priceButtonElement = $(priceElement).next();

          // console.log(priceElement, priceButtonElement);

          // console.log("[PREV ROW ELEMENTS]:", priceElement);

          // insert price element and button element
          $(".custom-image-block-" + i).find(".sqs-block-content:first").append(priceElement);
          $(".custom-image-block-" + i).find(".sqs-block-content:first").append(priceButtonElement);

        }

        // delete old row
        previousRow.remove();

      } // end if statement
    } // end for-loop statement
  } // end if statement

  // execute if article has image gallery blocks
  if ($("article .sqs-block.gallery-block.sqs-block-gallery").length) {
    // // console.log("[MSG] Retrieving image gallery blocks");
    var galleries = $("article .sqs-block.gallery-block.sqs-block-gallery");

    // loop through image gallery blocks
    for (var i = 0; i < galleries.length; i++) {
      // find nearest row
      var nearestRow = retrieveNearestRow(galleries[i]);
      // find nearest row's parent
      var rowParent = retrieveRowParent(nearestRow);
      // check if nearest row parent has class ".col.sqs-col-12.span-12"
      var topRow = checkForClass(nearestRow, rowParent, 0);
      // // // console.log("Row Index:", topRow);
      // PRAISE THE LORD, IT WORKS!

      // NEW ADDITION 10/07/2019 - CHECK IF IMAGE IS VERTICAL
      // if ($(galleries[i]).find("img").height() < $(galleries[i]).find("img").width()) {
      if (topRow != null) {
        // var customImageBlockHTML = $("<div class='row sqs-row custom-image-gallery-row-" + i + "'><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div><div class='col sqs-col-8 span-8'></div><div class='col sqs-col-2 span-2'><div class='sqs-block spacer-block sqs-block-spacer sized vsize-1'><div class='sqs-block-content'>&nbsp;</div></div></div></div>");

        var customImageBlockHTML = $("<div class='sqs-block html-block sqs-block-html new-custom-article-sqs-block custom-image-gallery-row-" + i + "' style='padding-left: 0px !important; padding-right: 0px !important;'><div class='sqs-block-content'></div></div>");

        // retrieve previous row
        var previousRow = topRow;

        // insert new image gallery block element
        $(previousRow).before(customImageBlockHTML);

        // append image gallery to new image gallery block element
        $(".custom-image-gallery-row-" + i).find(".sqs-block-content").append(galleries[i]);

        // delete old row
        previousRow.remove();

      } // end if statement
      // }
    } // end for-loop statement

  } // end if statement

  // execute if article has video blocks
  if ($("article .sqs-block.video-block").length) {
    var videoBlocks = $("article .video-block");

    // loop through video block
    for (var i = 0; i < videoBlocks.length; i++) {
      // find nearest row
      var nearestRow = retrieveNearestRow(videoBlocks[i]);
      // find nearest row's parent
      var rowParent = retrieveRowParent(nearestRow);
      // check if nearest row parent has class ".col.sqs-col-12.span-12"
      var topRow = checkForClass(nearestRow, rowParent, 0);
      // PRAISE THE LORD, IT WORKS!

      if (topRow != null) {

        // new custom video block that expands images to fit article text content
        // code-block sqs-block-code
        var customImageBlockHTML = $("<div class='sqs-block html-block sqs-block-html new-custom-article-sqs-block custom-video-block-" + i + "' style='padding-left: 0px !important; padding-right: 0px !important;'><div class='sqs-block-content'></div></div>");

        // insert new video block element
        var previousRow = topRow;
        // console.log(previousRow);

        $(previousRow).before(customImageBlockHTML);
        // append image to new video block element
        $(".custom-video-block-" + i).find(".sqs-block-content").append(videoBlocks[i]);

        // delete old row
        previousRow.remove();

      } // end if statement
    } // end for-loop statement
  }

  // call function to display latest articles
  // var loadingImage = "<div class='custom-loading-image-sidebar sqs-block-html'><div class='custom-loading-image'><img src='https://ds4bdrko1q549.cloudfront.net/assets/common/images/loader.gif' alt='' title='' /></div></div>";

  // insert loading gif to sidebar
  // $("article .custom-content .custom-ad-sidebar").prepend(loadingImage);

  // hide the sidebar
  $("article .custom-content .custom-ad-sidebar").hide();

  var rssFeedURL = "https://iamandco.com/blog?format=rss";
  // var sidebarArticleStartHTML = "<div class='sidebar-placeholder-block'></div><div class='mv_slot_target_desktop' data-slot='SidebarAtf'></div><div class='sqs-block-html custom-sidebar-article-wrapper'><div class='custom-sidebar-wrapper-title'>" + sidebarArticleTitle + "</div><ul class='custom-sidebar-article-list'>";
  // var sidebarArticleMiddleHTML = "";
  // var sidebarArticleEndHTML = "</ul></div><div class='mv_slot_target_desktop' data-slot='SidebarBtf' data-sticky-slot='true' data-sticky-slot-stop='.Footer'></div>";

  // UPDATE 10/11/2019 Removed ATF sidebar ad, removed empty space, removed articles
  var sidebarArticleNewHTML = "<div class='mv_slot_target_desktop' data-slot='SidebarBtf' data-sticky-slot='true' data-sticky-slot-stop='.Footer'></div>";
  $("article .custom-content .custom-ad-sidebar").append(sidebarArticleNewHTML); // append to custom HTML element in custom sidebar
  $("article .custom-content .custom-ad-sidebar").show();

  /*
  // method to retrieve blog page RSS in XML format
  $.ajax({
    url: rssFeedURL,
    accepts: {
      xml: "application/rss+xml"
    },
    dataType: "xml",
    success: function (data) {
      // console.log("[SIDEBAR DATA AJAX]:", data);

      var items = data.getElementsByTagName("channel")[0].getElementsByTagName("item");

      for (var i = 0; i < sidebarArticleLimit; i++) {
        var item; // initialize variable

        // execute if current item title is the same as page title/link
        // items[i].getElementsByTagName("title")[0].textContent == decodeText(jsonData['item']['title'])
        if (location.href.indexOf(items[i].getElementsByTagName("link")[0].textContent) !== -1) {
          // console.log("Current item link is the same as current page....");
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
      // $("article .custom-content .custom-ad-sidebar .custom-loading-image-sidebar").remove(); // remove the loading image from sidebar
      $("article .custom-content .custom-ad-sidebar").fadeIn();

    } // end ajax success
  }); // end ajax function
  */
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
  //// // console.log("[CHECK] Row:");
  //// // console.log(row);
  //// // console.log("[CHECK] Row Parent:");
  //// // console.log(parent);

  var parentHasClass = $(parent).hasClass("col sqs-col-12 span-12");
  var numberOfTries = numTry + 1;

  if (parentHasClass) {
    // retrieve element index
    var topLevelIndex = $(row).index();
    //// // console.log("[CHECK] Top Level index of this element (parentHasClass):", topLevelIndex);
    //// // console.log("[CHECK] Element at that index is:");
    // // // console.log($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12").find("div").eq(topLevelIndex));
    return row;
  } else {
    //// // console.log("[CHECK] Following element does not have class!");
    //// // console.log(parent);
    if (numberOfTries < 2) {
      // check parent for class
      // // // console.log("[CHECK] Searching for top level element again!");
      // find nearest row
      var newNearestRow = retrieveNearestRow(parent);
      // find nearest row's parent
      var newNearestRowParent = retrieveRowParent(newNearestRow);
      return checkForClass(newNearestRow, newNearestRowParent, numberOfTries);
    } else {
      // // // console.log("[CHECK] NO HOPES OF FINDING IT");
      return null;
    }
  }

}

// method that inserts author bio information to page
function insertAuthorBio(linkURL) {
  // method to retrieve page in JSON format
  $.ajax({
    url: linkURL,
    success: function (result) {
      // // // console.log(result);
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
      img.onload = function () {
        var width = img.naturalWidth || img.width;
        var height = img.naturalHeight || img.height;
        // // // console.log("Image height:", height);
        // // // console.log("Image width:", width);

        // // // console.log(authorID, authorName, authorWebsiteURL, authorBio);

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
  // // console.log("[FUNCTION] Insert ads into author pages!");
  var advertisementHTML = "<br><article class='BlogList-item hentry post-type-text' style='width: 100%;'><div class='content_hint'></div></article><br>";
  var groupHTML = "<div class='custom-author-group'></div>";

  // execute if article elements exist
  if ($(".Main-content section.BlogList.BlogList--posts-excerpt article").length) {
    // // console.log("[FUNCTION] Articles exist!");
    // execute if user is on a mobile device
    if (isMobile()) {
      $(".Main-content section.BlogList.BlogList--posts-excerpt > article:nth-child(4n)").after(advertisementHTML);
    } else {
      $(".Main-content section.BlogList.BlogList--posts-excerpt > article:nth-child(6n)").after(advertisementHTML);
    }

    // dynamically load advertisements with content hints
    var checkExtraPages = setInterval(function () {
      // execute if pageLoaded variable is true
      if (pageLoaded == true) {
        clearInterval(checkExtraPages); // stop the loop
        // // console.log("[ADVERTISEMENTS] PAGE LOADED!");
        // $mediavine.web.fillContentHints();
        loadMediavineScripts();
      }
    }, 100);

  }

}

// method that inserts custom pinterest & facebook buttons for images
function insertImageButtons() {
  let tag = "[PINTEREST]";

  // console.log(tag, "Insert new pinterest save buttons");

  // var pathName = location.pathname.split("/")[1]; // initialize and retrieve current URL pathname

  // retrieve all image elements within the article content
  var images = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 .sqs-block.image-block.sqs-block-image img");

  // execute if more than one image exists
  if (images.length > 0) {
    // loop through images
    for (var i = 0; i < images.length; i++) {
      // // console.log(tag, images[i]);

      var saveItButton = "<div class='custom-image-button-section'><i class='fab fa-facebook-f custom-image-button custom-facebook-button' style='z-index: 3;'></i><i class='fab fa-pinterest-p custom-image-button custom-pinterest-button' data-image='" + $(images[i]).attr('data-image') + "' data-desc='" + $(images[i]).attr('alt') + "' style='z-index: 3;'></i></div>";

      $(images[i]).after(saveItButton);

      // // // console.log("Images", images);

      // retrieve pinterest button
      var pinterestButton = $(images[i]).siblings(".custom-image-button-section").find(".custom-pinterest-button")[0];
      var facebookButton = $(images[i]).siblings(".custom-image-button-section").find(".custom-facebook-button")[0];

      // method that inserts event listener and executes a function when button is pressed
      pinterestButton.addEventListener('click', function (e) {
        // // // console.log(e);
        e.preventDefault(); // prevent anchor tag from automatically changing page
        e.stopPropagation(); // prevents anchor tag from being handled by another event

        // var customURL = location.href;

        // // // console.log("[PINTEREST][URLS]", e.target.parentElement.parentElement.attributes['href'].value);

        /*
       
        // execute if href exists
        if (e.target.parentNode.previousSibling.parentNode.parentNode.attributes['href'].value) {
          customURL = "https://iamandco.com/splash?ref=" + e.target.parentNode.previousSibling.parentNode.parentNode.attributes['href'].value;
 
          // // console.log("[PINTEREST] HREF LOCATED.", customURL);
 
        } else {
          customURL = location.href;
        } */


        PinUtils.pinOne({
          'url': location.href,
          'media': e.target.attributes['data-image'].value,
          'description': e.target.attributes['data-desc'].value
        });
      });

      // method that inserts event listener and executes function when button is pressed
      facebookButton.addEventListener('click', function (e) {

        e.preventDefault(); // prevent anchor tag from automatically changing page
        e.stopPropagation(); // prevents anchor tag from being handled by another event

        var formattedURL = "https://www.facebook.com/sharer/sharer.php?u=" + location.href;

        window.open(formattedURL, "shareBlog", "toolbar = 0, status = 0, height = 225, width = 420, resizable = 0")
      });

    }

    // call method that loads Pinterest scripts
    loadScript("https://assets.pinterest.com/js/pinit.js");
  }

}

// method that inserts custom pinterest buttons on thumbnail images in gallery blocks
function insertGalleryImageButtons() {

  let tag = "[PINTEREST]";

  // console.log(tag, "Insert new pinterest save buttons on thumbnails");

  // retrieve all thumb image galleries
  // var thumbImages = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 .sqs-block-gallery .sqs-gallery-design-grid .image-slide-anchor img");
  var thumbImages = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 .sqs-block-gallery .sqs-gallery-container img");

  // // console.log(tag, "Thumb images:", thumbImages);

  // execute if more than one image exists
  if (thumbImages.length > 0) {

    var pinTag = "[PINTEREST BUTTONS]";

    // // console.log(pinTag, "Thumb images found: " + thumbImages.length);

    // loop through images
    for (var i = 0; i < thumbImages.length; i++) {

      /* Testing code for ImageLoader */

      // added so that the images instantly load and no bugs with misplacement of buttons occurs
      ImageLoader.load(thumbImages[i], { load: true });

      // retrieve height of image text
      var textHeight = $(thumbImages[i]).parent().parent().find(".image-slide-title").outerHeight();

      // retrieve height of image anchor tag
      var anchorHeight = $(thumbImages[i]).parent().outerHeight();

      // retrieve height of margin wrapper tag
      var marginWrapperHeight = $(thumbImages[i]).parent().parent().outerHeight();

      // set default height of image
      var imageHeight = $(thumbImages[i]).outerHeight();

      // check if image height is larger than anchor tag
      if (imageHeight > anchorHeight) {
        imageHeight = 0;
      }

      // set default bottom calculation
      var bottomCalculation = 0;

      // check if image height is 0 (if so, calculate bottom value by subtracting anchor tag height from margin wrapper height)
      if (imageHeight == 0) {
        // calculate bottom value of pinterest button
        bottomCalculation = marginWrapperHeight - anchorHeight;
        // calculate bottom value by subtracting anchor tag height from margin wrapper height and adding the subtraction of image height from anchor height / 2 (we want to get height of bottom difference)
      } else {
        // calculate bottom value of pinterest button
        bottomCalculation = (marginWrapperHeight - anchorHeight) + ((anchorHeight - imageHeight) / 2);
      }

      // console.log(pinTag, "Text height: " + textHeight, "Image height: " + imageHeight, "Anchor height: " + anchorHeight, "Bottom calculation: " + bottomCalculation);

      // construct custom container for pinterest button
      var customContainer = "<div class='custom-image-button-section' style='bottom: " + bottomCalculation + "px !important;'><i class='fab fa-pinterest-p custom-image-button custom-pinterest-button' data-image='" + $(thumbImages[i]).attr('data-image') + "' data-desc='" + $(thumbImages[i]).attr('alt') + "' style='z-index: 3;'></i></div>";

      // append into margin wrapper
      $(thumbImages[i]).parent().parent().append(customContainer);

      // retrieve pinterest button from margin wrapper
      var thumbPinterestButton = $(thumbImages[i]).parent().parent().find(".custom-pinterest-button")[0];

      // execute if pinterest button exists
      if (thumbPinterestButton) {

        // method that inserts event listener and executes a function when button is pressed
        thumbPinterestButton.addEventListener('click', function (e) {
          // // // console.log(e);
          e.preventDefault(); // prevent anchor tag from automatically changing page
          e.stopPropagation(); // prevents anchor tag from being handled by another event

          PinUtils.pinOne({
            'url': location.href,
            'media': e.target.attributes['data-image'].value,
            'description': e.target.attributes['data-desc'].value
          });
        });

      }

    }

  }

}

// method that checks if a URL has parameters
function checkForParameters(url) {
  var urlArray = url.split('?'); // initialize and declare value to URL split at '?' character
  // execute if splitted URL has length greater than one and if path after '?' character is not empty

  // // console.log("[PARAMETERS] URL ARRAY LENGTH:", urlArray)
  if (urlArray.length > 1 && urlArray[1] !== '') {
    // // // console.log("Parameters found in this URL");
    return true; // return true
  }
  return false; // return false if URL has no parameters
}

// method that sets ajax result value to variable
function callback(data) {
  jsonData = data; // set variable value to data passed in parameter
}

// method that checks if number is even
function isEven(number) {
  return number % 2 == 0; // uses mod to return boolean value to indicate if parameter number is even or odd
}

// method that finds keywords in array
function findKeywordInArray(keyword, array) {

  // filter through array values
  var results = array.filter(function (value) {
    // check if value exists and return true or false if keyboard is found
    if (value) { return value.indexOf(keyword) > -1; }
  });

  if (results.length > 0) {
    return true;
  } else {
    return false;
  }

}

// method that converts unix timestamp to Squarespace date
function convertTimestamp(timestamp) {
  var date = new Date(timestamp);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  return month + " " + day + ", " + year;
}

// method that decodes entities in JSON data
function decodeText(encodedString) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
  textArea.parentNode.removeChild(textArea);
}

// method that gets an image size
function getImageSize(img, callback) {
  img = $(img);

  var wait = setInterval(function () {
    var w = img.width(),
      h = img.height();

    if (w && h) {
      done(img, w, h);
    }
  }, 0);

  var onLoad;
  img.on('load', onLoad = function () {
    done(img, img.width(), img.height());
  });


  var isDone = false;
  function done() {
    if (isDone) {
      return;
    }
    isDone = true;

    clearInterval(wait);
    img.off('load', onLoad);

    callback.apply(this, arguments);
  }
}

// method that displays subscription popup
function displaySubscriptionPopup(categoryToDisplay) {
  // // console.log("[POPUP]", "Beginning of popup subscription.");

  var uuid = "23fd1362e2fc3bca611d00b8b"; // initialize and declare variable value to unique user id from MailChimp
  var listID; // initialize and declare list ID (from MailChimp) variable

  // method that sets listID variable value based on category of page (NOTE: category must be converted to lowercase in this method for accessibility purposes)
  switch (categoryToDisplay.toLowerCase()) {
    case 'astrology':
      listID = "a05ec12fa8"; // set value to MailChimp list ID for astrology
      break;
    case 'spirit':
      listID = "a05ec12fa8"; // set value to MailChimp list ID for sppirit
    default:
    // // console.log("[POPUP] Sorry, article was not in category array so no popup will appear.");
  }
  // // console.log("[POPUP] Category passed to this function:", categoryToDisplay);

  // execute if the list ID is not empty
  if (listID != "") {
    // // console.log("[POPUP] listID and uuid not empty");
    // // console.log("[POPUP]", uuid);
    // // console.log("[POPUP]", listID);

    //var navigationStartTime = window.performance.timing.navigationStart; // use navigation time to find out when page actually loaded
    var mailChimpDelay = mailChimpPopupDelay * 1000; // calculate delay in milliseconds
    //var currentTime = Date.now(); // retrieve current time

    // MailChimp method that displays the popup
    window.dojoRequire(["mojo/signup-forms/Loader"], function (L) {
      // delay by specific time amount
      setTimeout(function () {
        // // console.log("[POPUP] " + mailChimpPopupDelay + " seconds delay has executed.");
        L.start({
          "baseUrl": "mc.us16.list-manage.com",
          "uuid": uuid,
          "lid": listID,
          "uniqueMethods": true
        });
      }, mailChimpDelay);
      /* Math.max(mailChimpDelay - (currentTime - navigationStartTime), 0) */
    });
  }

}

// method that checks if anchor tags (links) found in document are external
function checkForExternalLinks(applyNoFollow) {
  // // // console.log("Function external links works! Apply no follow: ", applyNoFollow);

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
      //// // console.log("does not contain iamandco ", hostName);

      //anchorTagsInDocument[i].removeEventListener("click", checkForExternalLinks, false);

      // execute if function parameter is true
      if (applyNoFollow) {
        anchorTagsInDocument[i].setAttribute("rel", "nofollow"); // adds rel attribute to elements in DOM
      }

      anchorTagsInDocument[i].setAttribute("target", "_blank"); // add target attribute to elements in DOM


      // add event listener to anchor tag

      /*
      anchorTagsInDocument[i].addEventListener("click", function(e) {
        // // console.log(e);
        e.preventDefault(); // prevent anchor tag from automatically changing page
        e.stopPropagation(); // prevents anchor tag from being handled by another event
        //// // console.log(this.href);
        /* NOTE: Creating an anchor tag and triggering its "click" event prevents multiple tabs from being opened in mobile Google Chrome browser */

      /*
 
        var button = document.createElement("a"); // create anchor tag
        button.target = "_blank"; // set anchor tag target to "_blank" to open link on new tab
        button.href = this.href; // set anchor tag reference to new URL
        //// // console.log("Link being applied!: ", button.href);
 
        // NOTE: Apply "no-follow" attribute if links are affiliate links
        if (applyNoFollow == true) {
          button.setAttribute("rel", "nofollow"); // set rel attribute to "no-follow"
          // // console.log("Applied no-follow attribute!.....", button.href);
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
  let tag = "[INSERT CUSTOM HTML]";
  console.log(tag, "Function successfully called.");

  var pubExchangeHTML, summaryBlockHTML, categoryBlockHTML, authorBlockHTML;

  // check if user is on mobile devive
  if (!isMobile()) {
    // append the custom summary container inside the custom content div
    $(".custom-content .custom-article-content div[data-layout-label='Post Body']").after("<div class='custom-summary-container'></div>"); // append a custom HTML element into footer of article
  } else {
    // append the custom summary container inside the article element and after the share buttons
    $(".BlogItem-share").after("<div class='custom-summary-container'></div>"); // append a custom HTML element into footer of article
  }

  /* MailerLite Module */

  // initialize boolean variable to determine if article is style article
  var isStyleArticle;

  // check if article has categories
  if (jsonData['item']['categories']) {

    // loop through article categories
    for (var i = 0; i < jsonData['item']['categories'].length; i++) {

      // check if article is a style's article
      if (jsonData['item']['categories'][i] == "Style") {
        isStyleArticle = true;
      }

    }

  }

  // check if setting to insert MailerLite Module is on
  if (insertMailerLite && isStyleArticle) {

    // set variable to false
    isStyleArticle = false;

    // initialize variable with MailerLite HTML
    var mailerLiteHTML = "<div class='ml-form-embed' data-account='1763926:w7z9o7z8j7' data-form='1624668:u5f7o6'></div>";

    // retrieve the length of all divs with .sqs-block class
    var allElements = $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12").find("div.sqs-block.html-block");

    // calculate the middle element index
    var middleElementIndex = Math.floor(allElements.length / 2);

    // check if element at index is near a button block
    if ($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.html-block:eq(" + middleElementIndex + ")").next().next().hasClass("button-block")) {
      console.log(tag, "MailerLite is trying to insert near a button block.");
      $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.html-block:eq(" + middleElementIndex + ")").next().next().next().after(mailerLiteHTML);
    } else if ($("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.html-block:eq(" + middleElementIndex + ")").next().hasClass("button-block")) {
      console.log(tag, "MailerLite is trying to insert next to a button block.");
      $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.html-block:eq(" + middleElementIndex + ")").next().after(mailerLiteHTML);
    } else {
      $("article div[data-layout-label='Post Body'] .col.sqs-col-12.span-12 div.sqs-block.html-block:eq(" + middleElementIndex + ")").after(mailerLiteHTML);
    }

    // call function that reloads MailerLite scripts
    loadScript("https://static.mailerlite.com/js/universal.js");

  }

  /* --------------------------------------------------- */

  /* PubExchange Module */

  // check if PubExchange module exists in document
  if (document.getElementsByClassName("pubexchange_module")[0]) {
    // remove the element from DOM
    $(".pubexchange_module").remove();
  }

  // check if setting to insert PubExchange Module is on
  if (insertPubExchangeHTML) {
    // assign PubExchange HTML to variable
    pubExchangeHTML = '<div class="pubexchange_module" id="pubexchange_below_content" data-pubexchange-module-id="2747"></div>';
  }

  /* --------------------------------------------------- */

  /* Article Summary Block */

  // check if setting to insert Summary Block is on
  if (insertSummaryBlockHTML) {
    // initialize variables that will contain HTML of Summary Block
    var summaryBlockHTMLStart = "<div class='custom-summary-block sqs-block-html'><div class='custom-summary-wrapper'><div class='custom-summary-external'><div class='custom-summary-title'>" + customEmbedTitle + "</div><ul class='custom-summary-module'>"; // initialize and set value to custom summary block HTML
    var summaryBlockHTMLMiddle = ""; // initialize and set value to custom summary block HTML
    var summaryBlockHTMLEnd = "</ul></div></div></div>"; // initialize and set value to custom summary block HTML

    // intialize variables
    var rssFeedURL;
    var categoryResult;

    // check if article has categories
    if (jsonData['item']['categories']) {

      // initialize boolean variable
      var categoryChecked = false;

      // loop through article categories
      for (var i = 0; i < jsonData['item']['categories'].length; i++) {

        // check if any of article categories exist in pre-defined summary block data
        var categoryExistsInArray = summaryBlockData.some(function (item) {
          return item['categoryName'] === jsonData['item']['categories'][i];
        });

        // prevent any further category checks (only selects one category)
        if (categoryExistsInArray && !categoryChecked) {
          // assign category data to variable
          categoryResult = summaryBlockData.filter(function (data) {
            return data['categoryName'] === jsonData['item']['categories'][i];
          })[0];

          // set boolean variable to true
          categoryChecked = true;
        }

      }

    }

    // check if an article category was selected from article categories
    if (categoryResult) {
      console.log(tag, "A category result was found:", categoryResult);

      // check if setting to insert category breadcrumb on header is on
      if (insertBreadcrumbHTML) {
        // initialize and assign breadcrumb HTML to variable
        var breadcrumbHTML = "<div class='custom-breadcrumb'><p>Story from <a href='" + categoryResult.categoryURL + "'>" + categoryResult.categoryName + "</a><span class='special-symbol'></span></p></div>";
        // append breadcrumb HTML to DOM
        $("article").prepend(breadcrumbHTML);
      }

      // assign category RSS feed URL format to variable
      rssFeedURL = categoryResult.categoryURL + "&format=rss";

      console.log(tag, "Category URL:", rssFeedURL);

      // call AJAX method that retrieves related articles
      $.ajax({
        url: rssFeedURL,
        accepts: {
          xml: "application/rss+xml"
        },
        dataType: "xml",
        success: function (data) {
          console.log(tag, "Successfully retrieved AJAX data.");
          // retrieve all XML items from data and assign to variable
          var items = data.getElementsByTagName("channel")[0].getElementsByTagName("item");

          // loop through XML items
          for (var i = 0; i < summaryBlockArticleLimit; i++) {
            // initialize item
            var item;

            // check if current article item is the same as the current article
            if (items[i].getElementsByTagName("title")[0].textContent == decodeText(jsonData['item']['title'])) {
              item = items[i + 1]; // set variable as xml item
              i++; // increment for-loop index
              summaryBlockArticleLimit++; // increment summary block article limit
            } else {
              item = items[i]; // set variable as xml item
            }

            // retrieve item title
            var itemTitle = item.getElementsByTagName("title")[0].textContent;

            // retrieve item URL
            var itemLink = item.getElementsByTagName("link")[0].textContent;

            // initialize variable that will contain author name
            var itemAuthor = "";

            // retrieve item author
            if (item.getElementsByTagName("dc:creator")[0]) {
              itemAuthor = item.getElementsByTagName("dc:creator")[0].textContent; // set variable to xml item author
            } else {
              itemAuthor = $(item).children("dc\\:creator").text(); // set variable to xml item author
            }

            // initialize variable that will contain item description
            var itemDescription;

            // retrieve item description
            if (item.getElementsByTagName("description")[0].textContent.indexOf("<p>") != -1) {
              itemDescription = " "; // set variable to empty string
            } else {
              itemDescription = item.getElementsByTagName("description")[0].textContent; // initialize and set variable to xml item description
            }

            // initialize variable that will contain item image URL
            var itemImage;

            // retrieve item image URL
            if (item.getElementsByTagName("media:content")[0]) {
              itemImage = item.getElementsByTagName("media:content")[0].attributes[1].value; // set variable to xml item image

              // execute if the image URL returned is not an actual url (Internet Explorer works with this one)
              if (itemImage.indexOf("http://") == -1 || itemImage.indexOf("https://") == -1) {
                itemImage = item.getElementsByTagName("media:content")[0].getAttribute("url");
              }
            } else {
              itemImage = $(item).children("media\\:content").attr("url"); // set variable to xml item image
            }

            // retrieve image thumbnail URL in HTTPS
            var itemThumbnail = itemImage.replace(/^http:\/\//i, 'https://');

            // add HTML to summary block
            summaryBlockHTMLMiddle += "<li class='custom-summary-article'><div class='custom-summary-thumb-wrapper'><a class='custom-summary-thumb' href='" + itemLink + "' data-url='" + itemLink + "'><img style='' src='" + itemThumbnail + "' data-pin-nopin='1' nopin='1'></a></div><div class='custom-summary-editorial'><a class='custom-summary-headline' href='" + itemLink + "' data-url='" + itemLink + "'>" + itemTitle + "</a><p class='custom-summary-author-name'>" + itemAuthor + "</p></div></li>"; // set value to custom summary block item HTML

          }

          // format complete HTML and assign to variable
          summaryBlockHTML = summaryBlockHTMLStart + summaryBlockHTMLMiddle + summaryBlockHTMLEnd;

        }
      });

    } else {
      // assign an empty span element
      summaryBlockHTML = "<span></span>";
    }

  }

  /* --------------------------------------------------- */

  /* Article Category Block */

  // check if setting to insert article category block is on
  if (insertCategoryBlockHTML) {
    // execute if article has categories node
    if (jsonData['item']['categories']) {
      // initialize variables
      var categoriesArray = jsonData['item']['categories']; // initialize and declare variable value to JSON data array
      var specialCharacter = ""; // initialize special character variable
      var startHTML = "<div class='custom-category-block sqs-block-html'>"; // initialize and declare start of category block HTML
      var middleHTML = ""; // initialize middle of category block HTML
      var endHTML = "</div>"; // initialize and declare end of category block HTML

      // loop through JSON data array
      for (var i = 0; i < categoriesArray.length; i++) {
        var categoryURL = ""; // initialize category URL variable

        var existsInCategoryArray = summaryBlockData.some(function (item) {
          return item['categoryName'] === categoriesArray[i];
        }); // filter through summaryBlockData array object and return true if article category exists

        // execute if article category exists in category array (summaryBlockData)
        if (existsInCategoryArray) {
          categoryURL = summaryBlockData.filter(function (data) {
            return data['categoryName'] === categoriesArray[i];
          })[0].categoryURL; // set value to returned article data object
          // execute if article category does not exist in category array
        } else {
          categoryURL = "https://iamandco.com/blog?category=" + categoriesArray[i];
        }

        if (i == 0) {
          specialCharacter = "";
        } else {
          specialCharacter = " • ";
        }

        middleHTML += "<span class='category-block-item'><span class='bullet-point'>" + specialCharacter + "</span><a href='" + categoryURL + "' target='_blank'>" + categoriesArray[i] + "</a></span>";

      }


      categoryBlockHTML = startHTML + middleHTML + endHTML; // concatenate HTML

    }
  }

  /* --------------------------------------------------- */

  /*  Article Author Block */

  // check if setting to insert author block is on
  if (insertAuthorBlockHTML) {
    // initialize variables
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
    img.onload = function () {
      var customClass = ""; // initialize custom class
      var width = img.naturalWidth || img.width;
      var height = img.naturalHeight || img.height;

      // execute if image width is greater than height
      if (width > height) {
        customClass = "author-img-landscape"; // set value to landscape image class
      }

      authorBlockHTML = "<div class='custom-author-article-container'><div class='custom-author-article-image'><img class='" + customClass + "' src='" + authorAvatarURL + "' title='" + authorName + "' alt='" + authorName + "' /></div><div class='custom-author-article-info'><p>Written by</p><a href='/blog/?author=" + authorID + "'>" + authorName + "</a></div></div>";
    }

    authorBlockHTML = "<div class='custom-author-article-container'><div class='custom-author-article-image'><img src='" + authorAvatarURL + "' title='" + authorName + "' alt='" + authorName + "' /></div><div class='custom-author-article-info'><p>Written by</p><a href='/blog/?author=" + authorID + "'>" + authorName + "</a></div></div>";
  }

  /* --------------------------------------------------- */

  /* Insert Blocks */

  // append blank divs into summary container
  $(".custom-summary-container").prepend("<div class='custom-summary-pubexchange'></div>");
  $(".custom-summary-container").prepend("<div class='custom-summary-summaryblock'></div>");
  $(".custom-summary-container").prepend("<div class='custom-summary-author'></div>");
  $(".custom-summary-container").prepend("<div class='custom-summary-categories'></div>");

  // check if setting to insert PubExchange Module is on
  if (insertPubExchangeHTML) {
    // recursive method that checks if HTML exists
    var checkPubExchange = setInterval(function () {
      // check if HTML exists
      if (pubExchangeHTML) {
        // stop the loop
        clearInterval(checkPubExchange);
        // append to summary container
        $(".custom-summary-container .custom-summary-pubexchange").append(pubExchangeHTML);
      }
    }, 100);
  }

  // check if setting to insert Summary Block is on
  if (insertSummaryBlockHTML) {
    // recursive method that checks if HTML exists
    var checkSummaryBlock = setInterval(function () {
      // check if HTML exists
      if (summaryBlockHTML) {
        // stop the loop
        clearInterval(checkSummaryBlock);
        // append to summary container
        $(".custom-summary-container .custom-summary-summaryblock").append(summaryBlockHTML);
      }
    }, 100);
  }

  // check if setting to insert Category Block is on
  if (insertCategoryBlockHTML) {
    // recursive method that checks if HTML exists
    var checkCategoryBlock = setInterval(function () {
      // check if HTML exists
      if (categoryBlockHTML) {
        // stop the loop
        clearInterval(checkCategoryBlock);
        // append to summary container
        $(".custom-summary-container .custom-summary-categories").append(categoryBlockHTML);
        // check if setting to move pagination is on
        if (movePaginationHTML) {
          // call method that moves the pagination
          moveElements();
        }
      }
    }, 100);
  }

  // check if setting to insert Author Block is on
  if (insertAuthorBlockHTML) {
    // recursive method that checks if HTML exists
    var checkAuthorBlock = setInterval(function () {
      // check if HTML exists
      if (authorBlockHTML) {
        // stop the loop
        clearInterval(checkAuthorBlock);
        // append to summary container
        $(".custom-summary-container .custom-summary-author").append(authorBlockHTML);
      }
    }, 100);
  }

  // call method that inserts Pinterest button for thumbnail images
  insertGalleryImageButtons();

  /* --------------------------------------------------- */

}

// method that changes position of elements in blog page
function moveElements() {
  var paginationElement = $(".BlogItem-pagination"); // initialize and declare pagination element variable
  var socialElement = $(".BlogItem-share");

  // execute if paginationElement exists
  if (paginationElement[0]) {

    var paginationElementClone = paginationElement.clone();

    paginationElement.remove();

    $(".custom-summary-container .custom-category-block").after(paginationElementClone);
  }

  if (socialElement[0]) {
    var socialElementClone = socialElement.clone();

    $(".custom-summary-container .BlogItem-pagination").after(socialElementClone);

  }
}

/* This stuff listens for an ajax page change */
// window.onload = watch;
window.onload = function () {
  // // console.log("[ANNOUNCEMENT] ALL IMAGES/ASSETS/SCRIPTS HAVE LOADED");
  pageLoaded = true;
}

window.addEventListener("DOMContentLoaded", watch);

function watch() {
  // Adds an event listener that fires when page loads using SquareSpace's AJAX loading
  // This method is more efficient than the MutationObserver and it prevents the functions from running twice per load
  window.addEventListener('mercury:load', function () {
    summaryBlockArticleLimit = 4; // initialize value that indicates the number of articles to retrieve from RSS feed for custom summary block
    sidebarArticleLimit = 5; // initialize value that indicates the number of sidebar articles to retrieve from RSS feed for sidebar articles
    searchPageIndex = 0; // initialize value that indicates the index of the search page index
    articleIsFeelGoods = false;
    checkBlog();
    // console.log("Will be calling function to load custom video javascript...");
    // try {
    //   window.instgrm.Embeds.process();
    // } catch (error) {
    //   // call method that process the instagram embeds
    //   loadScript("https://platform.instagram.com/en_US/embeds.js", window.instgrm.Embeds.process);
    // }

    // method to check if instagram embeds have loaded
    var checkEmbeds = setInterval(function () {
      // check if instagram embeds exist
      if ($(".instagram-media").length > 0) {
        clearInterval(checkEmbeds); // stop the loop
        window.instgrm.Embeds.process();
      }
    }, 100);
    // console.log("Called function to load customm video javascript!");
  });

  // call method that loads OneSignal script
  // loadScript("https://cdn.onesignal.com/sdks/OneSignalSDK.js", displayOneSignal);

}