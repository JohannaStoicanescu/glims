import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let options = {
  scenarios: {
    spike_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 0 }, // start idle
        { duration: '10s', target: 2000 }, // sudden spike
        { duration: '30s', target: 2000 }, // hold load
        { duration: '10s', target: 0 }, // quick drop
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.1'], // tolerate up to 10% failures
    http_req_duration: ['p(95)<200'], // p95 < 200ms acceptable under spike
  },
  tags: { test: 'spike-5000' },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';
const SECURE_URL = `${BASE_URL}/secure`;
const INSECURE_URL = `${BASE_URL}/insecure`;

const durationInsecure = new Trend('duration_insecure');
const durationSecureNoAuth = new Trend('duration_secure_noauth');

export default function () {
  const resInsecure = http.get(INSECURE_URL, { tags: { route: 'insecure' } });
  check(resInsecure, { 'insecure 200': (r) => r.status === 200 });
  durationInsecure.add(resInsecure.timings.duration);

  const resSecureNoAuth = http.get(SECURE_URL, {
    tags: { route: 'secure_noauth' },
  });
  check(resSecureNoAuth, {
    'secure noauth 401/403': (r) => [401, 403].includes(r.status),
  });
  durationSecureNoAuth.add(resSecureNoAuth.timings.duration);

  sleep(1);
}
