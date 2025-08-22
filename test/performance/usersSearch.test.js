import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    VUS: 250,
    duration: '30s',
    thresholds: {
      http_req_duration: ['p(95)<2000'],
    },
};

export default function () {
    const url = 'http://localhost:3000/api/users';
  
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