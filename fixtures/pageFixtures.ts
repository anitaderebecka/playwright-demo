import { test as baseTest } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { Header } from '../components/header'
import { AuthModal } from '../components/authModal'
import { CurrentUser } from '../models/currentUser'

type AppFixtures = {
  homePage: HomePage
  header: Header
  authModal: AuthModal
  currentUser: CurrentUser
}

const pages = baseTest.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  header: async ({ page }, use) => {
    await use(new Header(page))
  },
  authModal: async ({ page }, use) => {
    await use(new AuthModal(page))
  },
  currentUser: async ({ page }, use) => {
    await use(new CurrentUser(page))
  }
})

export const test = pages
export const expect = pages.expect
