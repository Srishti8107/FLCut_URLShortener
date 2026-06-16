const shortbtn = document.getElementById("shortbtn");
const shortUrl = document.getElementById("short_url");
let resultUrl = "";
async function createShortUrl(longUrl) {
    const apiKey = "ey72pgYhlTtKRKsd26SquBL9QbkCSxKoNn2uvii5sDKm9KAtDvgrdAiPqllw";
    const website = "https://api.tinyurl.com/create";

    const info = {
        url : longUrl,
        domain : 'tinyurl.com'
    };

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
            return resultUrl= result.data.tiny_url;
            // console.log('Custom Short URL: ', result.data.tiny_url);
            
        }else {
            console.error('Error from API: ', result.errors);
        }

    } catch (error) {
        console.error('Network error:', error);
    }
}
shortbtn.addEventListener("click",() => {
    const inputElement = document.getElementById("long_url");
    const longUrl = inputElement.value;
    createShortUrl(longUrl);
});

// Copy to clipboard option by just clicking on text
const copybtn = document.getElementById("copybtn");

copybtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(resultUrl);
    console.log(resultUrl);
    copybtn.textContent = "Copied!";
});



