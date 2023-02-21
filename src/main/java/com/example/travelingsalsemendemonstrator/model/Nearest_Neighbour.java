package com.example.travelingsalsemendemonstrator.model;

import java.util.*;
import java.util.stream.Collectors;

public class Nearest_Neighbour implements Algorithm{

    Graph unsolved;

    public Nearest_Neighbour(Graph graph) {
        this.unsolved = graph;
    }

    @Override
    public Graph solve() {
        Graph solved = new Graph();
        List<Point> pointsSolved = new ArrayList<>();
        List<Edge> edgesSolved = new ArrayList<>();
        //TODO test & comment algorithm!!!!!!!
        List<Point> pointlistUnsolved = this.unsolved.getPoints();

        int index = (int) (Math.random() * (pointlistUnsolved.size()));
        Point u = pointlistUnsolved.get(index);
        pointlistUnsolved.remove(index);
        pointsSolved.add(u);
        while(pointlistUnsolved.size() > 1) {
            Edge uv = calculateNearestNeighbour(u, pointlistUnsolved);
            edgesSolved.add(uv);
            u = uv.getEnd();
            pointsSolved.add(u);
            pointlistUnsolved.remove(u);
        }
        Edge uv = new Edge(pointsSolved.get(pointsSolved.size()-1), pointlistUnsolved.get(0));
        pointsSolved.add(pointlistUnsolved.get(0));
        edgesSolved.add(uv);
        edgesSolved.add(new Edge(pointlistUnsolved.get(0), pointsSolved.get(0)));
        solved.setPoints(pointsSolved);
        solved.setEdges(edgesSolved);
        solved.setSolutionLength(calculateLength(solved));
        return solved;
    }

    private Edge calculateNearestNeighbour(Point u, List<Point> points){
        HashMap<Point, Double> distances = new HashMap<>();
        for(Point p: points){
            distances.put(p, calculateDistance(u, p));
        }
        HashMap<Point, Double> sorted = distances.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

//        printHashMap(sorted);
        return new Edge(u, (Point) sorted.keySet().toArray()[0]);
    }

    private double calculateLength(Graph graph){
        List<Edge> solution = graph.getEdges();
        double lengthOfTrip = 0;
        for (Edge e : solution){
            lengthOfTrip += calculateDistance(e.getStart(), e.getEnd());
        }
        return lengthOfTrip;
    }

    private void printHashMap(HashMap<?,?> toPrint){
        StringBuilder mapAsString = new StringBuilder("{\n");
        for(int i=0; i<toPrint.size(); i++){
            mapAsString.append(toPrint.keySet().toArray()[i]).append(" = ").append(toPrint.values().toArray()[i]).append(", \n");
        }
        mapAsString.append("\n}");
        System.out.println(mapAsString);
    }

    private double calculateDistance(Point a, Point b){
        return  Math.sqrt(Math.pow((b.getX_coordinate() - a.getX_coordinate()), 2) + Math.pow((b.getY_coordinate() - a.getY_coordinate()), 2));
    }
}