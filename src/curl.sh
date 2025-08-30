curl --request POST \
  --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer TEST_API_KEY:25c6750be926c64fc34644ab1dcf1b58:fda8d563de7c867b0a84287cb535a5f6' \
  --data '
{
  "idempotencyKey": "d858e811-1be0-4aa0-a5ae-536837805598",
  "address": "0x1bf9ad0cc2ad298c69a2995aa806ee832788218c",
  "chain": "ETH-SEPOLIA",
}
'