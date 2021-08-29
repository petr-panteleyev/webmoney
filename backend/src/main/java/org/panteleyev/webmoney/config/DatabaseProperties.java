package org.panteleyev.webmoney.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "database")
@ConstructorBinding
public record DatabaseProperties(String userName, String password, String host, int port, String schema) {
}
