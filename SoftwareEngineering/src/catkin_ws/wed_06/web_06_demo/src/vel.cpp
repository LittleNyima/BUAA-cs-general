#include <stdlib.h>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <cstdio>

#include "my_demo/vel.h"
#include <ros/ros.h>
#include <geometry_msgs/Twist.h>
#include <std_msgs/String.h>
#include <tf/transform_listener.h>
#include <move_base_msgs/MoveBaseAction.h>
#include <actionlib/client/simple_action_client.h>
#include <waterplus_map_tools/Waypoint.h>
#include <waterplus_map_tools/GetWaypointByName.h>
#include <sound_play/SoundRequest.h>
#include <tinyxml.h>
using namespace std;

#define STATE_READY     0
#define STATE_MAP       1
#define STATE_NAV       2
#define STATE_GRAB      3

const float tv = 0.2;
const float tr = 0.5;
const int move_time = 500; // ms
int rDest = 0;
int state = STATE_READY;
RobotControl *pctrl;
ros::Publisher add_waypoint_pub;
ros::Publisher load_waypoint_pub;
ros::Publisher delete_waypoint_pub;

bool bGrabDone;
bool bPassDone;

ActionControl::ActionControl(ros::NodeHandle &n)
{
    this->vel_pub = n.advertise<geometry_msgs::Twist>("/cmd_vel", 10);
}

void VelCmd(float inVx , float inVy, float inTz, ros::Publisher &vel_pub)
{
    geometry_msgs::Twist vel_cmd;
    vel_cmd.linear.x = inVx;
    vel_cmd.linear.y = inVy;
    vel_cmd.linear.z = 0;
    vel_cmd.angular.x = 0;
    vel_cmd.angular.y = 0;
    vel_cmd.angular.z = inTz;
    vel_pub.publish(vel_cmd);
    ROS_INFO("x: %f, y: %f, z: %f", inVx, inVy, inTz);
}

void ActionControl::forward()
{
    VelCmd(tv, 0, 0, this->vel_pub);
    ROS_INFO("velcmd ok");
}

void ActionControl::backward()
{
    VelCmd(-tv, 0, 0, this->vel_pub);
}

void ActionControl::turnLeft()
{
    VelCmd(0, 0, tr, this->vel_pub);
}

void ActionControl::turnRight()
{
    VelCmd(0, 0, -tr, this->vel_pub);
}

void ActionControl::stop()
{
    VelCmd(0, 0, 0, this->vel_pub);
}


string CommandTrans::parseWord(string word)
{
    // to-do
    return "";
}

RobotControl::RobotControl(ros::NodeHandle &n) : 
    act(ActionControl(n)),
    nav(Navigation(n)),
    obg(ObjGrab(n)),
    voice(Voice(n)),
    slam(Slam(n))
    { }

// 将机器人当前位置保存为新航点
void Mark::addNewWaypoint(string inStr)
{
    tf::TransformListener listener;
    tf::StampedTransform transform;
    try
    {
        listener.waitForTransform("/map","/base_footprint",  ros::Time(0), ros::Duration(10.0) );
        listener.lookupTransform("/map","/base_footprint", ros::Time(0), transform);
    }
    catch (tf::TransformException &ex) 
    {
        ROS_ERROR("[lookupTransform] %s",ex.what());
        return;
    }

    float tx = transform.getOrigin().x();
    float ty = transform.getOrigin().y();
    tf::Stamped<tf::Pose> p = tf::Stamped<tf::Pose>(tf::Pose(transform.getRotation() , tf::Point(tx, ty, 0.0)), ros::Time::now(), "map");
    geometry_msgs::PoseStamped new_pos;
    tf::poseStampedTFToMsg(p, new_pos);

    waterplus_map_tools::Waypoint new_waypoint;
    new_waypoint.name = inStr;
    new_waypoint.pose = new_pos.pose;
    add_waypoint_pub.publish(new_waypoint);

    ROS_WARN("[New Waypoint] %s ( %.2f , %.2f )" , new_waypoint.name.c_str(), tx, ty);
}

void split(const std::string& s, std::vector<std::string>& v, const std::string& c)
{
  std::string::size_type pos1, pos2;
  pos2 = s.find(c);
  pos1 = 0;
  while(std::string::npos != pos2)
  {
    v.push_back(s.substr(pos1, pos2-pos1));
 
    pos1 = pos2 + c.size();
    pos2 = s.find(c, pos1);
  }
  if(pos1 != s.length())
    v.push_back(s.substr(pos1));
}

