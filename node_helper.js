const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const { parseString } = require("xml2js");

module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === "GET_NAMEDAYS") {
            this.fetchFeed(payload);
        }
    },

    async fetchFeed(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();

            parseString(text, (err, result) => {
                if (err || !result?.rss?.channel?.[0]?.item?.[0]?.title?.[0]) {
                    this.sendSocketNotification("NAMEDAYS_RESULT", "Σφάλμα σύνδεσης");
                    return;
                }

                const rawTitle = result.rss.channel[0].item[0].title[0];

                // Regex to extract Greek names from inside HTML
                const match = rawTitle.match(/<td id="maintd">\s*<a[^>]*>([^<]*)<\/a>/);
                const names = match ? match[1].trim() : "Δεν βρέθηκαν ονόματα";

                this.sendSocketNotification("NAMEDAYS_RESULT", names);
            });

        } catch (error) {
            this.sendSocketNotification("NAMEDAYS_RESULT", "Σφάλμα σύνδεσης");
        }
    }
});
