let apiSubmitButton = document.getElementById("api-key-submit");
let hunterInput = document.getElementById("hunter-api-key");
let cohereInput = document.getElementById("cohere-api-key");

chrome.storage.local.get(["hunterApiKey", "cohereApiKey"], function (result) {
  hunterInput.value = result.hunterApiKey;
  cohereInput.value = result.cohereApiKey;

  chrome.runtime.sendMessage({
    action: "sentKey",
    hunterKey: hunterInput.value,
    cohereKey: cohereInput.value,
  });
});

apiSubmitButton.addEventListener("click", function () {
  chrome.storage.local.set({
    hunterApiKey: hunterInput.value,
    cohereApiKey: cohereInput.value,
  });

  chrome.runtime.sendMessage({
    action: "sentKey",
    hunterKey: hunterInput.value,
    cohereKey: cohereInput.value,
  });
});