void RobotControl::runCmd(string cmd)
{
    // istringstream _cmd(cmd);
    vector<string> words;
    // string word, fcmd;
    // while (_cmd >> word)
    // {
    //     words.push_back(word);
    // }
    split(cmd, words, "_");
    string fcmd;
    fcmd = words[0];
    ROS_INFO("cmdd%s:",cmd.c_str());
    // cout << "fcmd: " << fcmd << endl;

    if (fcmd == "forward")  
    {
        // ROS_INFO("FORWARD ORDER");
        this->act.forward();
        this->voice.utter("go forward");
    }
    else if (fcmd == "backward")  
    {
        this->act.backward();
        this->voice.utter("go backard");
    }
    else if (fcmd == "left") 
    {
        this->act.turnLeft();
        this->voice.utter("turn left");
    }
    else if (fcmd == "right") 
    {
        this->act.turnRight();
        this->voice.utter("turn right");
    }
    else if (fcmd == "stop") 
    {
        this->act.stop();
        this->voice.utter("stop");
    }
    else if (fcmd == "createMap")
    {
        this->slam.createMap();
    }
    else if (fcmd == "updateMap")
    {
        this->slam.saveMap();
        // send map
    }
    else if (fcmd == "loadMap")
    {
        this->slam.loadMap();
    }
    else if (fcmd == "addPoint") 
    {
        ROS_INFO("add point %s", words[1]);
        this->mark.addNewWaypoint(words[1]);
        this->voice.utter("add way point");
        this->voice.utter(words[1]);
    }
    else if (fcmd == "savePoint") 
    {
        this->slam.savePoint();
        this->voice.utter("save points");
    }
    else if (fcmd == "goto")     // start navigation
    {
        // this->slam.loadMap();
        this->nav.goTo(words[1]);   // must longer than 1
        this->voice.utter("now go to");
        this->voice.utter(words[1]);
    }
    else if (fcmd == "grab")
    {
        this->obg.grab(words[1], this->nav);
        this->voice.utter("now fetch");
        this->voice.utter(words[1]);
    }
    else if(fcmd=="pass")
    {
        this->obg.pass();
        this->voice.utter("here you are");
    }
    else if (fcmd == "utter")
    {
        this->voice.utter(words[1]);
    }
    else if (fcmd == "delPoint")
    {
        this->slam.deletePoint(words[1]);
        this->voice.utter("clear points");
    }
}

Slam::Slam(ros::NodeHandle &n)
{
    this->cliSave = n.serviceClient<waterplus_map_tools::SaveWaypoints>("/waterplus/save_waypoints");
}


void Slam::createMap()
{
    // to-do
}

void Slam::saveMap()
{
    // to-do
    system("rosrun map_server map_saver -f ./src/wpb_home/wpb_home_tutorials/maps/map2");
    ROS_INFO("save map");
}

void Slam::savePoint(){

    waterplus_map_tools::SaveWaypoints srvS;

    std::string strSaveFile;
    char const* home = getenv("HOME");
    strSaveFile = home;
    strSaveFile += "/waypoints.xml";
    srvS.request.filename = strSaveFile;


    if (this->cliSave.call(srvS))
    {
        ROS_INFO("Save waypoints to the file : %s", srvS.request.filename.c_str());
    }
    else
    {
        ROS_ERROR("Failed to call service save_waypoints");
    }

}

void Slam::deletePoint(string point)
{
    ROS_WARN("delete waypoints");
    // std::string delcmd = "rm ";
    // char const* home = getenv("HOME");
    // delcmd += home;
    // delcmd += "/waypoints.xml";
    // system(delcmd.c_str());
    std_msgs::String msg;
    msg.data = point;
    delete_waypoint_pub.publish(msg);
}


void Slam::loadMap()
{
    std::string strLoadFile;
    char const* home = getenv("HOME");
    strLoadFile = home;
    strLoadFile += "/waypoints.xml";
    ROS_WARN("load file: %s", strLoadFile.c_str());

    ros::NodeHandle n_param("~");
    std::string strParamFile;
    n_param.param<std::string>("load", strParamFile, "");
    if(strParamFile.length() > 0)
    {
        strLoadFile = strParamFile;
    }

    if(strLoadFile.length() > 0)
    {
        ROS_INFO("Load waypoints from file : %s",strLoadFile.c_str());
        std_msgs::String msg;
        msg.data = strLoadFile;
        load_waypoint_pub.publish(msg);
    }
    else
    {
        ROS_WARN("strLoadFile is empty. Failed to load waypoints!");
    }
}


Navigation::Navigation(ros::NodeHandle &n)
{
    this->cliGetWPName = n.serviceClient<waterplus_map_tools::GetWaypointByName>("/waterplus/get_waypoint_name");
}

