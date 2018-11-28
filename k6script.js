import http from "k6/http";

export const options = {
  duration: '1m',
  vus: 200,
};

export default function() {
  http.get("http://localhost:8082/product/666");
};
