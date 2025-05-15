declare global {
  interface HomeAssistant {
    states: {
      [entityId: string]: SensorProps;
    };
    user?: {
      name: string;
      id: string;
      is_admin: boolean;
    };
    themes: {
      default_theme: string;
      themes: Record<string, Record<string, string>>;
    };
    panels: Record<string, HassPanel>;
    services: Record<string, Record<string, HassService>>;
    config: HassConfig;
    language: string;
    selectedLanguage: string | null;
    locale: {
      language: string;
      number_format: string;
      time_format: string;
      date_format: string;
    };
  }

  interface LitElementConstructor {
    new (): LitElement;
    prototype: LitElement;
  }

  interface LitElement extends HTMLElement {
    render(): unknown;
    requestUpdate(): Promise<void>;
    firstUpdated(changedProperties: Map<string, any>): void;
    updated(changedProperties: Map<string, any>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    createRenderRoot(): Element | ShadowRoot;
  }

  interface PropertyDeclaration {
    type: unknown;
    attribute?: boolean | string;
    reflect?: boolean;
    hasChanged?(value: unknown, oldValue: unknown): boolean;
  }

  interface PropertyDeclarations {
    [key: string]: PropertyDeclaration;
  }

  interface CSSResult {
    cssText: string;
    toString(): string;
  }

  interface HassEntity {
    entity_id: string;
    state: string;
    last_changed: string;
    last_updated: string;
    attributes: Record<string, any>;
    context: {
      id: string;
      user_id: string | null;
      parent_id: string | null;
    };
    states?: {
      [entityId: string]: HassEntity;
    };
  }

  interface HassConfig {
    latitude: number;
    longitude: number;
    elevation: number;
    unit_system: {
      length: string;
      mass: string;
      temperature: string;
      volume: string;
    };
    location_name: string;
    time_zone: string;
    components: string[];
    version: string;
  }

  interface HassPanel {
    component_name: string;
    icon: string | null;
    title: string | null;
    config: Record<string, any> | null;
    url_path: string;
  }

  interface HassService {
    name: string;
    description: string;
    target?: {
      entity?: string[];
      device?: string[];
      area?: string[];
    };
    fields: Record<
      string,
      {
        name: string;
        description: string;
        example?: any;
        selector?: Record<string, any>;
      }
    >;
  }

  interface Config {
    title: string;
    sensors: Sensor[];
  }

  interface Sensor {
    name: string;
    minutes?: number;
  }

  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }

  interface SensorProps {
    entity_id: 'sensor.1_north';
    state: '7';
    attributes: {
      'Due in'?: number;
      'Stop ID': string;
      Route: string;
      'Due at': string;
      Occupancy: unknown;
      'Next bus': string;
      'Next bus due in'?: number;
      'Next bus occupancy': unknown;
      unit_of_measurement: 'min';
      icon: 'mdi:bus';
      friendly_name: string;
    };
    last_changed: string;
    last_updated: string;
  }

  interface TrainRowProps {
    timeUntil: number;
    route: string;
    threshold: number;
  }
}

export {};