void Navigation::goTo(string dest)
{
    rDest = 0;
    this->srvName.request.name = dest;
    if (this->cliGetWPName.call(this->srvName))
    {
        std::string name = this->srvName.response.name;
        float x = this->srvName.response.pose.position.x;
        float y = this->srvName.response.pose.position.y;
        ROS_INFO("[STATE_GOTO] Get_wp_name = %s (%.2f,%.2f)", dest.c_str(),x,y);

        actionlib::SimpleActionClient<move_base_msgs::MoveBaseAction> ac("move_base", true);//???
        if(!ac.waitForServer(ros::Duration(5.0)))
        {
            ROS_INFO("The move_base action server is no running. action abort...");
        }
        else
        {
            move_base_msgs::MoveBaseGoal goal;
            goal.target_pose.header.frame_id = "map";
            goal.target_pose.header.stamp = ros::Time::now();
            goal.target_pose.pose = this->srvName.response.pose;
            ac.sendGoal(goal);
            ac.waitForResult();
            if(ac.getState() == actionlib::SimpleClientGoalState::SUCCEEDED)
            {
                ROS_INFO("Arrived at %s!",dest.c_str());
                rDest = 1;
            }
            else
            {
                ROS_INFO("Failed");
            }
        }
    }
    else
    {
        ROS_INFO("Failed");
    }
}

void GrabResultCallback(const std_msgs::String::ConstPtr& res)
{
    int nFindIndex = 0;
    nFindIndex = res->data.find("done");
    ROS_WARN("grab result: %s", res->data.c_str());
    if( nFindIndex >= 0 )
    {
        bGrabDone = true;
    }
}

void PassResultCallback(const std_msgs::String::ConstPtr& res)
{
    int nFindIndex = 0;
    nFindIndex = res->data.find("done");
    ROS_WARN("Pass result: %s", res->data.c_str());
    if( nFindIndex >= 0 )
    {
        bPassDone = true;
    }
}

ObjGrab::ObjGrab(ros::NodeHandle &n)
{
    this->behaviors_pub = n.advertise<std_msgs::String>("/wpb_home/behaviors", 30);
    this->grab_result_sub = n.subscribe<std_msgs::String>("/wpb_home/grab_result",30,&GrabResultCallback);
    this->pass_result_sub = n.subscribe<std_msgs::String>("/wpb_home/pass_result",30,&PassResultCallback);
}

void ObjGrab::GrabSwitch(bool inActive)
{
    if (inActive == true)
    {
        this->behavior_msg.data = "grab start";
        this->behaviors_pub.publish(behavior_msg);
    }
    else
    {
        this->behavior_msg.data = "grab stop";
        this->behaviors_pub.publish(behavior_msg);
    }
}

void ObjGrab::PassSwitch(bool inActive)
{
    if(inActive == true)
    {
        this->behavior_msg.data = "pass start";
        this->behaviors_pub.publish(behavior_msg);
    }
    else
    {
        this->behavior_msg.data = "pass stop";
        this->behaviors_pub.publish(behavior_msg);
    }
}

void ObjGrab::grab(string obj, Navigation &nav)
{
    // navigate to the specified point
    nav.goTo(obj);
    if(rDest==1){
        bGrabDone = false;
        GrabSwitch(true);
        // while(!bGrabDone);
        // GrabSwitch(false);
        // nav.goTo("master");
    }
}

void ObjGrab::pass(){
    bPassDone = false;
    PassSwitch(true);
    // while(!bPassDone);
    // PassSwitch(false);
    // ROS_INFO("Grab done");
}

bool findWord(string sentence, string word)
{
    // ROS_INFO("sentence: %s, word: %s, : %d", sentence.c_str(), word.c_str(), sentence.find(word));
    int _id = sentence.find(word);
    return _id >= 0 && _id <= sentence.size();
}

