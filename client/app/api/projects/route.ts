/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      category,
      teamSize,
      stage,
      stageColor,
      founder,
      datePosted,
      website,
      status,
      image,
      roles,
    } = body;

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        category,
        teamSize,
        stage,
        stageColor,
        founder,
        datePosted: new Date(datePosted),
        website,
        status,
        image,
        roles: {
          create: roles.map((role: any) => ({
            title: role.title,
            description: role.description,
          })),
        },
      },
      include: {
        roles: true,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error('[CREATE_PROJECT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        roles: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('[GET_PROJECTS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
