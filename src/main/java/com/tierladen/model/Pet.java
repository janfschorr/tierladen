package com.tierladen.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    @NotNull
    @Size(min=4, max=20, message="Name cannot be less than 4 or more than 20 characters long.")
    private String name;

    @Column
    private String category;

    @Column
    private String status;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    @JsonProperty(required = true)
    @ApiModelProperty(notes = "The name of the pet", required = true)
    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }
}
