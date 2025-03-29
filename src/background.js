let scrapedData = {};
let hunterAPIKey = "";
let cohereAPIKey = "";
let resumeText = "";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scrapedData") {
    scrapedData = {
      companyName: request.companyName,
      employees: request.employees,
      description: request.description,
    };
  }

  if (request.action === "sentKey") {
    console.log(request.resumeText);
    hunterAPIKey = request.hunterKey || null;
    cohereAPIKey = request.cohereKey || null;
    resumeText = request.resumeText || "No resume uploaded";
  }

  if (request.action === "emailSent") {
    chrome.runtime.sendMessage({
      action: "saveEmail",
      company: scrapedData.companyName,
      email: request.email,
      body: request.body,
      subject: request.subject,
    });
  }
  if (request.action === "generateBody") {
    fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cohereAPIKey}`,
      },
      body: JSON.stringify({
        model: "command-r-plus-08-2024",
        prompt: `Based on this description, write only two sentences explaining why I want to work at this company. Do not include any personal information or formalities like "your name" or "email." Just focus on why I would be excited to work at this company. Do not repeat the description.
                The following is a description of a company: ${scrapedData.description}. The following is a resume: ${resumeText}`,
        max_tokens: 150,
        temperature: 0.7,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const generatedText =
          data.generations[0]?.text.trim() || "Error generating text";
        sendResponse({ description: generatedText });
      })
      .catch((error) => {
        sendResponse({ description: "Error generating text" });
      });
    return true;
  }

  if (request.action === "getCompanyInfo") {
    fetchEmails(scrapedData.companyName).then((emails) => {
      chrome.runtime.sendMessage({
        action: "scrapedEmails",
        data: emails,
        company: request.description,
      });
    });
  }
});

async function fetchEmails(companyName) {
  let response = await fetch(
    `https://api.hunter.io/v2/domain-search?company=${companyName}&api_key=${hunterAPIKey}`
  );
  let data = await response.json();

  let employeesData = [];
  data.data.emails.forEach((employee, index) => {
    employeesData.push({
      name: `${employee.first_name} ${employee.last_name}`,
      email: employee.value,
      position: employee.position,
    });
  });
  return employeesData;
}
