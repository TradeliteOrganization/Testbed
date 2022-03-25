import { LitElement, html, css } from 'lit';
import { dateTimeStyles } from './tl-date-time-card-css.js';

export class DateTimeCard extends LitElement {
    static get properties() {
        return {
            icon: { type: String },
            text: { type: String }
        };
    }

    static get styles() {
        return [dateTimeStyles];
    }
    constructor() {
        super();
        this.icon = '';
        this.text = '';
    }

    _formatDates() {
        const options = { month: 'short', day: 'numeric' };

        var start = new Date(this.tournament.dateStart);
        var end = new Date(this.tournament.dateEnd);
        start = start.toLocaleDateString(undefined, options) + this._nth(start.getDate());
        end = end.toLocaleDateString(undefined, options) + this._nth(end.getDate());

        return start + ' - ' + end;
    }

    render() {
        return html`
            <div class="iconWrapper">
                <img class='icon' alt="date icon" src=${this.icon}>
                <span>${this.text}</span>
            </div>
            `;
    }
}
customElements.define('tl-date-time-card', DateTimeCard);
