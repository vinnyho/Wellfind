let apiSubmitButton = document.getElementById("api-key-submit");
let hunterInput = document.getElementById("hunter-api-key");
let cohereInput = document.getElementById("cohere-api-key");
let resumeFile = document.getElementById("resume-upload");

chrome.storage.local.get(["hunterApiKey", "cohereApiKey"], function (result) {
    hunterInput.value = result.hunterApiKey;
    cohereInput.value = result.cohereApiKey;
    
    chrome.runtime.sendMessage({
        action: "sentKey",
        hunterKey: hunterInput.value,
        cohereKey: cohereInput.value
    });
});

apiSubmitButton.addEventListener("click", function () {
    let file = resumeFile.files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function (event) {
            let arrayBuffer = event.target.result;

            if (typeof pdfjsLib === "undefined") {
                console.error("PDF.js library is not loaded.");
                return;
            }

            let loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            loadingTask.promise.then(pdf => {
                let textPromises = [];
                for (let i = 1; i <= pdf.numPages; i++) {
                    textPromises.push(pdf.getPage(i).then(page => page.getTextContent()));
                }

                Promise.all(textPromises).then(pages => {
                    let extractedText = pages.map(page =>
                        page.items.map(item => item.str).join(" ")
                    ).join("\n");

                    chrome.storage.local.set({
                        hunterApiKey: hunterInput.value,
                        cohereApiKey: cohereInput.value,
                        resume: extractedText
                    });

                    chrome.runtime.sendMessage({
                        action: "sentKey",
                        hunterKey: hunterInput.value,
                        cohereKey: cohereInput.value,
                        resumeText: extractedText
                    });
                });
            }).catch(error => console.error("Error loading PDF:", error));
        };

        reader.onerror = function () {
            console.error("Error reading file");
        };

        reader.readAsArrayBuffer(file);
    } else {
        chrome.storage.local.set({
            hunterApiKey: hunterInput.value,
            cohereApiKey: cohereInput.value
        });

        chrome.runtime.sendMessage({
            action: "sentKey",
            hunterKey: hunterInput.value,
            cohereKey: cohereInput.value,
            resumeText: null
        });
    }
});
