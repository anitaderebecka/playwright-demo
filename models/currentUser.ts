import { type Page } from '@playwright/test'

interface UserData {
  avatar: string | null
  confirmed: boolean
  deliver_emails: boolean
  email: string
  favourites: { cinema: number[]; news: number[] }
  id: number | string
  notes_count: number | null
  pending_consent: boolean
  quiz_scores: { [key: string]: number }
  real_name: string | null
  roles: string[]
  subscriptions: {}
  unread_messages_count: number | null
  unread_notifications_count: number | null
  url: string
}

export class CurrentUser {
  private userData: UserData | null = null

  constructor(private page: Page) {}

  async getData(): Promise<UserData | null> {
    if (!this.userData) {
      const rawUser = await this.page.waitForFunction(() => {
        return (window as any).currentUser ?? null
      })

      this.userData = await rawUser.jsonValue()
    }
    return this.userData
  }

  async getEmail(): Promise<string | undefined> {
    const data = await this.getData()
    return data?.email
  }
}
