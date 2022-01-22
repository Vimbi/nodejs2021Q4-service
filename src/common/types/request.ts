import { IncomingMessage } from 'http';

export interface IRequest extends IncomingMessage {
  body: {
    [key: string]: string;
  };
  query: string;
}
