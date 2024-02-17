// Same as document.addEventListener("DOMContentLoaded"...
$(function () {
  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}'
  // with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string
      .replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // Remove the class 'active' from home and switch to Menu button
  var switchMenuToActive = function () {
    // Remove 'active' from home button
    var classes = document.querySelector("#navHomeButton").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#navHomeButton").className = classes;

    // Add 'active' to menu button if not already there
    classes = document.querySelector("#navMenuButton").className;
    if (classes.indexOf("active") === -1) {
      classes += " active";
      document.querySelector("#navMenuButton").className = classes;
    }
  };

  // Load menu items for a specific category
  dc.loadMenuItems = function (categoryShort) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      menuItemsUrl + categoryShort + ".json",
      function (menuItems) {
        buildAndShowMenuItemsHTML(menuItems);
      },
      true); // Explicitly setting the flag to get JSON from server processed into an object literal
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // Load home page
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        insertHtml("#main-content", homeHtml);
      },
      false); // No need to process JSON here
  });

  // Other functions...

  // *** start ***
  // Update the event listener for the "Specials" tile click event
  $("#specials-tile").click(function(event) {
    // Prevent default link behavior
    event.preventDefault();

    // Retrieve all categories
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        // Generate a random index to select a category
        var randomIndex = Math.floor(Math.random() * categories.length);
        
        // Get the short_name of the randomly selected category
        var randomCategoryShortName = categories[randomIndex].short_name;
        
        // Navigate to the single category menu page for the randomly selected category
        dc.loadMenuItems(randomCategoryShortName);
      },
      true); // Explicitly setting the flag to get JSON from server processed into an object literal
  });
  // *** finish ***

  global.$dc = dc;
})(window);
