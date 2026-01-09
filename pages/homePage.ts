import { type Page } from '@playwright/test'
import { CookieModal } from '../components/cookieModal'

export class HomePage {
  constructor(private page: Page) {}

  async goto(isFirst = true) {
    await this.page.goto(process.env.BASE_URL)
    if (isFirst) {
      const cookieModal = new CookieModal(this.page)
      await cookieModal.acceptCookiesIfShown()
    }
    await this.page.waitForLoadState('domcontentloaded')
  }
}
