/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.UUID;

public interface RepositoryUtil {
    static UUID getUuid(ResultSet set, String columnLabel) throws SQLException {
        var obj = set.getObject(columnLabel);
        return (obj instanceof String str && !str.isBlank()) ? UUID.fromString(str) : null;
    }

    static <E extends Enum<E>> E getEnum(ResultSet set, String columnLabel, Class<E> eClass) throws SQLException {
        var obj = set.getObject(columnLabel);
        return obj instanceof String str ? E.valueOf(eClass, str) : null;
    }

    static LocalDate getLocalDate(ResultSet set, String columnLabel) throws SQLException {
        return set.getObject(columnLabel) == null ? null : LocalDate.ofEpochDay(set.getLong(columnLabel));
    }

    static boolean getBoolean(ResultSet set, String columnLabel) throws SQLException {
        return set.getInt(columnLabel) != 0;
    }
}
