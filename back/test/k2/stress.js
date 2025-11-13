import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '20s', target: 100 }, // ramp up
        { duration: '20s', target: 300 },
        { duration: '20s', target: 500 },
        { duration: '20s', target: 800 },
        { duration: '20s', target: 1000 }, // peak load
        { duration: '20s', target: 1000 }, // sustain
        { duration: '20s', target: 0 }, // cool down
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'], // system should maintain <5% errors ideally
    http_req_duration: ['p(95)<1500'], // p95 < 1.5s under heavy load
  },
  tags: { test: 'stress-10k' },
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
