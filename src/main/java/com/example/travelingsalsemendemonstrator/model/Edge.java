package com.example.travelingsalsemendemonstrator.model;

import java.util.Objects;

public class Edge {

    //TODO add Method to allow automatic casting from String to Edge

    private Point start;
    private Point end;

    public Edge(Point start, Point end) {
        this.start = start;
        this.end = end;
    }

    public Edge(String edge) {
        for (String p : edge.split("Point")) {
            if (p.matches("^\\{x_coordinate=\\d{1,10}\\.\\d{0,50}, y_coordinate=\\d{1,10}\\.\\d{0,50}}, end=$")) {
                this.start = new Point(p);
            }
            if (p.matches("^\\{x_coordinate=\\d{1,10}\\.\\d{0,50}, y_coordinate=\\d{1,10}\\.\\d{0,50}}{2}$")) {
                this.end = new Point(p);
            }
        }
    }

    public Point getStart() {
        return start;
    }

    public void setStart(Point start) {
        this.start = start;
    }

    public Point getEnd() {
        return end;
    }

    public void setEnd(Point end) {
        this.end = end;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Edge edge = (Edge) o;
        return Objects.equals(start, edge.start) && Objects.equals(end, edge.end);
    }

    @Override
    public int hashCode() {
        return Objects.hash(start, end);
    }

    @Override
    public String toString() {
        return "Edge{" +
                "start=" + start +
                ", end=" + end +
                '}';
    }
}