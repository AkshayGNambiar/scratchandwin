// lib/firebaseAdmin.ts
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'aditicampaign',
      privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1zC9xTbrZfApv
oVUaP6yD6yTxwKf9Oy93tZgJiDZ0wzgahCdNzMI0uF/vWK4dcTMAlKRHBv7Qow/t
GoqnZ2k67SZFtakQ8PZ/Wt0PguWemmUpo9q11Qhxb9YgU19RwfU+6OjhzfTyZrU0
vzOc6hhqmjcSvBlKLblV1hFD6cOu6s0EDzJX4TQvJmWA3Ad+OEk2o14Xy5crZF0d
2s0KdWcsrS6dK4vmwdDGiMRrelh1X+91nZ5PvduYO7/5USeYsnzi7Md0XQClTCvN
XFYxRw7nvR2FlIJ7aZYkTf71rrHuSpGu9YAxXMlSOrhM7mgoUngAYt0V9P9A/NXH
9z1MMSYJAgMBAAECggEAEJPF37cOyrYc3YEAmZwkxwKyI7lFmDnFYk0UyAm7rXn/
q6tRSi7ZpqUJWnHjrpub4vmq4S8qHSxBT4WUDx/G4LCvRLwD5p+SWpqWfcuZ1JSP
lPR0BRCf7HgeNmRj1Liy/EGQusZlB5WGAIFO24gdIdteGj88rx7sP399o4u1ZEWt
ZnjcMu2i/xRD/oKta/OQmRFwRIJH6RKKavjgzkWIaHU08ZHlLVTFOyHsQUyP0iwI
U9a8S0YqBgouR66VePv4FllRxPYCxrMKgJcSuRTIg2cSIVf+mNO8OfUFPs6FIsEi
xwVQsLV7Bs4rr2qjwf9myIrKK1S+TyyShPsKm42bYQKBgQDo85GLRbcz7TwslO4A
NZy8pkaSkiOPHhqbvlCizuWRHugr6Hyw0S97V2vJntYBg1dw3aqCjkvqe+TWdXPh
klDoMOaDsGUuCfYD29+bDo3Kjn8gDhCmA+mYVj7WqvwiEXqifPMRljtVBzx70PrN
HKaIdTuSVTXr1Wk25GfRofCt+wKBgQDHyPCv0ag0fTv/OndIzIGmwPBxepSmlI0e
WkIJBttJoZPFwcFqXiQ3R70Me2LVzNsmhitOY8gTizIOykDHlemWpv9n0ra4XAeg
E7CuGzSSeijZH1leUQRmxXAtRLXR8yl8Yfvu3KpgO4Unrr5Zu6+sCIQMdhVd9j+V
6X2eGk6QywKBgQCmZ289XKSc3EeS1SQaVDHNdL2O8AOktW1ueYmic0b73mcdDmsb
56ISaoVdti/LTuZEgqPNtRY3vx7dr3MC3IEdC+lugrAULhtl8EePvNq+qgHXhRSR
ctQH9PvYXrXTJEdFERqVIorpl0y2abbulBvF+HCAfIwTFhSdmJUs45BIxwKBgQCZ
c6v7P8w01ORae+vXTM1g6d1FLGQ1NvDVmXoTOOMCQUshoFsRelHS7BU3GyalFX5W
rsNgqJ+q80V1ur/bDTin8IlIk76pCHcK61TPxjGxOIdbjgq0uQHqdkhdXONS6bS5
xwEdTPzIga8a9ctbXR/nwXq7n4915oicewVzhL1H1QKBgQDECoVA5v9Ue7zonosB
mob3rGPKc0Iiyn4OXMJPjoZGQ2tHX2ORsDrNuv2wXZKegpEb+C+OcdbzRglBiwd4
/WCWW27z0NacQCTEdjYGJHLEMy3bjJkqXVDGODxEvUttaCiApXW4Ji8f6T3IsBDC
Nqgl0zgHWICTwsiHeBNP9pLPTQ==
-----END PRIVATE KEY-----`,
      clientEmail: 'firebase-adminsdk-fbsvc@aditicampaign.iam.gserviceaccount.com',
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();
export { admin, db, auth };
