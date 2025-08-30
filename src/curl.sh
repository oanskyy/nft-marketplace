curl --request POST \
  --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
  --header 'Content-Type: application/json' \
  --header 'Authorization:Bearer TEST_API_KEY:25c6750be926c64fc34644ab1dcf1b58:fda8d563de7c867b0a84287cb535a5f6' \
  --data '
{
  "idempotencyKey": "f06ba1fb-0fdd-4909-8171-21b9958eaa05",
  "address": "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
  "chain": "ETH-SEPOLIA"
}
'