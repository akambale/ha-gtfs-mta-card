declare class MTACard extends HTMLElement {
    private content?;
    private config;
    set hass(hass: HomeAssistant);
    setConfig(config: Config): void;
    getGridOptions(): {
        min_rows: number;
        min_columns: number;
        max_columns: number;
    };
}
declare function getDueIn(state: SensorProps): number | undefined;
declare function getNextDueIn(state: SensorProps): number | undefined;
declare function getIconLink(lineName: string): string;
