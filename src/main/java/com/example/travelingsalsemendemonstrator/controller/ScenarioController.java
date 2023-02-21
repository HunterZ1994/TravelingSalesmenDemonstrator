package com.example.travelingsalsemendemonstrator.controller;


import com.example.travelingsalsemendemonstrator.model.Algorithms;
import com.example.travelingsalsemendemonstrator.model.Scenario;
import com.example.travelingsalsemendemonstrator.model.ScenarioReader;
import com.example.travelingsalsemendemonstrator.model.ScenarioWriter;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ScenarioController {
    /**
     * Hardcoded Path to the scenarios directory in the server environment.
     * Using System.getProperty("user.dir") to get the root file of the current project.
     */
    Path toScenarios = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "scenarios");

    /**
     * Global reader and Writer variables;
     */
    ScenarioReader reader = new ScenarioReader();
    ScenarioWriter writer = new ScenarioWriter();

    /**
     * Constructor
     */
    public ScenarioController() {
    }


    /**
     * @param scenario
     * @return
     */
    public boolean createScenario(Scenario scenario) {
        Algorithms.valueOf("nearest_neighbour");

        return false;
    }

    /**
     * @return the number of files in the scenario directory, that are not directories themselves.
     */
    public int getNrOfScenarios() {
        Set<String> Filelist = Stream.of(Objects.requireNonNull(toScenarios.toFile().listFiles())).filter(
                file -> !file.isDirectory()).map(File::getName).collect(Collectors.toSet());
        return Filelist.size();
    }

    /**
     * filters all files in scenarios for directories to:
     *
     * @return A list of all filenames in the scenarios folder and removes the .tsp file extension.
     */
    public List<String> getAllScenarioNames() {
        return Stream.of(Objects.requireNonNull(toScenarios.toFile().listFiles())).filter(
                file -> !file.isDirectory()).map(File::getName).map(name -> name.replace(".tsp", "")).toList();
    }

    /**
     * @return A list of all the scenarios in the scenario folder stored in scenario objects
     */
    //TODO return scenario List
    public List<Scenario> getAllScenarios() {
        List<File> fileList = Stream.of(Objects.requireNonNull(toScenarios.toFile().listFiles())).filter(
                file -> !file.isDirectory()
        ).toList();
        return null;
    }

    /**
     * @param id the filename without the .tsp extension
     * @return the scenario stored in the file with the @param id.
     */
    public Scenario getScenario(String id) {
        List<File> fileList = Stream.of(Objects.requireNonNull(toScenarios.toFile().listFiles())).filter(
                file -> !file.isDirectory()
        ).toList();

        for (File file : fileList) {
            if (file.getName().equals(id + ".tsp")) {
                try {
                    return new ScenarioReader().readFromFile(file);
                } catch (IOException e) {
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * @param id      the filename of the scenario that is to be renamed
     * @param newName the new name given to said scenario
     * @return the updated Scenario with the new name;
     */
    //TODO
    public Scenario renameScenario(String id, String newName) throws IOException {
        File oldFile = toScenarios.resolve(Objects.requireNonNull(id)).toFile();
        if (newName.contains(".tsp")) {
            oldFile.renameTo(toScenarios.resolve(Objects.requireNonNull(newName)).toFile());
            return reader.readFromFile(toScenarios.resolve(Objects.requireNonNull(newName)).toFile());
        } else {
            oldFile.renameTo(toScenarios.resolve(newName + ".tsp").toFile());
            return reader.readFromFile(toScenarios.resolve(newName + ".tsp").toFile());
        }
    }

    public Scenario updateScenario(Scenario scenario, String id) throws IOException {
        File oldFile;
        if(id.contains(".tsp")){
            oldFile = toScenarios.resolve(Objects.requireNonNull(id)).toFile();
        }else{
            oldFile = toScenarios.resolve(id + ".tsp").toFile();
        }


        return null;
    }

    /**
     * A Function to delete a given scenario form the Local System
     *
     * @param id The filename of the file one wants to delete.
     * @return true if deleted successfully, false if the deletion failed.
     */
    public boolean deleteScenario(String id) {
        if(!id.contains(".tsp")){
            id = id + ".tsp";
        }
        System.out.println(id);
        return toScenarios.resolve(Objects.requireNonNull(id)).toFile().delete();
    }

}