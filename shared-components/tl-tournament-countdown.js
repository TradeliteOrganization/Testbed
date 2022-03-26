import { LitElement, html, css } from "lit";

export class TournamentCountdown extends LitElement {
    static properties = {
        dateStart: {
            type: "number",
            attribute: "date-start",
        },
        dateEnd: {
            type: "number",
            attribute: "date-end",
        },
        _status: { state: true },
        _total: { state: true },
        _days: { state: true },
        _hours: { state: true },
        _minutes: { state: true },
        _seconds: { state: true },
    };

    static get styles() {
        return [
            css`
                .countdown {
                    position: absolute;
                    top: 0;
                    right: 10%;
                    width: 75%;
                    border-radius: var(--tl-tournament-countdown-border-radius);
                    padding: var(--tl-tournament-countdown-padding);
                    background-color: var(--color-accent-3);
                    box-shadow: var(--tl-tournament-countdown-box-shadow);
                    font-size: var(--paragraph-medium-font-size);
                    line-height: var(--paragraph-medium-line-height);
                    font-weight: var(--paragraph-medium-font-weight);
                }

                span {
                    margin: 0 1%;
                }
                .countdown-days {
                    margin-left: 6%;
                }
            `,
        ];
    }

    constructor() {
        super();
        this._status = "";
        this._total = 0;
        this._days = 0;
        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;
    }

    _getTournamentTimeRemaining() {
        const currentDate = Date.parse(new Date());
        const dateStartRemaining = this.dateStart - currentDate;
        const dateEndRemaining = this.dateEnd - currentDate;

        if (!this._status) {
            this._status =
                dateStartRemaining > 0 ? "Starts in" : dateEndRemaining > 0 ? "Ends in" : "Ended";
        } else if (this._status === "Starts in" && !dateStartRemaining) {
            this._status = "Ends in";
        } else if (this._status === "Ends in" && !dateEndRemaining) {
            this._status = "Ended";
        }

        this._total = dateStartRemaining > 0 ? dateStartRemaining : dateEndRemaining;

        if (this._total >= 0) {
            this._days = Math.floor(this._total / (1000 * 60 * 60 * 24));
            this._hours = Math.floor((this._total / (1000 * 60 * 60)) % 24);
            this._minutes = Math.floor((this._total / 1000 / 60) % 60);
            this._seconds = Math.floor((this._total / 1000) % 60);
        }
    }

    _startCountdown() {
        const countdown = setInterval(() => {
            this._getTournamentTimeRemaining();

            if (this._total <= 0) {
                clearInterval(countdown);
            }
        }, 1000);
    }

    render() {
        return html`
            <div class="countdown">
                <span class="countown-title">${this._status}</span>
                <span class="countdown-days">Days: ${this._days}</span>
                <span class="countdown-hours">Hours: ${this._hours}</span>
                <span class="countdown-minutes">Minutes: ${this._minutes}</span>
                <span class="countdown-seconds">Seconds: ${this._seconds}</span>
            </div>
        `;
    }

    willUpdate() {
        if (!this._status || (this._status === "Starts in" && this._total === 0)) {
            this._startCountdown();
        }
    }
}

customElements.define("tl-tournament-countdown", TournamentCountdown);
