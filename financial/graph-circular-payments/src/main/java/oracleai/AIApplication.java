package oracleai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class AIApplication {


    static {
        System.out.println("Graph application started");
    }

    public static void main(String[] args) {
        SpringApplication.run(AIApplication.class, args);
    }

}
