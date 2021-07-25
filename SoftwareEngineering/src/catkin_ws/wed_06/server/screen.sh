#!/bin/bash
while :
do
gnome-screenshot -w -B -f ./image/map/1.png
file=screen_switch.txt
res=`cat $file`
if [ $res = "stop" ];then
	exit
fi
sleep 1

done
