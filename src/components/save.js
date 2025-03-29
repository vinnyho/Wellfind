renderSave();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "saveEmail") {
    chrome.storage.sync.get(["emailHistory"], function (result) {
      let currentHistory = result.emailHistory || [];

      const newEmail = {
        company: request.company,
        email: request.email,
        subject: request.subject || "",
        body: request.body || "",
        date: new Date().toLocaleDateString("en-US"),
      };

      currentHistory.push(newEmail);

      chrome.storage.sync.set({ emailHistory: currentHistory }, function () {
        renderSave();
      });
    });
  }
});

function renderSave() {
  let tbody = document.getElementById("saved-tbody");
  tbody.innerHTML = "";
  chrome.storage.sync.get(["emailHistory"], function (result) {
    let emailHistory = result.emailHistory || [];

    emailHistory.forEach((email, index) => {
      let tr = document.createElement("tr");
      let tdCompany = document.createElement("td");
      let tdEmail = document.createElement("td");

      let tdDate = document.createElement("td");
      let tdDelete = document.createElement("td");
      let deleteButton = document.createElement("button");
      let tdStatus = document.createElement("td");
      let statusSelect = document.createElement("select");
      let options = ["Waiting", "Response", "Rejected"];

      options.forEach((option) => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.innerText = option;
        
        if (email.status === option) {
          opt.selected = true;
        }
        statusSelect.appendChild(opt);
      });

      deleteButton.addEventListener("click", function () {
        emailHistory.splice(index, 1);
        chrome.storage.sync.set({ emailHistory }, () => {
          renderSave();
        });
      });
      statusSelect.addEventListener("change", function () {
        emailHistory[index].status = this.value;
        chrome.storage.sync.set({ emailHistory });
      });

      deleteButton.innerText = "Delete";
      deleteButton.style.color = "white";
      deleteButton.style.backgroundColor = "red";
      deleteButton.style.border = "none";
      deleteButton.style.padding = "5px 12px";
      deleteButton.style.cursor = "pointer";
      deleteButton.style.width = "100%";
      deleteButton.style.height = "100%";
      deleteButton.style.margin = "0";

      tdCompany.innerText = email.company;
      tdEmail.innerText = email.email;
      tdDate.innerText = email.date;

      tdCompany.classList.add(
        "w-12",
        "max-w-12",
        "truncate",
        "overflow-hidden",
        "whitespace-nowrap",
        "text-center"
      );
      tdEmail.classList.add(
        "w-16",
        "max-w-16",
        "truncate",
        "overflow-hidden",
        "whitespace-nowrap",
        "text-center"
      );
      tdDate.classList.add(
        "w-11",
        "max-w-12",
        "truncate",
        "overflow-hidden",
        "whitespace-nowrap",
        "text-center"
      );
      tdStatus.classList.add(
        "w-10",
        "max-w-10",
        "truncate",
        "overflow-hidden",
        "whitespace-nowrap",
        "text-center"
      );
      tdDelete.classList.add(
        "w-8",
        "max-w-8",
        "truncate",
        "overflow-hidden",
        "whitespace-nowrap",
        "text-center"
      );

      tr.appendChild(tdCompany);
      tr.appendChild(tdEmail);
      tr.appendChild(tdDate);
      tdStatus.appendChild(statusSelect);
      tr.appendChild(tdStatus);
      tdDelete.appendChild(deleteButton);
      tr.appendChild(deleteButton);
      tbody.appendChild(tr);
    });
  });
};
