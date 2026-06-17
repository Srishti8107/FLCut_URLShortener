import {CONFIG} from './config.js';
const shortbtn = document.getElementById("shortbtn");
const shortUrl = document.getElementById("short_url");
let resultUrl;
let linkData={};

async function createShortUrl(longUrl, customWord) {
    const apiKey = `${CONFIG.apiKey}`;
    // console.log(apiKey);
    const website = `${CONFIG.website}`;
    
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
            return resultUrl = await result.data.tiny_url;
            //console.log('Custom Short URL: ', result.data.tiny_url);
        }else {
            console.error('Error from API: ', result.errors);
        }

    } catch (error) {
        console.error('Network error:', error);
    }

}

shortbtn.addEventListener("click",() => {
    const longUrl = document.getElementById("long_url").value;
    const customWord = document.getElementById("customWord").value.trim();
    resultUrl = createShortUrl(longUrl, customWord);
    linkData={
        longUrl:longUrl,
        shortUrl: resultUrl
    };
    console.log(linkData)
});

// Copy to clipboard option by just clicking on text
const copybtn = document.getElementById("copybtn");
copybtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(resultUrl);
    console.log(resultUrl);
    copybtn.textContent = "Copied!";
});



