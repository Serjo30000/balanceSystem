#!/bin/bash
if command -v curl &> /dev/null; then
    url1="http://$1:$2/api/balance/leastConnection";
    curl -X POST $url1;
    exit 0;
else
	echo "You need to install curl"
	exit 1;
fi