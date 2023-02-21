package com.example.travelingsalsemendemonstrator.controller;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * Controller Class managing background files.
 */
public class BackgroundController {

    /**
     * Hardcoded Path to the backgrounds directory in the server environment.
     * Using System.getProperty("user.dir") to get the root file of the current project.
     */
    Path toBackgrounds = Paths.get(System.getProperty("user.dir"),"src", "main", "resources", "backgrounds");

    /**
     * constructor
     */
    public BackgroundController(){

    };

    /**
     * Saves the Multipart File as a readable Image in the folder backgrounds
     * @param toAdd a Multipart File of the type .png, .jpg, .jpeg, .gif
     *
     */
    public void addBackground(MultipartFile toAdd) throws IOException {
        Path filepath = toBackgrounds.resolve(Objects.requireNonNull(toAdd.getOriginalFilename()));
        String extension = FilenameUtils.getExtension(toAdd.getOriginalFilename());
        ImageIO.write(ImageIO.read(toAdd.getInputStream()), extension, filepath.toFile());
    }

    /**
     *
     * @param filename the name of the file one wants to get from /backgrounds
     * @return an image File.
     */
    public byte[] getBackground (String filename) throws FileNotFoundException {
        if(toBackgrounds.resolve(filename).toFile().exists()) {
            Path path = toBackgrounds.resolve(filename);
            byte[] content = null;
            try{
                content = Files.readAllBytes(path);
            }catch (final IOException e){
                // TODO handle exception
                System.out.println();
            }
            return content;
        }else {
            throw new FileNotFoundException(" This background "+filename+" is unavailable or doesn't exist");
        }
    }

    /**
     * Filters all files in backgrounds for directories to:
     * @return A list of all filenames in the backgrounds folder
     */
    public List<String> getAllBackgroundNames(){
        return Stream.of(Objects.requireNonNull(toBackgrounds.toFile().listFiles())).filter(
                file -> !file.isDirectory()
        ).map(File::getName).toList();
    }

    /**
     *
     * @param filename The name of the background chosen to be renamed
     * @param newName The new name of the background
     * @return true if the file was successfully renamed, false if it failed.
     */
    public boolean renameBackground (String filename, String newName){
        if(!newName.contains(".png") || !newName.contains(".jpg") || !newName.contains(".jpeg") || !newName.contains(".gif")){
            switch (filename.split("\\.")[1]) {
                case "png" -> newName.split("\\.")[0] += ".png";
                case "jpg" -> newName.split("\\.")[0] += ".jpg";
                case "jpeg" -> newName.split("\\.")[0] += ".jpeg";
                case "gif" -> newName.split("\\.")[0] += ".gif";
                default -> newName.split("\\.")[0] += "jpg";
            }
        }
        Path oldFilePath = toBackgrounds.resolve(Objects.requireNonNull(filename));
        Path newFilePath = toBackgrounds.resolve(Objects.requireNonNull(newName));
        return oldFilePath.toFile().renameTo(newFilePath.toFile());
    }

    /**
     *
     * @param filename the name of the file to be deleted.
     * @return true if the deletion process was successful, false if it failed.
     */
    public boolean deleteBackground(String filename){
        Path filepath = toBackgrounds.resolve(Objects.requireNonNull(filename));
        return filepath.toFile().delete();
    }

}
