package com.example.travelingsalsemendemonstrator.model;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class ScenarioWriter {

    Scenario scenario;

    public ScenarioWriter(Scenario scenario) {
        this.scenario = scenario;
    }

    public ScenarioWriter() {
        this(null);
    }

    public void writeToFile(File f, Scenario scenario) throws IOException {
        // create an output stream
        BufferedWriter bf = new BufferedWriter(new FileWriter(f));

        // Delegate writing to stream method
        writeToStream(bf, scenario);

        // Flush and close
        bf.close();
    }

    public void writeToFile(File f) throws IOException {
        this.writeToFile(f, this.scenario);
    }

    private void writeToStream(BufferedWriter stream, Scenario scenario) throws IOException {
        // Get a list of all the points and edges from the scenario
        List<Point> points = scenario.getSolution().getPoints();
        List<Edge> edges = scenario.getSolution().getEdges();
        String name = scenario.getName();
        String ID = scenario.getId();
        double solutionLength = scenario.getSolution().getSolutionLength();
        String background = scenario.getBackground();

        //Begin by writing the ID of the scenario
        stream.write("id: " + ID);
        stream.newLine();
        // Separate  TODO change character to specific String of symbols marking the end of the current part
        stream.write("-----------------");
        stream.newLine();
        // Write the scenario name:
        stream.write("name: " + name);
        stream.newLine();
        // Separate
        stream.write("-----------------");
        stream.newLine();
        // Write the number of points at the beginning of the file
//        stream.write(points.size());
        stream.newLine();
        stream.write("Points: ");
        // Write the list of Points to the file
        for (Point p : points) {
            System.out.println("Scenario Writer writing points: " + p.toString());
            stream.write(p.toString());
        }
        stream.newLine();
        // Separate
        stream.write("-----------------");
        stream.newLine();

        // Write the number of edges at the beginning of the edge segment.
//        stream.write(edges.size());
        stream.newLine();
        stream.write("Edges: ");
        // Write the individual edges
        for (Edge e : edges) {
            stream.write(e.toString());
        }
        stream.newLine();
        stream.write("-----------------");
        stream.newLine();
        // Write the length of the calculated solution to the file
        stream.write("solutionLength: " + solutionLength);
        stream.newLine();
        //TODO ADD BiteStream of image (and EOF if necessary)
        stream.write("background: " + background);
        stream.flush();
    }

}
