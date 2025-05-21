Module.register("MMM-Eortologio", {
    defaults: {
        updateInterval: 24 * 60 * 60 * 1000, // Once per day
        feedUrl: "https://www.eortologio.net/rss/today.xml"
    },

    start() {
        this.names = null;
        this.getNames();
        this.scheduleUpdate();
    },

    scheduleUpdate() {
        setInterval(() => {
            this.getNames();
        }, this.config.updateInterval);
    },

    getNames() {
        this.sendSocketNotification("GET_NAMEDAYS", this.config.feedUrl);
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "NAMEDAYS_RESULT") {
            this.names = payload;
            this.updateDom();
        }
    },

    getDom() {
        const wrapper = document.createElement("div");
        wrapper.className = "light small"; // less bright by default

        if (!this.names) {
            wrapper.innerHTML = "Φόρτωση εορτολογίου...";
        } else if (this.names === "Σφάλμα σύνδεσης") {
            wrapper.innerHTML = `<strong>Σήμερα:</strong> ${this.names}`;
        } else {
            wrapper.innerHTML = `
      <div style="font-size: medium; font-weight: normal;">
        Σήμερα: ${this.names}
      </div>
      <div style="font-size: x-small; color: gray;">
        (πηγή: eortologio.net)
      </div>
    `;
        }

        return wrapper;
    }

});
