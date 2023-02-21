package com.example.travelingsalsemendemonstrator.model;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ScenarioReader {

    public ScenarioReader() {
    }

    ;

    public Scenario readFromFile(File f) throws IOException {

        // Create Writer
        BufferedReader br = new BufferedReader(new FileReader(f));

        // Map reading to ScenarioClass
        Scenario scenario = readFromStream(br);

        // Don't forget to close the stream
        br.close();

        //Return the scenario
        return scenario;
    }

    // TODO implement Read Scenario
    private Scenario readFromStream(BufferedReader br) throws IOException {
        Scenario scenario = new Scenario();
        String line;
        String id = "";
        String name = "";
        double solutionLength = 0.0;
        String background = "";
        List<Point> points = new ArrayList<>();
        List<Edge> edges = new ArrayList<>();
        while ((line = br.readLine()) != null) {
            if (line.contains("id:") && line.split("id: ").length>0) {
                id = line.split("id: ")[1];
            } else if (line.contains("name:") && line.split("name: ").length>0) {
                name = line.split("name: ")[1];
            } else if (line.contains("Points:")) {
                String[] pointsStringArray = line.split("Points: ")[1].split("Point");
                for (String s : pointsStringArray) {
                    if (s.matches("^\\{x_coordinate=\\d{1,10}\\.\\d{0,20}, y_coordinate=\\d{1,10}\\.\\d{0,20}}$")) {
                        points.add(new Point(s));
                    }
                }
            } else if (line.contains("Edges:")) {
                String[] edgesStringArray = line.split("Edges: ")[1].split("Edge");
                for (String s : edgesStringArray) {
                    if (s.length() > 0) {
                        edges.add(new Edge(s));
                    }
                }
            } else if (line.contains("solutionLength: ")) {
                solutionLength = Double.parseDouble(line.split("solutionLength: ")[1]);
            }else if (line.contains("background: ")){
                background = line.split("background: ")[1];
            } else {
//                System.out.println("Part Separator");
            }
        }
        Graph solution = new Graph(points, edges, solutionLength);
        scenario.setName(name);
        scenario.setId(id);
        scenario.setSolution(solution);
        scenario.setBackground(background);
        return scenario;
    }

}
