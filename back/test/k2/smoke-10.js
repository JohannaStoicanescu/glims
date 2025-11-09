import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let options = {
  vus: 10,
  duration: '60s',
  thresholds: {
    http_req_failed: ['rate<0.05'], // <5% failures
    http_req_duration: ['p(95)<1000'], // p95 < 1s
  },
  tags: { test: 'smoke-10' },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';
// const LOGIN_URL = `${BASE_URL}/auth/login`;
const SECURE_URL = `${BASE_URL}/secure`;
const INSECURE_URL = `${BASE_URL}/insecure`;

// const authUser = { email: 'user@example.com', password: 'password' };

// Custom trend to track latency per route
const durationInsecure = new Trend('duration_insecure');
// const durationSecureAuth = new Trend('duration_secure_auth');
const durationSecureNoAuth = new Trend('duration_secure_noauth');

// Authenticate once per VU
// export function setup() {
//   const res = http.post(LOGIN_URL, JSON.stringify(authUser), {
//     headers: { 'Content-Type': 'application/json' },
//   });
//
//   check(res, {
//     'login status 200': (r) => r.status === 200,
//   });
//
//   const token = res.json('token');
//   return { token };
// }

export default function (/* data */) {
  // --- INSECURE ROUTE ---
  const resInsecure = http.get(INSECURE_URL, { tags: { route: 'insecure' } });
  check(resInsecure, {
    'insecure 200': (r) => r.status === 200,
  });
  durationInsecure.add(resInsecure.timings.duration);

  // --- SECURE ROUTE (unauthenticated) ---
  const resSecureNoAuth = http.get(SECURE_URL, {
    tags: { route: 'secure_noauth' },
  });
  check(resSecureNoAuth, {
    'secure noauth 401/403': (r) => [401, 403].includes(r.status),
  });
  durationSecureNoAuth.add(resSecureNoAuth.timings.duration);

  // --- SECURE ROUTE (authenticated) ---
  // const resSecureAuth = http.get(SECURE_URL, {
  //   headers: { Authorization: `Bearer ${data.token}` },
  //   tags: { route: 'secure_auth' },
  // });
  // check(resSecureAuth, {
  //   'secure auth 200': (r) => r.status === 200,
  // });
  // durationSecureAuth.add(resSecureAuth.timings.duration);

  // small pause
  sleep(1);
}
