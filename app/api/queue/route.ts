import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Here we would enqueue a job using BullMQ Queue('ai-generate')
        // const queue = new Queue('ai-generate', { connection });
        // await queue.add('generate', body);
        return NextResponse.json({ success: true, message: "Job queued" });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
