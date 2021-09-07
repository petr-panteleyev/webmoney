/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.model;

import java.util.List;

public enum TransactionType {
    CARD_PAYMENT,
    CASH_PURCHASE,
    CHEQUE,
    S1(true),
    WITHDRAWAL,
    CACHIER,
    DEPOSIT,
    TRANSFER,
    S2(true),
    INTEREST,
    DIVIDEND,
    S3(true),
    DIRECT_BILLING,
    CHARGE,
    FEE,
    S4(true),
    INCOME,
    SALE,
    S5(true),
    REFUND,
    UNDEFINED;

    private final boolean separator;

    TransactionType() {
        this(false);
    }

    TransactionType(boolean separator) {
        this.separator = separator;
    }

    public boolean isSeparator() {
        return separator;
    }

    public static List<TransactionType> valuesAsList() {
        return List.of(TransactionType.values());
    }
}
