/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.controller;

import org.panteleyev.webmoney.model.Currency;
import org.panteleyev.webmoney.repository.CurrencyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.UUID;
import static org.panteleyev.webmoney.WebmoneyApplication.CURRENCY_ROOT;

@Controller
@CrossOrigin
@RequestMapping(CURRENCY_ROOT)
public class CurrencyController {
    private final CurrencyRepository currencyRepository;

    public CurrencyController(CurrencyRepository currencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    @GetMapping
    public ResponseEntity<List<Currency>> getCurrencies() {
        return ResponseEntity.ok(currencyRepository.getCurrencies());
    }

    @PostMapping
    public ResponseEntity<Currency> postCurrency(@RequestBody Currency currency) {
        // TODO: add to database
        var c = new Currency.Builder(currency)
            .uuid(UUID.randomUUID())
            .build();
        return ResponseEntity.ok(c);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<Currency> getCurrency(@PathVariable("uuid") UUID uuid) {
        return currencyRepository.getCurrency(uuid)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<Currency> putCurrency(@RequestBody Currency currency) {
        // TODO: add to database
        return ResponseEntity.ok(currency);
    }
}
