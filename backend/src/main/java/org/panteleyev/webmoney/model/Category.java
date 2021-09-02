/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.model;

import java.util.Comparator;
import java.util.UUID;

public record Category(
    UUID uuid,
    String name,
    String comment,
    CategoryType type,
    UUID iconUuid,
    long created,
    long modified
) implements MoneyRecord, Named {

    public static final Comparator<Category> COMPARE_BY_NAME =
        (c1, c2) -> c1.name().compareToIgnoreCase(c2.name());

    public Category {
        if (uuid == null) {
            throw new IllegalStateException("Category id cannot be null");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalStateException("Category name cannot be null or blank");
        }
        if (type == null) {
            throw new IllegalStateException("Category type cannot be null");
        }
        if (created <= 0) {
            created = System.currentTimeMillis();
        }
        if (modified <= 0) {
            modified = System.currentTimeMillis();
        }
        comment = MoneyRecord.normalize(comment);
    }

    public static class Builder {
        private String name = "";
        private String comment = "";
        private CategoryType type = null;
        private UUID iconUuid = null;
        private UUID uuid = null;
        private long created = 0L;
        private long modified = 0L;

        public Builder() {
        }

        public Builder(Category c) {
            if (c == null) {
                return;
            }

            name = c.name();
            comment = c.comment();
            type = c.type();
            iconUuid = c.iconUuid();
            uuid = c.uuid();
            created = c.created();
            modified = c.modified();
        }

        public UUID getUuid() {
            return uuid;
        }

        public Category build() {
            return new Category(uuid, name, comment, type, iconUuid, created, modified);
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder comment(String comment) {
            this.comment = comment;
            return this;
        }

        public Builder type(CategoryType type) {
            this.type = type;
            return this;
        }

        public Builder iconUuid(UUID iconUuid) {
            this.iconUuid = iconUuid;
            return this;
        }

        public Builder uuid(UUID uuid) {
            this.uuid = uuid;
            return this;
        }

        public Builder created(long created) {
            this.created = created;
            return this;
        }

        public Builder modified(long modified) {
            this.modified = modified;
            return this;
        }
    }
}
