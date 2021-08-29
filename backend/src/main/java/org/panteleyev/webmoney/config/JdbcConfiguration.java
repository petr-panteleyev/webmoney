/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.config;

import com.mysql.cj.jdbc.MysqlDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.TimeZone;

@Configuration
public class JdbcConfiguration {
    private final DatabaseProperties properties;

    public JdbcConfiguration(DatabaseProperties properties) {
        this.properties = properties;
    }

    @Bean
    public DataSource mysqlDataSource() {
        try {
            var ds = new MysqlDataSource();

            ds.setCharacterEncoding("utf8");
            ds.setUseSSL(false);
            ds.setServerTimezone(TimeZone.getDefault().getID());
            ds.setPort(properties.port());
            ds.setServerName(properties.host());
            ds.setUser(properties.userName());
            ds.setPassword(properties.password());
            ds.setDatabaseName(properties.schema());
            ds.setAllowPublicKeyRetrieval(true);
            return ds;
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }
}
