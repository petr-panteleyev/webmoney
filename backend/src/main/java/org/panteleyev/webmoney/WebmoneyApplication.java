/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney;

import org.panteleyev.webmoney.config.DatabaseProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(DatabaseProperties.class)
public class WebmoneyApplication {
	public static final String CONTEXT_ROOT = "/money";
	public static final String API_ROOT = "/api/1.0.0";
	public static final String VERSION_ROOT = "/version";
	public static final String UI_ROOT = "/ui";
	public static final String CATEGORY_ROOT = API_ROOT + "/categories";

	public static void main(String[] args) {
		SpringApplication.run(WebmoneyApplication.class, args);
	}

}
