import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    VUS: 200,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<2000'],
    },
};

export default function () {
    const url = 'http://localhost:3000/api/users/cfd4a03a-bf7b-4a3d-91c0-9c2933efc728/balance';
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = http.get(url, params);

    check(response, {
        'Validate status code is 200': (r) => r.status === 200,
    });

    sleep(1);
}