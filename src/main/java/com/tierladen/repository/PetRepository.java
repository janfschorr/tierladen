package com.tierladen.repository;

import com.tierladen.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Integer>{
}
