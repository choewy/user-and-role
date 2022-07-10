import express from 'express';

declare global {
  interface Request extends express.Request {
    user?: Payload;
  }
}

export {};
