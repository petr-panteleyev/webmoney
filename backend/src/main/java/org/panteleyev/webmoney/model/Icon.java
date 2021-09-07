/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.model;

import java.util.UUID;
import static java.util.Objects.requireNonNull;

public record Icon(
    UUID uuid,
    String name,
    byte[] bytes,
    long created,
    long modified
) implements MoneyRecord {
    public static final int ICON_SIZE = 16;
    public static final int ICON_BYTE_LENGTH = 8192;

    public Icon {
        requireNonNull(uuid, "Icon id cannot be null");
        requireNonNull(name, "Icon name cannot be null");
        requireNonNull(bytes, "Icon bytes cannot be null");
    }
}
