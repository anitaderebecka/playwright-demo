import { Locator, type Page } from '@playwright/test'

export class CookieModal {
  readonly cookiesAcceptBtn: Locator

  constructor(private page: Page) {
    this.cookiesAcceptBtn = this.page.locator('#qc-cmp2-ui #accept-btn')
  }
}
