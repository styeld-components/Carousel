import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 1},
    { duration: '1s', target: 10},
    { duration: '1s', target: 100},
    { duration: '1s', target: 1000},
    { duration: '10s', target: 2000},
  ]
};

export default function() {
  // for (let i = 0; i < 50; i++) {
    http.get(`http://localhost:3003/`);

    // const userid = Math.ceil(Math.random() * 5000000);
    // http.get(`http://localhost:3003/api/users/${userid}`);
  // }
  sleep(1);
}

// capping at 480 with 1s, 2000 vus no stages
// increased to 788 with 5s, 2000 vus in stages
// then 1030 with 10s, 2000 vus in stages