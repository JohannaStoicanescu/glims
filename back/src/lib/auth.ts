import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    // you can set requireEmailVerification, password rules, callbacks etc.
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // optional: accessType: 'offline', prompt: "select_account consent"
    },
    // facebook: { clientId, clientSecret } // add if needed
  },
  trustedOrigins: [`http://${process.env.FRONTEND_HOST}`],
});
