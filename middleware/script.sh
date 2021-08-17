#!/bin/bash
while:
do:
declare -r SERVER_HOST_IP=('192.168.0.111' '172.217.15.206')
for i in "${SERVER_HOST_IP[@]}"
    do
        curl http://${i}:3002 -w ", %{http_code}"
        if [ $? -eq 0 ]
        then
        STATE="$(curl http://${i}:3000 -w#%{http_code})"
        sFileDate="$(date +"%d/%m/%y#%H:%M:%S#${i}#online")#$STATE"
        echo $sFileDate>>info.log
        else 
        date +"%d/%m/%y#%H:%M:%S#${i}#offline">>info.log
        fi
done
sleep 2 
done

#!/bin/bash

