package com.tierladen.controller;

import com.tierladen.model.Pet;
import com.tierladen.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {
    @Autowired
    private PetRepository repo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Pet> findPets() { return repo.findAll(); }

    @RequestMapping(method = RequestMethod.POST)
    public Pet addPet(@RequestBody Pet pet) {
        pet.setId(null);
        return repo.saveAndFlush(pet);
    }

    @RequestMapping(value= "/{id}", method = RequestMethod.DELETE)
    public void deletePet(@PathVariable Integer id) { repo.delete(id); }
}
