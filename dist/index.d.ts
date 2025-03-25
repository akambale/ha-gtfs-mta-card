declare class MTACard extends HTMLElement {
    private content?;
    private config;
    set hass(hass: HomeAssistant);
    setConfig(config: Config): void;
    getCardSize(): number;
    getGridOptions(): {
        rows: number;
        columns: number;
        min_rows: number;
        max_rows: number;
    };
}
