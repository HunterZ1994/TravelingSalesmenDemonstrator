package com.example.travelingsalsemendemonstrator.controller;


import com.example.travelingsalsemendemonstrator.model.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/api")
public class RestController {

    ScenarioController sc = new ScenarioController();
    BackgroundController bc = new BackgroundController();


    @GetMapping("/nrOfScenarios")
    public ResponseEntity<Integer> getNrOfScenarios() {
        return new ResponseEntity<Integer>(sc.getNrOfScenarios(), HttpStatus.OK);
    }

    @GetMapping("/scenarioNames")
    public ResponseEntity<List<String>> getAllScenarioNames() {
        return new ResponseEntity<List<String>>(sc.getAllScenarioNames(), HttpStatus.OK);
    }

    @GetMapping(value = "/Scenario/{id}")
    public ResponseEntity<Scenario> getScenario(@PathVariable(required = false) String id) {
        if (id != null) {
            Scenario result = sc.getScenario(id);
            if(result != null){
                System.out.println("Anfragescenario: "+ result);
                return new ResponseEntity<Scenario>(result, HttpStatus.OK);
            }
            return new ResponseEntity<Scenario>(sc.getScenario(id), HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<Scenario>(sc.getScenario("Testscenario_4"), HttpStatus.OK);
        }
    }

    /**
     * End point for uploading a new Scenario from the Client.
     * @param data Takes a JSON Formatted String and casts it to a scenario automatically.
     * @return a ResponseEntity of ether the algorithmically solved Graph of the created Scenario.
     */
    @PostMapping(path = "/newScenario")
    public ResponseEntity<?> uploadScenario(@RequestBody Scenario data) {
        Nearest_Neighbour nn = new Nearest_Neighbour(data.getSolution());
        data.setSolution(nn.solve());
        ScenarioWriter scenarioWriter = new ScenarioWriter(data);
        Path toResources = Paths.get(System.getProperty("user.dir"), "src", "main", "resources",
                "scenarios", data.getName().replaceAll(" ", "_") + ".tsp");
        try {
            scenarioWriter.writeToFile(new File(toResources.toUri()));
        } catch (IOException e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(data.getSolution(), HttpStatus.OK);

    }


    /**
     * Endpoint to delete a preselected Scenario
     * @param scenarioName the filename of the scenario you want to delete
     * @return a ResponseEntity of type boolean with http-status 200 in case the scenario was deleted sucessfully,
     * otherwise http-status 500
     */
    @DeleteMapping(path = "/deleteScenario")
    public ResponseEntity<?> deleteScenario(@RequestParam(name = "scenarioID") String scenarioName){
        if(sc.deleteScenario(scenarioName)){
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }else {
            return new ResponseEntity<Boolean>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllBackgroundNames")
    public ResponseEntity<List<String>> getBackgroundNames() {
        return new ResponseEntity<>(bc.getAllBackgroundNames(), HttpStatus.OK);
    }

    @GetMapping("/getBackground")
    public ResponseEntity<?> getBackground(@RequestParam(name = "backgroundname") String backgroundFileName){
        try {
            final HttpHeaders httpHeaders= new HttpHeaders();
            httpHeaders.setContentType(MediaType.TEXT_PLAIN);
            return new ResponseEntity<byte[]>(bc.getBackground(backgroundFileName),httpHeaders, HttpStatus.OK);
        } catch (FileNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/uploadBackground")
    public ResponseEntity<?> uploadBackground(@RequestPart("backgroundFile") MultipartFile file) {
        try {
            bc.addBackground(file);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Renames a selected File.
     * @param filename the name of the selected File
     * @param newFilename the new name of the file
     * @return a ResponseEntity indicating if the renaming process was successful.
     */
    @PostMapping("/renameBackground")
    public ResponseEntity<?> renameBackground(@RequestPart("backgroundName") String filename, @RequestPart("newName") String newFilename) {
        if (bc.renameBackground(filename, newFilename)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @param filename the name of the File to be deleted from backgrounds
     * @return a Response Entity indicating if the deletion process was successful.
     */
    @DeleteMapping("/deleteBackground")
    public ResponseEntity<?> deleteBackground(@RequestPart("backgroundName") String filename){
        if(bc.deleteBackground(filename)){
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllAlgorithmnames")
    public ResponseEntity<List<Algorithms>> getAllAlgorithmNames(){
        return new ResponseEntity<>(Arrays.stream(Algorithms.values()).toList(), HttpStatus.OK);
    }
}
