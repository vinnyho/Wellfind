let sendButton = document.getElementById("send-btn");
let aiButton = document.getElementById("ai-btn");
let emailBody = "";

sendButton.addEventListener("click", function () {
  let emailField = document.getElementById("email-field").value;
  let emailBody = document.getElementById("email-body").value;
  let emailSubject = document.getElementById("email-subject").value;
  let mailtoLink = `mailto:${emailField}?subject=${emailSubject}&body=${encodeURIComponent(
    emailBody
  )}`;
  window.open(mailtoLink);

  chrome.runtime.sendMessage({
    action: "emailSent",
    email: emailField,
    body: emailBody,
    subject: emailSubject,
  });
  document.getElementById("email-field").value = "";
  document.getElementById("email-body").value = "";
  document.getElementById("email-subject").value = "";
});

aiButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "generateBody" }, (response) => {
    document.getElementById("email-body").value = response.description;
  });
});
