package com.yuaud.book;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@SpringBootApplication
public class BookNetworkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookNetworkApiApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner runner(RoleRepository roleRepository){
//		return args -> {
//			if(roleRepository.findByName("USER").isEmpty()){
//				roleRepository.save(
//						Role.builder().name("USER").createdDate(java.time.LocalDateTime.now()).build()
//				);
//			}
//		};
//	}

}