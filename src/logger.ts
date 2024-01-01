import { createLogger, format, transports } from 'winston';
import { LOG_LEVEL } from './config.js';

// Define your custom log format
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a Winston logger instance
const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'log/combined.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'log/exceptions.log' })
  ]
});

export default logger;