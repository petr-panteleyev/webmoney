/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.repository;

import org.panteleyev.webmoney.model.CategoryType;
import org.panteleyev.webmoney.model.Transaction;
import org.panteleyev.webmoney.model.TransactionType;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getBoolean;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getEnum;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getLocalDate;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getUuid;

@Repository
public class TransactionRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private final RowMapper<Transaction> rowMapper = (rs, i) -> new Transaction(
        getUuid(rs, "uuid"),
        rs.getBigDecimal("amount"),
        rs.getInt("day"),
        rs.getInt("month"),
        rs.getInt("year"),
        getEnum(rs, "type", TransactionType.class),
        rs.getString("comment"),
        getBoolean(rs, "checked"),
        getUuid(rs, "acc_debited_uuid"),
        getUuid(rs, "acc_credited_uuid"),
        getEnum(rs, "acc_debited_type", CategoryType.class),
        getEnum(rs, "acc_credited_type", CategoryType.class),
        getUuid(rs, "acc_debited_category_uuid"),
        getUuid(rs, "acc_credited_category_uuid"),
        getUuid(rs, "contact_uuid"),
        rs.getBigDecimal("rate"),
        rs.getInt("rate_direction"),
        rs.getString("invoice_number"),
        getUuid(rs, "parent_uuid"),
        getBoolean(rs, "detailed"),
        getLocalDate(rs, "statement_date"),
        rs.getLong("created"),
        rs.getLong("modified")
    );

    public TransactionRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Transaction> getTransactions() {
        return jdbcTemplate.query("SELECT * FROM transaction", rowMapper);
    }
}
