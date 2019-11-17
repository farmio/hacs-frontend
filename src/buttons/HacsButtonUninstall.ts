import { customElement, TemplateResult, html } from "lit-element";
import { HacsRepositoryButton } from "./HacsRepositoryButton"
import { RepositoryWebSocketAction } from "../misc/RepositoryWebSocketAction"

@customElement("hacs-button-uninstall")
export class HacsButtonUninstall extends HacsRepositoryButton {
    protected render(): TemplateResult | void {
        if (!this.repository.installed) return html``

        const label = this.hass.localize('component.hacs.repository.uninstall');
        if (this.status.background_task) {
            return html`
                <mwc-button disabled>
                    ${label}
                </mwc-button>
            `
        }

        return html`
            <mwc-button @click=${this.RepositoryUnInstall}>
                ${(this.repository.state == "uninstalling"
                ? html`<paper-spinner active></paper-spinner>`
                : html`${label}`)}
            </mwc-button>
        `;
    }

    RepositoryUnInstall() {
        if (window.confirm(
            this.hass.localize("component.hacs.confirm.uninstall", "item", this.repository.name)
        )) this.ExecuteAction()
    }

    ExecuteAction() {
        RepositoryWebSocketAction(
            this.hass, this.repository.id, "set_state", "uninstalling");
        RepositoryWebSocketAction(
            this.hass, this.repository.id, "uninstall");
    }
}