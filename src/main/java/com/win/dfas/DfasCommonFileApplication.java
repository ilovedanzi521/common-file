package com.win.dfas;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@ComponentScan(basePackages = {"com.win"})
@EnableFeignClients(basePackages = {"com.win"})
public class DfasCommonFileApplication {

	public static void main(String[] args) {
		SpringApplication.run(DfasCommonFileApplication.class, args);
	}

}
