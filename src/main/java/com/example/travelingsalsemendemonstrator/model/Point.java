package com.example.travelingsalsemendemonstrator.model;


import java.math.BigDecimal;
import java.util.Objects;

public class Point {

    //TODO add Method to allow automatic casting from String to Point

    private final double x_coordinate;
    private final double y_coordinate;

    public Point(double x, double y) {
        x_coordinate = Math.round(x * 100.0) / 100.0;
        y_coordinate = Math.round(y * 100.0) / 100.0;
    }

    public Point(String coordinateString) {
        String[] coordinates = coordinateString.split(",");
        x_coordinate = Math.round(Double.parseDouble(coordinates[0].split("=")[1]) * 100.0) / 100.0;
        y_coordinate = Math.round(Double.parseDouble(coordinates[1].split("=")[1].split("}")[0]) * 100.0) / 100.0;
    }


    public double getX_coordinate() {
        return x_coordinate;
    }

    public double getY_coordinate() {
        return y_coordinate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return Double.compare(point.x_coordinate, x_coordinate) == 0 && Double.compare(point.y_coordinate, y_coordinate) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x_coordinate, y_coordinate);
    }

    @Override
    public String toString() {
        return "Point{" +
                "x_coordinate=" + x_coordinate +
                ", y_coordinate=" + y_coordinate +
                '}';
    }
}