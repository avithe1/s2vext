document.addEventListener('DOMContentLoaded', function () {

    const baseURL = "https://shorts2video.tubeseek.in/"
    let finalURL = ""
    let yturl = ""

    const checkingelement = document.getElementById("checking")
    const isyoutubeelement = document.getElementById("isyoutube")
    const erroryoutube = document.getElementById("erroryoutube")

    isyoutubeelement.style.display = "none"
    erroryoutube.style.display = "none"
    checkingelement.style.display = "block"

    function noYoutubeElements(message, message2) {
        isyoutubeelement.style.display = "none"
        erroryoutube.style.display = "block"
        checkingelement.style.display = "none"
        document.getElementById("errorp").innerHTML = message
        document.getElementById("errorp2").innerHTML = message2
        document.getElementById("tubeSeekBtn2").onclick = function () { opentubeSeekAnyway() };
    }

    function hideCheckingElements(type) {
        isyoutubeelement.style.display = "block"
        erroryoutube.style.display = "none"
        checkingelement.style.display = "none"

        if (type === "playlist") {
            let message = "✅ You can view this Youtube SHORT as a normal video."
            let message2 = "💡 The SHORT should be public and NOT private."

            document.getElementById("isytp").innerHTML = message
            document.getElementById("isytp2").innerHTML = message2
        } else {
            let message = "✅ You can view this Youtube SHORT as a normal video."
            let message2 = "💡 The SHORT should be public and NOT private."

            document.getElementById("isytp").innerHTML = message
            document.getElementById("isytp2").innerHTML = message2
        }
    }

    async function getCurrentTab() {
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        yturl = tab.url

        var url = new URL(yturl)
        var domain = url.hostname

        if (domain === "youtube.com" || domain === "youtu.be" || domain === "www.youtube.com" || domain === "www.youtu.be") {
            const regexp = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/shorts\/|embed\/|v\/|e\/)?([^\s&\?\#]*).*/
            let id = null
            try {
                id = yturl.match(regexp) ? yturl.match(regexp)[1] : null
            } catch (e) {
                noYoutubeElements("Hmm, no SHORTS found here&nbsp;&nbsp;🤷‍♀️", "Use the extension when you are viewing Youtube SHORTS.")
            }

            if (id && id.length && !id.includes("/")) {
                finalURL = id ? yturl.includes("/playlist") ? finalURL = baseURL + "playlist/" + id : finalURL = baseURL + "video/" + id : baseURL
                hideCheckingElements(yturl.includes("/playlist") ? "playlist" : "video")
                document.getElementById("tubeSeekBtn1").onclick = function () { openContentOntubeSeek() };
            } else {
                noYoutubeElements("Hmm, no SHORTS found here&nbsp;&nbsp;🤷‍♀️", "Use the extension when you are viewing Youtube SHORTS.")
            }
        } else {
            if (domain === "shorts2video.tubeseek.in") {
                noYoutubeElements("👋&nbsp;&nbsp;tubeSeek extension works on YouTube site.", "Click this extension when you want to see a Youtube Short as a full Video.")
                document.getElementById("tubeSeekBtn2").style.display = "none"
            } else {
                noYoutubeElements("🔍&nbsp;&nbsp;Nothing here. tubeSeek extension works on Youtube site.", "Click this extension when you want to see a Youtube Short as a full Video.")
                document.getElementById("tubeSeekBtn2").innerHTML = "Shorts 2 Video"
            }
        }
    }

    getCurrentTab()

    function openContentOntubeSeek() {
        chrome.tabs.create({ active: true, url: finalURL });
    }

    function opentubeSeekAnyway() {
        chrome.tabs.create({ active: true, url: "https://shorts2video.tubeseek.in" });
    }

});