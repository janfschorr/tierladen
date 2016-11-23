package com.tierladen.controller;

import com.tierladen.model.Pet;
import com.tierladen.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {
    @Autowired
    private PetRepository repo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Pet> findPets() { return repo.findAll(); }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Pet> addPet(@Valid @RequestBody Pet pet) {
        pet.setId(null);
        return new ResponseEntity<Pet>(repo.saveAndFlush(pet), HttpStatus.CREATED);
    }

    @RequestMapping(value= "/{id}", method = RequestMethod.DELETE)
    public void deletePet(@PathVariable Integer id) { repo.delete(id); }
}
