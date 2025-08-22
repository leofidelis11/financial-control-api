import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    VUS: 100,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<2000'],
    },
};

export default function () {
    const url = 'http://localhost:3000/api/transactions';

    const payload = JSON.stringify({
        userId: '0a7f50b2-8085-4af4-8137-8e17be7acfed',
        type: 'expense',
        value: 50,
        category: 'Food'
      });
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = http.post(url, payload, params);

    check(response, {
        'Validate status code is 201': (r) => r.status === 201,
    });

    sleep(1);
}