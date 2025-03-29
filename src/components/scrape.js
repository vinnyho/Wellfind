let scrapeEmailsButton = document.getElementById("scrape-emails-btn");

scrapeEmailsButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "getCompanyInfo" });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scrapedEmails") {
    renderEmployees(request.data);
  }
});

function renderEmployees(data) {
  let table = document.getElementById("table");
  let tbody = document.createElement("tbody");

  table.classList.add(
    "border-separate",
    "border-spacing-2",
    "border",
    "border-gray-400",
    "dark:border-gray-500"
  );

  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    let tdPosition = document.createElement("td");
    let tdEmail = document.createElement("td");

    tdName.innerText = data[i].name;
    tdPosition.innerText = data[i].position;
    tdEmail.innerText = data[i].email;

    tr.appendChild(tdName);
    tr.appendChild(tdPosition);
    tr.appendChild(tdEmail);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
}
