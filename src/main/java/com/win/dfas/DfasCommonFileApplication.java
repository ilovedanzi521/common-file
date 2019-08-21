package com.win.dfas;


import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.MongoDbFactory;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class, DataSourceTransactionManagerAutoConfiguration.class })
@EnableSwagger2
@ComponentScan(basePackages = {"com.win"})
@EnableFeignClients(basePackages = {"com.win"})
public class DfasCommonFileApplication {

	public static void main(String[] args) {
		SpringApplication.run(DfasCommonFileApplication.class, args);
	}
	@Autowired
	private MongoDbFactory mongoDbFactory;

	@Bean
	public GridFSBucket getGridFSBuckets() {
		MongoDatabase db = mongoDbFactory.getDb();
		return GridFSBuckets.create(db);
	}
}