string RobotControl::parseSentence(string sentence)
{
    // printf("sentence: %s", sentence.c_str());
    // if (state == STATE_READY && (findWord(sentence, "开始") || findWord(sentence, "start")))
    // {
    //     ROS_INFO("start wed6");
    //     if (findWord(sentence, "见图") || findWord(sentence, "map")) state = STATE_MAP;
    //     else if (findWord(sentence, "导航") || findWord(sentence, "navigation")) state = STATE_NAV;
    //     else if (findWord(sentence, "抓取") || findWord(sentence, "grab")) state = STATE_GRAB;
        
    // }
    // else if (findWord(sentence, "退出") || findWord(sentence, "quit"))
    // {
    //     state = STATE_READY;
    // }
    // else if (state == STATE_MAP)
    {
        // ROS_INFO("state_map");
        if (findWord(sentence, "移动") || findWord(sentence, "move"))
        {
            ROS_INFO("move");
            if (findWord(sentence, "前") || findWord(sentence, "forward")) this->act.forward();
            else if (findWord(sentence, "后") || findWord(sentence, "backward")) this->act.backward();
            usleep(move_time * 1000);
            this->act.stop();
        }
        else if (findWord(sentence, "转") || findWord(sentence, "turn"))
        {
            ROS_INFO("turn left");
            if (findWord(sentence, "左") || findWord(sentence, "left")) this->act.turnLeft();
            else if (findWord(sentence, "右") || findWord(sentence, "backward")) this->act.turnRight();
            usleep(move_time * 1000);
            this->act.stop();
        }
        else if (findWord(sentence, "标定") || findWord(sentence, "mark"))
        {
                printf("biao: %d\n",sentence.find("标"));
                printf("ding: %d\n",sentence.find("定"));
                printf("hang: %d\n",sentence.find("航"));
                printf("dian: %d\n",sentence.find("点"));
            string pname;
            if (findWord(sentence, "航点"))
            {
                int bg = sentence.find("航点") + 6;
                // int ed = sentence.find("为此处");
                pname = sentence.substr(bg, sentence.size() - bg);
                ROS_INFO("pname: %s",pname.c_str());
            }
            else if (findWord(sentence, "point"))
            {
                int bg = sentence.find("point") + 6;
                int ed = sentence.find(" here");
                pname = sentence.substr(bg, ed - bg);
            }
            this->mark.addNewWaypoint(pname);
        }
        else if (findWord(sentence, "保存") || findWord(sentence, "save"))
        {
            this->slam.saveMap();
        }
    }
    // else if (state == STATE_NAV)
    {
        if (findWord(sentence, "前往"))
        {
            int bg = sentence.find("前往") + 6;
            string pname = sentence.substr(bg, sentence.size() - bg);
            this->nav.goTo(pname);
        }
        else if (findWord(sentence, "to"))
        {
            int bg = sentence.find("to") + 3;
            string pname = sentence.substr(bg, sentence.size() - bg);
            this->nav.goTo(pname);
        }
    }
    // else if (state == STATE_GRAB)
    {
        if (findWord(sentence, "拿"))
        {
            int bg = sentence.find("拿") + 3;
            string pname = sentence.substr(bg, sentence.size() - bg);
            this->nav.grab(pname);
        }
        else if (findWord(sentence, "grab"))
        {
            int bg = sentence.find("grab") + 5;
            string pname = sentence.substr(bg, sentence.size() - bg);
            this->nav.grab(pname);
        }
    }
    // ROS_INFO("state: %d\n", state);
    
    return "";
}

// 语音识别结果处理函数
void KeywordCB(const std_msgs::String::ConstPtr & msg)
{
    ROS_WARN("------ Keyword = %s ------",msg->data.c_str());
    pctrl->parseSentence(msg->data);
}

Voice::Voice(ros::NodeHandle &n)
{
    // speak
    this->spk_pub = n.advertise<sound_play::SoundRequest>("/robotsound", 20);
    // listen
    this->sub_sr = n.subscribe("/xfyun/iat", 10, KeywordCB);
}

string Voice::getVoice()
{
    // to-do
    return "";
}

void Voice::utter(string sentence)
{
    ROS_INFO("speak %s", sentence.c_str());
    sound_play::SoundRequest sp;
    sp.sound = sound_play::SoundRequest::SAY;
    sp.command = sound_play::SoundRequest::PLAY_ONCE;
    sp.arg = sentence;
    sp.volume = 1.0f;
    this->spk_pub.publish(sp);
    ros::spinOnce();
}

void chatterCallback(const std_msgs::String::ConstPtr &msg)
{
    ROS_INFO("cmd: [%s]", msg->data.c_str());
    pctrl->runCmd(msg->data);
}

int main(int argc, char** argv)
{
    ros::init(argc, argv, "vel_ctrl");
    ros::NodeHandle n;
    RobotControl ctrl(n);
    pctrl = &ctrl;
    ros::Subscriber subChat = n.subscribe("cmd", 100, chatterCallback);
    add_waypoint_pub = n.advertise<waterplus_map_tools::Waypoint>( "/waterplus/add_waypoint", 1);
    load_waypoint_pub = n.advertise<std_msgs::String>( "/waterplus/load_waypoint", 1);
    delete_waypoint_pub = n.advertise<std_msgs::String>( "/waterplus/delete_waypoint", 1);
    ROS_WARN("[main] control module run");

    ros::spin();

    return 0;
}
