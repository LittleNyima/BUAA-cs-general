package se;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Commands {

    private Commands() {}

    private static void exec(String cmd) {
        try {
            Process p = Runtime.getRuntime().exec(cmd);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void mappingForward() {
        try {
            Runtime.getRuntime().exec("rosrun my_demo web6_publish forward");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void mappingBackward() {
        try {
            Runtime.getRuntime().exec("rosrun my_demo web6_publish backward");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void mappingLeft() {
        try {
            Runtime.getRuntime().exec("rosrun my_demo web6_publish left");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void mappingRight() {
        try {
            Runtime.getRuntime().exec("rosrun my_demo web6_publish right");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void mappingStop() {
        try {
            Runtime.getRuntime().exec("rosrun my_demo web6_publish stop");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void mappingSaveMap() {
        try {
            Runtime.getRuntime().exec("arp -a");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void mappingResetMap() {
        try {
            Runtime.getRuntime().exec("echo 666");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void navigationTouchMode() {
        try {
            Runtime.getRuntime().exec("echo 666");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void navigationCoordinateMode() {
        try {
            Runtime.getRuntime().exec("echo 666");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void grabbingGrab() {
        try {
            Runtime.getRuntime().exec("echo 666");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
