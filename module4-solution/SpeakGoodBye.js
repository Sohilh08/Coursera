// STEP 6: Wrap the entire contents of SpeakGoodBye.js inside of an IIFE
(function () {

  // STEP 7: Create an object called 'byeSpeaker'
  var byeSpeaker = {};

  // STEP 8: Attach the "speak" method to the byeSpeaker object
  byeSpeaker.speak = function (name) {
    var speakWord = "Good Bye"; // Define speakWord within the method
    console.log(speakWord + " " + name);
  };

  // STEP 9: Expose the 'byeSpeaker' object to the global scope
  // by attaching it to the window object
  window.byeSpeaker = byeSpeaker;

})();
