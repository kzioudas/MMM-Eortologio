const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const { parseString } = require("xml2js");

module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === "GET_NAMEDAYS") {
            console.log("[MMM-Eortologio] Received GET_NAMEDAYS, fetching feed...");
            this.fetchFeed(payload);
        }
    },

    async fetchFeed(url) {
        console.log("[MMM-Eortologio] Fetching URL:", url);
        try {
            const response = await fetch(url);
            const text = await response.text();
            console.log("[MMM-Eortologio] Fetched response:", text.slice(0, 300), "...");

            parseString(text, (err, result) => {
                if (err || !result?.rss?.channel?.[0]?.item?.[0]?.title?.[0]) {
                    console.error("[MMM-Eortologio] XML parsing error or missing title:", err);
                    this.sendSocketNotification("NAMEDAYS_RESULT", "Σφάλμα σύνδεσης");
                    return;
                }

                const titleNode = result.rss.channel[0].item[0].title[0];
                console.log("[MMM-Eortologio] Parsed title node:", titleNode);

                let names = "Δεν βρέθηκαν ονόματα";
                try {
                    const tdArray = titleNode.tr?.[0]?.td;
                    const nameNode = tdArray?.[1]?.a?.[0];

                    if (typeof nameNode === "string") {
                        names = nameNode.trim();
                    } else if (typeof nameNode === "object") {
                        if (typeof nameNode._ === "string") {
                            names = nameNode._.trim();
                        } else if (Array.isArray(nameNode) && typeof nameNode[0] === "string") {
                            names = nameNode[0].trim();
                        } else {
                            console.error("[MMM-Eortologio] Unrecognized nameNode structure:", nameNode);
                        }
                    }
                } catch (e) {
                    console.error("[MMM-Eortologio] Error extracting names:", e);
                }

                console.log("[MMM-Eortologio] Extracted names:", names);
                this.sendSocketNotification("NAMEDAYS_RESULT", names);
            });
        } catch (error) {
            console.error("[MMM-Eortologio] Fetch error:", error);
            this.sendSocketNotification("NAMEDAYS_RESULT", "Σφάλμα σύνδεσης");
        }
    }
});
