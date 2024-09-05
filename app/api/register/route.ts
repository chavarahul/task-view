import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email, password, role, adminToken } = await req.json();

    if (!email || !password || !role) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let adminId = null;

        if (adminToken) {
            const adminTokenRecord = await prisma.adminToken.findUnique({
                where: { token: adminToken },
            });

            if (!adminTokenRecord) {
                return NextResponse.json({ message: 'Invalid admin token' }, { status: 400 });
            }

            adminId = adminTokenRecord.adminId;
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                adminId,
            },
        });

        if (role === 'admin') {
            const generatedToken = nanoid(5);
            await prisma.adminToken.create({
                data: {
                    token: generatedToken,
                    adminId: newUser.id,
                },
            });

            return NextResponse.json({
                message: 'Admin registered successfully',
                user: { email: newUser.email, role: newUser.role, adminToken: generatedToken },
            }, { status: 201 });
        }

        return NextResponse.json({
            message: 'User registered successfully',
            user: { email: newUser.email, role: newUser.role, adminId },
        }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
