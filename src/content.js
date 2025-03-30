

function scrapePageData () {
        let companyName = document.title.replace(/Careers \| Wellfound$/, "").trim();
        let employees = document.querySelectorAll('[class^="styles_name__"]');
        let positions = document.querySelectorAll('[class^="styles_byline__"]');
        let description = document.querySelector('[class*="styles_description__"]');
        

        chrome.runtime.sendMessage({
            action: 'scrapedData',
            companyName: companyName,
            employees: Array.from(employees).map((employee, index) => {
                return {
                    name: employee.innerText,
                    position: positions[index].innerText,
             
                };
            
        }),
            description: description.textContent.trim()
        });
        
    };





scrapePageData();