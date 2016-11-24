package com.tierladen.controller;

import com.tierladen.builder.PetBuilder;
import com.tierladen.model.Pet;
import com.tierladen.repository.PetRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class PetControllerTest {
    private static final int PET1_ID = 1;
    private static final String PET1_NAME = "Pet1";
    private static final String PET1_CATEGORY = "Animal";
    private static final String PET1_STATUS = "sold";
    private static final int PET2_ID = 2;
    private static final String PET2_NAME = "Pet2";
    private static final Pet COMPLETE_PET = new PetBuilder()
            .id(PET1_ID)
            .name(PET1_NAME)
            .category(PET1_CATEGORY)
            .status(PET1_STATUS)
            .build();
    private static final Pet INCOMPLETE_PET = new PetBuilder()
            .id(PET2_ID)
            .name(PET2_NAME)
            .build();
    private static final Pet NEW_PET = new PetBuilder()
            .build();
    @InjectMocks
    private PetController controller;
    @Mock
    private PetRepository repository;
    private ArgumentCaptor<Pet> anyPet = ArgumentCaptor.forClass(Pet.class);

    @Test
    public void whenFindingPetsItShouldReturnAllPets() {
        // Given that the repository returns COMPLETE_PET and INCOMPLETE_PET
        given(repository.findAll()).willReturn(Arrays.asList(COMPLETE_PET, INCOMPLETE_PET));
        // When looking for all pets
        assertThat(controller.findPets())
                // Then it should return the COMPLETE_PET and INCOMPLETE_PET
                .containsOnly(COMPLETE_PET, INCOMPLETE_PET);
    }

    @Test
    public void whenAddingPetItShouldReturnTheSavedPet() {
        // Given that a NEW_PET is saved and flushed, a COMPLETE_PET is returned
        given(repository.saveAndFlush(NEW_PET)).willReturn(COMPLETE_PET);
        // When adding a NEW_PET
        assertThat(controller.addPet(NEW_PET).getBody())
                // Then it should return the COMPLETE_PET
                .isSameAs(COMPLETE_PET);
    }

    @Test
    public void whenAddingPetItShouldMakeSureNoIDIsPassed() {
        // Given that a COMPLETE_PET is added
        controller.addPet(COMPLETE_PET);
        // Verify that when the pet is saved
        verify(repository).saveAndFlush(anyPet.capture());
        // It should have an empty ID
        assertThat(anyPet.getValue().getId()).isNull();
    }

    @Test
    public void whenSavingPetItShouldReturnTheSavedPet() {
        // Given that COMPLETE_PET is returned when one is requested with COMPLETE_PET_ID
        given(repository.getOne(PET1_ID)).willReturn(COMPLETE_PET);
        // Given that a COMPLETE_PET is saved and flushed, a COMPLETE_PET is returned
        given(repository.saveAndFlush(COMPLETE_PET)).willReturn(COMPLETE_PET);
    }

    @Test
    public void whenDeletingAnPetItShouldUseTheRepository() {
        // Given that an pet with COMPLETE_PET_ID is removed
        controller.deletePet(PET1_ID);
        // Verify that the repository is used to delete the pet
        verify(repository).delete(PET1_ID);
    }
}
