#ifndef VEL_H
#define VEL_H

#include <ros/ros.h>
#include <std_msgs/String.h>
#include <string>
#include <waterplus_map_tools/Waypoint.h>
#include <waterplus_map_tools/GetWaypointByName.h>
#include <waterplus_map_tools/SaveWaypoints.h>
using namespace std;

class ActionControl
{
private:
    ros::Publisher vel_pub;
public:
    ActionControl(ros::NodeHandle &n);
    void forward();
    void backward();
    void turnLeft();
    void turnRight();
    void stop();
};

class Slam
{
private:
    /* some publisher and subscriber */
    ros::ServiceClient cliSave;
public:
    Slam(ros::NodeHandle &n);
    void createMap();
    void saveMap();
    void loadMap();
    void savePoint();
    void deletePoint(string pname);
    bool LoadWaypointsFromFile(std::string inFilename);
};

class Mark
{
private:
public:
    void addNewWaypoint(string pname);
};

class Navigation
{
private:
    ros::ServiceClient cliGetWPName;
    waterplus_map_tools::GetWaypointByName srvName;
public:
    Navigation(ros::NodeHandle &n);
    void goTo(string dest);
};

class ObjGrab
{
private:
    ros::Publisher behaviors_pub;
    ros::Subscriber grab_result_sub;
    ros::Subscriber pass_result_sub;
    std_msgs::String behavior_msg;
    // bool bGrabDone;
    // bool bPassDone;
public:
    ObjGrab(ros::NodeHandle &n);
    void grab(string obj, Navigation &nav);
    void GrabSwitch(bool inActive);
    void PassSwitch(bool inActive);
    // void GrabResultCallback(const std_msgs::String::ConstPtr& res);
    // void PassResultCallback(const std_msgs::String::ConstPtr& res);
    void pass();
};

class Voice
{
private:
    ros::Publisher spk_pub;
    ros::Subscriber sub_sr;
public:
    Voice(ros::NodeHandle &n);
    string getVoice();
    void utter(string sentence);
};

class RobotControl
{
private:
    ActionControl act;
    Slam slam;
    Mark mark;
    Navigation nav;
    ObjGrab obg;
    Voice voice;
public:
    RobotControl(ros::NodeHandle &n);
    string parseSentence(string sentence);
    void runCmd(string);        // run command 
};

class CommandTrans
{
private:
    RobotControl ctrl;
public:
    string parseSentence(string sentence);   // several words -> list of commands
    string parseWord(string word);       // one word -> command
};

#endif VEL_H