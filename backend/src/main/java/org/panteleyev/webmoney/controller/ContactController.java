/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.controller;

import org.panteleyev.webmoney.model.Contact;
import org.panteleyev.webmoney.model.Currency;
import org.panteleyev.webmoney.repository.ContactRepository;
import org.panteleyev.webmoney.repository.CurrencyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.UUID;
import static org.panteleyev.webmoney.WebmoneyApplication.CONTACT_ROOT;
import static org.panteleyev.webmoney.WebmoneyApplication.CURRENCY_ROOT;

@Controller
@CrossOrigin
@RequestMapping(CONTACT_ROOT)
public class ContactController {
    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getContacts() {
        return ResponseEntity.ok(contactRepository.getContacts());
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<Contact> getContact(@PathVariable("uuid") UUID uuid) {
        return contactRepository.getContact(uuid)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
