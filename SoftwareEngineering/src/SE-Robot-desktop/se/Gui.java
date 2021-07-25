package se;

import javax.swing.*;
import java.awt.*;

public class Gui {

    public Gui() {
        setupGui();
    }

    private void setupGui() {
        JFrame frame = new JFrame();
        setMainFrame(frame);
        setTabs(frame);
        frame.setVisible(true);
        frame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
    }

    private void setMainFrame(JFrame frame) {
        frame.setLocationRelativeTo(null);
        frame.setSize(800, 600);
        frame.setTitle("Team 06 Robot User Agent");
        frame.setLocationRelativeTo(null);
    }

    private void setTabs(JFrame frame) {
        JTabbedPane jtp = new JTabbedPane();
        jtp.addTab("Mapping", createMappingPanel());
        jtp.addTab("Navigation", createNavigationPanel());
        jtp.addTab("Grabbing", createGrabbingPanel());
        jtp.addTab("Introduction", createIntroPanel());
        frame.add(jtp);
    }

    private JPanel createMappingPanel() {
        JPanel mapping = new JPanel();
        mapping.setLayout(new GridLayout(1, 2));
        JPanel leftPanel = new JPanel();
        leftPanel.setBorder(BorderFactory.createTitledBorder("Control"));
        leftPanel.setLayout(new GridLayout(3, 1));
        addMappingLeftPanelButtons(leftPanel);
        JPanel rightPanel = new JPanel();
        rightPanel.setBorder(BorderFactory.createTitledBorder("Map"));
        rightPanel.setLayout(new FlowLayout(FlowLayout.CENTER));
        addMappingRightPanelButtons(rightPanel);
        mapping.add(leftPanel);
        mapping.add(rightPanel);
        return mapping;
    }

    private void addMappingLeftPanelButtons(JPanel left) {
        JPanel upper = new JPanel();
        upper.setLayout(new FlowLayout(FlowLayout.CENTER));
        JButton forwardButton = new JButton("Forwards");
        forwardButton.setPreferredSize(new Dimension(100, 100));
        forwardButton.addActionListener(e -> Commands.mappingForward());
        upper.add(forwardButton);
        left.add(upper);
        JPanel mid = new JPanel();
        mid.setLayout(new FlowLayout(FlowLayout.CENTER));
        JButton leftButton = new JButton("Left");
        leftButton.setPreferredSize(new Dimension(100, 100));
        leftButton.addActionListener(e -> Commands.mappingLeft());
        mid.add(leftButton);
        JButton stopButton = new JButton("Stop");
        stopButton.setPreferredSize(new Dimension(100, 100));
        stopButton.addActionListener(e -> Commands.mappingStop());
        mid.add(stopButton);
        JButton rightButton = new JButton("Right");
        rightButton.setPreferredSize(new Dimension(100, 100));
        rightButton.addActionListener(e -> Commands.mappingRight());
        mid.add(rightButton);
        left.add(mid);
        JPanel lower = new JPanel();
        lower.setLayout(new FlowLayout(FlowLayout.CENTER));
        JButton backwardButton = new JButton("Backwards");
        backwardButton.setPreferredSize(new Dimension(100, 100));
        backwardButton.addActionListener(e -> Commands.mappingBackward());
        lower.add(backwardButton);
        left.add(lower);
    }

    private void addMappingRightPanelButtons(JPanel right) {
        JButton saveMapButton = new JButton("Save Map");
        saveMapButton.setPreferredSize(new Dimension(200, 100));
        saveMapButton.addActionListener(e -> Commands.mappingSaveMap());
        right.add(saveMapButton);
        JButton resetMapButton = new JButton("Reset Map");
        resetMapButton.setPreferredSize(new Dimension(200, 100));
        resetMapButton.addActionListener(e -> Commands.mappingResetMap());
        right.add(resetMapButton);
    }

    private JPanel createNavigationPanel() {
        JPanel navigation = new JPanel(new BorderLayout(100, 100));
        JPanel upper = new JPanel(new FlowLayout(FlowLayout.CENTER));
        JButton touchModeButton = new JButton("Voice Mode");
        touchModeButton.addActionListener(e -> Commands.navigationTouchMode());
        touchModeButton.setPreferredSize(new Dimension(350, 350));
        upper.add(touchModeButton, BorderLayout.CENTER);
        upper.add(new JPanel(), BorderLayout.NORTH);
        upper.add(new JPanel(), BorderLayout.SOUTH);
        upper.add(new JPanel(), BorderLayout.EAST);
        upper.add(new JPanel(), BorderLayout.WEST);
        navigation.add(upper);
        return navigation;
    }

    private JPanel createGrabbingPanel() {
        JPanel grabbing = new JPanel(new BorderLayout(100, 100));
        JButton grabButton = new JButton("Grab");
        grabButton.setPreferredSize(new Dimension(350, 350));
        grabButton.addActionListener(e -> Commands.grabbingGrab());
        grabbing.add(grabButton, BorderLayout.CENTER);
        grabbing.add(new JPanel(), BorderLayout.NORTH);
        grabbing.add(new JPanel(), BorderLayout.SOUTH);
        grabbing.add(new JPanel(), BorderLayout.EAST);
        grabbing.add(new JPanel(), BorderLayout.WEST);
        return grabbing;
    }

    private JPanel createIntroPanel() {
        JPanel intro = new JPanel();
        intro.setLayout(new BoxLayout(intro, BoxLayout.Y_AXIS));
        String text = "WELCOME TO OUR " +
                "FAMILY SERVING " +
                "ROBOTS SYSTEM!!";
        JLabel label = new JLabel(text);
        label.setAlignmentX(0.5F);
        label.setAlignmentY(0.5F);
        intro.add(label);
        return intro;
    }
}
