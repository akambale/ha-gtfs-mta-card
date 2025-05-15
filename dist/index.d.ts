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
declare function getDueIn(state: SensorProps): number | undefined;
declare function getNextDueIn(state: SensorProps): number | undefined;
declare function getIconLink(lineName: string): string;
