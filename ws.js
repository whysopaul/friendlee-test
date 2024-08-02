import { WebSocketServer } from 'ws';
import { CronJob } from 'cron';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws, request) {
    ws.on('error', console.error);

    const cookies = new URLSearchParams(request.headers.cookie)
    const key = cookies.get('key')

    const job = new CronJob(
        '*/5 * * * * *',
        function () {
            ws.send(key);
        }
    );

    job.start()

    ws.on('close', () => {
        console.log('connection closed')
        job.stop()
    })
});