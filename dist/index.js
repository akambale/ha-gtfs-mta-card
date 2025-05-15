"use strict";
class MTACard extends HTMLElement {
    set hass(hass) {
        // Initialize the content if it's not there yet.
        if (!this.content) {
            this.innerHTML = `
        <ha-card header="${this.config.title}">
          <ul class="card-content"></ul>
        </ha-card>
      `;
            const ul = this.querySelector('ul');
            if (!ul)
                throw new Error('Failed to find ul element in MTA-card custom card');
            this.content = ul;
        }
        const trainRowData = [];
        this.config.sensors.forEach(sensor => {
            const trainLine = hass.states[sensor.name];
            const lessThanMinutesThreshold = sensor.minutes;
            if (!trainLine) {
                return;
            }
            const dueIn = getDueIn(trainLine);
            const nextDueIn = getNextDueIn(trainLine);
            if (dueIn) {
                trainRowData.push({
                    timeUntil: dueIn,
                    threshold: lessThanMinutesThreshold ?? 0,
                    route: trainLine.attributes.Route.toLowerCase(),
                });
            }
            if (nextDueIn) {
                trainRowData.push({
                    timeUntil: nextDueIn,
                    threshold: lessThanMinutesThreshold ?? 0,
                    route: trainLine.attributes.Route.toLowerCase(),
                });
            }
        });
        const filteredTrainRowData = trainRowData
            // removes any null time until values
            .filter(row => typeof row.timeUntil === 'number')
            // removes any trains that are coming sooner than the threshold time
            .filter(row => row.timeUntil >= row.threshold);
        filteredTrainRowData.sort((a, b) => a.timeUntil - b.timeUntil);
        const stringElArr = filteredTrainRowData.map(row => `
      <li style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 10px; align-items: center;">
        <div style="background-image: url('${getIconLink(row.route)}'); height: 40px; width: 40px;"></div>
        <div style="font-size: 30px;">${row.timeUntil} Min</div>
      </li>
    `);
        this.content.innerHTML = stringElArr.join('');
    }
    setConfig(config) {
        this.config = config;
    }
    getGridOptions() {
        return {
            min_rows: 2,
            min_columns: 6,
            max_columns: 6,
        };
    }
}
customElements.define('mta-card', MTACard);
window.customCards.push({
    type: 'mta-card',
    name: 'MTA Card',
    description: 'A card that works with the ha-gtfs-rt integration to display MTA train times in the format and appearance of the subway.',
});
function getDueIn(state) {
    return state.attributes['Due in'];
}
function getNextDueIn(state) {
    return state.attributes['Next bus due in'];
}
function getIconLink(lineName) {
    return `https://www.unpkg.com/mta-subway-bullets@1.0.0/dist/svg/${lineName}.svg`;
}
