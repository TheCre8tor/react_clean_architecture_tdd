#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test
npm run prettier-format
npm run lint