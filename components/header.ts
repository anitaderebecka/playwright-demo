import { expect, Locator, type Page } from '@playwright/test'
import { DomRole } from '../pages/pageObjects'
import * as texts from '../locales/common.json'

const loginText = texts.account.login

export class Header {
  readonly navBar: Locator
  readonly navItemActive: Locator

  constructor(private page: Page) {
    this.navBar = this.page.locator('.navbar-v2')
    this.navItemActive = this.page.locator('.active.nav-item')
  }

  async clickSignIn() {
    await this.navBar.getByRole(DomRole.link, { name: loginText }).click()
    await expect.soft(this.navItemActive).toHaveText(loginText.toLowerCase())
  }
}
