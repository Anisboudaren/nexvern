// app/api/projects/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { roles: true },
    });

    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[GET_PROJECT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...data,
        datePosted: data.datePosted ? new Date(data.datePosted) : undefined,
      },
      include: { roles: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[UPDATE_PROJECT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.role.deleteMany({ where: { projectId: params.id } });

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE_PROJECT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
