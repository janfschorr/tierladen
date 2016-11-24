package com.tierladen.functional;

import com.tierladen.Application;
import com.tierladen.builder.PetBuilder;
import com.tierladen.model.Pet;
import com.tierladen.repository.PetRepository;
import org.fluentlenium.adapter.FluentTest;
import org.junit.*;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest("server.port:0")
public class ApplicationIT extends FluentTest {
    private static final String FIRST_PET_NAME = "First pet";
    private static final String SECOND_PET_NAME = "Second pet";
    private static final String THIRD_PET_NAME = "Third pet";
    private static final Pet FIRST_PET = new PetBuilder()
            .name(FIRST_PET_NAME)
            .category("dog")
            .build();
    private static final Pet SECOND_PET = new PetBuilder()
            .name(SECOND_PET_NAME)
            .build();

    @Autowired
    private PetRepository repository;
    @Value("${local.server.port}")
    private int serverPort;
    private WebDriver webDriver = new PhantomJSDriver();

    @Before
    public void setUp() {
        repository.deleteAll();
        repository.save(Arrays.asList(FIRST_PET, SECOND_PET));
        repository.flush();
    }

    private String getUrl() {
        return "http://localhost:" + serverPort;
    }

    @Test
    public void hasPageTitle() {
        goTo(getUrl());
        assertThat(find(".page-header").getText()).isEqualTo("A checklist");
    }

    @Test
    public void hasTwoPets() {
        goTo(getUrl());
        await().atMost(5, TimeUnit.SECONDS).until(".checkbox").hasSize(2);
        assertThat(find(".checkbox").getTexts()).containsOnly(FIRST_PET_NAME, SECOND_PET_NAME);
        assertThat(find(".checkbox").first().find(":checked")).isNotEmpty();
        assertThat(find(".checkbox").get(1).find(":checked")).isEmpty();
    }

    @Test
    public void hasOnePetAfterDeleting() {
        goTo(getUrl());
        await().atMost(5, TimeUnit.SECONDS).until(".checkbox").hasSize(2);
        find(".form-group").first().find("button").click();
        await().atMost(5, TimeUnit.SECONDS).until(".checkbox").hasSize(1);
        assertThat(find(".checkbox").getTexts()).containsOnly(SECOND_PET_NAME);
        assertThat(repository.findAll()).hasSize(1);
    }

    @Test
    public void hasThreePetsAfterAddingOne() {
        goTo(getUrl());
        await().atMost(5, TimeUnit.SECONDS).until(".checkbox").hasSize(2);
        fill(".input-group input[type=text]").with(THIRD_PET_NAME);
        submit("form");
        await().atMost(5, TimeUnit.SECONDS).until(".checkbox").hasSize(3);
        assertThat(find(".checkbox").getTexts())
                .containsOnly(FIRST_PET_NAME, SECOND_PET_NAME, THIRD_PET_NAME);
        assertThat(repository.findAll()).hasSize(3);
    }

    @Override
    public WebDriver getDefaultDriver() {
        return webDriver;
    }
}