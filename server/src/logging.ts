import winston from 'winston';

export const log = winston.createLogger({
    format: winston.format.logstash(),
    level: 'info',
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
    rejectionHandlers: [new winston.transports.Console()],
} as any);
