package com.example.travelingsalsemendemonstrator.model;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

public class Scenario {

    String name;
    String id;
    Graph solution;
    String background;

    public Scenario(String name, String id, Graph solution, String background) {
        this.name = name;
        this.id = id;
        this.solution = solution;
        this.background = background;
    }

    public Scenario(String name, String id){
        this(name, id, null, null);
    }

    public Scenario(String name){
        this.name = name;
        this.id = createID();
    }

    public Scenario(String name, Graph solution){
        this(name);
        this.solution = solution;

    }

    public Scenario(String name, List<Point> points) {
        this(name);
        this.solution = new Graph(points);
    }

    public Scenario(){

    }

    private String createID(){
        //TODO: Create ID based on if scenarios are empty or previous ID's
        Path toResources = Paths.get(System.getProperty("user.dir"),"Backend", "src", "main", "resources", "scenarios");
        if(dirIsEmpty(toResources)) {
            return "0";
        }else{
            return "1";
        }
    }

    private boolean dirIsEmpty(Path path){
        if (Files.isDirectory(path)) {
            try (DirectoryStream<Path> directory = Files.newDirectoryStream(path)) {
                return !directory.iterator().hasNext();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return false;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Graph getSolution() {
        return solution;
    }

    public void setSolution(Graph solution) {
        this.solution = solution;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Scenario scenario = (Scenario) o;
        return Objects.equals(name, scenario.name) && Objects.equals(id, scenario.id) && Objects.equals(solution, scenario.solution);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, id, solution);
    }

    @Override
    public String toString() {
        return "Scenario{" +
                "name='" + name + '\'' +
                ", id='" + id + '\'' +
                ", solution=" + solution +
                ", background='" + background + '\'' +
                '}';
    }
}
