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
                if (!err) {
                    const rawTitle = result.rss.channel[0].item[0].title[0];
                    const match = rawTitle.match(/<a [^>]+>Σήμερα[^<]*<\/a><\/td>\s*<td[^>]*>\s*<a [^>]+>([^<]*)<\/a>/);
                    const names = match ? match[1] : "Δεν βρέθηκαν ονόματα";
                    this.sendSocketNotification("NAMEDAYS_RESULT", names);
                } else {
                    this.sendSocketNotification("NAMEDAYS_RESULT", "Σφάλμα ανάγνωσης XML");
                }
            });
        } catch (error) {
            this.sendSocketNotification("NAMEDAYS_RESULT", "Σφάλμα σύνδεσης");
        }
    }
});
