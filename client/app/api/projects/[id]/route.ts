import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { roles: true },
    });

    if (!project) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('[GET_PROJECT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
