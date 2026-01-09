import { Locator, type Page } from '@playwright/test'

export class CookieModal {
  readonly cookiesAcceptBtn: Locator

  constructor(private page: Page) {}

  async acceptCookiesIfShown() {
    const geoLocation = await (await this.page.request.get('https://get.geojs.io/v1/ip/geo.json')).json()
    if (geoLocation.continent_code === 'EU') await this.page.locator('#qc-cmp2-ui #accept-btn').click()
  }
}
