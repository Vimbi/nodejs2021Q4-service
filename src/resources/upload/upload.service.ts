import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';

@Injectable()
export class UploadService {
  async getFile(name: string, res) {
    if (process.env.USE_FASTIFY === 'true') {
      const stream = createReadStream(`./files/${name}`);
      return res.send(stream);
    } else {
      return res.sendFile(name, { root: './files' });
    }
  }
}
