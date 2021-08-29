/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.repository;

import org.panteleyev.webmoney.model.Category;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
public class CategoryRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private final RowMapper<Category> rowMapper = (rs, i) -> {
        var uuid = rs.getString("uuid");
        return new Category(
            UUID.fromString(uuid),
            rs.getString("name")
        );
    };

    public CategoryRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Category> getCategories() {
        return jdbcTemplate.query("SELECT * FROM category", rowMapper);
    }

    public Optional<Category> getCategory(UUID uuid) {
        var result = jdbcTemplate.query("""
            SELECT * FROM category WHERE uuid = :uuid
            """, Map.of("uuid", uuid.toString()), rowMapper);
        return result.size() == 0 ? Optional.empty() : Optional.of(result.get(0));
    }
}
