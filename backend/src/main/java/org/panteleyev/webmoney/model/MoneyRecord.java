/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

public interface MoneyRecord {
    UUID uuid();

    long created();

    long modified();

    static BigDecimal normalize(BigDecimal value, BigDecimal defaultValue) {
        value = value == null ? defaultValue : value;
        return value.setScale(6, RoundingMode.HALF_UP);
    }

    static String normalize(String value) {
        return value == null ? "" : value;
    }
}
