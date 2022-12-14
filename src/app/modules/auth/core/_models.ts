import { Session } from "../../apps/session-management/sessions-list/core/_models"

export interface TokenModel {
  type: string
  token: string
}

export interface AuthModel {
  user: UserModel
  token: TokenModel
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface ClubModel {
  id: number
  name: string
  code: string
}

export interface Permission {
  id: number
  slug: string
  name: string
  group: string
}

export interface Role {
  id: number
  name: string
  permissions: Permission[],
  club_id: number | null,
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  first_name: string
  last_name: string
  email_verified_at: string | null
  account_verified_at: string | null
  club_id: number | null
  role_id: number
  club?: ClubModel
  role?: Role
  sessions?: Session[]
}
