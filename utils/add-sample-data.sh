#!/bin/bash

BACKEND_URL="http://localhost:3100"
USERNAME="admin"
PASSWORD="robinson123"
COOKIE_JAR="cookies.txt"

DATA=$(cat <<EOF
{
  "username": "$USERNAME",
  "password": "$PASSWORD"
}
EOF
)

curl -c "$COOKIE_JAR" -X POST "$BACKEND_URL/api/login" \
     -H "Content-Type: application/json" \
     -d "$DATA"

for ISBN in $(jq -r '.isbns[]' sample.json); do
    HTTP_STATUS=$(curl -b "$COOKIE_JAR" -o /dev/null -w "%{http_code}" -X POST "$BACKEND_URL/api/metadata/$ISBN")
    if [ "$HTTP_STATUS" -eq 200 ]; then
        echo "✅ $ISBN: added"
    else
        echo "❌ $ISBN: could not be added. Status code: $HTTP_STATUS"
    fi
done