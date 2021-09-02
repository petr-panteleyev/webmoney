/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.repository;

import org.panteleyev.webmoney.model.Currency;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getBoolean;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getUuid;

@Repository
public class CurrencyRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private final RowMapper<Currency> rowMapper = (rs, i) -> new Currency(
        getUuid(rs, "uuid"),
        rs.getString("symbol"),
        rs.getString("description"),
        rs.getString("format_symbol"),
        rs.getInt("format_symbol_pos"),
        getBoolean(rs, "show_format_symbol"),
        getBoolean(rs, "def"),
        rs.getBigDecimal("rate"),
        rs.getInt("rate_direction"),
        getBoolean(rs, "use_th_separator"),
        rs.getLong("created"),
        rs.getLong("modified")
    );

    public CurrencyRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Currency> getCurrencies() {
        return jdbcTemplate.query("SELECT * FROM currency", rowMapper);
    }
}
