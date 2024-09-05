import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                adminToken: { label: "Admin Token (Optional)", type: "text" }, // Optional token field
            },
            async authorize(credentials) {
                if (!(credentials?.email) || !(credentials?.password)) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    return null;
                }

                const check = await bcrypt.compare(credentials.password, user.password);

                if (!check) {
                    return null;
                }

                if (user.role === 'admin') {
                    // Generate a 5-letter token for the admin
                    const token = nanoid(5);

                    // Save the token in the database
                    await prisma.adminToken.create({
                        data: {
                            token,
                            adminId: user.id,
                        },
                    });

                    return {
                        email: user.email,
                        id: user.id,
                        role: 'admin',
                        token, // Include the generated token in the session
                    };
                }

                if (credentials.adminToken) {
                    // Find the admin based on the provided token
                    const adminTokenRecord = await prisma.adminToken.findUnique({
                        where: { token: credentials.adminToken },
                    });

                    if (!adminTokenRecord) {
                        return null; // Invalid token
                    }

                    // Associate the user with the admin
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { adminId: adminTokenRecord.adminId },
                    });

                    return {
                        email: user.email,
                        id: user.id,
                        role: 'user',
                        adminId: adminTokenRecord.adminId, // Include admin ID
                    };
                }

                // If no token is provided, the user remains independent
                return {
                    email: user.email,
                    id: user.id,
                    role: 'user',
                    adminId: null, // No admin association
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.email = user.email;
                token.id = user.id;
                token.role = user.role;
                if (user.adminId) {
                    token.adminId = user.adminId; // Include admin ID if present
                }
                if (user.token) {
                    token.adminToken = user.token; // Include the admin token if present
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user.email = token.email;
            session.user.id = token.id;
            session.user.role = token.role;
            if (token.adminId !== undefined) {
                session.user.adminId = token.adminId; // Include admin ID in the session
            }
            if (token.adminToken) {
                session.user.adminToken = token.adminToken; // Include the admin token in the session
            }
            return session;
        },
    },
    pages: {
        signIn: '/Login',
        error: '/auth/error'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};
