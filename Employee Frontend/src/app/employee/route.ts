import { NextRequest, NextResponse } from "next/server";
import { employees } from "./data";

export async function GET() {
  return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newEmployee = { ...body, id: Date.now() };
  employees.push(newEmployee);
  return NextResponse.json(newEmployee, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const index = employees.findIndex((e) => e.id === body.id);
  if (index !== -1) {
    employees[index] = body;
    return NextResponse.json(employees[index]);
  }
  return NextResponse.json({ error: "Employee not found" }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const index = employees.findIndex((e) => e.id === id);
  if (index !== -1) {
    const deleted = employees.splice(index, 1);
    return NextResponse.json(deleted[0]);
  }
  return NextResponse.json({ error: "Employee not found" }, { status: 404 });
}