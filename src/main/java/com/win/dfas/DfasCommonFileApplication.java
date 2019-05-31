package com.win.dfas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class DfasCommonFileApplication {

	public static void main(String[] args) {
		SpringApplication.run(DfasCommonFileApplication.class, args);
	}

}
