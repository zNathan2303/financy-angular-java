package br.dev.nathan.financy.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    final String securitySchemeName = "BearerToken";

    Info info = new Info()
        .title("Financy API")
        .version("1.0")
        .description("Financy application API documentation");

    SecurityScheme securityScheme = new SecurityScheme()
        .name(securitySchemeName)
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT");

    Components components = new Components()
        .addSecuritySchemes(securitySchemeName, securityScheme);

    SecurityRequirement securityRequirement = new SecurityRequirement()
        .addList(securitySchemeName);

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(info)
            .components(components)
            .addSecurityItem(securityRequirement);
    }
}
