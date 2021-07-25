
#include "ros/ros.h"
#include "std_msgs/String.h"
#include <stdio.h>
#include <string>
#include <sstream>
#include <termios.h>
using namespace std;

int main(int argc, char **argv)
{
    ros::init(argc,argv,"pub_web_06");
    ros::NodeHandle n;
    ros::Publisher chatter_pub = n.advertise<std_msgs::String>("cmd",1000);

    std_msgs::String msg;
    stringstream ss;
    char buff[100];
    FILE *fp = NULL;
    int i;
    for (i = 1; i < argc; i++)
    {
        if (i > 1)  ss << ' ';
        ss << argv[i];
    }
    ss >> msg.data;

    usleep(250000);             // delay
    if (ros::ok())
    while (1)
    {
        fp = fopen("./input.txt", "r");
        fscanf(fp, "%s", buff);
        fclose(fp);
        if (buff[0] != 'c') {
            msg = buff;
            ROS_INFO(msg.data.c_str());
            chatter_pub.publish(msg);
            ros::spinOnce();
            break;
        }
        
    }

    return 0;
}