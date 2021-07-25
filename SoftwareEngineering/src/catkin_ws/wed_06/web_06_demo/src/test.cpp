#include "ros/ros.h"
#include "std_msgs/String.h"
#include <stdio.h>
#include <termios.h>

int GetCh()
{
  static struct termios oldt, newt;
  tcgetattr( STDIN_FILENO, &oldt);
  newt = oldt;
  newt.c_lflag &= ~(ICANON);
  tcsetattr( STDIN_FILENO, TCSANOW, &newt);
  int c = getchar();
  tcsetattr( STDIN_FILENO, TCSANOW, &oldt);
  return c;
}

int main(int argc, char **argv)
{
    ros::init(argc,argv,"test1_a");
    ros::NodeHandle n;
    ros::Publisher chatter_pub = n.advertise<std_msgs::String>("cmd",1000);

    printf("键盘控制WPR机器人： \n");
    printf("w - 向前 \n");
    printf("s - 向后 \n");
    printf("a - 向左转 \n");
    printf("d - 向右转 \n");
    printf("p - 添加航点 \n");
    printf("空格 - 刹车 \n");
    printf("------------- \n");

    ros::Rate loop_rate(1);
    std_msgs::String msg;
    while(ros::ok()) {
        int c = GetCh();
        msg.data = (c == 'w') ? "forward" :
                    (c == 's') ? "backward" :
                    (c == 'a') ? "left" :
                    (c == 'd') ? "right" :
                    (c == ' ') ? "stop" :
                    (c == 'p') ? "addPoint" :
                    "";
        ROS_INFO(msg.data.c_str());

        chatter_pub.publish(msg);
        
        ros::spinOnce();
        loop_rate.sleep();
    }
    return 0;
}