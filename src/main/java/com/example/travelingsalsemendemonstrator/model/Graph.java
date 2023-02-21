package com.example.travelingsalsemendemonstrator.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Graph {

    private List<Point> points;
    private List<Edge> edges;

    private double solutionLength;

    public double getSolutionLength() {
        return solutionLength;
    }

    public void setSolutionLength(double solutionLength) {
        this.solutionLength = solutionLength;
    }

    public Graph(List<Point> points){
        this.points = points;
        this.calculateEdges(points);
    }

    public Graph(List<Point> points, List<Edge> edges) {
        this.points = points;
        this.edges = edges;
    }

    public Graph(List<Point> points, List<Edge> edges, Double solutionLength){
        this(points, edges);
        setSolutionLength(solutionLength);
    }

    public Graph(){}

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public List<Edge> getEdges() {
        return edges;
    }

    private void calculateEdges(List<Point> points){
        if(points.size()>1) {
            this.edges = new ArrayList<Edge>();
            for (int i = 0; i < points.size() - 1; i++) {
                this.edges.add(new Edge(points.get(i), points.get(i + 1)));
            }
            this.edges.add(new Edge(points.get(points.size() - 1), points.get(0)));
        }
    }

    public void setEdges(List<Edge> edges) {
        this.edges = edges;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Graph dataClass = (Graph) o;
        return Objects.equals(points, dataClass.points) && Objects.equals(edges, dataClass.edges);
    }

    @Override
    public int hashCode() {
        return Objects.hash(points, edges);
    }

    @Override
    public String toString() {
        return "Graph{" +
                "points=" + points +
                ", edges=" + edges +
                '}';
    }
}
