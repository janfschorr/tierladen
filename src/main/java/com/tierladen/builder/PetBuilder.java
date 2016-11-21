package com.tierladen.builder;

import com.tierladen.model.Pet;

public class PetBuilder {
    private Pet pet = new Pet();

    public PetBuilder id(int id) {
        pet.setId(id);
        return this;
    }

    public PetBuilder name(String name) {
        pet.setName(name);
        return this;
    }

    public PetBuilder category(String category) {
        pet.setCategory(category);
        return this;
    }

    public PetBuilder status(String status) {
        pet.setStatus(status);
        return this;
    }

    public Pet build() { return pet; }
}
