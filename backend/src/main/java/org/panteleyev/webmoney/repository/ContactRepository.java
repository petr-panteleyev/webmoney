/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.repository;

import org.panteleyev.webmoney.model.Category;
import org.panteleyev.webmoney.model.Contact;
import org.panteleyev.webmoney.model.ContactType;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getEnum;
import static org.panteleyev.webmoney.repository.RepositoryUtil.getUuid;

@Repository
public class ContactRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    private final RowMapper<Contact> rowMapper = (rs, i) -> new Contact(
        getUuid(rs, "uuid"),
        rs.getString("name"),
        getEnum(rs, "type", ContactType.class),
        rs.getString("phone"),
        rs.getString("mobile"),
        rs.getString("email"),
        rs.getString("web"),
        rs.getString("comment"),
        rs.getString("street"),
        rs.getString("city"),
        rs.getString("country"),
        rs.getString("zip"),
        getUuid(rs, "icon_uuid"),
        rs.getLong("created"),
        rs.getLong("modified")
    );

    public ContactRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Contact> getContacts() {
        return jdbcTemplate.query("SELECT * FROM contact", rowMapper);
    }

    public Optional<Contact> getContact(UUID uuid) {
        var queryResult = jdbcTemplate.query(
            "SELECT * FROM contact WHERE uuid = :id",
            Map.of("id", uuid.toString()),
            rowMapper);
        return queryResult.size() == 0?
            Optional.empty() :
            Optional.of(queryResult.get(0));

    }
}
