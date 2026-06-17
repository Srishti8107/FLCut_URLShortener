const shortbtn = document.getElementById("shortbtn");
const shortUrl = document.getElementById("short_url");
const msgContainer = document.getElementById("msgContainer");
const dashboardTable = document.getElementById("dashboardTable");

// error message div creation
const errmsg = document.createElement('div');
errmsg.className = ("errmsg");

let resultUrl;
// loading links from localstorage at the begining
let links = JSON.parse(localStorage.getItem("shortlinks")) || [];
displaylinks();

async function createShortUrl(longUrl, customWord) {
    const apiKey = "hC1xfhl6jXMYZ16yV7tRlgU850TSvx9DLEFBMKCmJshoK8i0pnYL9SVZBCGB";
    // console.log(apiKey);
    const website = "https://api.tinyurl.com/create";
    
    const info = {
        url : longUrl,
        domain : 'tinyurl.com'
    };
    
    if (customWord !== ""){
        info.alias = customWord;
        //console.log(info);
    }

    try {
        const response = await fetch(website, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(info)
        });

        const result = await response.json();

        if(response.ok){
            shortUrl.textContent = result.data.tiny_url;
            resultUrl = result.data.tiny_url;
            if (resultUrl){
                const linkData = {
                    longUrl,
                    resultUrl
                }

                links.push(linkData);
                localStorage.setItem("shortlinks", JSON.stringify(links));
                displaylinks();
            }
            //console.log('Custom Short URL: ', result.data.tiny_url);

            // Copy to clipboard option by just clicking on text
            const copybtn = document.getElementById("copybtn");
            copybtn.addEventListener("click", async () => {
                await navigator.clipboard.writeText(resultUrl);
                console.log(resultUrl);
                copybtn.textContent = "Copied!";
            });

        }else {
            errmsg.innerText = result.errors;
            msgContainer.appendChild(errmsg);
            //console.error('Error from API: ', result.errors);
            setTimeout(() => {
                errmsg.remove();
            }, 3000);
            return null;
        }

    } catch (error) {
        errmsg.innerText(error);
        msgContainer.appendChild(toast);
        setTimeout(() => {
                errmsg.remove();
            }, 3000);
            return null;
        //console.error('Network error:', error);
    }

}



shortbtn.addEventListener("click",() => {
    const longUrl = document.getElementById("long_url").value;
    const customWord = document.getElementById("customWord").value.trim();
    resultUrl = createShortUrl(longUrl, customWord);
    console.log(resultUrl);
    
});

//display links function
function displaylinks(){
    links.forEach(link => {
        dashboardTable.innerHTML += `
            <tr>
                <td>
                    <a href="${link.longUrl}" target="_blank">
                        ${link.longUrl}
                    </a>
                </td>
                <td>
                    <a href="${link.resultUrl}" target="_blank">
                        ${link.resultUrl}
                    </a>
                </td>
            </tr>
        `;
    });
}




