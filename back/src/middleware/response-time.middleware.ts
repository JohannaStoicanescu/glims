import { Injectable, NestMiddleware } from '@nestjs/common';
import { Histogram } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  constructor(
    @InjectMetric('http_request_duration_seconds')
    private readonly httpRequestDurationHistogram: Histogram<string>,
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(start);
      const durationInSeconds = seconds + nanoseconds / 1e9;

      this.httpRequestDurationHistogram
        .labels({
          method: req.method,
          path: req.route?.path || req.path,
          status_code: res.statusCode.toString(),
        })
        .observe(durationInSeconds);

      // req.log.info(
      //   { duration_s: durationInSeconds, method: req.method, path: req.url, status: res.statusCode },
      //   `Handled request in ${durationInSeconds}ms`
      // );
    });

    next();
  }
}

