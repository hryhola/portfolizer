import 'server-only'

import { getAuth } from 'firebase-admin/auth'

import { adminApp } from './index'

export const auth = getAuth(adminApp)
