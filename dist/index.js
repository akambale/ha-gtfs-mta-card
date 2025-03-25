var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MTACard = /** @class */ (function (_super) {
    __extends(MTACard, _super);
    function MTACard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MTACard.prototype, "hass", {
        set: function (hass) {
            // Initialize the content if it's not there yet.
            if (!this.content) {
                this.innerHTML = "\n        <ha-card header=\"MTA-card\">\n          <div class=\"card-content\"></div>\n        </ha-card>\n      ";
                var div = this.querySelector('div');
                if (!div)
                    throw new Error('Failed to find div element in MTA-card custom card');
                this.content = div;
            }
            var entityId = this.config.entity;
            var state = hass.states[entityId];
            var stateStr = state ? state.state : 'unavailable';
            this.content.innerHTML = "<span>some content here</span>";
        },
        enumerable: false,
        configurable: true
    });
    // The user supplied configuration. Throw an exception and Home Assistant
    // will render an error card.
    MTACard.prototype.setConfig = function (config) {
        if (!config.entity) {
            throw new Error('You need to define an entity');
        }
        this.config = config;
    };
    MTACard.prototype.getCardSize = function () {
        return 6;
    };
    // The rules for sizing your card in the grid in sections view
    MTACard.prototype.getGridOptions = function () {
        return {
            rows: 3,
            columns: 6,
            min_rows: 3,
            max_rows: 3,
        };
    };
    return MTACard;
}(HTMLElement));
customElements.define('mta-card', MTACard);
