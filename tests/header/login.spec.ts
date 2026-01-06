import { faker } from '@faker-js/faker'
import { expect, test } from './../../fixtures/pageFixtures'
import {
  AuthModal,
  type Credentials as UserCredentials
} from '../../components/authModal'
import { State } from '../../pages/pageObjects'
import * as texts from '../../locales/common.json'
import { CurrentUser } from '../../models/currentUser'

const validCredentials: UserCredentials = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD
}

const errorMessage = texts.account.invalidCredentialsError

const assertUserLoggedIn = async (
  authModalComponent: AuthModal,
  currentUser: CurrentUser
): Promise<void> => {
  await authModalComponent.modalBody.waitFor({ state: State.hidden })
  await expect(await currentUser.getEmail()).toBe(validCredentials.email)
}

const assertErrorDisplayed = async (
  authModalComponent: AuthModal,
  expectedError: string
): Promise<void> => {
  await expect(authModalComponent.errorText).toHaveText(expectedError)
}

test.beforeEach(async ({ homePage, header }) => {
  await homePage.goto()
  await header.clickSignIn()
})

test(
  'success login with valid credentials',
  { tag: ['@auth', '@critical'] },
  async ({ authModal, currentUser }) => {
    await authModal.login(validCredentials)
    await assertUserLoggedIn(authModal, currentUser)
  }
)

test(
  'failed login with invalid email address',
  { tag: ['@auth', '@critical'] },
  async ({ authModal }) => {
    const credentials = { ...validCredentials }
    credentials.email = faker.internet.email()
    await authModal.login(credentials)
    await assertErrorDisplayed(authModal, errorMessage)
  }
)

test(
  'failed login with invalid password address',
  { tag: ['@auth', '@critical'] },
  async ({ authModal }) => {
    const credentials = { ...validCredentials }
    credentials.password = faker.internet.password()
    await authModal.login(credentials)
    await expect(authModal.errorText).toHaveText(errorMessage)
  }
)

test(
  'error display on login attempt without providing credentials',
  { tag: ['@auth', '@medium'] },
  async ({ authModal }) => {
    const credentials: UserCredentials = { email: '', password: '' }
    await authModal.login(credentials)
    await expect(authModal.errorText).toHaveText(errorMessage)
  }
)

test('success login after incorrect credentials update', async ({
  authModal,
  currentUser
}) => {
  const credentials = { ...validCredentials }
  credentials.password = faker.internet.password()
  await authModal.login(credentials)
  await expect(authModal.errorText).toHaveText(errorMessage)

  await authModal.login(validCredentials)
  await assertUserLoggedIn(authModal, currentUser)
})
