#!/bin/bash
if command -v curl &> /dev/null; then
    url1="http://$1:$2/api/balance/weightRoundRobin";
    data=(3 2 1)
    json_data=$(printf '{"weights": [%s]}' "$(printf '"%s",' "${data[@]}" | sed 's/,$//')")
    curl -X POST -d "$json_data" -H "Content-Type: application/json" $url1;
    exit 0;
else
	echo "You need to install curl"
	exit 1;
fi