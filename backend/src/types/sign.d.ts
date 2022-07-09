import express from 'express';

declare global {
  interface Payload {
    userId: string;
    role: number;
  }
  interface Request extends express.Request {
    user?: Payload;
  }
}

export {};
