import { Page, Locator } from '@playwright/test'
import { CommunicationLocator, DomRole, State } from '../pages/pageObjects'
import * as apiEndpoints from '../test-data/apiEndpoints.json'
import * as texts from '../locales/common.json'

export interface Credentials {
  email: string
  password: string
}

export class AuthModal {
  readonly modalBody: Locator
  readonly loginBtn: Locator
  readonly errorText: Locator

  constructor(private page: Page) {
    this.modalBody = this.page.getByRole(DomRole.dialog)
    this.loginBtn = this.modalBody.getByRole(DomRole.button, {
      name: texts.account.login
    })
    this.errorText = this.modalBody.locator(CommunicationLocator.error)
  }

  private async provideCredentials(credentials: Credentials): Promise<void> {
    await this.modalBody.waitFor({ state: State.visible })
    await this.modalBody
      .getByRole(DomRole.textbox, { name: texts.account.emailPlaceholder })
      .fill(credentials.email)
    await this.modalBody
      .getByRole(DomRole.textbox, { name: texts.account.passwordPlaceholder })
      .fill(credentials.password)
  }

  private async clickLoginButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((resp) =>
        resp.url().includes(apiEndpoints.userSession)
      ),
      this.loginBtn.click()
    ])
  }

  async login(credentials: Credentials): Promise<void> {
    await this.provideCredentials(credentials)
    await this.clickLoginButton()
  }
}
