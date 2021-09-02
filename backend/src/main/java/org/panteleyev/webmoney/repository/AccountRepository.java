/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.repository;

import org.panteleyev.webmoney.model.Account;
import org.panteleyev.webmoney.model.CardType;
import org.panteleyev.webmoney.model.CategoryType;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.panteleyev.webmoney.repository.RepositoryUtil.*;

@Repository
public class AccountRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private final RowMapper<Account> rowMapper = (rs, i) -> new Account(
        getUuid(rs, "uuid"),
        rs.getString("name"),
        rs.getString("comment"),
        rs.getString("number"),
        rs.getBigDecimal("opening"),
        rs.getBigDecimal("account_limit"),
        rs.getBigDecimal("rate"),
        getEnum(rs, "type", CategoryType.class),
        getUuid(rs, "category_uuid"),
        getUuid(rs, "currency_uuid"),
        getBoolean(rs, "enabled"),
        rs.getBigDecimal("interest"),
        getLocalDate(rs, "closing_date"),
        getUuid(rs, "icon_uuid"),
        getEnum(rs, "card_type", CardType.class),
        rs.getString("card_number"),
        rs.getBigDecimal("total"),
        rs.getBigDecimal("total_waiting"),
        rs.getLong("created"),
        rs.getLong("modified")
    );

    public AccountRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Account> getAccounts() {
        return jdbcTemplate.query("SELECT * FROM account", rowMapper);
    }
}
