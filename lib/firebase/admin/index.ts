import 'server-only'

import { initializeApp, getApps, cert } from 'firebase-admin/app'
import 'firebase/firestore'

// Decode the base64 string
const firebaseAdminSdkBase64 = process.env.FIREBASE_ADMIN_CERT_BASE64!
const serviceAccount = JSON.parse(Buffer.from(firebaseAdminSdkBase64, 'base64').toString('utf-8'))

export const adminApp =
    getApps().find((it) => it.name === 'firebase-admin-app') ||
    initializeApp(
        {
            credential: cert(serviceAccount),
        },
        'firebase-admin-app'
    )

