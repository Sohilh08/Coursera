// STEP 2: Wrap the entire contents of SpeakHello.js inside of an IIFE
(function () {

  // STEP 3: Create an object called 'helloSpeaker'
  var helloSpeaker = {};

  // STEP 4: Attach the "speak" method to the helloSpeaker object
  helloSpeaker.speak = function (name) {
    var speakWord = "Hello"; // Define speakWord within the method
    console.log(speakWord + " " + name);
  };

  // STEP 5: Expose the 'helloSpeaker' object to the global scope
  // by attaching it to the window object
  window.helloSpeaker = helloSpeaker;

})();
