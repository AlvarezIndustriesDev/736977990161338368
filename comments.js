/* REMOVED IN UPDATE 09/28/2019 9:00 PM

<!-- Pinterest Tag -->
<!-- REMOVE: 09/27/2019 -->
<!--
<script>
!function(e){if(!window.pintrk){window.pintrk = function () {
window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
      n=window.pintrk;n.queue=[],n.version="3.0";var
      t=document.createElement("script");t.async=!0,t.src=e;var
      r=document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
pintrk('load', '2612611324691', {em: '<user_email_address>'});
pintrk('page');
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt=""
      src="https://ct.pinterest.com/v3/?tid=2612611324691&pd[em]=<hashed_email_address>&noscript=1" />
</noscript>
-->
<!-- end Pinterest Tag -->

<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script>

// method that checks if an article category matches categoriesForPopup array
function checkArticlesForPopup(category, array) {

  // loop through categoriesForPopup array
  for (var i = 0; i < array.length; i++) {

    // execute if category exists in validation array
    if (array[i] == category) {

      // // console.log("[POPUP]", category, true);

      displaySubscriptionPopup(category); // call method that displays subscription popup

      // execute if category does not exist in validation array
    } else {

      // // console.log("[POPUP]", category, false);

    }

  }

}

*/


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