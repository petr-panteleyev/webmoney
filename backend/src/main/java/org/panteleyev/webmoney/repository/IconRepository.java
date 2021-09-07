/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.repository;

import org.panteleyev.webmoney.model.Icon;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getUuid;

@Repository
public class IconRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private final RowMapper<Icon> rowMapper = (rs, i) -> new Icon(
        getUuid(rs, "uuid"),
        rs.getString("name"),
        rs.getBytes("bytes"),
        rs.getLong("created"),
        rs.getLong("modified")
    );

    public IconRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Icon> getIcons() {
        return jdbcTemplate.query("SELECT * FROM icon", rowMapper);
    }

    public Optional<Icon> getIcon(UUID uuid) {
        var result = jdbcTemplate.query("""
            SELECT * FROM icon WHERE uuid = :uuid
            """, Map.of("uuid", uuid.toString()), rowMapper);
        return result.size() == 0 ? Optional.empty() : Optional.of(result.get(0));
    }
}
