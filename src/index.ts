class MTACard extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  private content?: HTMLDivElement;
  private config!: Config;

  set hass(hass: HomeAssistant) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="MTA-card">
          <div class="card-content"></div>
        </ha-card>
      `;
      const div = this.querySelector('div');
      if (!div)
        throw new Error('Failed to find div element in MTA-card custom card');
      this.content = div;
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';

    this.content.innerHTML = `<span>some content here</span>`;
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  setConfig(config: Config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }
  getCardSize() {
    return 6;
  }

  // The rules for sizing your card in the grid in sections view
  getGridOptions() {
    return {
      rows: 3,
      columns: 6,
      min_rows: 3,
      max_rows: 3,
    };
  }
}

customElements.define('mta-card', MTACard);
